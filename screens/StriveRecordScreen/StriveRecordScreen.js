import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { StriveRecord_Fn } from './StriveRecordFn';
import { StriveRecordTableCpn } from '../../components/striveRecordTable';

export class StriveRecordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
          
        <Text>this is strive record</Text>
        <StriveRecordTableCpn />
      </ScrollView>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }
};