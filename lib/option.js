const React = require('react');
const ReactNative = require('react-native');

const downImage = require('./down.png');

const {
  Component
} = React;

const {
  View,
  Text,
  Image
} = ReactNative;

const styles = {
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, styleText } = this.props;

    return (
      <View style={[ styles.container, style ]}>
        <Text style={ [styleText,{ flex: 7 }] }>{this.props.children}</Text>
        <Image style={{ flex: 1, height: 30 }} source={downImage} resizeMode="contain"/>
      </View>
    );
  }
}

Option.propTypes = {
  children: React.PropTypes.string.isRequired
};

module.exports = Option;
