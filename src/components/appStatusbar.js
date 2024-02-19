import { StatusBar, View } from 'react-native';

const AppStatusbar = ({backgroundColor, ...props}) => {
  return (
    <View
      style={{
        // height: StatusBar.currentHeight,
      }}>
      <StatusBar
        backgroundColor={backgroundColor}
        translucent={true}
        {...props}
      />
    </View>
  );
};

export default AppStatusbar;
