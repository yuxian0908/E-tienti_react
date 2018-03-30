import React from 'react';
import { View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text,  Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { allStriveElem, resetStriveElem, saveStriveElem } from '../../redux/actions';
import { BUTTON_GROUP_STYLES, SCREEN_WIDTH } from '../../constants/Layout';
import I18n from 'ex-react-native-i18n';
import { i18nCONFIG } from '../../constants/i18n';
import { striveCardBtns_Fn } from './striveCardBtns_function.js';

i18nCONFIG();

class Btns extends React.Component {
  
  render() {
    const {
        containerStyle,
        buttonStyle,
        selectedTextStyle
    } = BUTTON_GROUP_STYLES;
    
    let saveContent = striveCardBtns_Fn.getSavingObj(this.props);
    
    return (

        <View style={{height: 80,flex:1,flexDirection: 'row'}}>
            <Button title={I18n.t('striveCard.button.all')}
             buttonStyle={{width:SCREEN_WIDTH*0.25}}
             onPress={()=>{this.props.allStriveElem('all');}}/>

            <Button title={I18n.t('striveCard.button.cancel')}
             buttonStyle={{width:SCREEN_WIDTH*0.25}}
             onPress={()=>{this.props.resetStriveElem('cancel');}}/>

            <Button title={I18n.t('striveCard.button.save')}
             buttonStyle={{width:SCREEN_WIDTH*0.25}}
             onPress={()=>{
                striveCardBtns_Fn.saveStriveCard(this.props,saveContent);
                ToastAndroid.show(I18n.t('saved'),ToastAndroid.SHORT)
            }}/>

        </View>
    );
  }
}

const mapStateToProps = ({ striveCard, selectedDate }) => ({ striveCard, selectedDate });

export const StriveCardBtns = connect(mapStateToProps, { allStriveElem, resetStriveElem, saveStriveElem })(Btns);