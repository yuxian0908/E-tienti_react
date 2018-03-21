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

import { MonoText } from '../components/StyledText';
import KeysButtons from '../components/keysbuttons';
import { HOME_SCREEN_STYLE } from '../constants/styles';

export default class HomeScreen extends React.Component {

  static navigationOptions = {

  };

  render() {
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
          <KeysButtons />
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

