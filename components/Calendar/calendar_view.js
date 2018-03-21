import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';

import { selectDate } from '../../redux/actions';
import { BUTTON_GROUP_STYLES } from '../../constants/Layout';
import { Calendar_Fn } from './calendar_functions'

class CalendarView extends React.Component {
  
  render() {
    const CalendarFn = Calendar_Fn;
    const { selectedDate: { selectedDay }} = this.props;
    const {
        containerStyle,
        buttonStyle,
        selectedTextStyle
    } = BUTTON_GROUP_STYLES;
    return (
        <View>
            <Calendar
            // Initially visible month. Default = Date()
            /* current={Date()} */
            markedDates={{
                [selectedDay.dateString]: {selected: true, selectedColor: 'red'},
            }}
            onDayPress={day => this.props.selectDate(day)}
            monthFormat={'yyyy 年 MM 月'}
            onMonthChange={month => {
                console.log('month changed', month);
            }}
            hideArrows={false}
            hideExtraDays={false}
            disableMonthChange={false}
            firstDay={1}
            />
        </View>
    );
  }
}

const mapStateToProps = ({ selectedDate }) => ({ selectedDate });

export const CalendarCpn = connect(mapStateToProps, { selectDate })(CalendarView);