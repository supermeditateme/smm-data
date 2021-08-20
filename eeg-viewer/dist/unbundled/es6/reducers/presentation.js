import { SET_SCROLLER_PARAMS, SET_VIEWPORT_PARAMS } from '../actions/presentation.js';
import '../actions/navigation.js';
import '../actions/header.js';
import '../actions/data.js';
import '../actions/viewMode.js';
import '../actions/annotations.js';
import '../actions/annotationHistory.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  scrollerWidth: 1, // Pixels
  viewportHeight: 1, // Pixels
  scrollerXPosition: 0 // Pixels
};

var presentation = function presentation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_SCROLLER_PARAMS:
      return _extends({}, state, payload);
    case SET_VIEWPORT_PARAMS:
      return _extends({}, state, {
        viewportHeight: payload
      });
    default:
      return state;
  }
};

export default presentation;
//# sourceMappingURL=reducers/presentation.js.map
