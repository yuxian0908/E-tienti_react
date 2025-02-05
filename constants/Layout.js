import { Dimensions } from 'react-native';
import { Constants } from 'expo';

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BUTTON_GROUP_STYLES = {
  containerStyle: {
    height: 40,
    width: SCREEN_WIDTH * 0.9
  },
  buttonStyle: {
    backgroundColor: 'white'
  },
  selectedTextStyle: {
    color: 'orange',
    fontWeight: '900'
  },
  logoStyle : {
    marginTop: 0,
    marginLeft: 10,
    width: 40,
    height: 40
  },
  backIconStyle : {
    marginRight: 10,
    marginTop: 0,
    marginLeft: 10,
    width: 40,
    height: 40
  }
};
