'use strict';

var redux = require('redux');
var __chunk_10 = require('./navigation.js');
var __chunk_11 = require('./presentation.js');
var __chunk_12 = require('./header.js');
var __chunk_13 = require('./data.js');
var __chunk_14 = require('./viewMode.js');
var __chunk_15 = require('./annotations.js');
var __chunk_16 = require('./annotationHistory.js');
var __chunk_21 = require('../workers/calculateCoordinates.js');
var __chunk_22 = require('../workers/calculateDerived.js');
var __chunk_5 = require('../actions/data.js');
var __chunk_3 = require('../actions/presentation.js');
var __chunk_6 = require('../actions/viewMode.js');
var __chunk_18 = require('../selectors/viewMode.js');
var __chunk_17 = require('../selectors/navigation.js');
require('../actions/navigation.js');
require('../actions/header.js');
require('../actions/annotations.js');
require('../actions/annotationHistory.js');
require('../selectors/annotations.js');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var regularReducer = redux.combineReducers({
  navigation: __chunk_10.default,
  presentation: __chunk_11.default,
  header: __chunk_12.default,
  data: __chunk_13.default,
  viewMode: __chunk_14.default,
  annotations: __chunk_15.default,
  annotationHistory: __chunk_16.annotationHistoryNoopReducer
});

// TODO develop selectors to determine if recalc is needed.

// This full-state reducer manages dependencies for `data` slice of store. It
// does so in a synchronous manner.
function dataDependencyReducer(state, action) {
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case __chunk_5.ADD_DATA_SEGMENT_30S:
      var newState = _extends({}, state);
      newState.data = _extends({}, newState.data);

      var rawSegment = payload.data;
      var derivedSegment = __chunk_22.default(rawSegment, state.header.signals, __chunk_18.getDerivedChannels(state));
      var coordinatesSegment = __chunk_21.default(derivedSegment, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
      );

      newState.data.derivedValues[payload.index] = derivedSegment;
      newState.data.onScreenCoordinates[payload.index] = coordinatesSegment;

      return newState;

    case __chunk_5.ADD_DERIVED_SEGMENT_30S:
      {
        var _newState = _extends({}, state);
        _newState.data = _extends({}, _newState.data);

        var _derivedSegment = payload.data;
        var _coordinatesSegment = __chunk_21.default(_derivedSegment, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
        );

        _newState.data.onScreenCoordinates[payload.index] = _coordinatesSegment;

        return _newState;
      }

    case __chunk_6.SET_VISIBLE_CHANNELS:
    case __chunk_6.SET_INPUT_MONTAGE:
    case __chunk_6.SET_BIPOLAR_MONTAGE:
    case __chunk_6.SET_DEFAULT_AMPLITUDE:
    case __chunk_3.SET_SCROLLER_PARAMS:
    case __chunk_3.SET_VIEWPORT_PARAMS:
      {
        // TODO Also - signals, viewportHeight, amplitude...
        var _newState2 = _extends({}, state);
        _newState2.data = _extends({}, _newState2.data);

        for (var i = 0; i < _newState2.data.onScreenCoordinates.length; i++) {
          if (!_newState2.data.onScreenCoordinates[i]) {
            continue;
          }

          var _derivedSegment2 = _newState2.data.derivedValues[i];
          var _coordinatesSegment2 = __chunk_21.default(_derivedSegment2, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
          );

          _newState2.data.onScreenCoordinates[i] = _coordinatesSegment2;
        }

        return _newState2;
      }

    case __chunk_5.ADD_COORDINATES_SEGMENT_30S:
      // Do nothing; coordinates data added in regularReducer, and no other data
      // depends on it.
      return state;

    default:
      return state;
  }
}

// This default reducer combines data deps calculation and other, non-related
// complex actions like guarding against out-of-bounds navigation.
function rootReducer(state, action) {
  var regularState = regularReducer(state, action);
  var annotationHistoryState = __chunk_16.default(regularState, action);
  var dataDependenciesState = dataDependencyReducer(annotationHistoryState, action);

  var navigation = dataDependenciesState.navigation;

  var maxTime = __chunk_17.getFileDuration(dataDependenciesState) - navigation.epochSize;
  navigation.currentTime = Math.max(0, Math.min(navigation.currentTime, maxTime));

  return dataDependenciesState;
}

exports.rootReducer = rootReducer;
exports.regularReducer = regularReducer;
exports.default = rootReducer;
//# sourceMappingURL=reducers/index.js.map
