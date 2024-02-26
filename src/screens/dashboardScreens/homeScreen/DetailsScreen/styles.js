import { StyleSheet } from 'react-native';

import dimensions from '../../../../utils/dimensions';
import { FontSize, FontFamily, hp, spacing } from '../../../../theme';

export const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
    },

    statusBg: themeMode.transparent,
    gradientBg: themeMode.headerGradient,
    headerBg: themeMode.headerGradient,
    whiteIcon: themeMode.whiteNoTheme,

    headerTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.regular,
      textAlign: 'left',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      marginTop: 0,
    },
    cardText: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      fontFamily: FontFamily.bold,
      textAlign: 'left',

      padding: 0,
      margin: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    cardSubText: {
      color: themeMode.black,
      fontSize: FontSize.small,
      marginTop: 2,
      textAlign: 'justify',
      justifyContent: 'flex-start',
    },
    cardImageStyle: {
      width: '100%',
      borderTopLeftRadius: spacing.m,
      borderTopRightRadius:spacing.m,
      objectFit: 'fill',
    },
    cardTextView: {
      backgroundColor: themeMode.backgroundGrey,
      width: '100%',
      height: hp('8%'),
      borderBottomLeftRadius: spacing.m,
      paddingLeft:spacing.xs,
      borderBottomRightRadius: spacing.m,
    },
    btnStyle: {
      // height:hp(8),
      width: '50%',
      borderRadius: 20,
      borderColor: themeMode.whiteNoTheme,
      borderWidth: 1,
      elevation: 0,
      // padding: 5,
      marginTop: 0,
     
      backgroundColor: themeMode.orangeNoTheme,
      justifyContent: 'center',

      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      boxShadowColor: themeMode.blackNoTheme,
    },
    btnTitle: {
      color: themeMode.darkBlueNoTheme,
      fontFamily: FontFamily.bold,
      fontSize: FontSize.regular,
      lineHeight: dimensions.dp_18,
      marginTop: 0,
      // padding:5,
      margin:0,
      marginBottom:0,
    
      justifyContent: 'center',
     alignSelf:'center',
     textAlign:'center',
     alignContent:'center'
      
    },
    subTitle: {
      color: themeMode.whiteNoTheme,
      fontSize: FontSize.medium,
      margin: 0,
      textAlign: 'justify',
      fontFamily: FontFamily.regular,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    paginationDefaultColor: themeMode.orangeNoTheme,
    paginationActiveColor: themeMode.darkBlueNoTheme,
  });
