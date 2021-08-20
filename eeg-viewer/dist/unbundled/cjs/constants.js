'use strict';

// Redux store key, used to connect top-level library components to store.
var STORE_KEY = 'EEGStudio';

// How many seconds in the segment. Not the same as epoch; purely internal.
var SEGMENT_DURATION = 30;

// How many segments we pre-load, pre-calculate and pre-render.
var PRELOAD_SEGMENTS = 5;

exports.STORE_KEY = STORE_KEY;
exports.SEGMENT_DURATION = SEGMENT_DURATION;
exports.PRELOAD_SEGMENTS = PRELOAD_SEGMENTS;
//# sourceMappingURL=constants.js.map
