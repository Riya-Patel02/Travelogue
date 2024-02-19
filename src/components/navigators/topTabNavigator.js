import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TabScreen1 from '../../screens/dashboardScreens/homeScreen/tabScreens/tabScreen1';
import TabScreen2 from '../../screens/dashboardScreens/homeScreen/tabScreens/tabScreen2';
import TabScreen3 from '../../screens/dashboardScreens/homeScreen/tabScreens/tabScreen3';
import {useTheme} from '@react-navigation/native';
import {routeKeys, FontFamily, FontSize,strings} from '../../theme';
import {createContext, useContext} from 'react';
import {ThemeContext} from '../../themeProvider';


const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = ({route, navigation}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <TopTab.Navigator
      initialRouteName={routeKeys.TAB1}
      screenOptions={({}) => ({
        tabBarStyle: {
          elevation: 0,
          backgroundColor: theme.colors.white,
        },
        tabBarItemStyle: {
          fontSize: FontSize.regular,
        },

        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.orangeNoTheme,
        },
        tabBarLabelStyle: {
          fontFamily: FontFamily.bold,
        },

        tabBarActiveTintColor: theme.colors.orangeNoTheme,

        swipeEnabled: true,
      })}>
      <TopTab.Screen
        name={routeKeys.TAB1}
        children={() => <TabScreen1 route={route} />}
        options={{
          tabBarLabel: strings.topTabs.location,
        }}
      />
      <TopTab.Screen
        name={routeKeys.TAB2}
        children={() => <TabScreen2 route={route} navigation={navigation} />}
        options={{
          tabBarLabel: strings.topTabs.ratings,
        }}
      />
      <TopTab.Screen
        name={routeKeys.TAB3}
        children={() => <TabScreen3 route={route} />}
        options={{
          tabBarLabel: strings.topTabs.services,
        }}
      />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
