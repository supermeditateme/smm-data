'use strict';

var reselect = require('reselect');
var __chunk_1 = require('../constants.js');

var getCurrentPosition = reselect.createSelector(function (state) {
  return state.navigation.currentTime;
}, function (state) {
  return state.presentation.scrollerWidth;
}, function (state) {
  return state.navigation.epochSize;
}, function (currentTime, scrollerWidth, epochSize) {
  return scrollerWidth * currentTime / epochSize;
});

var getCurrentSegment = reselect.createSelector(function (state) {
  return state.navigation.currentTime;
}, function (currentTime) {
  return Math.floor(currentTime / __chunk_1.SEGMENT_DURATION);
});

var getCurrentSegmentRange = reselect.createSelector(function (state) {
  return state.header;
}, getCurrentSegment, function (header, currentSegment) {
  var result = [];

  var _header$dataRecordsNu = header.dataRecordsNumber,
      dataRecordsNumber = _header$dataRecordsNu === undefined ? 0 : _header$dataRecordsNu,
      _header$dataRecordDur = header.dataRecordDuration,
      dataRecordDuration = _header$dataRecordDur === undefined ? 0 : _header$dataRecordDur;

  var startSegment = Math.max(0, currentSegment - Math.trunc(__chunk_1.PRELOAD_SEGMENTS / 2));
  // maxSegment and endSegment are inclusive.
  var maxSegment = Math.ceil(dataRecordsNumber * dataRecordDuration / __chunk_1.SEGMENT_DURATION);
  var endSegment = Math.min(maxSegment, startSegment + __chunk_1.PRELOAD_SEGMENTS - 1);

  for (var i = startSegment; i <= endSegment; i++) {
    result.push(i);
  }

  return result;
});

var getFileDuration = reselect.createSelector(function (state) {
  return state.header.dataRecordsNumber;
}, function (state) {
  return state.header.dataRecordDuration;
}, function () {
  var dataRecordsNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var dataRecordDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return dataRecordsNumber * dataRecordDuration;
});

var getScrollerContentWidth = reselect.createSelector(getFileDuration, function (state) {
  return state.presentation.scrollerWidth;
}, function (state) {
  return state.navigation.epochSize;
}, function (fileDuration, scrollerWidth, epochSize) {
  return fileDuration * scrollerWidth / epochSize;
});

var getSecondWidth = reselect.createSelector(function (state) {
  return state.navigation.epochSize;
}, function (state) {
  return state.presentation.scrollerWidth;
}, function (epochSize, scrollerWidth) {
  return scrollerWidth / epochSize;
});

var getSegmentWidth = reselect.createSelector(getSecondWidth, function (secondWidth) {
  return __chunk_1.SEGMENT_DURATION * secondWidth;
});

exports.getCurrentPosition = getCurrentPosition;
exports.getCurrentSegment = getCurrentSegment;
exports.getCurrentSegmentRange = getCurrentSegmentRange;
exports.getFileDuration = getFileDuration;
exports.getScrollerContentWidth = getScrollerContentWidth;
exports.getSecondWidth = getSecondWidth;
exports.getSegmentWidth = getSegmentWidth;
//# sourceMappingURL=selectors/navigation.js.map
