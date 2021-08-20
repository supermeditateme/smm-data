'use strict';

var SET_ANNOTATIONS = Symbol('SET_ANNOTATIONS');
var CREATE_ANNOTATION = Symbol('CREATE_ANNOTATION');
var SELECT_ANNOTATION = Symbol('SELECT_ANNOTATION');
var MODIFY_ANNOTATION = Symbol('MODIFY_ANNOTATION');
var DELETE_ANNOTATION = Symbol('DELETE_ANNOTATION');

function checkAnnotation(annotation) {
  if (!('id' in annotation && 'name' in annotation && 'time' in annotation && 'duration' in annotation)) {
    console.error('Invalid annotations!');
  }
}

function setAnnotations(annotationsList) {
  if (process.env.NODE_ENV === 'development') {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = annotationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var annotation = _step.value;

        checkAnnotation(annotation);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return {
    type: SET_ANNOTATIONS,
    payload: annotationsList
  };
}

function createAnnotation(annotation) {
  if (process.env.NODE_ENV === 'development') {
    checkAnnotation(annotation);
  }

  return {
    type: CREATE_ANNOTATION,
    payload: annotation
  };
}

function selectAnnotation(annotationId) {
  return {
    type: SELECT_ANNOTATION,
    payload: annotationId
  };
}

function modifyAnnotation(annotation) {
  if (process.env.NODE_ENV === 'development') {
    checkAnnotation(annotation);
  }

  return {
    type: MODIFY_ANNOTATION,
    payload: annotation
  };
}

function deleteAnnotation(annotationId) {
  return {
    type: DELETE_ANNOTATION,
    payload: annotationId
  };
}

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    SET_ANNOTATIONS: SET_ANNOTATIONS,
    CREATE_ANNOTATION: CREATE_ANNOTATION,
    SELECT_ANNOTATION: SELECT_ANNOTATION,
    MODIFY_ANNOTATION: MODIFY_ANNOTATION,
    DELETE_ANNOTATION: DELETE_ANNOTATION,

    setAnnotations: setAnnotations,
    createAnnotation: createAnnotation,
    selectAnnotation: selectAnnotation,
    modifyAnnotation: modifyAnnotation,
    deleteAnnotation: deleteAnnotation
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

exports.SET_ANNOTATIONS = SET_ANNOTATIONS;
exports.CREATE_ANNOTATION = CREATE_ANNOTATION;
exports.SELECT_ANNOTATION = SELECT_ANNOTATION;
exports.MODIFY_ANNOTATION = MODIFY_ANNOTATION;
exports.DELETE_ANNOTATION = DELETE_ANNOTATION;
exports.setAnnotations = setAnnotations;
exports.createAnnotation = createAnnotation;
exports.selectAnnotation = selectAnnotation;
exports.modifyAnnotation = modifyAnnotation;
exports.deleteAnnotation = deleteAnnotation;
//# sourceMappingURL=actions/annotations.js.map
