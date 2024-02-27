import { StyleSheet } from 'react-native';

import { FontSize, FontFamily, hp, spacing } from '../../../theme';


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
      fontSize: FontSize.small,
      fontFamily: FontFamily.bold,
      textAlign: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 0,
      alignSelf: 'center',
      
    },
    cardSubText: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.regular,
      marginTop: 0,
      textAlign: 'center',
      
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cardImageStyle: {
      width: 'auto',
      borderTopLeftRadius: spacing.m,
      borderTopRightRadius: spacing.m,
      objectFit: 'fill',
    },
    cardTextView: {
      justifyContent: 'center',
      width: '100%',
      margin: 0,
      
      height: hp(8),
      borderBottomLeftRadius: 20,
     
      borderBottomRightRadius: 20
    },
  });
