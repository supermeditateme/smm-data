import { SET_ANNOTATIONS, CREATE_ANNOTATION, SELECT_ANNOTATION, MODIFY_ANNOTATION, DELETE_ANNOTATION } from '../actions/annotations.js';
import '../actions/navigation.js';
import '../actions/presentation.js';
import '../actions/header.js';
import '../actions/data.js';
import '../actions/viewMode.js';
import '../actions/annotationHistory.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  list: [], // { id, time, duration, name } and optionally { cssClass } ( used in minimap too )
  selected: null // Just an id. Use selector `getVisibleAnnotations`
};

function annotationsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_ANNOTATIONS:
      newState = _extends({}, state, {
        list: payload
      });
      // New list? Remove selection.
      if (payload !== state.list) {
        newState.selected = null;
      }
      break;

    case CREATE_ANNOTATION:
      if (process.env.NODE_ENV === 'development') {
        if (state.list.find(function (annotation) {
          return annotation.id === payload.id;
        })) {
          console.warn('Trying to create annotation with same id as one of existing annotations!');
        }
      }

      newState = _extends({}, state, {
        list: state.list.concat(payload)
      });
      break;

    case SELECT_ANNOTATION:
      newState = _extends({}, state, {
        selected: payload
      });
      break;

    case MODIFY_ANNOTATION:
      if (process.env.NODE_ENV === 'development') {
        if (!state.list.find(function (annotation) {
          return annotation.id === payload.id;
        })) {
          console.warn('Trying to modify non-existent annotation!');
        }
      }

      newState = _extends({}, state, {
        list: state.list.map(function (annotation) {
          return annotation.id === payload.id ? payload : annotation;
        })
      });
      break;

    case DELETE_ANNOTATION:
      if (process.env.NODE_ENV === 'development') {
        if (!state.list.find(function (annotation) {
          return annotation.id === payload;
        })) {
          console.warn('Trying to delete non-existent annotation!');
        }
      }

      newState = _extends({}, state, {
        list: state.list.filter(function (annotation) {
          return annotation.id !== payload;
        })
      });
      break;

    default:
      break;
  }

  return newState;
}

export default annotationsReducer;
export { annotationsReducer };
//# sourceMappingURL=reducers/annotations.js.map
