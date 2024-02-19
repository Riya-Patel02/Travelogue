import {StyleSheet, Text} from 'react-native';

import useThemedStyles from '../services/useThemedStyles';
import { spacing,FontFamily,FontSize } from '../theme';

const TextComponent = ({text, textStyle, numberOfLines}) => {
  const styles = useThemedStyles(style);
  return (
    <Text numberOfLines={numberOfLines} style={[styles.textStyle, textStyle]}>
      {text}
    </Text>
  );
};

const style = themeMode =>
  StyleSheet.create({
    textStyle: {
      color: themeMode.black,
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular,
      textAlign: 'center',

      marginTop: spacing.xxs,
    },
  });

export default TextComponent;
