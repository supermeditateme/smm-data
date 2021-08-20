import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { STORE_KEY } from '../../constants.js';
import { selectAnnotation } from '../../actions/annotations.js';
import { getVisibleAnnotationsWithCoordinates } from '../../selectors/annotations.js';
import '../../actions/navigation.js';
import '../../actions/presentation.js';
import '../../actions/header.js';
import '../../actions/data.js';
import '../../actions/viewMode.js';
import '../../actions/annotationHistory.js';
import '../../selectors/navigation.js';
import '../../selectors/viewMode.js';

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
          cssClass = _props$cssClass === undefined ? 'defaultAnnotation' : _props$cssClass,
          onClick = _props.onClick;


      return React.createElement('div', {
        className: 'annotation ' + cssClass,
        style: {
          transform: 'translateX(' + startX + 'px)',
          width: width
        },
        onClick: onClick
      });
    }
  }]);

  return Annotation;
}(PureComponent);

var Annotations = function (_PureComponent2) {
  _inherits(Annotations, _PureComponent2);

  function Annotations() {
    _classCallCheck(this, Annotations);

    return _possibleConstructorReturn(this, (Annotations.__proto__ || Object.getPrototypeOf(Annotations)).apply(this, arguments));
  }

  _createClass(Annotations, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var visibleAnnotationsWithCoordinates = this.props.visibleAnnotationsWithCoordinates;


      return React.createElement(
        'div',
        { className: 'annotations' },
        visibleAnnotationsWithCoordinates.map(function (annotationWithCoordinates) {
          var annotation = annotationWithCoordinates.annotation;

          return React.createElement(Annotation, {
            key: annotation.id,
            startX: annotationWithCoordinates.startX,
            width: annotationWithCoordinates.width,
            cssClass: annotation.cssClass,
            onClick: function onClick() {
              return _this3.props.dispatch(selectAnnotation(annotation.id));
            }
          });
        })
      );
    }
  }]);

  return Annotations;
}(PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    visibleAnnotationsWithCoordinates: getVisibleAnnotationsWithCoordinates(state)
  };
};

var Annotations$1 = connect(mapStateToProps, undefined, undefined, {
  storeKey: STORE_KEY
})(Annotations);

export default Annotations$1;
//# sourceMappingURL=components/Annotations/index.js.map
