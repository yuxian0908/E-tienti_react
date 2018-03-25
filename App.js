import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import Expo, { SQLite } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import I18n from 'ex-react-native-i18n';

import RootNavigation from './navigation/RootNavigation';
import store from './redux/store';
import { MODELS } from './constants/models';
import { i18nCONFIG } from './constants/i18n';

i18nCONFIG();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {

    //init database
    const db = SQLite.openDatabase('db.db');
    const models = MODELS;
    for(let i=0;i<models.tables.length;i++){
      let table = models.tables[i];
      let columns = '';
      for(let j=0;j<table.columns.length;j++){
        if(j===table.columns.length-1){
          columns = columns + table.columns[j].name+ ' ' +table.columns[j].type.toUpperCase();
        }else{
          columns = columns + table.columns[j].name+ ' ' +table.columns[j].type.toUpperCase() + ',';
        }
      }
      db.transaction(sql => {
        sql.executeSql(
          "CREATE TABLE IF NOT EXISTS " + table.name +'('+ columns +')'
        );
      });
    }
  }



  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {/* {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />} */}
            <RootNavigation />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
