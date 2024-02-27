import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './tabNavigator';
import { routeKeys } from '../../theme';

const Stack = createStackNavigator();

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={routeKeys.HOMEKEY}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routeKeys.HOMESTACK}
        children={() => <TabNavigator initialRouteName={routeKeys.HOMEKEY} />}
      />
    </Stack.Navigator>
  );
};

export const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routeKeys.FAVORITESKEY}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeKeys.FAVSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.FAVORITESKEY} />
        )}
      />
    </Stack.Navigator>
  );
};

export const BookingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routeKeys.BOOKINGHISTORYKEY}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeKeys.BOOKINGSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.BOOKINGHISTORYKEY} />
        )}
      />
    </Stack.Navigator>
  );
};

export const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routeKeys.HOMEKEY}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeKeys.SETTINGSSTACK}
        children={() => (
          <TabNavigator initialRouteName={routeKeys.SETTINGSKEY} />
        )}
      />
    </Stack.Navigator>
  );
};


