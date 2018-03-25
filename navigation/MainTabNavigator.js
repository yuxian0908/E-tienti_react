import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import I18n from 'ex-react-native-i18n';

import Colors from '../constants/Colors';
import { i18nCONFIG } from '../constants/i18n';

import HomeScreen from '../screens/HomeScreen';
import { StriveRecordScreen } from '../screens/StriveRecordScreen';

i18nCONFIG();

export default TabNavigator(
  {
    [I18n.t('nav.index')]: {
      screen: HomeScreen,
    },
    [I18n.t('nav.striveRecord')]: {
      screen: StriveRecordScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case I18n.t('nav.index'):
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case I18n.t('nav.striveRecord'):
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
