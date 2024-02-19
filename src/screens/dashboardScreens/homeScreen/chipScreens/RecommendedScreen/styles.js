import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../../../../theme';


export const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },

    statusBg: themeMode.transparent,
    headerBg: themeMode.headerGradient,
    whiteIcon: themeMode.whiteNoTheme,

    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: FontFamily.bold,
      marginTop: 0,
    },
  });
