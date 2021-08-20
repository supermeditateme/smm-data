'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Segment = function (_PureComponent) {
  _inherits(Segment, _PureComponent);

  function Segment(props) {
    _classCallCheck(this, Segment);

    var _this = _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this, props));

    _this.canvasRef = React__default.createRef();
    return _this;
  }

  _createClass(Segment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.canvasRender();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.canvasRender();
    }
  }, {
    key: 'canvasRender',
    value: function canvasRender() {
      var _props = this.props,
          visibleChannels = _props.visibleChannels,
          segment30s = _props.segment30s,
          stepWidthOptions = _props.stepWidthOptions;


      if (!segment30s) {
        return;
      }

      var height = this.props.height;

      var signalHeight = height / visibleChannels.length;
      var canvas = this.canvasRef.current;
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var currentSignal = 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = visibleChannels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var signalMeta = _step.value;

          if (signalMeta.invalid) {
            currentSignal++;
            continue;
          }

          var signal = signalMeta.type === 'derived' ? signalMeta.signals[0] : signalMeta.signal; // TODO

          var signalStartY = signalHeight * currentSignal + signalHeight / 2;

          ctx.beginPath();
          ctx.moveTo(0, signalStartY);

          var data = segment30s[signal.label];
          var dataLength = data.length;
          var stepWidthOption = stepWidthOptions[signal.sampleRate];

          for (var j = 0; j < dataLength; j++) {
            ctx.lineTo(stepWidthOption[j], signalStartY + data[j]);
          }

          ctx.moveTo(0, signalStartY);
          ctx.closePath();
          if (signalMeta.color && signalMeta.color !== 'black') {
            ctx.strokeStyle = signalMeta.color;
            ctx.stroke();
            ctx.strokeStyle = '#000000';
          } else {
            ctx.stroke();
          }

          currentSignal++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          segWidth = _props2.segWidth,
          height = _props2.height;


      return React__default.createElement('canvas', {
        className: 'plotCanvas',
        ref: this.canvasRef,
        width: segWidth,
        height: height
      });
    }
  }]);

  return Segment;
}(React.PureComponent);

exports.default = Segment;
//# sourceMappingURL=components/Plot/SegmentCanvas.js.map
