import { combineReducers } from 'redux';
import navigationReducer from './navigation.js';
import presentationReducer from './presentation.js';
import headerReducer from './header.js';
import dataReducer from './data.js';
import viewModeReducer from './viewMode.js';
import annotationsReducer from './annotations.js';
import annotationHistoryReducer, { annotationHistoryNoopReducer } from './annotationHistory.js';
import calculateCoordinates from '../workers/calculateCoordinates.js';
import calculateDerived from '../workers/calculateDerived.js';
import { ADD_DATA_SEGMENT_30S, ADD_DERIVED_SEGMENT_30S, ADD_COORDINATES_SEGMENT_30S } from '../actions/data.js';
import { SET_SCROLLER_PARAMS, SET_VIEWPORT_PARAMS } from '../actions/presentation.js';
import { SET_VISIBLE_CHANNELS, SET_INPUT_MONTAGE, SET_BIPOLAR_MONTAGE, SET_DEFAULT_AMPLITUDE } from '../actions/viewMode.js';
import { getDerivedChannels } from '../selectors/viewMode.js';
import { getFileDuration } from '../selectors/navigation.js';
import '../actions/navigation.js';
import '../actions/header.js';
import '../actions/annotations.js';
import '../actions/annotationHistory.js';
import '../selectors/annotations.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var regularReducer = combineReducers({
  navigation: navigationReducer,
  presentation: presentationReducer,
  header: headerReducer,
  data: dataReducer,
  viewMode: viewModeReducer,
  annotations: annotationsReducer,
  annotationHistory: annotationHistoryNoopReducer
});

// TODO develop selectors to determine if recalc is needed.

// This full-state reducer manages dependencies for `data` slice of store. It
// does so in a synchronous manner.
function dataDependencyReducer(state, action) {
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case ADD_DATA_SEGMENT_30S:
      var newState = _extends({}, state);
      newState.data = _extends({}, newState.data);

      var rawSegment = payload.data;
      var derivedSegment = calculateDerived(rawSegment, state.header.signals, getDerivedChannels(state));
      var coordinatesSegment = calculateCoordinates(derivedSegment, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
      );

      newState.data.derivedValues[payload.index] = derivedSegment;
      newState.data.onScreenCoordinates[payload.index] = coordinatesSegment;

      return newState;

    case ADD_DERIVED_SEGMENT_30S:
      {
        var _newState = _extends({}, state);
        _newState.data = _extends({}, _newState.data);

        var _derivedSegment = payload.data;
        var _coordinatesSegment = calculateCoordinates(_derivedSegment, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
        );

        _newState.data.onScreenCoordinates[payload.index] = _coordinatesSegment;

        return _newState;
      }

    case SET_VISIBLE_CHANNELS:
    case SET_INPUT_MONTAGE:
    case SET_BIPOLAR_MONTAGE:
    case SET_DEFAULT_AMPLITUDE:
    case SET_SCROLLER_PARAMS:
    case SET_VIEWPORT_PARAMS:
      {
        // TODO Also - signals, viewportHeight, amplitude...
        var _newState2 = _extends({}, state);
        _newState2.data = _extends({}, _newState2.data);

        for (var i = 0; i < _newState2.data.onScreenCoordinates.length; i++) {
          if (!_newState2.data.onScreenCoordinates[i]) {
            continue;
          }

          var _derivedSegment2 = _newState2.data.derivedValues[i];
          var _coordinatesSegment2 = calculateCoordinates(_derivedSegment2, state.header.signals, state.presentation.viewportHeight / state.viewMode.visibleChannels.length, state.viewMode.channelDefaults.amplitude //TODO TODO
          );

          _newState2.data.onScreenCoordinates[i] = _coordinatesSegment2;
        }

        return _newState2;
      }

    case ADD_COORDINATES_SEGMENT_30S:
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
  var annotationHistoryState = annotationHistoryReducer(regularState, action);
  var dataDependenciesState = dataDependencyReducer(annotationHistoryState, action);

  var navigation = dataDependenciesState.navigation;

  var maxTime = getFileDuration(dataDependenciesState) - navigation.epochSize;
  navigation.currentTime = Math.max(0, Math.min(navigation.currentTime, maxTime));

  return dataDependenciesState;
}

export default rootReducer;
export { rootReducer, regularReducer };
//# sourceMappingURL=reducers/index.js.map
