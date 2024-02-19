import {StyleSheet, View} from 'react-native';

import dimensions from '../utils/dimensions';
import TextComponent from './textComponent';
import IconComponent from './iconComponent';
import {Children} from 'react';

const FooterComponent = ({
  footerStyle,

  children,
}) => {
  return (
    <View style={[styles.bottomStyle]}>
      <View style={[styles.footerStyle, footerStyle]}>{children}</View>
    </View>
  );
};

const styles = themeMode =>
  StyleSheet.create({
    footerStyle: {
      backgroundColor: themeMode.lightGrey,
      height: dimensions.dp_60,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: dimensions.dp_10,
      alignItems: 'center',
      width: '100%',
    },

    titleStyle: {
      fontWeight: dimensions.fontWeights.m,
      color: themeMode.black,
      textAlign: 'center',
      marginTop: 0,
    },

    bottomStyle: {
      width: '100%',
      bottom: 0,
      position: 'absolute',
      justifyContent: 'flex-end',
      flex: 1,
    },
  });

export default FooterComponent;
