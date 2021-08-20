'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Synchronous pure function that calculates derived data.

// TODO code copypasted from `selectors/viewMode.js`. Solve imports for webworkers!
var standardChannelNames = ['fp1', 'fp2', 'f3', 'f4', 'c3', 'c4', 'p3', 'p4', 'o1', 'o2', 'f7', 'f8', 't3', 't4', 't5', 't6', 'a1', 'a2', 'fz', 'cz', 'pz', 'f9', 'f10', 't9', 't10', 'p9', 'p10', 'ecg'];

function normalizeLabel(label) {
  if (standardChannelNames.includes(label.toLowerCase())) {
    return label.toLowerCase();
  }

  var labelChunks = label.replace('.', '').replace('-AA', '').replace(' - AA', '').split(' ');
  return (labelChunks[labelChunks.length - 1] || label).toLowerCase();
}

function calculateCoordinates(dataSegment, signals, derivedChannels) {
  var result = {};

  var cursor = 0;
  signals.forEach(function (signal, i) {
    var signalSegment = new Int16Array(signal.sampleRate * 30);
    for (var j = 0; j < 30; j++) {
      var dataRecord = dataSegment[j];
      if (!dataRecord) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No dataRecord found at index ' + j + '; probably last segment.');
        }
        break;
      }
      signalSegment.set(dataRecord.subarray(cursor, cursor + signal.sampleRate), j * signal.sampleRate);
    }

    result[signal.label] = signalSegment;
    cursor += signal.sampleRate;
  });

  var _loop = function _loop(derivedChannel) {
    var _derivedChannel$split = derivedChannel.split('-'),
        _derivedChannel$split2 = _slicedToArray(_derivedChannel$split, 2),
        ch1 = _derivedChannel$split2[0],
        ch2 = _derivedChannel$split2[1];

    var signal1 = signals.find(function (_ref) {
      var label = _ref.label;
      return normalizeLabel(label) === ch1;
    });
    var signal2 = signals.find(function (_ref2) {
      var label = _ref2.label;
      return normalizeLabel(label) === ch2;
    });
    if (!signal1 || !signal2) {
      console.error('Channels not found! ' + ch1 + ' , ' + ch2);
      result[derivedChannel] = new Int16Array(256 * 30); // Dummy
      return 'continue';
    }
    if (signal1.sampleRate !== signal2.sampleRate) {
      throw new Error('Sample rates do not match! ' + ch1 + ' , ' + ch2);
    }

    var signalSegment = new Int16Array(signal1.sampleRate * 30);
    var dataLength = signalSegment.length;
    for (var i = 0; i < dataLength; i++) {
      signalSegment[i] = result[signal1.label][i] - result[signal2.label][i];
    }
    result[derivedChannel] = signalSegment;
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = derivedChannels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var derivedChannel = _step.value;

      var _ret = _loop(derivedChannel);

      if (_ret === 'continue') continue;
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

  return result;
}

exports.default = calculateCoordinates;
//# sourceMappingURL=workers/calculateDerived.js.map
