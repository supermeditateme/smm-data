import { SET_ANNOTATIONS, CREATE_ANNOTATION, MODIFY_ANNOTATION, DELETE_ANNOTATION } from '../actions/annotations.js';
import { ANNOTATION_HISTORY_UNDO, ANNOTATION_HISTORY_REDO } from '../actions/annotationHistory.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  log: [],
  index: -1
};

function annotationHistoryNoopReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  return state;
}

// Full-state reducer
function annotationHistoryReducer(state, action) {
  var newState = state;
  var annotationsCopy = void 0;
  var type = action.type;
  var annotationHistory = state.annotationHistory;
  var log = annotationHistory.log,
      index = annotationHistory.index;


  switch (type) {
    case SET_ANNOTATIONS:
    case CREATE_ANNOTATION:
    //case SELECT_ANNOTATION:
    case MODIFY_ANNOTATION:
    case DELETE_ANNOTATION:
      annotationsCopy = {
        list: state.annotations.list.slice(),
        selected: state.annotations.selected
      };

      newState = _extends({}, state, {
        annotationHistory: {
          log: log.slice(0, index + 1).concat(annotationsCopy),
          index: index + 1
        }
      });
      break;

    case ANNOTATION_HISTORY_UNDO:
      if (index <= 0) {
        break;
      }

      annotationsCopy = log[index - 1];

      newState = _extends({}, state, {
        annotations: annotationsCopy,
        annotationHistory: {
          log: log,
          index: index - 1
        }
      });
      break;

    case ANNOTATION_HISTORY_REDO:
      if (index >= log.length - 1) {
        break;
      }

      annotationsCopy = log[index + 1];

      newState = _extends({}, state, {
        annotations: annotationsCopy,
        annotationHistory: {
          log: log,
          index: index + 1
        }
      });
      break;

    default:
      break;
  }

  return newState;
}

export default annotationHistoryReducer;
export { annotationHistoryNoopReducer, annotationHistoryReducer };
//# sourceMappingURL=reducers/annotationHistory.js.map
