import {StyleSheet} from 'react-native';

import {
  hp,
  FontFamily,
  FontSize,
  spacing,
  strings,
  vo,
  ho,
  wp,
} from '../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    bodyContainer: {
      // flex: 1,
      // height: 'auto',

      // margin: spacing.m,
      elevation: 4,
      // paddingBottom: 0,
      // marginBottom: 5,
      flex: 1,
      backgroundColor: themeMode.whiteNoTheme,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: themeMode.whiteNoTheme,
    
      elevation: 0,
    },
    phoneContainer: {
      width: '100%',
      height: vo(30),
      backgroundColor: themeMode.whiteNoTheme,
      elevation: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      color: themeMode.darkBlueNoTheme,
      marginTop: 5,
    },
    textInputStyle: {
      width: '100%',
      color: themeMode.darkBlueNoTheme,
      fontSize: FontSize.small,
      fontFamily: FontFamily.regular,

      padding: 0,
    },
    textContainer: {
      paddingVertical: 0,
      backgroundColor: themeMode.whiteNoTheme,
      elevation: 0,
      lineHeight: 14,
      color: themeMode.blackNoTheme,
      fontSize: FontSize.small,
    },
    errorStyle: {
      color: themeMode.red,
      marginTop: spacing.xxs,
      paddingBottom: 0,
      marginLeft: spacing.r,
      fontFamily: strings.fontFamily,
    },
    profile: {
      borderRadius: 55,
      height: 110,
      width: 110,
      borderWidth: 1,
      resizeMode: 'cover',
      borderColor: themeMode.blackNoTheme,
      marginTop: 5,
      alignSelf: 'center',
      objectFit: 'cover',
      overflow: 'hidden',
    },
    dummyProfile: {
      borderRadius: 55,
      width: ho(110),
      height: vo(110),
      tintColor: themeMode.grey,
      borderWidth: 1,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    btnTitle: {
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.medium,
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: 0,
      alignSelf: 'center',
    },
    btnStyle: {
      height: hp(5),
      width: wp(80),
      borderRadius: 0,
      borderColor: themeMode.whiteNoTheme,
      borderWidth: 1,
      margin: spacing.r,
      marginTop: hp(2),
      backgroundColor: themeMode.orangeNoTheme,

      boxShadowColor: themeMode.blackNoTheme,
    },
    title: {
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.xlarge,
    },
    subTitle: {
      color: themeMode.darkBlueNoTheme,

      marginTop: 0.2,
    },
    alreadyAccMsg: {
      color: themeMode.whiteNoTheme,
      marginTop: spacing.r,
      fontSize: FontSize.small,
      fontFamily: FontFamily.bold,
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom:spacing.r
    },
    whiteBg: themeMode.whiteNoTheme,

    blackText: themeMode.blackNoTheme,

    modalView: {
      flexDirection: 'column',
      height: 'auto',
      justifyContent: 'space-evenly',
      bottom: 0,
      borderTopLeftRadius: spacing.m,
      borderTopRightRadius: spacing.m,
      backgroundColor: themeMode.whiteNoTheme,
      padding: spacing.xs,
    },
    chooseFromText: {
      color: themeMode.blackNoTheme,
      fontSize: FontSize.small,
      fontFamily: FontFamily.bold,
      textAlign: 'left',
      justifyContent: 'center',
    },
    darkBlueColor: themeMode.darkBlueNoTheme,

    optionTitle: {
      color: themeMode.darkBlueNoTheme,
      fontSize: FontSize.xsmall,
      textAlign: 'center',
    },
    modalTitle: {
      color: themeMode.darkBlueNoTheme,
      fontSize: FontSize.xsmall,
      fontFamily: FontFamily.bold,
      textAlign: 'center',
      marginTop: 0.4,
    },
    contactView: {
      backgroundColor: themeMode.whiteNoTheme,
      elevation: 0,
      marginLeft: spacing.r,
      marginRight: spacing.r,
      width: 'auto',
      borderBottomWidth: 1,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      marginTop:10,
      height:hp(7),
      
      

    },
    placeholderColor: themeMode.grey,

    countryCodeTextStyle: {
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.small,
    },
    contactLabel: {
      fontSize: FontSize.xsmall,
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      textAlign: 'left',
      alignItems: 'flex-start',
      lineHeight: 14,
      paddingHorizontal: 0,
    },
    statusBg: themeMode.transparent,
    errorBg: themeMode.lightGrey,
    signupErrorStyle: {
      color: themeMode.red,
      marginTop: 0,
      paddingBottom: 0,
      marginLeft: spacing.r,
      alignContent: 'flex-start',
      textAlign: 'left',
      fontSize: FontSize.small,
      fontFamily: strings.fontFamily,
    },

    orangeText: themeMode.orangeNoTheme,
    modalIcon: themeMode.darkBlueNoTheme,
    customLabelStyles: {
      fontSizeFocused: FontSize.xsmall,
      fontSizeBlurred: FontSize.xsmall,
    },
  });
