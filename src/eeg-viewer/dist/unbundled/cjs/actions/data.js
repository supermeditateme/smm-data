'use strict';

var ADD_DATA_SEGMENT_30S = Symbol('ADD_DATA_SEGMENT_30S');
var ADD_DERIVED_SEGMENT_30S = Symbol('ADD_DERIVED_SEGMENT_30S');
// prettier-ignore
var ADD_COORDINATES_SEGMENT_30S = Symbol('ADD_COORDINATES_SEGMENT_30S');
var REMOVE_DATA_SEGMENT_30S = Symbol('REMOVE_DATA_SEGMENT_30S');

function addDataSegment30s(index, data) {
  return {
    type: ADD_DATA_SEGMENT_30S,
    payload: { index: index, data: data }
  };
}

function addDerivedSegment30s(index, data) {
  return {
    type: ADD_DERIVED_SEGMENT_30S,
    payload: { index: index, data: data }
  };
}

function addCoordinatesSegment30s(index, data) {
  return {
    type: ADD_COORDINATES_SEGMENT_30S,
    payload: { index: index, data: data }
  };
}

function removeDataSegment30s(index) {
  return {
    type: REMOVE_DATA_SEGMENT_30S,
    payload: { index: index }
  };
}

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    ADD_DATA_SEGMENT_30S: ADD_DATA_SEGMENT_30S,
    ADD_DERIVED_SEGMENT_30S: ADD_DERIVED_SEGMENT_30S,
    ADD_COORDINATES_SEGMENT_30S: ADD_COORDINATES_SEGMENT_30S,
    REMOVE_DATA_SEGMENT_30S: REMOVE_DATA_SEGMENT_30S,

    addDataSegment30s: addDataSegment30s,
    addDerivedSegment30s: addDerivedSegment30s,
    addCoordinatesSegment30s: addCoordinatesSegment30s,
    removeDataSegment30s: removeDataSegment30s
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

exports.ADD_DATA_SEGMENT_30S = ADD_DATA_SEGMENT_30S;
exports.ADD_DERIVED_SEGMENT_30S = ADD_DERIVED_SEGMENT_30S;
exports.ADD_COORDINATES_SEGMENT_30S = ADD_COORDINATES_SEGMENT_30S;
exports.REMOVE_DATA_SEGMENT_30S = REMOVE_DATA_SEGMENT_30S;
exports.addDataSegment30s = addDataSegment30s;
exports.addDerivedSegment30s = addDerivedSegment30s;
exports.addCoordinatesSegment30s = addCoordinatesSegment30s;
exports.removeDataSegment30s = removeDataSegment30s;
//# sourceMappingURL=actions/data.js.map
