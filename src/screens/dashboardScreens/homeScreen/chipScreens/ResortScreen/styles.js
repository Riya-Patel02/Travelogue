import {StyleSheet} from 'react-native';

import {FontSize, FontFamily, spacing, hp} from '../../../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },

    statusBg: themeMode.transparent,
    headerBg: themeMode.headerGradient,
    whiteIcon: themeMode.whiteNoTheme,
    redIcon: themeMode.red,

    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      textAlign: 'center',
      justifyContent: 'center',
      fontFamily: FontFamily.bold,
      marginTop: 0,
    },
    cardText: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.bold,
      textAlign: 'left',
      marginBottom: 0,
      justifyContent: 'flex-start',
    },
    cardSubText: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.small,
      marginTop: 0,
      textAlign: 'center',
   
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cardImageStyle: {
      width: '100%',
      borderTopLeftRadius: spacing.m,
      borderTopRightRadius: spacing.m,
      objectFit: 'fill',
    },
    cardTextView: {
      justifyContent: 'center',
      width: '100%',
      margin: 0,
      height: hp('8%'),
      borderBottomLeftRadius: spacing.m,
      paddingLeft: spacing.xxs,
      borderBottomRightRadius: spacing.m,
    },
  });
