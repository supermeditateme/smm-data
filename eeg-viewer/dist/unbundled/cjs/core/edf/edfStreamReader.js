'use strict';

var __chunk_27 = require('./edf.js');
var __chunk_24 = require('./funnelBuffer.js');
var __chunk_25 = require('./arrBuffer.js');

// Source can be either Response object supporting Stream API, or ArrayBuffer
function reader(source, callback, header) {
  var stream = void 0;

  switch (true) {
    case 'ReadableStream' in window && source instanceof ReadableStream:
      stream = new __chunk_24.default(source.getReader());
      break;
    case source instanceof ArrayBuffer:
      stream = new __chunk_25.default(new Uint8Array(source));
      break;
    default:
      throw new Error('Unsupported source for edfStreamReader');
      break;
  }

  var index = 0;

  return new __chunk_27.default(stream, header).then(function (edf) {
    var total = edf.header.dataRecordsNumber;

    edf.readDataRecords(function (dataRecord) {
      callback(dataRecord, index, total, edf.header);
      index += 1;
    });

    return edf.header;
  });
}

exports.default = reader;
//# sourceMappingURL=core/edf/edfStreamReader.js.map
