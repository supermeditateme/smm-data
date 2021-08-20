'use strict';

var SET_EPOCH_SIZE = Symbol('SET_EPOCH_SIZE');
var SET_CURRENT_TIME = Symbol('SET_CURRENT_TIME');
var SOFT_SET_CURRENT_TIME = Symbol('SET_CURRENT_TIME');
var SHIFT_CURRENT_TIME = Symbol('SHIFT_CURRENT_TIME');

var setEpochSize = function setEpochSize(epochSize) {
  return {
    type: SET_EPOCH_SIZE,
    payload: epochSize
  };
};

var setCurrentTime = function setCurrentTime(currentTime) {
  return {
    type: SET_CURRENT_TIME,
    payload: currentTime
  };
};

var softSetCurrentTime = function softSetCurrentTime(currentTime) {
  return {
    type: SOFT_SET_CURRENT_TIME,
    payload: currentTime
  };
};

var shiftCurrentTime = function shiftCurrentTime(timeDelta) {
  return {
    type: SHIFT_CURRENT_TIME,
    payload: timeDelta
  };
};

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    SET_EPOCH_SIZE: SET_EPOCH_SIZE,
    SET_CURRENT_TIME: SET_CURRENT_TIME,
    SOFT_SET_CURRENT_TIME: SOFT_SET_CURRENT_TIME,
    SHIFT_CURRENT_TIME: SHIFT_CURRENT_TIME,

    setEpochSize: setEpochSize,
    setCurrentTime: setCurrentTime,
    softSetCurrentTime: softSetCurrentTime,
    shiftCurrentTime: shiftCurrentTime
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

exports.SET_EPOCH_SIZE = SET_EPOCH_SIZE;
exports.SET_CURRENT_TIME = SET_CURRENT_TIME;
exports.SOFT_SET_CURRENT_TIME = SOFT_SET_CURRENT_TIME;
exports.SHIFT_CURRENT_TIME = SHIFT_CURRENT_TIME;
exports.setEpochSize = setEpochSize;
exports.setCurrentTime = setCurrentTime;
exports.softSetCurrentTime = softSetCurrentTime;
exports.shiftCurrentTime = shiftCurrentTime;
//# sourceMappingURL=actions/navigation.js.map
