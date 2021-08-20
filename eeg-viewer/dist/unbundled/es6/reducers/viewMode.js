import { SET_VISIBLE_CHANNELS, SET_INPUT_MONTAGE, SET_BIPOLAR_MONTAGE, SET_DEFAULT_AMPLITUDE, SELECT_CHANNEL } from '../actions/viewMode.js';
import { SET_HEADER } from '../actions/header.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bipolarNames = ['fp1-f7', 'f7-t3', 't3-t5', 't5-o1', 'fp1-f3', 'f3-c3', 'c3-p3', 'p3-o1', 'fz-cz', 'cz-pz', 'fp2-f4', 'f4-c4', 'c4-p4', 'p4-o2', 'fp2-f8', 'f8-t4', 't4-t6', 't6-o2']; // TODO move to common place, perhaps constants

var emotivChannels = ['AF3', 'F7', 'F3', 'FC5', 'T7', 'P7', 'O1', 'O2', 'P8', 'T8', 'FC6', 'F4', 'F8', 'AF4', 'GYROX', 'GYROY'];

var initialState = {
  channelDefaults: {
    amplitude: 0.25, // No real meaning, arbitrary multiplier
    inverted: false,
    frequencyFilter: null,
    displayAs: 'plot' // hmm...
  },
  perChannelSettings: {
    /*
    channelId: {
      amplitude
      inverted
      frequencyFilter
      ...etc
    }
    */
  },
  visibleChannels: [
  // string id
  ],
  inputChannels: [
    // This is a denormalized part of store. Get rid of it in the future.
    // string id
  ],
  userSpecifiedChannels: [
    // string formula (doubles as identifier)
  ]
};

function viewModeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;
  var type = action.type,
      payload = action.payload;


  switch (type) {
    case SET_HEADER:
      newState = _extends({}, state, {
        visibleChannels: payload.header.signals.filter(function (e) {return emotivChannels.includes(e.label)})
        .map(function (_ref) {
          var label = _ref.label;
          return label;
        }),
        inputChannels: payload.header.signals.filter(function (e) {return emotivChannels.includes(e.label)})
        .map(function (_ref2) {
          var label = _ref2.label;
          return label;
        })
      });
      break;

    case SET_VISIBLE_CHANNELS:
      newState = _extends({}, state, {
        visibleChannels: payload
      });
      break;

    case SET_INPUT_MONTAGE:
      newState = _extends({}, state, {
        visibleChannels: [].concat(_toConsumableArray(state.inputChannels))
      });
      break;

    case SET_BIPOLAR_MONTAGE:
      newState = _extends({}, state, {
        visibleChannels: [].concat(bipolarNames)
      });
      break;

    case SET_DEFAULT_AMPLITUDE:
      newState = _extends({}, state, {
        channelDefaults: _extends({}, state.channelDefaults, {
          amplitude: payload
        })
      });
      break;

    case SELECT_CHANNEL:
      newState = _extends({}, state, {
        perChannelSettings: _extends({}, state.perChannelSettings)
      });
      newState.perChannelSettings[payload] = newState.perChannelSettings[payload] || {};
      for (var channel in newState.perChannelSettings) {
        newState.perChannelSettings[channel].color = channel === payload ? '#00aeef' : 'black';
      }
      break;

    default:
      break;
  }

  return newState;
}

export default viewModeReducer;
export { viewModeReducer };
//# sourceMappingURL=reducers/viewMode.js.map
