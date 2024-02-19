import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMEssage => {
  console.log('killed state notifications', remoteMEssage);
});

AppRegistry.registerComponent(appName, () => App);
