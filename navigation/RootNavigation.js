import { Notifications } from 'expo';
import React from 'react';
import { Platform,Image,Text,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import StriveCardScreen from '../screens/StriveCardScreen';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { STATUS_BAR_HEIGHT, SCREEN_WIDTH, BUTTON_GROUP_STYLES } from '../constants/Layout';
import logo from '../assets/images/logo.png';

const backButton = ({navigation}) => ({ 
    headerRight:(
      <TouchableOpacity onPress={() =>{
        console.log('aaa');
        navigation.goBack(null)
      }}>
        <Icon 
        name = 'back' type = 'entypo' color = 'red' 
        style = {BUTTON_GROUP_STYLES.backIconStyle}/>
      </TouchableOpacity>
    )
})

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    StriveCard: { 
      screen: StriveCardScreen,
      navigationOptions: backButton
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: 'E-tienti',
      headerTitleStyle: {
        fontWeight: 'normal',
        color: 'white'
      },
      headerStyle: {
        backgroundColor:'black',
        height: 55,
        paddingTop:0
      },
      headerLeft:(
        <Image
          source={logo}
          style={BUTTON_GROUP_STYLES.logoStyle}
        />
      )
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

