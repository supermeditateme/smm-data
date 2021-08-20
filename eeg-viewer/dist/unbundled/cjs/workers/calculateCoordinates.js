'use strict';

// Synchronous pure function that calculates coordinates data.

function calculateCoordinates(dataSegment, signals, channelHeight, amplitude) {
  var result = {};

  var _loop = function _loop(signalLabel) {
    var data = dataSegment[signalLabel];
    var dataLength = data.length;
    var signalSegment = new Float32Array(dataLength); // TODO should try ints as well

    var signalMeta = signals.find(function (signal) {
      return signal.label === signalLabel;
    });
    var digitalRange = 65535; // TODO TODO TODO signalMeta.digitalMax - signalMeta.digitalMin;
    var scale = channelHeight / digitalRange;
    for (var i = 0; i < dataLength; i++) {
      signalSegment[i] = data[i] * scale * amplitude;
    }

    result[signalLabel] = signalSegment;
  };

  for (var signalLabel in dataSegment) {
    _loop(signalLabel);
  }

  return result;
}

exports.default = calculateCoordinates;
//# sourceMappingURL=workers/calculateCoordinates.js.map
