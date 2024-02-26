import {StyleSheet} from 'react-native';
import {FontFamily, FontSize} from '../../../../../theme';

const style = themeMode =>
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
  });
