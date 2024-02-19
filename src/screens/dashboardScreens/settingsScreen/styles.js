import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, ho, hp, spacing, vo, wp} from '../../../theme';

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
    accountText: {
      color: themeMode.black,
      textAlign: 'left',
      justifyContent: 'flex-start',
      fontFamily: FontFamily.bold,
      marginTop: 0,
      fontSize: FontSize.xmedium,
    },
    titleText: {
      color: themeMode.black,
      textAlign: 'left',
      justifyContent: 'flex-start',
      marginTop: 0,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.regular,
    },
    subTitleText: {
      color: themeMode.grey,
      textAlign: 'left',
      justifyContent: 'flex-start',
      marginTop: 0,
      fontSize: FontSize.regular,
    },
    profile: {
      height: vo(76),
      width: ho(76),
      borderRadius: 38,
      borderWidth: 1,
      resizeMode: 'cover',
      borderColor: themeMode.blackNoTheme,
      marginTop: 5,
      alignSelf: 'center',
      objectFit: 'fill',
    },
    dummyProfile: {
      height: vo(76),
      width: ho(76),
      borderRadius: 38,
      justifyContent: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: themeMode.black,
      backgroundColor: themeMode.lightGrey,
    },

    forwardIcon: themeMode.black,
    seperatorStyle: {
      borderWidth: 0.5,
      borderColor: 'grey',
      width: '100%',
    },
    activeThumbColor: themeMode.orange,
    inactiveThumbColor: themeMode.grey,
    thumbBgColor: themeMode.white,
    settingsIcon: themeMode.orange,
    initialText: {
      color: themeMode.whiteNoTheme,
      textAlign: 'right',
      alignSelf: 'flex-end',
      marginTop: 0,
      fontSize: FontSize.small,

      padding: 5,
    },

    cardTitleBg: {
      // padding: 5,
      // borderTopWidth: 1,
      // borderBottomWidth: 1,
      // backgroundColor: themeMode.lightPurple,
    },
    cardSubTitle: {
      color: themeMode.whiteNoTheme,
      textAlign: 'left',
      justifyContent: 'flex-start',
      marginTop: 0,
      fontSize: FontSize.small,
      marginLeft: spacing.xs,
    },
    cardBg: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: 'auto',
      height: hp(7),
      alignItems: 'center',
      backgroundColor: themeMode.headerGradient,
      padding: 5,
      borderRadius: 10,
    },
  });
