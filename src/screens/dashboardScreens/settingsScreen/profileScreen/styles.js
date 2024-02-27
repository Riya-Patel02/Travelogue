import {StyleSheet} from 'react-native';
import {
  vo,
  ho,
  hp,
  FontFamily,
  FontSize,
  spacing,
  strings
} from '../../../../theme/index';


export const style = themeMode =>
  StyleSheet.create({
    bodyContainer: {
      margin: spacing.xs,
      height: '100%',
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
      backgroundColor: themeMode.white,
      elevation: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      color: themeMode.darkBlueNoTheme,
    },
    textInputStyle: {
      width: '100%',
      color: themeMode.black,
      fontSize: FontSize.small,
      fontFamily: FontFamily.regular,
      lineHeight: 22,
      justifyContent: 'center',
      alignContent: 'center',
      padding: 0,
      alignSelf: 'center',
      margin: 0,
     
    },
    textContainer: {
      paddingVertical: 0,
      backgroundColor: themeMode.white,

      elevation: 0,
      lineHeight: 14,
      color: themeMode.blackNoTheme,
      fontSize: FontSize.small,
    },
    errorStyle: {
      color: themeMode.red,
      marginTop: spacing.xxs,
      paddingBottom: 0,
   
      paddingLeft: 2,
      fontFamily: strings.fontFamily,
    },
    profile: {
      borderRadius: 55,
      height: 110,
      width: 110,
      borderWidth: 2,
      resizeMode: 'cover',
      borderColor: themeMode.black,

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
      color: themeMode.purple200,
      fontFamily: FontFamily.bold,
      fontSize:
        strings.getLanguage() == 'fr' ? FontSize.regular : FontSize.medium,
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: 0,
      alignSelf: 'center',
    },
    btnStyle: {
      height: hp(5),
      width: 'auto',
      borderRadius: 0,
      borderColor: themeMode.whiteNoTheme,
      borderWidth: 1,

      marginTop: hp(2),
      marginBottom: hp(2),
      backgroundColor: themeMode.orange,

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
    },
    whiteBg: themeMode.whiteNoTheme,

    blackText: themeMode.blackNoTheme,

    modalView: {
      flexDirection: 'column',
      height: 'auto',
      width: '100%',
      justifyContent: 'space-evenly',
      bottom: 0,
      borderTopLeftRadius: spacing.m,
      borderTopRightRadius: spacing.m,
      backgroundColor: themeMode.lightGrey,
      position: 'absolute',

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
      color: themeMode.black,
      fontSize: FontSize.xsmall,
      fontFamily: FontFamily.bold,
      textAlign: 'center',
      marginTop: spacing.xxs,
    },
    contactView: {
      backgroundColor: themeMode.white,

      elevation: 0,
      width: '100%',
      borderWidth: 1,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      marginTop: spacing.xs,
      borderRadius: 5,
      padding: 5,
      borderColor: themeMode.black,
    },
    placeholderColor: themeMode.blackNoTheme,
    statusBg: themeMode.transparent,
    headerBg: themeMode.headerGradient,
    countryCodeTextStyle: {
      color: themeMode.black,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.small,
      backgroundColor: themeMode.white,
    },

    contactLabel: {
      fontSize: FontSize.xsmall,
      color: themeMode.black,
      fontFamily: FontFamily.bold,
      textAlign: 'left',
      alignItems: 'flex-start',
      lineHeight: 14,
      padding: 5,
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
    containerStyle: {
      borderWidth: 1,
      borderColor: themeMode.black,
    
    },
    customLabelStyles: {
      colorFocused: themeMode.black,
      colorBlurred: themeMode.black,
      fontSizeFocused: FontSize.xsmall,
      fontSizeBlurred: FontSize.xsmall,
    },
    toggleIconColor: themeMode.black,
    flagButtonStyle: {
      justifyContent: 'flex-start',
      width: 'auto',

      backgroundColor: themeMode.white,
    },
  });
