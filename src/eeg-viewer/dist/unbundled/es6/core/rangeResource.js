import FunnelBuffer from './edf/funnelBuffer.js';
import ArrBuffer from './edf/arrBuffer.js';
import EdfHeader from './edf/edfHeader.js';
import streamReader from './edf/edfStreamReader.js';
import deferred from './deferred.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defaultFetch(resource, options) {
  return window.fetch(resource, _extends({}, options, { credentials: 'same-origin' }));
}

var ExampleRangeResource = function () {
  function ExampleRangeResource(source) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ExampleRangeResource);

    this.url = source.url;
    this._fetch = typeof options.fetch === 'function' ? options.fetch : _defaultFetch;

    this.header = null;
    this.headerPromise = null;

    this._subscribers = {
      header: [],
      chunk: [],
      start: [],
      finish: [],
      error: [],
      destroy: []
    };

    this._requestCount = 0;
    this.on('start', function () {
      return _this._requestCount++;
    });
    this.on('finish', function () {
      return _this._requestCount--;
    });
  }

  _createClass(ExampleRangeResource, [{
    key: 'getRequestCount',
    value: function getRequestCount() {
      return this._requestCount;
    }
  }, {
    key: 'fetchHeader',
    value: function fetchHeader() {
      var _this2 = this;

      if (!this.headerPromise) {
        this.headerPromise = this._fetchHeader().then(function (header) {
          _this2._emit('header', header);
          _this2.header = header;
          return header;
        });
      }

      return this.headerPromise;
    }
  }, {
    key: '_fetchHeader',
    value: function _fetchHeader() {
      var _this3 = this;

      this._emit('start');
      var headerPromise = this._fetch(this.url, {
        headers: new Headers({
          Range: 'bytes=0-16384'
        })
      }).then(function (response) {
        if (response.status !== 206) throw new Error('EEG file range unavailable');

        if ('ReadableStream' in window && response.body instanceof ReadableStream) {
          return response.body;
        } else if (response.arrayBuffer) {
          return response.arrayBuffer();
        } else {
          throw new Error('Unexpected response!');
        }
      }).then(function (source) {
        var stream = void 0;
        switch (true) {
          case 'ReadableStream' in window && source instanceof ReadableStream:
            stream = new FunnelBuffer(source.getReader());
            break;
          case source instanceof ArrayBuffer:
            stream = new ArrBuffer(new Uint8Array(source));
            break;
          default:
            throw new Error('Unsupported source for edfStreamReader');
            break;
        }

        return new EdfHeader(stream).then(function (header) {
          _this3._emit('finish');
          stream.stream && stream.stream.cancel();
          return header;
        });
      });

      return headerPromise;
    }
  }, {
    key: 'loadChunks',
    value: function loadChunks(start, size) {
      if (!this.header) {
        throw new Error('Header not fetched yet. Use promise-returning method fetchHeader().');
      }

      var totalSize = this.header.dataRecordsNumber;
      if (start < 0 || start + size - 1 > totalSize) {
        // prettier-ignore
        throw new Error('Incorrect start/size supplied to loadChunks(): ' + start + ', ' + size + ' (total edf size is ' + totalSize + ')');
      }

      // Start fetching data range.
      var requestId = new Date().getTime();
      this._fetchChunks(requestId, start, size);

      return [requestId, start, size];
    }
  }, {
    key: '_fetchChunks',
    value: function _fetchChunks(requestId, start, size) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._emit('start', requestId);
        // TODO cancel stream on destroy somehow.

        var _header = _this4.header,
            headerSize = _header.headerSize,
            signals = _header.signals;


        var dataRecordSize = signals.reduce(function (acc, v) {
          return acc + v.sampleRate;
        }, 0) * 2;

        var bytesStart = headerSize + start * dataRecordSize;
        var bytesEnd = headerSize + (start + size) * dataRecordSize - 1; // HTTP Range is inclusive; https://tools.ietf.org/html/rfc7233

        _this4._fetch(_this4.url, {
          headers: new Headers({
            Range: 'bytes=' + bytesStart + '-' + bytesEnd
          })
        }).then(function (response) {
          if (response.status !== 206) throw new Error('EEG file range unavailable');

          if ('ReadableStream' in window && response.body instanceof ReadableStream) {
            return response.body;
          } else if (response.arrayBuffer) {
            return response.arrayBuffer();
          } else {
            throw new Error('Unexpected response!');
          }
        }).then(function (source) {
          return streamReader(source, function (dataRecord, index, total, edfHeader) {
            // edf's readDataRecords() method does one extra callback with null
            // after finish. We check for index being not greater than requested,
            // to emit 'chunk' events correctly.
            if (index < size) {
              _this4._emit('chunk', start + index, dataRecord, requestId);
            }

            if (process.env.NODE_ENV === 'development') {
              if (index >= size) {
                console.info('ignored: index, start, size', index, start, size);
              }
            }

            if (index === size - 1) {
              _this4._emit('finish', requestId);
              resolve(index, total);
            }
          }, _this4.header);
        });
      });
    }

    // Pubsub implementation

  }, {
    key: '_emit',
    value: function _emit(event) {
      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._subscribers[event][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback.apply(undefined, data);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      var _this5 = this;

      if (!this._subscribers[event]) {
        console.warn('Event ' + event + ' not supported; ignoring.');
        return false;
      }

      this._subscribers[event].push(callback);
      return function () {
        return _this5.off(event, callback);
      };
    }
  }, {
    key: 'off',
    value: function off(event, callback) {
      if (!this._subscribers[event]) {
        console.warn('Event ' + event + ' not supported; ignoring.');
        return false;
      }

      var prevLength = this._subscribers[event].length;
      this._subscribers[event] = this._subscribers[event].filter(function (cb) {
        return cb !== callback;
      });

      return prevLength > this._subscribers[event].length;
    }

    // TODO destroy method; more.

  }, {
    key: 'destroy',
    value: function destroy() {
      this._emit('destroy');
    }
  }]);

  return ExampleRangeResource;
}();

export default ExampleRangeResource;
//# sourceMappingURL=core/rangeResource.js.map
