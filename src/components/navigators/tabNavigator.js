import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingHistoryScreen from '../../screens/dashboardScreens/bookingHistoryScreens.js/bookingHistoryScreen';
import FavoritesScreen from '../../screens/dashboardScreens/favoritesScreen/favoritesScreen';

import HomeScreen from '../../screens/dashboardScreens/homeScreen/homeScreen';
import SettingsScreen from '../../screens/dashboardScreens/settingsScreen/settingsScreen';

import {
  hp,
  routeKeys,
  iconNames,
  FontSize,
  FontFamily,
  strings,
} from '../../theme';
import { ThemeContext } from '../../themeProvider';
import BookingDetailsScreen from '../../screens/dashboardScreens/homeScreen/bookingScreen/bookingDetailsScreen/bookingDetailsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({initialRouteName}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size, onPress}) => {
          let iconName = '';

          if (route.name === routeKeys.HOMEKEY) {
            iconName = focused
              ? iconNames.ionicons.home
              : iconNames.ionicons.home_outline;
          } else if (route.name === routeKeys.FAVORITESKEY) {
            iconName = focused
              ? iconNames.ionicons.heart
              : iconNames.ionicons.heart_outline;
          } else if (route.name === routeKeys.BOOKINGHISTORYKEY) {
            iconName = focused
              ? iconNames.ionicons.calender
              : iconNames.ionicons.calender_outline;
          } else if (route.name === routeKeys.SETTINGSKEY) {
            iconName = focused
              ? iconNames.ionicons.settings
              : iconNames.ionicons.settings_outline;
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? size : 22}
              color={color}
              onPress={onPress}
              style={{
                marginTop: hp('1%'),
              }}
            />
          );
        },
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: theme.colors.purple200,
          alignContent: 'center',
          height: hp('9%'),
          elevation: 0,
        },
        tabBarActiveTintColor: theme.colors.orange,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: theme.colors.whiteNoTheme,

        tabBarLabelStyle: {
          padding: 0,
          marginBottom: hp('1%'),
          fontSize: FontSize.small,
          fontFamily: FontFamily.bold,
        },
      })}>
      <Tab.Screen
        name={routeKeys.HOMEKEY}
        component={HomeScreen}
        options={{
          
          tabBarLabel: strings.bottomTabs.home,
          headerTitle: '',
          lazy: false
        }}
      />
      <Tab.Screen
        name={routeKeys.FAVORITESKEY}
        component={FavoritesScreen}
        options={{
          tabBarLabel: strings.bottomTabs.fav,
          headerTitle: '',
        }}
      />
      <Tab.Screen
        name={routeKeys.BOOKINGHISTORYKEY}
        component={BookingDetailsScreen}
        options={{
          tabBarLabel: strings.bottomTabs.book,
          headerTitle: '',
        }}
      />
      <Tab.Screen
        name={routeKeys.SETTINGSKEY}
        component={SettingsScreen}
        options={{
          tabBarLabel: strings.bottomTabs.settings,
          headerTitle: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
