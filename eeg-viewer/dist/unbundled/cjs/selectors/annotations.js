'use strict';

var reselect = require('reselect');
var __chunk_1 = require('../constants.js');
var __chunk_17 = require('./navigation.js');

var getVisibleAnnotations = reselect.createSelector(function (state) {
  return state.annotations.list;
}, __chunk_17.getCurrentSegmentRange, function (annotationsList, segmentRange) {
  var rangeStart = __chunk_1.SEGMENT_DURATION * segmentRange[0];
  var rangeEnd = __chunk_1.SEGMENT_DURATION * segmentRange[segmentRange.length - 1] + __chunk_1.SEGMENT_DURATION;

  return annotationsList.filter(function (annotation) {
    var time = annotation.time,
        duration = annotation.duration;

    return time < rangeEnd || time + duration > rangeStart;
  });
});

var getVisibleAnnotationsWithCoordinates = reselect.createSelector(function (state) {
  return state.presentation.scrollerWidth / state.navigation.epochSize;
}, getVisibleAnnotations, function (secondWidth, visibleAnnotations) {
  return visibleAnnotations.map(function (annotation) {
    return {
      annotation: annotation,
      startX: annotation.time * secondWidth,
      width: annotation.duration * secondWidth
    };
  });
});

var getSelectedAnnotation = reselect.createSelector(function (state) {
  return state.annotations.list;
}, function (state) {
  return state.annotations.selected;
}, function (annotationsList, selected) {
  return annotationsList.find(function (annotation) {
    return annotation.id === selected;
  });
});

var getSortedAnnotations = reselect.createSelector(function (state) {
  return state.annotations.list;
}, function (annotationsList) {
  return annotationsList.sort(function (a, b) {
    return a.time - b.time;
  });
});

exports.getVisibleAnnotations = getVisibleAnnotations;
exports.getVisibleAnnotationsWithCoordinates = getVisibleAnnotationsWithCoordinates;
exports.getSelectedAnnotation = getSelectedAnnotation;
exports.getSortedAnnotations = getSortedAnnotations;
//# sourceMappingURL=selectors/annotations.js.map
