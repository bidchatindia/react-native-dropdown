const React = require('react');
const ReactNative = require('react-native');

const {
  Component
} = React;

const {
  Dimensions,
  TouchableWithoutFeedback,
  View
} = ReactNative;

const window = Dimensions.get('window');

const styles = {
  container: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  overlay: {
    position: 'relative',
    width: window.width * 2,
    height: window.height * 2,
    backgroundColor: 'transparent'
  }
};

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pageX, pageY, show, onPress } = this.props;

    if (!show) {
      return null
    }

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <View style={[styles.overlay, { top: -window.height, left: -window.width }]}/>
      </TouchableWithoutFeedback>
    );
  }
}

Overlay.propTypes = {
  pageX: React.PropTypes.number,
  pageY: React.PropTypes.number,
  show: React.PropTypes.bool
};

Overlay.defaultProps = {
  pageX: 0,
  pageY: 0,
  show: false
};

module.exports = Overlay;
