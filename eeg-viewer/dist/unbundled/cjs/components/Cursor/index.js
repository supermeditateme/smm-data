'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var __chunk_1 = require('../../constants.js');
var __chunk_17 = require('../../selectors/navigation.js');
require('../../selectors/viewMode.js');
require('../../selectors/annotations.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_PureComponent) {
  _inherits(Cursor, _PureComponent);

  function Cursor(props) {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, props));

    _this._onMouseMove = function (e) {
      var scrollerXPosition = _this.props.scrollerXPosition;


      _this.setState({ xCord: e.pageX - scrollerXPosition });
    };

    _this.parseTime = function (time) {
      var hours = String(Math.trunc(time / 3600 % 24)).padStart(2, '0');
      var minutes = String(Math.trunc(time / 60 % 60)).padStart(2, '0');
      var seconds = String(Math.trunc(time % 60)).padStart(2, '0');
      var day = Math.trunc(time / (3600 * 24));

      return (day > 0 ? 'd' + day + ' ' : '') + (hours + ':' + minutes + ':' + seconds);
    };

    _this.state = {
      xCord: _this.props.currentPosition || 0
    };
    return _this;
  }

  _createClass(Cursor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.documentElement.addEventListener('mousemove', this._onMouseMove, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.documentElement.removeEventListener('mousemove', this._onMouseMove, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentPosition = _props.currentPosition,
          secondWidth = _props.secondWidth;
      var xCord = this.state.xCord;


      var cursorTime = this.parseTime((currentPosition + xCord) / secondWidth);

      return React__default.createElement(
        'div',
        {
          className: 'cursor',
          style: {
            transform: 'translateX(' + (currentPosition + xCord) + 'px)'
          }
        },
        React__default.createElement(
          'span',
          { className: 'cursorTime' },
          cursorTime
        )
      );
    }
  }]);

  return Cursor;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    scrollerXPosition: state.presentation.scrollerXPosition,
    currentPosition: __chunk_17.getCurrentPosition(state),
    secondWidth: __chunk_17.getSecondWidth(state)
  };
};

var Cursor$1 = reactRedux.connect(mapStateToProps, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(Cursor);

exports.default = Cursor$1;
//# sourceMappingURL=components/Cursor/index.js.map
