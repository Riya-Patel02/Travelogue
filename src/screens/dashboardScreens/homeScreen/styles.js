import {StyleSheet} from 'react-native';
import {FontSize, hp, FontFamily, ho} from '../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },
    searchView: {
      marginTop: hp('2%'),
      height: hp('6%'),
      backgroundColor: themeMode.backgroundGrey,
      marginHorizontal: ho(10),
      borderRadius: 30,
      borderWidth: 1,
      padding: 0,
      borderColor: themeMode.backgroundGrey,
    },
    statusBg: themeMode.transparent,

    headerBg: themeMode.headerGradient,

    whiteIcon: themeMode.whiteNoTheme,
    blackText: themeMode.blackNoTheme,
    whiteText: themeMode.whiteNoTheme,
    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: FontFamily.bold,
      marginTop: 0,
    },

    cardTitle: {
      fontSize: FontSize.regular,
      fontFamily: FontFamily.bold,
      marginTop: 0,
      textAlign: 'justify',
      color: themeMode.whiteNoTheme,
    },
    cardSubTitle: {
      fontSize: FontSize.xsmall,
      marginTop: 2,
      color: themeMode.whiteNoTheme,
      textAlign: 'left',
      width: '100%',
    },

    scrollContentStyle: {
      backgroundColor: themeMode.white,
    },
    activityIndicatorColor: themeMode.orange,
  });
