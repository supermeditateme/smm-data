'use strict';

var __chunk_5 = require('../actions/data.js');
var __chunk_4 = require('../actions/header.js');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  rawValues: [],
  derivedValues: [],
  onScreenCoordinates: []
};

function dataReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = void 0;
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case __chunk_4.SET_HEADER:
      // When header changes, we invalidate all our data.
      var size = Math.ceil(payload.header.dataRecordsNumber * payload.header.dataRecordDuration / 30);
      newState = {
        rawValues: new Array(size).fill(null),
        derivedValues: new Array(size).fill(null),
        onScreenCoordinates: new Array(size).fill(null)
      };
      return newState;

    case __chunk_5.ADD_DATA_SEGMENT_30S:
      if (process.env.NODE_ENV === 'development') {
        checkSegmentPayload(payload, state.rawValues.length);
      }

      newState = _extends({}, state);
      newState.rawValues[payload.index] = payload.data;

      return newState;

    case __chunk_5.REMOVE_DATA_SEGMENT_30S:
      newState = _extends({}, state);
      newState.rawValues[payload.index] = null;
      newState.derivedValues[payload.index] = null;
      newState.onScreenCoordinates[payload.index] = null;
      return newState;

    case __chunk_5.ADD_DERIVED_SEGMENT_30S:
      if (process.env.NODE_ENV === 'development') {
        checkSegmentPayload(payload, state.rawValues.length);
      }

      newState = _extends({}, state);
      newState.derivedValues[payload.index] = payload.data;
      if (process.env.NODE_ENV === 'development') {
        if (!newState.rawValues[payload.index]) {
          console.warn('Setting derived values when raw values are not present; this may be the sign of a bug');
        }
      }
      return newState;

    case __chunk_5.ADD_COORDINATES_SEGMENT_30S:
      if (process.env.NODE_ENV === 'development') {
        checkSegmentPayload(payload, state.rawValues.length);
      }

      newState = _extends({}, state);
      newState.onScreenCoordinates[payload.index] = payload.data;
      if (process.env.NODE_ENV === 'development') {
        if (!newState.rawValues[payload.index] || !newState.derivedValues[payload.index]) {
          console.warn('Setting coordinates values when raw values and/or derived values are not present; this may be the sign of a bug');
        }
      }
      return newState;

    default:
      return state;
  }
}

function checkSegmentPayload(payload, len) {
  if (payload.index >= len) {
    console.warn('Payload index out of range!');
  }
  if (!payload.data) {
    console.warn('No payload data!');
  }
}

exports.default = dataReducer;
//# sourceMappingURL=reducers/data.js.map
