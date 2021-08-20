'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var redux = require('redux');
var __chunk_1 = require('./constants.js');
var __chunk_23 = require('./reducers/index.js');
var __chunk_30 = require('./core/rangeResource.js');
var __chunk_31 = require('./core/exampleCache.js');
var __chunk_32 = require('./components/Viewport/index.js');
var __chunk_33 = require('./components/TransformScroller/index.js');
var __chunk_34 = require('./components/Ruler/index.js');
var __chunk_36 = require('./components/Plot/index.js');
var __chunk_37 = require('./components/Annotations/index.js');
var __chunk_38 = require('./components/SelectedAnnotation/index.js');
var __chunk_39 = require('./components/ChannelsList/index.js');
var __chunk_40 = require('./components/AnnotationsMinimap/index.js');
var __chunk_41 = require('./components/CtrlClickCatcher/index.js');
var __chunk_42 = require('./components/Cursor/index.js');
require('./reducers/navigation.js');
require('./actions/navigation.js');
require('./actions/presentation.js');
var __chunk_4 = require('./actions/header.js');
var __chunk_5 = require('./actions/data.js');
require('./actions/viewMode.js');
require('./actions/annotations.js');
require('./actions/annotationHistory.js');
require('./reducers/presentation.js');
require('./reducers/header.js');
require('./reducers/data.js');
require('./reducers/viewMode.js');
require('./reducers/annotations.js');
require('./reducers/annotationHistory.js');
require('./workers/calculateCoordinates.js');
require('./workers/calculateDerived.js');
require('./selectors/viewMode.js');
require('reselect');
var __chunk_17 = require('./selectors/navigation.js');
require('./selectors/annotations.js');
require('./core/edf/funnelBuffer.js');
require('./core/edf/arrBuffer.js');
require('./core/edf/edfHeader.js');
require('./core/edf/edfStreamReader.js');
require('./core/edf/edf.js');
require('./core/deferred.js');
require('./components/Plot/SegmentCanvas.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Array equality helper function.
// Nothing fancy, no support for nested arrays (we don't need it).
function equalArrays(arr1, arr2) {
  var i = arr1.length;
  if (i !== arr2.length) {
    return false;
  }

  while (i--) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

var Studio = function (_Component) {
  _inherits(Studio, _Component);

  function Studio(props) {
    _classCallCheck(this, Studio);

    var _this = _possibleConstructorReturn(this, (Studio.__proto__ || Object.getPrototypeOf(Studio)).call(this, props));

    _this.handleSegmentChange = function () {
      if (!_this.cached) {
        console.warn('Cache not initialized yet; ignoring update.');
        return;
      }

      // Store segmentRange at the start of the request.
      var currentSegmentRange = _this.props.currentSegmentRange;

      _this.cached.getChunksAsync(__chunk_1.SEGMENT_DURATION * currentSegmentRange[0], __chunk_1.SEGMENT_DURATION * currentSegmentRange.length).then(function (data) {
        // Check - segmentRange might have changed (e.g. due to user navigation)
        // while we were fetching data from cache. In this case, discard data
        // altogether; there was more recent cache call, it will put proper
        // data to the store.
        //
        // This is not optimal - we might arrange to put to store those parts
        // of data which *are* in the current segment range. But in this case
        // deletion becomes a huge problem, so we avoid this, until much
        // more robust solution is designed.
        var newerSegmentRange = _this.props.currentSegmentRange;
        if (!equalArrays(newerSegmentRange, currentSegmentRange)) {
          console.warn('Segment range has changed while getting data; data discarded');
          return;
        }

        var rawValues = _this.props.data.rawValues;

        for (var i = 0; i < rawValues.length; i++) {
          var iInData = currentSegmentRange.indexOf(i);
          if (iInData !== -1 && !rawValues[i]) {
            // Add segment to store if we received it from resource/cache and
            // don't have it in store already...
            _this.props.dispatch(__chunk_5.addDataSegment30s(i, data.slice(__chunk_1.SEGMENT_DURATION * iInData, __chunk_1.SEGMENT_DURATION * iInData + __chunk_1.SEGMENT_DURATION)));
          } else if (iInData === -1 && rawValues[i]) {
            // ...otherwise, remove from store. That's essentially garbage
            // collecting.
            _this.props.dispatch(__chunk_5.removeDataSegment30s(i));
          }
        }
      });
    };

    _this.cached = null;
    return _this;
  }

  // handleSegmentChange() implementation depends on the assumption that it's not
  // debounced or throttled.


  _createClass(Studio, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var source = { url: this.props.url };
      var options = typeof this.props.fetch === 'function' ? { fetch: this.props.fetch } : undefined;
      var edfResource = new __chunk_30.default(source, options);

      edfResource.fetchHeader().then(function (header) {
        // 1. Get / set header and init cache
        if (process.env.NODE_ENV === 'development') {
          console.log('App:header', header);
        }
        _this2.cached = new __chunk_31.default(edfResource, header);
        _this2.props.dispatch(__chunk_4.setHeader(header));
      }).then(function () {
        // 2. Ask for whatever data we need
        _this2.handleSegmentChange();
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleSegmentChange();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cached && this.cached.destroy();
      this.cached = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children || React__default.createElement(
        React.Fragment,
        null,
        React__default.createElement(
          __chunk_33.default,
          null,
          React__default.createElement(__chunk_34.default, null),
          React__default.createElement(
            __chunk_32.default,
            null,
            React__default.createElement(__chunk_37.default, null),
            React__default.createElement(__chunk_36.default, {"height":800, "visibleChannels": ["AF3"]}),
            React__default.createElement(__chunk_38.default, null)
          ),
          React__default.createElement(__chunk_42.default, null)
        ),
        React__default.createElement(__chunk_41.default, null),
        React__default.createElement(__chunk_39.default, null),
        React__default.createElement(__chunk_40.default, null)
      );

      return React__default.createElement(
        'div',
        { className: 'eegStudio' },
        children
      );
    }
  }]);

  return Studio;
}(React.Component);

var ConnectedStudio = reactRedux.connect(function mapStateToProps(state) {
  return {
    currentSegmentRange: __chunk_17.getCurrentSegmentRange(state),
    data: state.data
  };
}, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY,
  areStatePropsEqual: function areStatePropsEqual(next, prev) {
    // We only care about segmentRange updates.
    return equalArrays(next.currentSegmentRange, prev.currentSegmentRange);
  }
})(Studio);

