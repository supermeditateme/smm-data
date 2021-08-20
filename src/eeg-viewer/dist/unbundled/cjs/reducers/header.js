'use strict';

var __chunk_4 = require('../actions/header.js');
require('../actions/navigation.js');
require('../actions/presentation.js');
require('../actions/data.js');
require('../actions/viewMode.js');
require('../actions/annotations.js');
require('../actions/annotationHistory.js');

var initialState = {};

function headerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case __chunk_4.SET_HEADER:
      newState = payload.header;
      break;
    default:
      break;
  }

  return newState;
}

exports.headerReducer = headerReducer;
exports.default = headerReducer;
//# sourceMappingURL=reducers/header.js.map
