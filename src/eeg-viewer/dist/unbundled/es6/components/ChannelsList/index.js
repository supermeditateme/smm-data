import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { STORE_KEY } from '../../constants.js';
import { selectChannel } from '../../actions/viewMode.js';
import '../../actions/navigation.js';
import '../../actions/presentation.js';
import '../../actions/header.js';
import '../../actions/data.js';
import '../../actions/annotations.js';
import '../../actions/annotationHistory.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelsList = function (_PureComponent) {
  _inherits(ChannelsList, _PureComponent);

  function ChannelsList() {
    _classCallCheck(this, ChannelsList);

    return _possibleConstructorReturn(this, (ChannelsList.__proto__ || Object.getPrototypeOf(ChannelsList)).apply(this, arguments));
  }

  _createClass(ChannelsList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          visibleChannels = _props.visibleChannels,
          viewportHeight = _props.viewportHeight;


      return React.createElement(
        'div',
        { className: 'channelsList', style: { height: viewportHeight } },
        visibleChannels.map(function (channel) {
          return React.createElement(
            'div',
            {
              className: 'channelName',
              key: channel,
              onClick: function onClick() {
                _this2.props.dispatch(selectChannel(channel));
              }
            },
            channel
          );
        })
      );
    }
  }]);

  return ChannelsList;
}(PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    visibleChannels: state.viewMode.visibleChannels,
    viewportHeight: state.presentation.viewportHeight
  };
};

var ChannelsList$1 = connect(mapStateToProps, undefined, undefined, {
  storeKey: STORE_KEY
})(ChannelsList);

export default ChannelsList$1;
//# sourceMappingURL=components/ChannelsList/index.js.map
