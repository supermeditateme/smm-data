'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var __chunk_1 = require('../../constants.js');
var __chunk_35 = require('./SegmentCanvas.js');
var __chunk_17 = require('../../selectors/navigation.js');
var __chunk_18 = require('../../selectors/viewMode.js');
require('../../selectors/annotations.js');

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

      return React__default.createElement(
        'div',
        { className: 'plot' },
        currentSegmentRange.map(function (segNumber) {
          return React__default.createElement(
            'div',
            {
              className: 'plotSegment',
              key: segNumber,
              style: { transform: 'translateX(' + segNumber * segWidth + 'px)' }
            },
            React__default.createElement(__chunk_35.default, {
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
}(React.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.data,
    stepWidthOptions: __chunk_18.getStepWidth(state),
    segWidth: __chunk_17.getSegmentWidth(state),
    currentSegmentRange: __chunk_17.getCurrentSegmentRange(state),
    visibleChannels: __chunk_18.getVisibleChannels(state),
    height: state.presentation.viewportHeight
  };
};

var Plot$1 = reactRedux.connect(mapStateToProps, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(Plot);

exports.default = Plot$1;
//# sourceMappingURL=components/Plot/index.js.map
