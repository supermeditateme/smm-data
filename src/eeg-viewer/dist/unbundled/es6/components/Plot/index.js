import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORE_KEY } from '../../constants.js';
import SegmentCanvas from './SegmentCanvas.js';
import { getCurrentSegmentRange, getSegmentWidth } from '../../selectors/navigation.js';
import { getStepWidth, getVisibleChannels } from '../../selectors/viewMode.js';
import '../../selectors/annotations.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plot = function (_Component) {
  _inherits(Plot, _Component);

  function Plot() {
    _classCallCheck(this, Plot);

    return _possibleConstructorReturn(this, (Plot.__proto__ || Object.getPrototypeOf(Plot)).apply(this, arguments));
  }

  _createClass(Plot, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          stepWidthOptions = _props.stepWidthOptions,
          currentSegmentRange = _props.currentSegmentRange,
          visibleChannels = _props.visibleChannels,
          height = _props.height,
          segWidth = _props.segWidth;


      var segHeight = height;

      // TODO canvas segments are not connected (gaps in plot), FIXME

      return React.createElement(
        'div',
        { className: 'plot' },
        currentSegmentRange.map(function (segNumber) {
          return React.createElement(
            'div',
            {
              className: 'plotSegment',
              key: segNumber,
              style: { transform: 'translateX(' + segNumber * segWidth + 'px)' }
            },
            React.createElement(SegmentCanvas, {
              key: segNumber,
              visibleChannels: visibleChannels,
              stepWidthOptions: stepWidthOptions,
              segment30s: data.onScreenCoordinates[segNumber],
              segWidth: segWidth,
              height: segHeight
            })
          );
        })
      );
    }
  }]);

  return Plot;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.data,
    stepWidthOptions: getStepWidth(state),
    segWidth: getSegmentWidth(state),
    currentSegmentRange: getCurrentSegmentRange(state),
    visibleChannels: getVisibleChannels(state),
    height: state.presentation.viewportHeight
  };
};

var Plot$1 = connect(mapStateToProps, undefined, undefined, {
  storeKey: STORE_KEY
})(Plot);

export default Plot$1;
//# sourceMappingURL=components/Plot/index.js.map
