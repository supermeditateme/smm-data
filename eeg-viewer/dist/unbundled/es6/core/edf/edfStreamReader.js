import Edf from './edf.js';
import FunnelBuffer from './funnelBuffer.js';
import ArrBuffer from './arrBuffer.js';

// Source can be either Response object supporting Stream API, or ArrayBuffer
function reader(source, callback, header) {
  var stream = void 0;

  switch (true) {
    case 'ReadableStream' in window && source instanceof ReadableStream:
      stream = new FunnelBuffer(source.getReader());
      break;
    case source instanceof ArrayBuffer:
      stream = new ArrBuffer(new Uint8Array(source));
      break;
    default:
      throw new Error('Unsupported source for edfStreamReader');
      break;
  }

  var index = 0;

  return new Edf(stream, header).then(function (edf) {
    var total = edf.header.dataRecordsNumber;

    edf.readDataRecords(function (dataRecord) {
      callback(dataRecord, index, total, edf.header);
      index += 1;
    });

    return edf.header;
  });
}

export default reader;
//# sourceMappingURL=core/edf/edfStreamReader.js.map
