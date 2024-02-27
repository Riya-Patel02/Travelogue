import {StyleSheet} from 'react-native';
import {
  vo,
  ho,
  hp,
  FontFamily,
  FontSize,
  spacing,
  strings,
  wp,
} from '../../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    statusBg: themeMode.transparent,
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },
    whiteIcon: themeMode.whiteNoTheme,
    headerBg: themeMode.headerGradient,
    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: FontFamily.bold,
      marginTop: 0,
    },

    cardContainer: {
      backgroundColor: themeMode.lightGrey,
    },
    errorStyle: {
      color: 'red',
   
      paddingLeft: 5,
      fontFamily: FontFamily.regular,
      height: 'auto',
    },
    btnTitle: {
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.medium,

      marginTop: 0,
    },
    btnStyle: {
      height: hp(5),
      width: wp(93),
      borderRadius: 5,
      borderColor: themeMode.whiteNoTheme,
      borderWidth: 1,
    
      marginTop: hp(5),

      backgroundColor: themeMode.orangeNoTheme,
      boxShadowColor: themeMode.blackNoTheme,
    },
  });
