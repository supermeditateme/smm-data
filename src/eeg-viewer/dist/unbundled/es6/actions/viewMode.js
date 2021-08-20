var SET_VISIBLE_CHANNELS = Symbol('SET_VISIBLE_CHANNELS');
var SET_INPUT_MONTAGE = Symbol('SET_INPUT_MONTAGE');
var SET_BIPOLAR_MONTAGE = Symbol('SET_BIPOLAR_MONTAGE');
var SET_DEFAULT_AMPLITUDE = Symbol('SET_DEFAULT_AMPLITUDE');
var SELECT_CHANNEL = Symbol('SELECT_CHANNEL');

function setVisibleChannels(channelsList) {
  return {
    type: SET_VISIBLE_CHANNELS,
    payload: channelsList
  };
}

function setInputMontage() {
  return {
    type: SET_INPUT_MONTAGE
  };
}

function setBipolarMontage() {
  return {
    type: SET_BIPOLAR_MONTAGE
  };
}

function setDefaultAmplitude(amplitude) {
  return {
    type: SET_DEFAULT_AMPLITUDE,
    payload: amplitude
  };
}

function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    payload: channel
  };
}

// Define what should escape rollup tree-shaking, since we package preserved
// file structure to npm.
//
// NODE_ENV condition is for consumer app: it should be able to tree-shake
// whatever it wants.
if (process.env.NODE_ENV === 'development') {
  var externalAPI = {
    SET_VISIBLE_CHANNELS: SET_VISIBLE_CHANNELS,
    SET_INPUT_MONTAGE: SET_INPUT_MONTAGE,
    SET_BIPOLAR_MONTAGE: SET_BIPOLAR_MONTAGE,
    SET_DEFAULT_AMPLITUDE: SET_DEFAULT_AMPLITUDE,
    SELECT_CHANNEL: SELECT_CHANNEL,

    setVisibleChannels: setVisibleChannels,
    setInputMontage: setInputMontage,
    setBipolarMontage: setBipolarMontage,
    setDefaultAmplitude: setDefaultAmplitude,
    selectChannel: selectChannel
  };

  window && window['This function does not exits'] && window['This function does not exits'](externalAPI);
}

export { SET_VISIBLE_CHANNELS, SET_INPUT_MONTAGE, SET_BIPOLAR_MONTAGE, SET_DEFAULT_AMPLITUDE, SELECT_CHANNEL, setVisibleChannels, setInputMontage, setBipolarMontage, setDefaultAmplitude, selectChannel };
//# sourceMappingURL=actions/viewMode.js.map
