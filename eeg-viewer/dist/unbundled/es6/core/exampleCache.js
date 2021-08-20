import deferred from './deferred.js';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO destruction behaviour +/-

var MAX_CACHE_SIZE = 2000; // dataRecords. TODO tunable
var MAX_REQUEST_SIZE = 500; // dataRecords. TODO tunable

var ExampleCache = function () {
  function ExampleCache(resource, header) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { concurrency: 2 };

    _classCallCheck(this, ExampleCache);

    if (!resource || !header) {
      throw new Error('resource or header not supplied to cache constructor');
    }

    this.resource = resource;
    this.header = header;
    this.options = options;

    var totalSize = header.dataRecordsNumber;

    // Actual dataRecords in cache
    this._data = new Array(totalSize).fill(null);
    this._dataCount = 0;

    // dataRecord indices that have been requested by user
    // Each request by user is assigned a sequential number, for cache clearing
    // later
    this._requested = new Array(totalSize).fill(null);
    this._lastRequested = 0;

    // dataRecord indices that are being fetched from the server right now
    this._fetching = new Array(totalSize).fill(null);

    this.unsubscribeChunk = resource.on('chunk', function (index, dataRecord, requestId) {
      _this._processNewChunk(index, dataRecord, requestId);
    });
    this.unsubscribeFinish = resource.on('finish', function () {
      _this.scheduleDataRequest();
    });
    this.unsubscribeDestroy = resource.on('destroy', function () {
      _this.destroy(false);
    });
  }

  _createClass(ExampleCache, [{
    key: 'getChunksAsync',
    value: function getChunksAsync(start, _size) {
      var _this2 = this;

      var totalSize = this.header.dataRecordsNumber;

      if (start < 0 || start > totalSize - 1) {
        // prettier-ignore
        throw new Error('Incorrect start supplied to getChunksAsync(): ' + start + ' (total edf size is ' + totalSize + ')');
      }

      var size = Math.min(_size, totalSize - start);

      if (process.env.NODE_ENV === 'development') {
        if (size < _size) {
          // prettier-ignore
          console.log('getChunksAsync(' + start + ', ' + _size + '): requested chunks past edf file boundary (' + totalSize + '); truncating to getChunksAsync(' + start + ', ' + size + ').');
        }
      }

      var requestNumber = ++this._lastRequested;
      var canGetFromCache = true;
      var willFetchEventually = true;
      for (var i = start; i < start + size; i++) {
        this._requested[i] = requestNumber;
        canGetFromCache = canGetFromCache && !!this._data[i];
        willFetchEventually = willFetchEventually && (!!this._data[i] || !!this._fetching[i]);
      }

      // Simple case - we've got everything we need in cache...
      if (canGetFromCache) {
        console.info('full cache hit', start, size);
        return deferred().resolve(this._data.slice(start, start + size));
      }

      // ...complex case - we don't have everything.
      var deferredPromise = deferred(function (res, rej) {
        var collectedChunks = _this2._data.slice(start, start + size);
        var unsubscribeChunk = _this2.resource.on('chunk', function (index, dataRecord) {
          if (index < start || index > start + size - 1 || !!collectedChunks[index - start]) {
            return;
          }
          collectedChunks[index - start] = dataRecord;

          if (!collectedChunks.includes(null)) {
            // All chunks collected; resolve promise with a shallow copy of array.
            res(collectedChunks.slice());
            destroy();
          }
        });
        // TODO FIXME it's faulty implementation. Must be `this.on('destroy'`, not `this.resource.on('destroy'`
        var unsubscribeDestroy = _this2.resource.on('destroy', function () {
          destroy();
        });

        // To prevent memory leaks, we should clean up everything in regard to
        // this promise.
        var destroy = function destroy() {
          unsubscribeChunk();
          unsubscribeDestroy();
          for (var _i = 0; _i < size; _i++) {
            collectedChunks[_i] = null;
          }
          collectedChunks = null;
        };
      });

      // Are dataRecords that we need being fetched right now? If not, we should
      // ask resource to load data.
      if (!willFetchEventually) {
        this.scheduleDataRequest();
      }

      return deferredPromise;
    }
  }, {
    key: 'scheduleDataRequest',
    value: function scheduleDataRequest() {
      if (this.resource.getRequestCount() >= this.options.concurrency) {
        // Too many requests already running; do nothing. When any running
        // request is finished, this function will be called again.
        return;
      }

      var totalSize = this.header.dataRecordsNumber;
      var start = null;
      var end = null;
      for (var i = 0; i < totalSize; i++) {
        if (!this._requested[i] || !!this._data[i] || !!this._fetching[i]) {
          continue;
        }
        if (start === null) {
          start = i;
        }
        end = i;
      }
      if (start === null) {
        return;
      }

      var size = Math.min(end - start + 1, MAX_REQUEST_SIZE);

      // We may get something other than what we've asked for

      var _resource$loadChunks = this.resource.loadChunks(start, size),
          _resource$loadChunks2 = _slicedToArray(_resource$loadChunks, 3),
          requestId = _resource$loadChunks2[0],
          requestStart = _resource$loadChunks2[1],
          requestSize = _resource$loadChunks2[2];

      for (var _i2 = requestStart; _i2 < requestSize; _i2++) {
        this._fetching[_i2] = this._fetching[_i2] || [];
        this._fetching[_i2].push(requestId);
      }
    }
  }, {
    key: '_cleanOneChunk',
    value: function _cleanOneChunk() {
      // Simple implementation, clean only one chunk (make full scan for that).
      // TODO better
      var totalSize = this.header.dataRecordsNumber;
      var lowestGeneration = Infinity;
      var found = null;
      for (var i = 0; i < totalSize; i++) {
        if (!this._data[i] || this._requested[i] >= lowestGeneration) {
          continue;
        }
        lowestGeneration = this._requested[i];
        found = i;
      }

      if (found === null) {
        throw new Error('Tried to clean one chunk from cache, but found no eligible chunk!');
      }
      if (this._fetching[found]) {
        throw new Error('Tried to clean one chunk from cache, but this chunk is being requested!');
      }

      this._data[found] = null;
      this._requested[found] = null;
      this._dataCount -= 1;
    }
  }, {
    key: '_processNewChunk',
    value: function _processNewChunk(index, dataRecord, requestId) {
      if (this._dataCount > MAX_CACHE_SIZE) {
        this._cleanOneChunk();
      }

      this._data[index] = dataRecord;
      this._dataCount += 1;

      // For those chunks that are not explicitly requested by user, we set
      // their generation number to zero, so that they are cleaned from cache
      // first.
      this._requested[index] = this._requested[index] || 0;

      if (!this._fetching[index]) ; else if (this._fetching[index].length === 1) {
        this._fetching[index] = null;
      } else {
        var idx = this._fetching[index].indexOf(requestId);
        if (idx === -1) {
          throw new Error("Mustn't happen");
        }
        this._fetching[index].splice(idx, 1);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var destroyResource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.unsubscribeChunk();
      this.unsubscribeFinish();
      this.unsubscribeDestroy();
      for (var i = 0; i < this._data.length; i++) {
        this._data[i] = null;
      }
      this._data = null;
      this._requested = null;
      this._fetching = null;

      destroyResource && this.resource.destroy();
    }
  }]);

  return ExampleCache;
}();

export default ExampleCache;
//# sourceMappingURL=core/exampleCache.js.map
