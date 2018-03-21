import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class StriveCardScreen extends React.Component {
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
        <Text>this is strive card </Text>
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
