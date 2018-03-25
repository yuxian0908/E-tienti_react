import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { StriveListCpn } from '../components/striveList';
import { StriveCardBtns } from '../components/striveCardBtns';
import { CalendarCpn } from '../components/Calendar';

export default class StriveCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
  };
  componentWillUnmount(){
    this.props.navigation.popToTop();
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView style={styles.container}>
        <StriveListCpn />
        <StriveCardBtns />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
