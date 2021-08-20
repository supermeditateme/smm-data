import { createSelector } from 'reselect';
import { PRELOAD_SEGMENTS, SEGMENT_DURATION } from '../constants.js';

var getCurrentPosition = createSelector(function (state) {
  return state.navigation.currentTime;
}, function (state) {
  return state.presentation.scrollerWidth;
}, function (state) {
  return state.navigation.epochSize;
}, function (currentTime, scrollerWidth, epochSize) {
  return scrollerWidth * currentTime / epochSize;
});

var getCurrentSegment = createSelector(function (state) {
  return state.navigation.currentTime;
}, function (currentTime) {
  return Math.floor(currentTime / SEGMENT_DURATION);
});

var getCurrentSegmentRange = createSelector(function (state) {
  return state.header;
}, getCurrentSegment, function (header, currentSegment) {
  var result = [];

  var _header$dataRecordsNu = header.dataRecordsNumber,
      dataRecordsNumber = _header$dataRecordsNu === undefined ? 0 : _header$dataRecordsNu,
      _header$dataRecordDur = header.dataRecordDuration,
      dataRecordDuration = _header$dataRecordDur === undefined ? 0 : _header$dataRecordDur;

  var startSegment = Math.max(0, currentSegment - Math.trunc(PRELOAD_SEGMENTS / 2));
  // maxSegment and endSegment are inclusive.
  var maxSegment = Math.ceil(dataRecordsNumber * dataRecordDuration / SEGMENT_DURATION);
  var endSegment = Math.min(maxSegment, startSegment + PRELOAD_SEGMENTS - 1);

  for (var i = startSegment; i <= endSegment; i++) {
    result.push(i);
  }

  return result;
});

var getFileDuration = createSelector(function (state) {
  return state.header.dataRecordsNumber;
}, function (state) {
  return state.header.dataRecordDuration;
}, function () {
  var dataRecordsNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var dataRecordDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return dataRecordsNumber * dataRecordDuration;
});

var getScrollerContentWidth = createSelector(getFileDuration, function (state) {
  return state.presentation.scrollerWidth;
}, function (state) {
  return state.navigation.epochSize;
}, function (fileDuration, scrollerWidth, epochSize) {
  return fileDuration * scrollerWidth / epochSize;
});

var getSecondWidth = createSelector(function (state) {
  return state.navigation.epochSize;
}, function (state) {
  return state.presentation.scrollerWidth;
}, function (epochSize, scrollerWidth) {
  return scrollerWidth / epochSize;
});

var getSegmentWidth = createSelector(getSecondWidth, function (secondWidth) {
  return SEGMENT_DURATION * secondWidth;
});

export { getCurrentPosition, getCurrentSegment, getCurrentSegmentRange, getFileDuration, getScrollerContentWidth, getSecondWidth, getSegmentWidth };
//# sourceMappingURL=selectors/navigation.js.map
