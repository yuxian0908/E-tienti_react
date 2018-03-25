import React from 'react';
import { View, TouchableOpacity, Picker } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';

import { getStriveRecord } from '../../redux/actions';
import { BUTTON_GROUP_STYLES } from '../../constants/Layout';
import { StriveRecordTable_Fn } from './striveRecordTable_function';
// import DatePicker from 'react-native-datepicker';

class StriveRecordTable extends React.Component {
    componentWillMount(){
        let monthRecordView = StriveRecordTable_Fn.monthRecordView;
        monthRecordView.setDate(this.props);
        
    }
  render() {
    const {
        containerStyle,
        buttonStyle,
        selectedTextStyle
    } = BUTTON_GROUP_STYLES;
    StriveRecordTable_Fn.test();

    let monthRecordView = StriveRecordTable_Fn.monthRecordView;
    const { striveRecord:{InitDateEvent,RecordDateEvent} } = this.props;
    let renderEvent = RecordDateEvent?RecordDateEvent:InitDateEvent;
    console.log(renderEvent)

    return (
        <View>
            <View>
                <Picker style={{width: 200,height:44}} itemStyle={{height: 44}}
                mode = 'dropdown'>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    
                </Picker>
            </View>
            <View style = {styles.seletedMon}>
                {monthRecordView.fullweeks(monthRecordView.fullweeksnum).fill(1).map((i,week) => {
                return (
                    <View key = {week} style = {styles.weekView}>
                    {monthRecordView.weekdays(monthRecordView.weekdaysnum).fill(1).map((i,weekday) => {
                        return (
                        <View key = {(week)*7+(weekday+1)} style = {styles.weekdayView}>
                            <View key = {'title'+((week)*7+(weekday+1))} style = {styles.weekdayTitle}>
                                <Text key = {'titleText'+((week)*7+(weekday+1))}>{(week)*7+(weekday+1)}</Text>
                            </View>
                            <View key = {'content'+((week)*7+(weekday+1))}>
                                <Text key = {'contentText'+((week)*7+(weekday+1))}>{renderEvent[((week)*7+(weekday+1))]}</Text>
                            </View>
                        </View>
                        );
                    })}
                    </View>
                );
                })}
            </View>
        </View>
    );
  }
}

const styles = {
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    weekView:{ 
      width: '98%',
      flex: 1, 
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    weekdayView:{
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth:1,
      width: '14.2%',
      height:130,
      backgroundColor: 'yellow'
    },
    weekdayTitle:{
      height:30,
      borderStyle: 'solid',
      borderBottomColor: 'black',
      borderBottomWidth:1,
    },
    seletedMon:{
    }
};
  
const mapStateToProps = ({ striveCard, selectedDate, striveRecord }) => ({ striveCard, selectedDate, striveRecord });

export const StriveRecordTableCpn = connect(mapStateToProps, { getStriveRecord })(StriveRecordTable);