import React, { Component, Fragment, StrictMode } from 'react';
import { createProvider, connect } from 'react-redux';
import { createStore } from 'redux';
import { STORE_KEY, SEGMENT_DURATION } from './constants.js';
import rootReducer from './reducers/index.js';
import EDFResource from './core/rangeResource.js';
import Cache from './core/exampleCache.js';
import Viewport from './components/Viewport/index.js';
import Scroller from './components/TransformScroller/index.js';
import Ruler from './components/Ruler/index.js';
import Plot from './components/Plot/index.js';
import Annotations from './components/Annotations/index.js';
import SelectedAnnotation from './components/SelectedAnnotation/index.js';
import ChannelsList from './components/ChannelsList/index.js';
import AnnotationsMinimap from './components/AnnotationsMinimap/index.js';
import CtrlClickCatcher from './components/CtrlClickCatcher/index.js';
import Cursor from './components/Cursor/index.js';
import './reducers/navigation.js';
import './actions/navigation.js';
import './actions/presentation.js';
import { setHeader } from './actions/header.js';
import { addDataSegment30s, removeDataSegment30s } from './actions/data.js';
import './actions/viewMode.js';
import './actions/annotations.js';
import './actions/annotationHistory.js';
import './reducers/presentation.js';
import './reducers/header.js';
import './reducers/data.js';
import './reducers/viewMode.js';
import './reducers/annotations.js';
import './reducers/annotationHistory.js';
import './workers/calculateCoordinates.js';
import './workers/calculateDerived.js';
import './selectors/viewMode.js';
import 'reselect';
import { getCurrentSegmentRange } from './selectors/navigation.js';
import './selectors/annotations.js';
import './core/edf/funnelBuffer.js';
import './core/edf/arrBuffer.js';
import './core/edf/edfHeader.js';
import './core/edf/edfStreamReader.js';
import './core/edf/edf.js';
import './core/deferred.js';
import './components/Plot/SegmentCanvas.js';

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

      _this.cached.getChunksAsync(SEGMENT_DURATION * currentSegmentRange[0], SEGMENT_DURATION * currentSegmentRange.length).then(function (data) {
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
            _this.props.dispatch(addDataSegment30s(i, data.slice(SEGMENT_DURATION * iInData, SEGMENT_DURATION * iInData + SEGMENT_DURATION)));
          } else if (iInData === -1 && rawValues[i]) {
            // ...otherwise, remove from store. That's essentially garbage
            // collecting.
            _this.props.dispatch(removeDataSegment30s(i));
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
      var edfResource = new EDFResource(source, options);

      edfResource.fetchHeader().then(function (header) {
        // 1. Get / set header and init cache
        if (process.env.NODE_ENV === 'development') {
          console.log('App:header', header);
        }
        _this2.cached = new Cache(edfResource, header);
        _this2.props.dispatch(setHeader(header));
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
      var children = this.props.children || React.createElement(
        Fragment,
        null,
        React.createElement(
          Scroller,
          null,
          React.createElement(Ruler, null),
          React.createElement(
            Viewport,
            null,
            React.createElement(Annotations, null),
            React.createElement(Plot, null),
            React.createElement(SelectedAnnotation, null)
          ),
          React.createElement(Cursor, null)
        ),
        React.createElement(CtrlClickCatcher, null),
        React.createElement(ChannelsList, null),
        React.createElement(AnnotationsMinimap, null)
      );

      return React.createElement(
        'div',
        { className: 'eegStudio' },
        children
      );
    }
  }]);

  return Studio;
}(Component);

var ConnectedStudio = connect(function mapStateToProps(state) {
  return {
    currentSegmentRange: getCurrentSegmentRange(state),
    data: state.data
  };
}, undefined, undefined, {
  storeKey: STORE_KEY,
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

var StudioProvider = createProvider(STORE_KEY);

var StudioWrapper = function (_Component2) {
  _inherits(StudioWrapper, _Component2);

  function StudioWrapper(props, context) {
    _classCallCheck(this, StudioWrapper);

    var _this3 = _possibleConstructorReturn(this, (StudioWrapper.__proto__ || Object.getPrototypeOf(StudioWrapper)).call(this, props, context));

    if (process.env.NODE_ENV === 'development') {
      if (props.store && context[STORE_KEY]) {
        console.error('EEG Studio is given both \'store\' prop, and \'' + STORE_KEY + '\' context (e.g. wrapped in relevant <Provider>). Choose only one way of connecting!');
      }
    }

    var passedStore = props.store || context[STORE_KEY];

    if (passedStore) {
      passedStore.replaceReducer(rootReducer);
      _this3.store = passedStore;
    } else {
      _this3.store = createStore(rootReducer);
    }
    return _this3;
  }

  _createClass(StudioWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _ = _props.store,
          otherProps = _objectWithoutProperties(_props, ['store']);

      return React.createElement(
        StrictMode,
        null,
        React.createElement(
          StudioProvider,
          { store: this.store },
          React.createElement(ConnectedStudio, otherProps)
        )
      );
    }
  }]);

  return StudioWrapper;
}(Component);

StudioWrapper.contextTypes = _defineProperty({}, STORE_KEY, function () {
  return null;
});

export default StudioWrapper;
//# sourceMappingURL=Studio.js.map
