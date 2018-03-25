import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ButtonGroup, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    enterStriveCard,
    selectStriveElem,
    resetStriveElem,
    getStriveCardFrDb 
} from '../../redux/actions';
import { BUTTON_GROUP_STYLES } from '../../constants/Layout';
import { StriveList_Fn } from './striveList_function';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

let selectedSenAry = [];

let initList = [];
export class StriveList extends React.Component {   
    componentWillMount(){
        StriveList_Fn.getData(this.props);
    }

    componentWillUnmount(){
        StriveList_Fn.resetData(this.props);
    }

    render() {
        let renderList = StriveList_Fn.getRenderList(this.props);


        return (
            <View>
                {renderList.map((elem,index) => {
                    return (
                        <CheckBox key={index+1} title={elem.title} checked={elem.isChecked}
                        onPress={()=>{
                            elem.isChecked = !elem.isChecked;
                            this.props.selectStriveElem(renderList);
                        }}/>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = ({ striveCard, selectedDate }) => ({ striveCard, selectedDate });

export const StriveListCpn = connect(mapStateToProps, { selectStriveElem, resetStriveElem, enterStriveCard, getStriveCardFrDb })(StriveList);