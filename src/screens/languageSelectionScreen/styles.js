import {StyleSheet} from 'react-native';
import {vo, ho, hp, FontSize, FontFamily, strings, wp, spacing} from '../../theme';

export const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      flex: 1,
      backgroundColor: themeMode.purple200,
    },
    statusBg: themeMode.transparent,
    imageStyle: {
      height: vo(100),
      width: ho(100),
      borderRadius: 50,
      alignSelf: 'center',
      objectFit: 'cover',
      marginTop: hp(30),
      resizeMode: 'cover',
    },
    titleStyle: {
      fontSize: FontSize.large,
      color: themeMode.whiteNoTheme,
    },
    subTitleStyle: {
      fontSize: FontSize.small,
      color: themeMode.whiteNoTheme,
      marginTop: 0.3,
    },
    selectionTitle: {
      fontSize: FontSize.regular,
      color: themeMode.whiteNoTheme,
      marginTop: hp(15),
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
    skipButtonStyle: {
      height: hp(5),
      width: wp(20),
      borderRadius: 30,
      borderColor: themeMode.whiteNoTheme,
      borderWidth: 1,
      marginTop: hp(2),
      marginBottom: hp(2),
      alignSelf: 'flex-end',
      backgroundColor: themeMode.lightGrey,
      boxShadowColor: themeMode.blackNoTheme,
      marginHorizontal:10,
      padding:0,
      justifyContent:'center',
      flexDirection:'row',
      alignContent:'center'
  
    },
    skipButtontitle: {
      color: themeMode.blackNoTheme,
      fontSize: FontSize.small,
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: 0,
      alignSelf: 'center',
      padding:0,
      marginLeft:spacing.xxs
      
    },
  });
