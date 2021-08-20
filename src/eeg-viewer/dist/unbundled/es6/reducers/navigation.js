import { SET_EPOCH_SIZE, SET_CURRENT_TIME, SOFT_SET_CURRENT_TIME, SHIFT_CURRENT_TIME } from '../actions/navigation.js';
import '../actions/presentation.js';
import '../actions/header.js';
import '../actions/data.js';
import '../actions/viewMode.js';
import '../actions/annotations.js';
import '../actions/annotationHistory.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  epochSize: 10,
  currentTime: 0 // Always seconds
};

var navigation = function navigation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_EPOCH_SIZE:
      return _extends({}, state, {
        epochSize: payload
      });
    case SET_CURRENT_TIME:
      return _extends({}, state, {
        currentTime: payload
      });
    case SOFT_SET_CURRENT_TIME:
      return payload < state.currentTime || payload >= state.currentTime + state.epochSize ? _extends({}, state, {
        currentTime: payload
      }) : state;
    case SHIFT_CURRENT_TIME:
      return _extends({}, state, {
        currentTime: state.currentTime + payload
      });
    default:
      return state;
  }
};

export default navigation;
//# sourceMappingURL=reducers/navigation.js.map
