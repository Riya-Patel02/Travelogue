import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/authScreens/loginScreen/loginScreen';
import SignupScreen from './src/screens/authScreens/signupScreen/signupScreen';
import DrawerNavigator from './src/components/navigators/drawerNavigator';
import themes from './src/theme/themes';
import ResortScreen from './src/screens/dashboardScreens/homeScreen/chipScreens/ResortScreen/resortScreen';
import MountainScreen from './src/screens/dashboardScreens/homeScreen/chipScreens/MountainScreen/mountainScreen';
import RecommendedScreen from './src/screens/dashboardScreens/homeScreen/chipScreens/RecommendedScreen/recommendedScreen';
import DetailsScreen from './src/screens/dashboardScreens/homeScreen/DetailsScreen/detailsScreen';
import Beach from './src/screens/dashboardScreens/homeScreen/chipScreens/BeachesScreen/beach';
import {constants, routeKeys, strings} from './src/theme';
import ThemeProvider from './src/themeProvider';
import ProfileScreen from './src/screens/dashboardScreens/settingsScreen/profileScreen/profileScreen';
import {handleAsyncReadData} from './src/services/storeAsyncData';
import LanguageSelectionScreen from './src/screens/languageSelectionScreen/languageSelectionScreen';
import {Provider as StoreProvider, useSelector} from 'react-redux';
import LanguageScreen from './src/screens/dashboardScreens/settingsScreen/languageScreen/languageScreen';
import {reduxStore, persister} from './src/redux/store/reduxStore';
import {selectIsLoggedIn} from './src/redux/slices/authSlice';
import {PersistGate} from 'redux-persist/integration/react';
import {AppState} from 'react-native';
import RNRestart from 'react-native-restart';
import BookingScreen from './src/screens/dashboardScreens/homeScreen/bookingScreen/bookingScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const token = useSelector(selectIsLoggedIn);
  const appTheme = useTheme();
  console.log('tok', token);
  return (
    <ThemeProvider
      children={
        <NavigationContainer theme={appTheme.dark ? themes.dark : themes.light}>
          <Stack.Navigator
            initialRouteName={
              token === true ? routeKeys.HOMEKEY : routeKeys.LANGUAGESELECTION
            }>
            <Stack.Screen
              name={routeKeys.LANGUAGESELECTION}
              component={LanguageSelectionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={routeKeys.LOGINKEY}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={routeKeys.SIGNUPKEY}
              component={SignupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={routeKeys.HOMEKEY}
              children={() => (
                <DrawerNavigator initialRouteName={routeKeys.HOMESTACK} />
              )}
              options={{
                headerTitle: '',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routeKeys.RESORTSTACK}
              component={ResortScreen}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name={routeKeys.BEACHSTACK}
              children={Beach}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name={routeKeys.MOUNTAINSTACK}
              children={MountainScreen}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name={routeKeys.RECOMMENDEDSTACK}
              children={RecommendedScreen}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name={routeKeys.DETAILSSCREEN}
              children={DetailsScreen}
              options={{
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name={routeKeys.PROFILEKEY}
              children={ProfileScreen}
              options={{
                headerTitle: '',
              }}
            />

            <Stack.Screen
              name={routeKeys.settings.LANGUAGESCREEN}
              children={LanguageScreen}
              options={{
                headerTitle: '',
              }}
            />

            <Stack.Screen
              name={routeKeys.BOOKINGKEY}
              children={BookingScreen}
              options={{
                headerTitle: '',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      }
    />
  );
};

const App = ({}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //       RNRestart.restart()
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [lang] = await Promise.all([
  //         handleAsyncReadData(constants.storageKeys.SAVEDLANGUAGE),
  //       ]);

  //       // Set language
  //       if (lang != null) {
  //         console.log('appLang', lang);
  //         strings.setLanguage(lang);
  //       } else {
  //         strings.setLanguage('en'); // Default language
  //         console.log('done');
  //       }

  //       // Set login status
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // console.log('state', appState.current);
  //   fetchData();
  // }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          // RNRestart.restart();
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);

        // Fetch data when the app state changes
        try {
          const [lang] = await Promise.all([
            handleAsyncReadData(constants.storageKeys.SAVEDLANGUAGE),
          ]);

          // Set language
          if (lang != null) {
            console.log('appLang', lang);
            strings.setLanguage(lang);
          } else {
            strings.setLanguage('en'); // Default language
            console.log('done');
          }

          // Set login status
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    );

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <StoreProvider store={reduxStore}>
      <PersistGate persistor={persister} loading={null}>
        <RootNavigation />
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