// <StudioWrapper> component makes using <Studio> easier from outside.
//
// You can either pass store to it directly, or have it connected automatically
// to existing (properly-keyed) Provider. Will not interfere with the 'main'
// redux store of an outside app, if it has any.

var StudioProvider = reactRedux.createProvider(__chunk_1.STORE_KEY);

var StudioWrapper = function (_Component2) {
  _inherits(StudioWrapper, _Component2);

  function StudioWrapper(props, context) {
    _classCallCheck(this, StudioWrapper);

    var _this3 = _possibleConstructorReturn(this, (StudioWrapper.__proto__ || Object.getPrototypeOf(StudioWrapper)).call(this, props, context));

    if (process.env.NODE_ENV === 'development') {
      if (props.store && context[__chunk_1.STORE_KEY]) {
        console.error('EEG Studio is given both \'store\' prop, and \'' + __chunk_1.STORE_KEY + '\' context (e.g. wrapped in relevant <Provider>). Choose only one way of connecting!');
      }
    }

    var passedStore = props.store || context[__chunk_1.STORE_KEY];

    if (passedStore) {
      passedStore.replaceReducer(__chunk_23.default);
      _this3.store = passedStore;
    } else {
      _this3.store = redux.createStore(__chunk_23.default);
    }
    return _this3;
  }

  _createClass(StudioWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _ = _props.store,
          otherProps = _objectWithoutProperties(_props, ['store']);

      return React__default.createElement(
        React.StrictMode,
        null,
        React__default.createElement(
          StudioProvider,
          { store: this.store },
          React__default.createElement(ConnectedStudio, otherProps)
        )
      );
    }
  }]);

  return StudioWrapper;
}(React.Component);

StudioWrapper.contextTypes = _defineProperty({}, __chunk_1.STORE_KEY, function () {
  return null;
});

module.exports = StudioWrapper;
//# sourceMappingURL=Studio.js.map
