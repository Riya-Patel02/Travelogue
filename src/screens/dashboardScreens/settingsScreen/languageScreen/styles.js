import {StyleSheet} from 'react-native';
import {
  FontSize,
  FontFamily,
  ho,
  vo,
  hp,
  wp,
  spacing,
  strings,
} from '../../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    bodyContainer: {
    
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: themeMode.whiteNoTheme,
      elevation: 0,
    },

    whiteBg: themeMode.whiteNoTheme,

    blackText: themeMode.blackNoTheme,
    cardBg: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
  
      height: hp(7),
      alignItems: 'center',
      alignSelf: 'flex-start',
  
      borderRadius: 10,
    },

    linearStyle: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: themeMode.headerGradient,
      alignItems: 'flex-start',
      borderRadius: 10,
    },
    darkBlueColor: themeMode.darkBlueNoTheme,

    placeholderColor: themeMode.blackNoTheme,
    statusBg: themeMode.transparent,
    headerBg: themeMode.headerGradient,

    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },
    whiteIcon: themeMode.whiteNoTheme,
    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: FontFamily.bold,
      marginTop: 0,
    },

    cardSubTitle: {
      color: themeMode.whiteNoTheme,
      textAlign: 'left',
      justifyContent: 'flex-start',
      marginTop: 0,
      fontSize: FontSize.small,
        width: wp(80),
    },
  });
