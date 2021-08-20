var SET_HEADER = Symbol('SET_HEADER');

function setHeader(header) {
  return {
    type: SET_HEADER,
    payload: { header: header }
  };
}

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    SET_HEADER: SET_HEADER,

    setHeader: setHeader
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

export { SET_HEADER, setHeader };
//# sourceMappingURL=actions/header.js.map
