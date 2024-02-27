import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dimensions from '../utils/dimensions';
import { hp, spacing } from '../theme';

const HeaderComponent = ({
  headerMiddleChildren,
  headerLeftChildren,
  hasSingleRightIcon,
  headerRightChildren,
  headerStyle,
  headerMiddleViewStyle,
  headerLeftViewStyle,
  headerRightViewStyle,

  colorList,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LinearGradient
        colors={colorList}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.0, 0.4, 0.6, 0.8]}
        style={[styles.headerStyle, headerStyle]}>
        {/* header left child view */}
        {headerLeftChildren && (
          <View style={[styles.basicLeftStyle, headerLeftViewStyle]}>
            {headerLeftChildren}
          </View>
        )}

        {/* header middle child view */}
        {headerMiddleChildren && (
          <View style={[styles.basicMiddleStyle, headerMiddleViewStyle]}>
            {headerMiddleChildren}
          </View>
        )}

        {/* header right child view */}
        {headerRightChildren && (
          <View
            style={[
              hasSingleRightIcon
                ? styles.basicSingleRightStyle
                : styles.basicRightStyle,
              headerRightViewStyle,
            ]}>
            {headerRightChildren}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    height: 60,
  },
  headerStyle: {
    height: hp(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: spacing.xs,
    alignItems: 'center',
  },
  basicLeftStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  basicMiddleStyle: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicRightStyle: {
 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  basicSingleRightStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderComponent;
