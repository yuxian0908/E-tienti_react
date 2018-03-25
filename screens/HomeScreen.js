import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Expo, { SQLite } from 'expo';
import { Button } from 'react-native-elements';

import { TestButtons } from '../components/TestButtons';
import { CalendarCpn } from '../components/Calendar';
import { HOME_SCREEN_STYLE } from '../constants/styles';
import I18n from 'ex-react-native-i18n';
import { i18nCONFIG } from '../constants/i18n';

i18nCONFIG();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {

  };

  componentDidMount() {
  }

  render() {
    const { params } = this.props.navigation.state;
    const {
      container,
      developmentModeText,
      contentContainer,
      helpLink,
      helpLinkText,
    } = HOME_SCREEN_STYLE;
    
    return (
      <View style={container}>
        <ScrollView style={container} contentContainerStyle={contentContainer}>
          
          <TestButtons />
          <CalendarCpn />
          <View>
              <Button title={I18n.t('tostrive')} onPress={() => this.props.navigation.navigate('StriveCard')}/>
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

