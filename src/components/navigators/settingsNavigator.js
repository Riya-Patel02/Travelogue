import {createStackNavigator} from '@react-navigation/stack';
import {routeKeys} from '../../theme';
import LanguageScreen from '../../screens/dashboardScreens/settingsScreen/languageScreen/languageScreen';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routeKeys.settings.LANGUAGESCREEN}
        children={LanguageScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
