import React from 'react';
import { View } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectKeyIndex } from '../redux/actions/key_actions';
import { BUTTON_GROUP_STYLES } from '../constants/Layout';

class KeysButtons extends React.Component {
  render() {
    const { selectedValues: { selectedKeyIndex }, keys } = this.props;
    const keyButtons = keys.map(key => ([key.key]));
    const {
        containerStyle,
        buttonStyle,
        selectedTextStyle
    } = BUTTON_GROUP_STYLES;
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text h1 style={{ marginBottom: 2 }}>{keys[selectedKeyIndex].key}</Text>
            <ButtonGroup
            onPress={index => this.props.selectKeyIndex(index)}
            selectedIndex={selectedKeyIndex}
            buttons={keyButtons}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            selectedTextStyle={selectedTextStyle}
            />
        </View>
    );
  }
}


const mapStateToProps = ({ keys, selectedValues }) => ({ keys, selectedValues });

export default connect(mapStateToProps, { selectKeyIndex })(KeysButtons);
