'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FunnelBuffer = function () {
  function FunnelBuffer(stream) {
    _classCallCheck(this, FunnelBuffer);

    this.stream = stream;
    this.buffer = new Uint8Array();
  }

  _createClass(FunnelBuffer, [{
    key: 'read',
    value: function read(size) {
      if (size > this.buffer.length) {
        return this._readFromStream(size, 0);
      } else {
        return this._readFromBuffer(size);
      }
    }
  }, {
    key: '_readFromStream',
    value: function _readFromStream(size, fuse) {
      var _this = this;

      if (fuse > 1000) throw 'Recursion level too deep';

      return this.stream.read().then(function (_ref) {
        var done = _ref.done,
            value = _ref.value;

        if (done) return new Promise(function (resolve) {
          return resolve({ done: true, value: null });
        });
        _this._pushToBuffer(value);
        if (_this.buffer.length < size) return _this._readFromStream(size, fuse + 1);
        return _this._readFromBuffer(size);
      });
    }
  }, {
    key: '_pushToBuffer',
    value: function _pushToBuffer(values) {
      var newBuffer = new Uint8Array(this.buffer.length + values.length);
      newBuffer.set(this.buffer, 0);
      newBuffer.set(values, this.buffer.length);
      this.buffer = newBuffer;
    }
  }, {
    key: '_readFromBuffer',
    value: function _readFromBuffer(size) {
      var value = this.buffer.slice(0, size);
      this.buffer = this.buffer.slice(size);
      return new Promise(function (resolve) {
        return resolve({ done: false, value: value });
      });
    }
  }]);

  return FunnelBuffer;
}();

exports.default = FunnelBuffer;
//# sourceMappingURL=core/edf/funnelBuffer.js.map
