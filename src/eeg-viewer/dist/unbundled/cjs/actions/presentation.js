'use strict';

var SET_SCROLLER_PARAMS = Symbol('SET_SCROLLER_PARAMS');
var SET_VIEWPORT_PARAMS = Symbol('SET_VIEWPORT_PARAMS');

var setScrollerParams = function setScrollerParams(scrollerParams) {
  return {
    type: SET_SCROLLER_PARAMS,
    payload: scrollerParams
  };
};

var setViewportParams = function setViewportParams(viewportHeight) {
  return {
    type: SET_VIEWPORT_PARAMS,
    payload: viewportHeight
  };
};

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    SET_SCROLLER_PARAMS: SET_SCROLLER_PARAMS,
    SET_VIEWPORT_PARAMS: SET_VIEWPORT_PARAMS,

    setScrollerParams: setScrollerParams,
    setViewportParams: setViewportParams
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

exports.SET_SCROLLER_PARAMS = SET_SCROLLER_PARAMS;
exports.SET_VIEWPORT_PARAMS = SET_VIEWPORT_PARAMS;
exports.setScrollerParams = setScrollerParams;
exports.setViewportParams = setViewportParams;
//# sourceMappingURL=actions/presentation.js.map
