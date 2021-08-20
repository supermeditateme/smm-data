// Synchronous pure function that calculates coordinates data.


function calculateCoordinates(dataSegment, signals, channelHeight, amplitude) {
  var result = {};

  /**
 * Calculate median of array of numbers
 * @param {Array<Number>} arr
 * @return {Number}
 */
var _median = function _median(arr) {
    arr = [...arr].sort((a, b) => a - b);
    return (arr[arr.length - 1 >> 1] + arr[arr.length >> 1]) / 2;
};



  var _loop = function _loop(signalLabel) {
    var data = dataSegment[signalLabel];
    var dataLength = data.length;
    var signalSegment = new Float32Array(dataLength); // TODO should try ints as well

    var signalMeta = signals.find(function (signal) {
      return signal.label === signalLabel;
    });
    var digitalRange = 31200;
    if (signalMeta !== undefined) {
      digitalRange = signalMeta.digitalMax - signalMeta.digitalMin;
    }

    // Fix instances where gyro read = 0 (replace with median)
    var median = _median(data);
    if (signalLabel == "GYROX" || signalLabel == "GYROY") {
      console.log(signalLabel + ": " + data);
      for (var i = 0; i < dataLength; i++) {
        if (data[i] == 0) {
          data[i] = median;
        }
      }
    }

    median = _median(data);
    var max = Math.max(...data);
    var min = Math.min(...data);

    for (var i = 0; i < dataLength; i++) {
      signalSegment[i] = (data[i] - median) * amplitude;
    }

    console.log("Channel " + signalLabel + " channelHeight: " + channelHeight + ", median: " + median + ", max = " + max + ", min = " + min);

    result[signalLabel] = signalSegment;
  };

  for (var signalLabel in dataSegment) {
    _loop(signalLabel);
  }

  return result;
}

export default calculateCoordinates;
//# sourceMappingURL=workers/calculateCoordinates.js.map
