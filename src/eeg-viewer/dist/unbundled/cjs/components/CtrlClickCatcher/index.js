'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var __chunk_1 = require('../../constants.js');
var __chunk_7 = require('../../actions/annotations.js');
var __chunk_19 = require('../../selectors/annotations.js');
var __chunk_17 = require('../../selectors/navigation.js');
require('../../actions/navigation.js');
require('../../actions/presentation.js');
require('../../actions/header.js');
require('../../actions/data.js');
require('../../actions/viewMode.js');
require('../../actions/annotationHistory.js');
require('../../selectors/viewMode.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewSelection = function (_PureComponent) {
  _inherits(NewSelection, _PureComponent);

  function NewSelection() {
    _classCallCheck(this, NewSelection);

    return _possibleConstructorReturn(this, (NewSelection.__proto__ || Object.getPrototypeOf(NewSelection)).apply(this, arguments));
  }

  _createClass(NewSelection, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          savedX = _props.savedX,
          delta = _props.delta;


      if (savedX === null) {
        return null;
      }

      var startX = delta >= 0 ? savedX : savedX + delta;
      var width = Math.abs(delta);

      return React__default.createElement('div', {
        className: 'newSelection',
        style: { transform: 'translateX(' + startX + 'px)', width: width }
      });
    }
  }]);

  return NewSelection;
}(React.PureComponent);

var CtrlClickCatcher = function (_PureComponent2) {
  _inherits(CtrlClickCatcher, _PureComponent2);

  function CtrlClickCatcher(props) {
    _classCallCheck(this, CtrlClickCatcher);

    var _this2 = _possibleConstructorReturn(this, (CtrlClickCatcher.__proto__ || Object.getPrototypeOf(CtrlClickCatcher)).call(this, props));

    _this2.preventContextMenu = function (e) {
      if (process.env.NODE_ENV !== 'development') {
        if (e.target === _this2.catcherRef.current) {
          e.preventDefault();
        }
      }
    };

    _this2.onKeyDown = function (e) {
      if (e.key === 'Control') {
        _this2.setState({ ctrlPressed: true });
      }
    };

    _this2.onKeyUp = function (e) {
      if (e.key === 'Control') {
        _this2.setState({ ctrlPressed: false });
      }
    };

    _this2.onMouseDown = function (e) {
      if (!e.ctrlKey) {
        if (process.env.NODE_ENV === 'development') {
          console.warn("Clicked CtrlClickCatcher without ctrl key! Shouldn't happen.");
        }
        _this2.setState({ ctrlPressed: false, savedX: null, delta: null });
        return;
      }

      _this2.setState({ savedX: e.nativeEvent.offsetX, delta: 0 }, function () {
        document.documentElement.addEventListener('mousemove', _this2.onMouseMove, false);
      });
    };

    _this2.onMouseMove = function (e) {
      _this2.setState({
        ctrlPressed: e.ctrlKey,
        delta: e.offsetX - _this2.state.savedX
      });
    };

    _this2.onMouseUp = function (e) {
      var _this2$props = _this2.props,
          nameForAnnotation = _this2$props.nameForAnnotation,
          secondWidth = _this2$props.secondWidth,
          currentPosition = _this2$props.currentPosition;
      var _this2$state = _this2.state,
          savedX = _this2$state.savedX,
          delta = _this2$state.delta;

      var startX = delta >= 0 ? savedX : savedX + delta;
      var width = Math.abs(delta);

      _this2.setState({ ctrlPressed: e.ctrlKey, savedX: null, delta: null }, function () {
        var id = new Date().getTime(); // TODO come up with ID reconciliation between external app and this library
        _this2.props.dispatch(__chunk_7.createAnnotation({
          id: id,
          name: nameForAnnotation,
          time: (currentPosition + startX) / secondWidth,
          duration: width / secondWidth
        }));
        _this2.props.dispatch(__chunk_7.selectAnnotation(id));
      });
    };

    _this2.catcherRef = React__default.createRef();
    _this2.state = { ctrlPressed: false, savedX: null, delta: null };
    return _this2;
  }

  _createClass(CtrlClickCatcher, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.documentElement.addEventListener('contextmenu', this.preventContextMenu, false);
      document.documentElement.addEventListener('keydown', this.onKeyDown, false);
      document.documentElement.addEventListener('keyup', this.onKeyUp, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.documentElement.removeEventListener('contextmenu', this.preventContextMenu, false);
      document.documentElement.removeEventListener('keydown', this.onKeyDown, false);
      document.documentElement.removeEventListener('keyup', this.onKeyUp, false);
      document.documentElement.removeEventListener('mousemove', this.onMouseMove, false);
    }

    // Mac ctrl-click by default opens context menu. Prevent that.

  }, {
    key: 'render',
    value: function render() {
      var viewportHeight = this.props.viewportHeight;
      var _state = this.state,
          ctrlPressed = _state.ctrlPressed,
          savedX = _state.savedX,
          delta = _state.delta;

      return React__default.createElement(
        'div',
        {
          className: 'ctrlClickCatcher',
          ref: this.catcherRef,
          style: {
            height: viewportHeight,
            pointerEvents: ctrlPressed || savedX !== null ? 'unset' : 'none'
          },
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp
        },
        React__default.createElement(NewSelection, { savedX: savedX, delta: delta })
      );
    }
  }]);

  return CtrlClickCatcher;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    viewportHeight: state.presentation.viewportHeight,
    nameForAnnotation: (__chunk_19.getSelectedAnnotation(state) || state.annotations.list[0] || { name: 'New annotation' }).name,
    secondWidth: __chunk_17.getSecondWidth(state),
    currentPosition: __chunk_17.getCurrentPosition(state)
  };
};

var CtrlClickCatcher$1 = reactRedux.connect(mapStateToProps, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(CtrlClickCatcher);

exports.default = CtrlClickCatcher$1;
//# sourceMappingURL=components/CtrlClickCatcher/index.js.map
