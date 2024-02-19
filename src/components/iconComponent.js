import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dimensions from '../utils/dimensions';
import {StyleSheet, TouchableOpacity} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';

const IconComponent = ({
  iconName,
  iconColor,
  iconSize,
  onIconPress,
  isDisabled,
  iconViewStyle,
  hitSlop,
}) => {
  const styles = useThemedStyles(style);
  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      style={iconViewStyle}
      disabled={isDisabled}
      onPress={onIconPress}>
      <Icon
        name={iconName}
        size={iconSize ? iconSize : 20}
        color={iconColor ? iconColor : styles.iconColor}
      />
    </TouchableOpacity>
  );
};

const style = themeMode =>
  StyleSheet.create({
    iconColor: themeMode.black,
  });

export default IconComponent;
