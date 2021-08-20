var ANNOTATION_HISTORY_UNDO = Symbol('ANNOTATION_HISTORY_UNDO');
var ANNOTATION_HISTORY_REDO = Symbol('ANNOTATION_HISTORY_REDO');

function annotationHistoryUndo() {
  return {
    type: ANNOTATION_HISTORY_UNDO,
    payload: null
  };
}

function annotationHistoryRedo() {
  return {
    type: ANNOTATION_HISTORY_REDO,
    payload: null
  };
}

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    ANNOTATION_HISTORY_UNDO: ANNOTATION_HISTORY_UNDO,
    ANNOTATION_HISTORY_REDO: ANNOTATION_HISTORY_REDO,

    annotationHistoryUndo: annotationHistoryUndo,
    annotationHistoryRedo: annotationHistoryRedo
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

export { ANNOTATION_HISTORY_UNDO, ANNOTATION_HISTORY_REDO, annotationHistoryUndo, annotationHistoryRedo };
//# sourceMappingURL=actions/annotationHistory.js.map
