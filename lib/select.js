const React = require('react');
const ReactNative = require('react-native');
const Option = require('./option');

const {
    Component
} = React;

const {
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} = ReactNative;

const window = Dimensions.get('window');

const SELECT = 'SELECT';

const styles = {
    container: {
        borderColor: '#BDBDC1',
        borderWidth: 2 / window.scale
    }
};

class Select extends Component {
    constructor(props) {
        super(props);

        this.pageX = 0;
        this.pageY = 0;

        let defaultValue = props.defaultValue;

        if (!defaultValue) {
            if (Array.isArray(props.children)) {
                defaultValue = props.children[0].props.children;
            } else {
                defaultValue = props.children.props.children;
            }
        }

        this.state = {
            value: defaultValue
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.defaultValue
        });
    }

    reset() {
        const {defaultValue} = this.props;
        this.setState({value: defaultValue});
    }

    _currentPosition(pageX, pageY) {
        this.pageX = pageX;
        this.pageY = pageY + this.props.height;
    }

    _onPress() {
        const {optionListRef, children, onSelect, width, height} = this.props;

        if (!children.length) {
            return false;
        }

        optionListRef()._show(children, this.pageX, this.pageY, width, height, (item, value = item) => {
            if (item) {
                onSelect(value);
                this.setState({
                    value: item
                });
            }
        }
    )
        ;
    }

    render() {
        const {width, height, children, defaultValue, style, styleOption, styleText} = this.props;
        const dimensions = {width, height};

        return (
            <TouchableWithoutFeedback
                onPress = {this._onPress.bind(this)}
            >
                <View
                    ref = {SELECT}
                    style = {[styles.container, style, dimensions]}
                >
                <Option style = {styleOption} styleText = {styleText}>{this.state.value}</Option>
                </View >
            </TouchableWithoutFeedback >
    );
    }
}

Select.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    optionListRef: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func
};

Select.defaultProps = {
        width: 200,
        height: 60,
        onSelect: () => {}
}
;

module.exports = Select;
