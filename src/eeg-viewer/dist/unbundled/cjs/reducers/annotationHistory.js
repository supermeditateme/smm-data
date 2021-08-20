'use strict';

var __chunk_7 = require('../actions/annotations.js');
var __chunk_8 = require('../actions/annotationHistory.js');

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
    case __chunk_7.SET_ANNOTATIONS:
    case __chunk_7.CREATE_ANNOTATION:
    //case SELECT_ANNOTATION:
    case __chunk_7.MODIFY_ANNOTATION:
    case __chunk_7.DELETE_ANNOTATION:
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

    case __chunk_8.ANNOTATION_HISTORY_UNDO:
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

    case __chunk_8.ANNOTATION_HISTORY_REDO:
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

exports.annotationHistoryNoopReducer = annotationHistoryNoopReducer;
exports.annotationHistoryReducer = annotationHistoryReducer;
exports.default = annotationHistoryReducer;
//# sourceMappingURL=reducers/annotationHistory.js.map
