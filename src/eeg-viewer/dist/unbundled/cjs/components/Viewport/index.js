'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var __chunk_1 = require('../../constants.js');
var __chunk_3 = require('../../actions/presentation.js');
require('../../actions/navigation.js');
require('../../actions/header.js');
require('../../actions/data.js');
require('../../actions/viewMode.js');
require('../../actions/annotations.js');
require('../../actions/annotationHistory.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewport = function (_PureComponent) {
  _inherits(Viewport, _PureComponent);

  function Viewport() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Viewport);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call.apply(_ref, [this].concat(args))), _this), _this.resizeHandler = function () {
      _this.props.dispatch(__chunk_3.setViewportParams(_this.viewport.offsetHeight));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Viewport, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeHandler();

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
        { className: 'viewport', ref: function ref(el) {
            return _this2.viewport = el;
          } },
        this.props.children
      );
    }
  }]);

  return Viewport;
}(React.PureComponent);

var Viewport$1 = reactRedux.connect(undefined, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(Viewport);

exports.default = Viewport$1;
//# sourceMappingURL=components/Viewport/index.js.map
