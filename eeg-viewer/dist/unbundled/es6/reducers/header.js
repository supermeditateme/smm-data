import { SET_HEADER } from '../actions/header.js';
import '../actions/navigation.js';
import '../actions/presentation.js';
import '../actions/data.js';
import '../actions/viewMode.js';
import '../actions/annotations.js';
import '../actions/annotationHistory.js';

var initialState = {};

function headerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_HEADER:
      newState = payload.header;
      break;
    default:
      break;
  }

  return newState;
}

export default headerReducer;
export { headerReducer };
//# sourceMappingURL=reducers/header.js.map
