import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextComponent from './textComponent';
import {FontFamily, FontSize} from '../utils/typography';
import useThemedStyles from '../services/useThemedStyles';
import {hp} from '../theme';

const ButtonComponent = ({
  btnTitle,
  btnTitleStyle,
  btnStyle,
  btnOnPress,
  btnIconName,
  btnIconSize,
  btnIconColor,
  isDisabled,
}) => {
  const styles = useThemedStyles(style);
  return (
    <TouchableOpacity
      onPress={btnOnPress}
      style={[styles.btnStyle, btnStyle]}
      disabled={isDisabled}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          paddingHorizontal: 0,
        }}>
        {btnIconName != undefined && (
          <Icon name={btnIconName} size={btnIconSize} color={btnIconColor} />
        )}
        <TextComponent
          text={btnTitle}
          textStyle={[styles.titleStyle, btnTitleStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = themeMode =>
  StyleSheet.create({
    btnStyle: {
      height: hp(5),
      color: themeMode.darkGreen,
      elevation: 4,
      borderColor: themeMode.white,

      justifyContent: 'center',

      borderRadius: 10,
      paddingHorizontal: 0,
      shadowColor: themeMode.black,
      width: '100%',
    },
    titleStyle: {
      color: themeMode.white,
      fontFamily: FontFamily.regular,
      alignSelf: 'center',
      fontSize: FontSize.medium,
    },
  });

export default ButtonComponent;
