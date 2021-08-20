import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { STORE_KEY } from '../../constants.js';
import { getFileDuration } from '../../selectors/navigation.js';
import { setCurrentTime } from '../../actions/navigation.js';
import '../../selectors/viewMode.js';
import '../../selectors/annotations.js';
import '../../actions/presentation.js';
import '../../actions/header.js';
import '../../actions/data.js';
import '../../actions/viewMode.js';
import '../../actions/annotations.js';
import '../../actions/annotationHistory.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Annotation = function (_PureComponent) {
  _inherits(Annotation, _PureComponent);

  function Annotation() {
    _classCallCheck(this, Annotation);

    return _possibleConstructorReturn(this, (Annotation.__proto__ || Object.getPrototypeOf(Annotation)).apply(this, arguments));
  }

  _createClass(Annotation, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          startX = _props.startX,
          width = _props.width,
          _props$cssClass = _props.cssClass,
          cssClass = _props$cssClass === undefined ? 'defaultAnnotation' : _props$cssClass;


      return React.createElement('div', {
        className: 'annotationMini ' + cssClass,
        style: {
          transform: 'translateX(' + startX + 'px)',
          width: width
        }
      });
    }
  }]);

  return Annotation;
}(PureComponent);

var AnnotationsMinimap = function (_PureComponent2) {
  _inherits(AnnotationsMinimap, _PureComponent2);

  function AnnotationsMinimap() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, AnnotationsMinimap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = AnnotationsMinimap.__proto__ || Object.getPrototypeOf(AnnotationsMinimap)).call.apply(_ref, [this].concat(args))), _this2), _this2.jumpTo = function (e) {
      var desiredTime = e.nativeEvent.offsetX * _this2.props.fileDuration / _this2.props.scrollerWidth;
      _this2.props.dispatch(setCurrentTime(desiredTime));
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(AnnotationsMinimap, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          annotationsList = _props2.annotationsList,
          secondWidth = _props2.secondWidth,
          currentTime = _props2.currentTime;

      var minimapCurrentPosition = currentTime * secondWidth;

      return React.createElement(
        'div',
        { className: 'annotationsMinimap', onClick: this.jumpTo },
        annotationsList.map(function (annotation) {
          return React.createElement(Annotation, {
            key: annotation.id,
            startX: annotation.time * secondWidth,
            width: annotation.duration * secondWidth,
            cssClass: annotation.cssClass
          });
        }),
        React.createElement('div', {
          className: 'cursorMinimap',
          style: {
            transform: 'translateX(' + minimapCurrentPosition + 'px)'
          }
        })
      );
    }
  }]);

  return AnnotationsMinimap;
}(PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    annotationsList: state.annotations.list,
    secondWidth: state.presentation.scrollerWidth / (state.header.dataRecordsNumber * state.header.dataRecordDuration || 1),
    currentTime: state.navigation.currentTime,
    scrollerWidth: state.presentation.scrollerWidth,
    fileDuration: getFileDuration(state)
  };
};

var AnnotationsMinimap$1 = connect(mapStateToProps, undefined, undefined, {
  storeKey: STORE_KEY
})(AnnotationsMinimap);

export default AnnotationsMinimap$1;
//# sourceMappingURL=components/AnnotationsMinimap/index.js.map
