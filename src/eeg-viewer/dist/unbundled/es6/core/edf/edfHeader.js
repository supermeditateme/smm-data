var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEADER_SPEC = {
  version: { size: 8, type: 'int' },
  patientId: { size: 80, type: 'string' },
  recordingId: { size: 80, type: 'string' },
  recordingStartDate: { size: 8, type: 'string' },
  recordingStartTime: { size: 8, type: 'string' },
  headerSize: { size: 8, type: 'int' },
  reserved: { size: 44, type: 'binary' },
  dataRecordsNumber: { size: 8, type: 'int' },
  dataRecordDuration: { size: 8, type: 'float' },
  signalsNumber: { size: 4, type: 'int' }
};

var SIGNAL_SPEC = {
  label: { size: 16, type: 'string' },
  transducerType: { size: 80, type: 'string' },
  physicalDimension: { size: 8, type: 'string' },
  physicalMin: { size: 8, type: 'float' },
  physicalMax: { size: 8, type: 'float' },
  digitalMin: { size: 8, type: 'int' },
  digitalMax: { size: 8, type: 'int' },
  prefiltering: { size: 80, type: 'string' },
  sampleRate: { size: 8, type: 'int' },
  reserved: { size: 32, type: 'string' }
};

var EdfHeader = function () {
  function EdfHeader(stream) {
    var _this = this;

    _classCallCheck(this, EdfHeader);

    return stream.read(256).then(function (_ref) {
      var value = _ref.value;

      var header = _this._parseHeader(value);
      EdfHeader._validateHeader(header);
      var signalsNumber = header.signalsNumber;

      return stream.read(256 * signalsNumber).then(function (_ref2) {
        var value = _ref2.value;

        header.signals = _this._parseSignals(value, signalsNumber);
        return new Promise(function (resolve) {
          return resolve(header);
        });
      });
    });
  }

  _createClass(EdfHeader, [{
    key: '_parseSignals',
    value: function _parseSignals(bytes, signalsNumber) {
      var result = [];

      for (var signalId = 0; signalId < signalsNumber; signalId++) {
        var signal = this._parseSignal(bytes, signalId, signalsNumber);
        EdfHeader._validateSignal(signal);
        result.push(signal);
      }

      return result;
    }
  }, {
    key: '_parseHeader',
    value: function _parseHeader(bytes) {
      var result = {};
      var offset = 0;

      for (var field in HEADER_SPEC) {
        var fieldSpec = HEADER_SPEC[field];
        var fieldBytes = bytes.slice(offset, offset + fieldSpec.size);
        result[field] = this._castValue(fieldBytes, fieldSpec.type);
        offset += fieldSpec.size;
      }

      return result;
    }
  }, {
    key: '_parseSignal',
    value: function _parseSignal(bytes, signalId, signalsNumber) {
      var result = {};
      var offset = 0;

      for (var field in SIGNAL_SPEC) {
        var fieldSpec = SIGNAL_SPEC[field];
        var start = offset + signalId * fieldSpec.size;
        var fieldBytes = bytes.slice(start, start + fieldSpec.size);
        result[field] = this._castValue(fieldBytes, fieldSpec.type);
        offset += signalsNumber * fieldSpec.size;
      }

      return result;
    }
  }, {
    key: '_castValue',
    value: function _castValue(bytes, type) {
      var str = new TextDecoder('utf-8').decode(bytes.buffer).trim();

      switch (type) {
        case 'int':
          return parseInt(str);
        case 'float':
          return parseFloat(str);
        default:
          return str;
      }
    }
  }], [{
    key: '_validateHeader',
    value: function _validateHeader(header) {
      if (header.version !== 0) throw 'Unsupported EDF version';

      if (header.dataRecordsNumber === undefined || header.dataRecordsNumber < 1 || header.dataRecordsNumber > 1000000) throw 'Wrong records number';

      if (header.dataRecordDuration === undefined || header.dataRecordDuration <= 0 || header.dataRecordDuration > 1000) throw 'Too long record duration';

      if (header.signalsNumber === undefined || header.signalsNumber < 1 || header.signalsNumber > 256) throw 'Wrong signals number';
    }
  }, {
    key: '_validateSignal',
    value: function _validateSignal(signal) {
      if (signal.sampleRate === undefined || signal.sampleRate < 1 || signal.sampleRate > 100000) throw 'Wrong sample rate';

      if (signal.physicalMin === undefined) throw 'Wrong physical minimum';
      if (signal.physicalMax === undefined) throw 'Wrong physical maximum';

      if (signal.digitalMin === undefined) throw 'Wrong digital minimum';
      if (signal.digitalMax === undefined) throw 'Wrong digital maximum';
    }
  }]);

  return EdfHeader;
}();

export default EdfHeader;
//# sourceMappingURL=core/edf/edfHeader.js.map
