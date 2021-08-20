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

var secConfiguration = {
  '1': {
    stickCount: 11,
    value: 1
  },
  '5': {
    stickCount: 11,
    value: 1
  },
  '10': {
    stickCount: 4,
    value: 2
  },
  '15': {
    stickCount: 4,
    value: 3
  },
  '20': {
    stickCount: 6,
    value: 5
  },
  '25': {
    stickCount: 6,
    value: 5
  },
  '30': {
    stickCount: 6,
    value: 5
  }
};

var Second = function (_PureComponent) {
  _inherits(Second, _PureComponent);

  function Second() {
    _classCallCheck(this, Second);

    return _possibleConstructorReturn(this, (Second.__proto__ || Object.getPrototypeOf(Second)).apply(this, arguments));
  }

  _createClass(Second, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          value = _props.value;

      var seconds = new Array(size).fill(null);

      return React__default.createElement(
        'div',
        { className: 'second' },
        React__default.createElement(
          'div',
          { className: 'second_value' },
          value
        ),
        React__default.createElement(
          'div',
          { className: 'second_line_group' },
          seconds.map(function (item, idx) {
            return React__default.createElement('i', { key: idx, className: 'second_line' });
          })
        )
      );
    }
  }]);

  return Second;
}(React.PureComponent);

var Segment = function (_PureComponent2) {
  _inherits(Segment, _PureComponent2);

  function Segment() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Segment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Segment.__proto__ || Object.getPrototypeOf(Segment)).call.apply(_ref, [this].concat(args))), _this2), _this2.parseTime = function (time) {
      var arrTime = [];

      arrTime[0] = 0 | time / 3600 % 24; // hours
      arrTime[1] = 0 | time / 60 % 60; // minutes
      arrTime[2] = 0 | time % 60; // seconds

      arrTime = arrTime.map(function (item) {
        if (item < 10) {
          return '0' + item;
        }

        return item;
      });

      var day = 0 | time / (3600 * 24);

      return (day > 0 ? 'd' + day + ' ' : '') + arrTime.join(':');
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }
  // TODO: optimize parser


  _createClass(Segment, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          segmentIndex = _props2.segmentIndex,
          segmentWidth = _props2.segmentWidth,
          epochSize = _props2.epochSize;


      var seconds = new Array(__chunk_1.SEGMENT_DURATION / secConfiguration[epochSize].value).fill(null);

      return React__default.createElement(
        'div',
        {
          className: 'segment',
          style: {
            width: segmentWidth,
            transform: 'translateX(' + segmentWidth * segmentIndex + 'px)'
          }
        },
        seconds.map(function (second, idx) {
          var value = _this3.parseTime(segmentIndex * __chunk_1.SEGMENT_DURATION + idx * secConfiguration[epochSize].value);

          return React__default.createElement(Second, {
            size: secConfiguration[epochSize].stickCount,
            key: idx,
            value: value
          });
        })
      );
    }
  }]);

  return Segment;
}(React.PureComponent);

var Ruler = function (_PureComponent3) {
  _inherits(Ruler, _PureComponent3);

  function Ruler() {
    _classCallCheck(this, Ruler);

    return _possibleConstructorReturn(this, (Ruler.__proto__ || Object.getPrototypeOf(Ruler)).apply(this, arguments));
  }

  _createClass(Ruler, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          segmentRange = _props3.segmentRange,
          segmentWidth = _props3.segmentWidth,
          epochSize = _props3.epochSize;


      return React__default.createElement(
        'div',
        { className: 'ruler' },
        segmentRange.map(function (segment) {
          return React__default.createElement(Segment, {
            epochSize: epochSize,
            key: segment,
            segmentIndex: segment,
            segmentWidth: segmentWidth
          });
        })
      );
    }
  }]);

  return Ruler;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    segmentWidth: __chunk_17.getSegmentWidth(state),
    segmentRange: __chunk_17.getCurrentSegmentRange(state),
    epochSize: state.navigation.epochSize
  };
};

var Ruler$1 = reactRedux.connect(mapStateToProps, undefined, undefined, {
  storeKey: __chunk_1.STORE_KEY
})(Ruler);

exports.default = Ruler$1;
//# sourceMappingURL=components/Ruler/index.js.map
