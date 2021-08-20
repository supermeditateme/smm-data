import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { STORE_KEY } from '../../constants.js';
import { softSetCurrentTime } from '../../actions/navigation.js';
import { selectAnnotation, modifyAnnotation, deleteAnnotation } from '../../actions/annotations.js';
import { getSortedAnnotations, getSelectedAnnotation } from '../../selectors/annotations.js';
import { getSecondWidth } from '../../selectors/navigation.js';
import '../../actions/presentation.js';
import '../../actions/header.js';
import '../../actions/data.js';
import '../../actions/viewMode.js';
import '../../actions/annotationHistory.js';
import '../../selectors/viewMode.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function roundSec(duration) {
  return Math.round(duration * 1000000) / 1000000;
}
function roundMs(duration) {
  return Math.round(duration * 1000) / 1000;
}

// This component is about presentation (html structure/style) and mouse resize.

var SelectedAnnotation = function (_PureComponent) {
  _inherits(SelectedAnnotation, _PureComponent);

  function SelectedAnnotation(props) {
    _classCallCheck(this, SelectedAnnotation);

    var _this = _possibleConstructorReturn(this, (SelectedAnnotation.__proto__ || Object.getPrototypeOf(SelectedAnnotation)).call(this, props));

    _initialiseProps.call(_this);

    _this.selectedRef = React.createRef();

    var time = props.time,
        duration = props.duration,
        name = props.name,
        secondWidth = props.secondWidth;


    _this.state = {
      startX: time * secondWidth,
      width: duration * secondWidth,
      name: name,
      dragging: null
    };
    return _this;
  }

  _createClass(SelectedAnnotation, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps === this.props) {
        return;
      }

      var _props = this.props,
          time = _props.time,
          duration = _props.duration,
          name = _props.name,
          secondWidth = _props.secondWidth;


      this.setState({
        startX: time * secondWidth,
        width: duration * secondWidth,
        name: name,
        dragging: null
      });
    }
  }, {
    key: 'startDragging',
    value: function startDragging(e, direction) {
      var _this2 = this;

      this.setState({
        dragging: {
          direction: direction,
          savedPageX: e.pageX,
          savedStartX: this.state.startX,
          savedWidth: this.state.width
        }
      }, function () {
        // Not document.body , because body can fill less than 100% height.
        document.documentElement.classList.add('cursor' + direction.toUpperCase());
        document.documentElement.addEventListener('mousemove', _this2.drag, false);
        document.documentElement.addEventListener('mouseup', _this2.stopDragging, false);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // It's not elegant to put focusing behaviour here, but I cannot come up
      // with a better solution now.
      this.selectedRef.current.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.documentElement.classList.remove('cursorW');
      document.documentElement.classList.remove('cursorE');
      document.documentElement.removeEventListener('mousemove', this.drag, false);
      document.documentElement.removeEventListener('mouseup', this.stopDragging, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          secondWidth = _props2.secondWidth,
          onKeyDown = _props2.onKeyDown,
          onBlur = _props2.onBlur;
      var _state = this.state,
          startX = _state.startX,
          width = _state.width,
          name = _state.name;


      var containerWidth = Math.max(width, 2); // One border width.

      var duration = width / secondWidth;
      var durationLabel = duration < 1 ? roundMs(duration * 1000) + 'ms' : roundSec(duration) + 's';

      return React.createElement(
        'div',
        {
          tabIndex: '0',
          ref: this.selectedRef,
          onKeyDown: onKeyDown,
          className: 'selectedAnnotation',
          style: {
            transform: 'translateX(' + startX + 'px)',
            width: containerWidth
          }
        },
        React.createElement('div', { className: 'leftBorder', onMouseDown: this.startDraggingWest }),
        React.createElement('div', { className: 'rightBorder', onMouseDown: this.startDraggingEast }),
        React.createElement(
          'div',
          { className: 'annotationDuration' },
          React.createElement('div', { className: 'measureLine' }),
          React.createElement('div', { className: 'leftGapper' }),
          React.createElement(
            'div',
            { className: 'durationLabel' },
            durationLabel
          )
        ),
        React.createElement(
          'div',
          { className: 'annotationLabel' },
          name
        )
      );
    }
  }]);

  return SelectedAnnotation;
}(PureComponent);

// This wrapper is about keyboard control.


