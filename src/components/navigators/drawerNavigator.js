import {createDrawerNavigator} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from '../customDrawer';

import TabNavigator from './tabNavigator';
import {
  FontFamily,
  FontSize,
  hp,
  iconNames,
  routeKeys,
  strings,
} from '../../theme';
import {useContext} from 'react';
import {ThemeContext} from '../../themeProvider';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({initialRouteName}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      drawerContent={props => <CustomDrawer {...props} />
    
    }
      // backBehavior="order"
      screenOptions={({route}) => {
        return {
          drawerIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === routeKeys.HOMESTACK) {
              iconName = iconNames.ionicons.home;
            } else if (route.name === routeKeys.FAVSTACK) {
              iconName = iconNames.ionicons.heart;
            } else if (route.name === routeKeys.BOOKINGSTACK) {
              iconName = iconNames.ionicons.calender;
            } else if (route.name === routeKeys.SETTINGSSTACK) {
              iconName = iconNames.ionicons.settings;
            }

            return (
              <Ionicons
                name={iconName}
                size={25}
                color={color}
                style={{
                  marginRight: -20,
                  height: hp(5),
                }}
              />
            );
          },
          swipeEnabled: false,
          drawerActiveBackgroundColor: theme.colors.transparent,
          drawerActiveTintColor: theme.colors.orangeNoTheme,
          drawerInactiveTintColor: theme.colors.whiteNoTheme,
          drawerItemStyle: {
            padding: 0,
            margin: 0,
            height: hp(5),
            justifyContent: 'center',
          },
          drawerLabelStyle: {
            fontFamily: FontFamily.regular,
            fontSize: FontSize.regular,
            padding: 0,
            marginLeft: 0,
            lineHeight: 25,
            height: hp(5),
        
          },
          drawerStyle: {
            backgroundColor: theme.colors.purple200,
            margin: 0,
            flex: 1,
          },
          drawerType: 'back',
          unmountOnBlur: true,
        };
      }}>
      <Drawer.Screen
        name={routeKeys.HOMESTACK}
        children={() => <TabNavigator initialRouteName={routeKeys.HOMEKEY} />}
        options={{
          drawerLabel: strings.homeScreen,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={routeKeys.FAVSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.FAVORITESKEY} />
        )}
        options={{
          drawerLabel: strings.favScreen,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={routeKeys.BOOKINGSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.BOOKINGHISTORYKEY} />
        )}
        options={{
          drawerLabel: strings.bookScreen,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={routeKeys.SETTINGSSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.SETTINGSKEY} />
        )}
        options={{
          drawerLabel: strings.settingsScreen,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
