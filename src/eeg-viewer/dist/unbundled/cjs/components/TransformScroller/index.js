'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var __chunk_1 = require('../../constants.js');
var __chunk_17 = require('../../selectors/navigation.js');
var __chunk_2 = require('../../actions/navigation.js');
var __chunk_3 = require('../../actions/presentation.js');
require('../../selectors/viewMode.js');
require('../../selectors/annotations.js');
require('../../actions/header.js');
require('../../actions/data.js');
require('../../actions/viewMode.js');
require('../../actions/annotations.js');
require('../../actions/annotationHistory.js');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransformScroller = function (_PureComponent) {
  _inherits(TransformScroller, _PureComponent);

  function TransformScroller() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TransformScroller);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TransformScroller.__proto__ || Object.getPrototypeOf(TransformScroller)).call.apply(_ref, [this].concat(args))), _this), _this.resizeHandler = function () {
      _this.props.dispatch(__chunk_3.setScrollerParams({
        scrollerWidth: _this.scroller.offsetWidth,
        scrollerXPosition: _this.scroller.getBoundingClientRect().x
      }));
    }, _this.scrollHandler = function (e) {
      var _this$props = _this.props,
          epochSize = _this$props.navigation.epochSize,
          scrollerWidth = _this$props.presentation.scrollerWidth;


      var delta = e.deltaX || e.deltaY;

      if (e.deltaMode === 1) {
        // DOM_DELTA_LINE mode of scrolling; currently only Firefox does that
        // see https://github.com/cubiq/iscroll/issues/577#issuecomment-49095332

        delta *= 20; // Just rule-of-thumb value.
      }

      var direction = -1;

      var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
      if (macosPlatforms.includes(window.navigator.platform)) {
        direction = 1;
      }

      var time = direction * delta * epochSize / scrollerWidth;

      _this.props.dispatch(__chunk_2.shiftCurrentTime(time));
    }, _this.onKeyDown = function (e) {
      var epochSize = _this.props.navigation.epochSize;


      var direction = null;
      if (e.key === 'ArrowRight') {
        direction = 1;
      } else if (e.key === 'ArrowLeft') {
        direction = -1;
      }
      if (direction === null) return;

      var duration = epochSize;
      if (e.shiftKey) duration = 10;
      if (e.ctrlKey) duration = 1;
      if (e.shiftKey && e.ctrlKey) duration = 30;

      _this.props.dispatch(__chunk_2.shiftCurrentTime(duration * direction));
    }, _this.onMouseOver = function () {
      return _this.scroller.matches(':focus-within') || _this.scroller.focus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TransformScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          currentTime = _props.navigation.currentTime;


      this.resizeHandler();
      dispatch(__chunk_2.setCurrentTime(currentTime));

      window.addEventListener('resize', this.resizeHandler, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandler, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React__default.createElement(
        'div',
        {
          className: 'scroller  scroller__transform',
          onWheel: this.scrollHandler,
          onMouseOver: this.onMouseOver,
          ref: function ref(el) {
            return _this2.scroller = el;
          },
          tabIndex: '0',
          onKeyDown: this.onKeyDown
        },
        React__default.createElement(
          'div',
          {
            style: {
              transform: 'translateX(' + -this.props.currentPosition + 'px)'
            }
          },
          this.props.children
        )
      );
    }
  }]);

  return TransformScroller;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return _extends({}, state, {
    currentPosition: __chunk_17.getCurrentPosition(state),
    fileDuration: __chunk_17.getFileDuration(state)
  });
};

var Scroller = reactRedux.connect(mapStateToProps, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(TransformScroller);

exports.default = Scroller;
//# sourceMappingURL=components/TransformScroller/index.js.map
