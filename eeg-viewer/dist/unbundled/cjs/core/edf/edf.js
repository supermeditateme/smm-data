'use strict';

var __chunk_26 = require('./edfHeader.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edf = function () {
  function Edf(stream) {
    var _this = this;

    var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Edf);

    this.stream = stream;

    var headerPromise = header ? Promise.resolve(header) : new __chunk_26.default(stream);

    return headerPromise.then(function (header) {
      _this.header = header;
      return Promise.resolve(_this);
    });
  }

  _createClass(Edf, [{
    key: 'readDataRecords',
    value: function readDataRecords(callback) {
      var _this2 = this;

      var dataRecordSize = this.header.signals.reduce(function (acc, v) {
        return acc + v.sampleRate;
      }, 0) * 2;

      var fuse = 0;

      var handle = function handle(_ref) {
        var done = _ref.done,
            value = _ref.value;

        if (done) {
          callback(null);
          return;
        }
        fuse += 1;
        if (fuse > 1000000) throw new Error('Too long EEG');

        callback(new Int16Array(value.buffer));
        return _this2.stream.read(dataRecordSize).then(handle);
      };

      return this.stream.read(dataRecordSize).then(handle);
    }
  }]);

  return Edf;
}();

exports.default = Edf;
//# sourceMappingURL=core/edf/edf.js.map
