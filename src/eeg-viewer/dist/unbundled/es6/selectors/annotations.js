import { createSelector } from 'reselect';
import { SEGMENT_DURATION } from '../constants.js';
import { getCurrentSegmentRange } from './navigation.js';

var getVisibleAnnotations = createSelector(function (state) {
  return state.annotations.list;
}, getCurrentSegmentRange, function (annotationsList, segmentRange) {
  var rangeStart = SEGMENT_DURATION * segmentRange[0];
  var rangeEnd = SEGMENT_DURATION * segmentRange[segmentRange.length - 1] + SEGMENT_DURATION;

  return annotationsList.filter(function (annotation) {
    var time = annotation.time,
        duration = annotation.duration;

    return time < rangeEnd || time + duration > rangeStart;
  });
});

var getVisibleAnnotationsWithCoordinates = createSelector(function (state) {
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

var getSelectedAnnotation = createSelector(function (state) {
  return state.annotations.list;
}, function (state) {
  return state.annotations.selected;
}, function (annotationsList, selected) {
  return annotationsList.find(function (annotation) {
    return annotation.id === selected;
  });
});

var getSortedAnnotations = createSelector(function (state) {
  return state.annotations.list;
}, function (annotationsList) {
  return annotationsList.sort(function (a, b) {
    return a.time - b.time;
  });
});

export { getVisibleAnnotations, getVisibleAnnotationsWithCoordinates, getSelectedAnnotation, getSortedAnnotations };
//# sourceMappingURL=selectors/annotations.js.map
