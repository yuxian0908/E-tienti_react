import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { selectMonth,getStriveRecord } from '../../redux/actions';
import { StriveRecordTable_Fn } from '../../components/striveRecordTable/striveRecordTable_function';
import { StriveRecord_Fn } from './StriveRecordFn';
import { StriveRecordTableCpn } from '../../components/striveRecordTable';
import { MonthSelectionCpn } from '../../components/modals/monthSelection/monthSelection_view'

class StriveRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
  };

  componentDidMount() {
    
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      const { striveRecord:{ InitDateEvent,RecordDateEvent,selectedMonth },
      selectedDate:{ selectedDay }, selectMonth } = this.props;
      const monthRecordView = StriveRecordTable_Fn.monthRecordView;
      monthRecordView.setDate(this.props,selectedMonth);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }


  render() {
    const { params } = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
        <MonthSelectionCpn />
        <StriveRecordTableCpn />
        
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ striveCard, selectedDate, striveRecord }) => ({ striveCard, selectedDate, striveRecord });
export const StriveRecordScreen = connect(mapStateToProps, { selectMonth, getStriveRecord })(StriveRecord);


const styles = {
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }
};