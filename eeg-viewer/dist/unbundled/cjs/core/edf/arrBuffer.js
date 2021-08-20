'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrBuffer = function () {
  function ArrBuffer(buffer) {
    _classCallCheck(this, ArrBuffer);

    this.buffer = buffer;
    this.cursor = 0;
  }

  _createClass(ArrBuffer, [{
    key: 'read',
    value: function read(size) {
      return this._readFromBuffer(size);
    }
  }, {
    key: '_readFromBuffer',
    value: function _readFromBuffer(size) {
      var done = this.buffer.length <= this.cursor;
      if (this.buffer.length < this.cursor) {
        console.warn('Trying to read past data boundary; source file may be corrupted.');
      }
      if (done) {
        this.buffer = null;
        this.cursor = null;
        return Promise.resolve({ done: done, value: null });
      }

      var end = this.cursor + size;
      var value = this.buffer.slice(this.cursor, end);
      this.cursor = end;
      return Promise.resolve({ done: done, value: value });
    }
  }]);

  return ArrBuffer;
}();

exports.default = ArrBuffer;
//# sourceMappingURL=core/edf/arrBuffer.js.map