var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.startDraggingWest = function (e) {
    _this4.startDragging(e, 'w');
  };

  this.startDraggingEast = function (e) {
    _this4.startDragging(e, 'e');
  };

  this.drag = function (e) {
    var _state$dragging = _this4.state.dragging,
        direction = _state$dragging.direction,
        savedPageX = _state$dragging.savedPageX,
        savedStartX = _state$dragging.savedStartX,
        savedWidth = _state$dragging.savedWidth;


    var delta = e.pageX - savedPageX;

    var deltaRestricted = void 0;
    switch (direction) {
      case 'e':
        deltaRestricted = Math.max(delta, -savedWidth);
        _this4.setState({ width: savedWidth + deltaRestricted });
        break;

      case 'w':
        deltaRestricted = Math.min(delta, savedWidth);
        _this4.setState({
          startX: savedStartX + deltaRestricted,
          width: savedWidth - deltaRestricted
        });
        break;

      default:
        break;
    }
  };

  this.stopDragging = function (e) {
    document.documentElement.classList.remove('cursorW');
    document.documentElement.classList.remove('cursorE');
    document.documentElement.removeEventListener('mousemove', _this4.drag, false);
    document.documentElement.removeEventListener('mouseup', _this4.stopDragging, false);
    var _state2 = _this4.state,
        startX = _state2.startX,
        width = _state2.width;
    var _props4 = _this4.props,
        secondWidth = _props4.secondWidth,
        onChange = _props4.onChange;


    _this4.setState({ dragging: null }, function () {
      onChange({
        time: startX / secondWidth,
        duration: roundSec(width / secondWidth)
      });
    });
  };
};

var SelectedAnnotationWrapper = function (_Component) {
  _inherits(SelectedAnnotationWrapper, _Component);

  function SelectedAnnotationWrapper() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, SelectedAnnotationWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = SelectedAnnotationWrapper.__proto__ || Object.getPrototypeOf(SelectedAnnotationWrapper)).call.apply(_ref, [this].concat(args))), _this3), _this3.handleKeyDown = function (e) {
      var _this3$props = _this3.props,
          sortedAnnotations = _this3$props.sortedAnnotations,
          selected = _this3$props.selected,
          dispatch = _this3$props.dispatch;
      var key = e.key;

      var idx = void 0;

      switch (key) {
        case 'Backspace':
        case 'Delete':
          dispatch(deleteAnnotation(selected.id));
        // No `break` here - this way we jump to next annotation on deleting.

        case 'ArrowDown':
          idx = sortedAnnotations.findIndex(function (annotation) {
            return annotation.id === selected.id;
          }) + 1;
          idx = idx < sortedAnnotations.length ? idx : 0;
          dispatch(selectAnnotation(sortedAnnotations[idx].id));
          dispatch(softSetCurrentTime(sortedAnnotations[idx].time - 0.2));
          break;

        case 'ArrowUp':
          idx = sortedAnnotations.findIndex(function (annotation) {
            return annotation.id === selected.id;
          }) - 1;
          idx = idx >= 0 ? idx : sortedAnnotations.length - 1;
          dispatch(selectAnnotation(sortedAnnotations[idx].id));
          dispatch(softSetCurrentTime(sortedAnnotations[idx].time - 0.2));
          break;

        default:
          break;
      }
    }, _this3.handleChange = function (annotationData) {
      _this3.props.dispatch(modifyAnnotation(_extends({}, _this3.props.selected, annotationData)));
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(SelectedAnnotationWrapper, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          selected = _props3.selected,
          secondWidth = _props3.secondWidth;


      if (!selected) {
        return null;
      }

      // Single child is keyed to re-draw on annotation change.
      return React.createElement(SelectedAnnotation, {
        key: selected.id,
        time: selected.time,
        duration: selected.duration,
        name: selected.name,
        secondWidth: secondWidth,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange
      });
    }
  }]);

  return SelectedAnnotationWrapper;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    sortedAnnotations: getSortedAnnotations(state),
    selected: getSelectedAnnotation(state),
    secondWidth: getSecondWidth(state)
  };
};

var SelectedAnnotation$1 = connect(mapStateToProps, undefined, undefined, {
  storeKey: STORE_KEY
})(SelectedAnnotationWrapper);

export default SelectedAnnotation$1;
//# sourceMappingURL=components/SelectedAnnotation/index.js.map
