import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, hp, spacing, strings, wp} from '../../../theme';

const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.whiteNoTheme,
      height: 'auto',
     
      elevation: 4,
    },
    rowContainer: {
      flexDirection: 'row',
      marginTop: spacing.xs,
      paddingHorizontal: spacing.s,
 
      alignSelf: 'center',
      width: '100%',

      alignContent: 'center',
    },
    forgotPass: {
      color: themeMode.darkBlueNoTheme,
      marginTop: 0,
    
      flex: 1,
      textDecorationLine: 'none',
      fontSize: FontSize.xsmall,
      justifyContent: 'flex-end',
      textAlign: 'right',
      alignContent: 'flex-end',
      fontFamily:FontFamily.bold,
      lineHeight: 22,
    },
    rememberMe: {
      color: themeMode.darkBlueNoTheme,
      fontSize: FontSize.xsmall,
      marginTop: 0,
     
      justifyContent: 'flex-start',
      textAlign: 'left',
      alignContent: 'center',
      fontFamily:FontFamily.bold,
      lineHeight: 22,
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
      marginTop: hp(3),
      backgroundColor: themeMode.orangeNoTheme,

      boxShadowColor: themeMode.blackNoTheme,
    },
    createAcc: {
      color: themeMode.darkBlueNoTheme,
      marginTop: spacing.m,
      fontSize: FontSize.small,
      fontFamily: FontFamily.bold,
      justifyContent: 'center',
      textAlign: 'center',
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
    iconColor: themeMode.darkBlueNoTheme,

    uncheckedCheckBoxColor: themeMode.darkBlueNoTheme,

    checkedCheckBoxColor: themeMode.orangeNoTheme,

    orangeText: themeMode.orangeNoTheme,

    statusBg: themeMode.transparent,
    errorBg: themeMode.lightGrey,
    errorStyle: {
      color: themeMode.red,
      marginTop: 0,
      paddingBottom: 0,
      marginLeft: spacing.r,
      alignContent: 'flex-start',
      textAlign: 'left',
      fontSize: FontSize.small,
      fontFamily: strings.fontFamily,
    },
    customLabelStyles: {
      fontSizeFocused: FontSize.xsmall,
      fontSizeBlurred: FontSize.xsmall,
    },
  });

export default style;
