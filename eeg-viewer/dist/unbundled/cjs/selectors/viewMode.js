'use strict';

var reselect = require('reselect');
var __chunk_1 = require('../constants.js');
var __chunk_17 = require('./navigation.js');
require('./annotations.js');

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bipolarNames = ['fp1-f7', 'f7-t3', 't3-t5', 't5-o1', 'fp1-f3', 'f3-c3', 'c3-p3', 'p3-o1', 'fz-cz', 'cz-pz', 'fp2-f4', 'f4-c4', 'c4-p4', 'p4-o2', 'fp2-f8', 'f8-t4', 't4-t6', 't6-o2'];

var standardChannelNames = ['fp1', 'fp2', 'f3', 'f4', 'c3', 'c4', 'p3', 'p4', 'o1', 'o2', 'f7', 'f8', 't3', 't4', 't5', 't6', 'a1', 'a2', 'fz', 'cz', 'pz', 'f9', 'f10', 't9', 't10', 'p9', 'p10', 'ecg'];

function normalizeLabel(label) {
  if (standardChannelNames.includes(label.toLowerCase())) {
    return label.toLowerCase();
  }

  var labelChunks = label.replace('.', '').replace('-AA', '').replace(' - AA', '').split(' ');
  return (labelChunks[labelChunks.length - 1] || label).toLowerCase();
}

var getDerivedChannels = reselect.createSelector(function (state) {
  return state.viewMode.userSpecifiedChannels;
}, function (userSpecifiedChannels) {
  return [].concat(bipolarNames, _toConsumableArray(userSpecifiedChannels));
});

var getChannelSettings = reselect.createSelector(function (state) {
  return state.header.signals;
}, function (state) {
  return state.viewMode.channelDefaults;
}, function (state) {
  return state.viewMode.perChannelSettings;
}, getDerivedChannels, function (edfSignals, defaults, channelSettings, derivedChannels) {
  var result = {};
  if (!edfSignals) {
    return result;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = edfSignals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var signal = _step.value;
      var label = signal.label;


      if (result[label]) {
        throw new Error('Duplicate signal ' + label);
      }

      var normalizedLabel = normalizeLabel(label);

      result[label] = Object.assign({}, defaults, channelSettings[label], {
        normalizedLabel: normalizedLabel,
        type: 'input',
        signal: signal
      });
    }

    // For now, we assume only subtraction type of derived channels.
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

  var _loop = function _loop(label) {
    if (result[label]) {
      throw new Error('Duplicate signal ' + label);
    }

    var _label$split = label.split('-'),
        _label$split2 = _slicedToArray(_label$split, 2),
        ch1 = _label$split2[0],
        ch2 = _label$split2[1];

    var signal1 = edfSignals.find(function (_ref) {
      var label = _ref.label;
      return normalizeLabel(label) === ch1;
    });
    var signal2 = edfSignals.find(function (_ref2) {
      var label = _ref2.label;
      return normalizeLabel(label) === ch2;
    });

    if (process.env.NODE_ENV === 'development') {
      if (!signal1 || !signal2 || signal1.sampleRate !== signal2.sampleRate || signal1.digitalMin !== signal2.digitalMin || signal1.digitalMax !== signal2.digitalMax) {
        console.warn('Invalid derived channel!', label);
      }
    }

    result[label] = Object.assign({}, defaults, channelSettings[label], {
      normalizedLabel: label,
      type: 'derived',
      signals: [signal1, signal2],
      invalid: !signal1 || !signal2 || signal1.sampleRate !== signal2.sampleRate || signal1.digitalMin !== signal2.digitalMin || signal1.digitalMax !== signal2.digitalMax
    });
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = derivedChannels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var label = _step2.value;

      _loop(label);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
});

var getVisibleChannels = reselect.createSelector(function (state) {
  return state.viewMode.visibleChannels;
}, getChannelSettings, function (visibleChannels, channelSettings) {
  return visibleChannels.map(function (label) {
    return channelSettings[label];
  });
});

var getPossibleChannels = reselect.createSelector(getChannelSettings, function (channelSettings) {
  return Object.keys(channelSettings).filter(function (label) {
    return !channelSettings[label].invalid;
  });
});

var getStepWidth = reselect.createSelector(getVisibleChannels, function (state) {
  return state.header.dataRecordDuration;
}, __chunk_17.getSecondWidth, function (visibleChannel, dataRecordDuration, secondWidth) {
  var stepWidth = {};

  var _loop2 = function _loop2(channel) {
    var currentSampleRate = channel.signal.sampleRate;
    var currentStepWidth = secondWidth / currentSampleRate;

    if (!stepWidth[currentSampleRate]) {
      var length = __chunk_1.SEGMENT_DURATION / dataRecordDuration * currentSampleRate;

      var points = new Array(length).fill(null);

      stepWidth[currentSampleRate] = points.map(function (item, idx) {
        return idx * currentStepWidth;
      });
    }
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = visibleChannel[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var channel = _step3.value;

      _loop2(channel);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return stepWidth;
});

exports.getDerivedChannels = getDerivedChannels;
exports.getChannelSettings = getChannelSettings;
exports.getVisibleChannels = getVisibleChannels;
exports.getPossibleChannels = getPossibleChannels;
exports.getStepWidth = getStepWidth;
//# sourceMappingURL=selectors/viewMode.js.map
