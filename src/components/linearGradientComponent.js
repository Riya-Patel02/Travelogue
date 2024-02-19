import LinearGradient from 'react-native-linear-gradient';
import useThemedStyles from '../services/useThemedStyles';
import { StyleSheet } from 'react-native';
import dimensions from '../utils/dimensions';

const LinearGradientComponent = ({
  colorList,
  locations,
  linearStyle,
  children,
}) => {
  const styles = useThemedStyles(style);
  return (
    <LinearGradient
      colors={colorList}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={locations}
      style={[styles.linearStyle, linearStyle]}>
      {children}
    </LinearGradient>
  );
};

const style = themeMode =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignSelf: 'center',
      height: 60,
    },
    linearStyle: {
      height: dimensions.dp_60,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: dimensions.dp_10,
      alignItems: 'center',
    },
  });

export default LinearGradientComponent;
