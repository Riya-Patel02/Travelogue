import CheckBox from 'react-native-check-box';

import { StyleSheet } from 'react-native';

import useThemedStyles from '../services/useThemedStyles';
import { FontFamily, FontSize } from '../theme';

const CheckboxComponent = ({
  isChecked,
  checkboxColor,
  rightText,
  rightTextStyle,
  leftText,
  leftTextStyle,
  onClick,
  checkedCheckBoxColor,
  uncheckedCheckBoxColor,
  checkboxStyle,
}) => {
  const styles = useThemedStyles(style);
  return (
    <CheckBox
      style={[styles.checkboxStyle, checkboxStyle]}
      checkBoxColor={checkboxColor ? checkboxColor : styles.uncheckedColor}
      isChecked={isChecked}
      rightText={rightText != undefined ? rightText : null}
      rightTextStyle={
        rightTextStyle != undefined ? rightTextStyle : styles.textStyle
      }
      leftText={leftText != undefined ? leftText : null}
      leftTextStyle={
        leftTextStyle != undefined ? leftTextStyle : styles.textStyle
      }
      onClick={onClick}
      checkedCheckBoxColor={
        checkedCheckBoxColor ? checkedCheckBoxColor : styles.checkedColor
      }
      uncheckedCheckBoxColor={
        uncheckedCheckBoxColor ? uncheckedCheckBoxColor : styles.uncheckedColor
      }
    />
  );
};

const style = themeMode =>
  StyleSheet.create({
    textStyle: {
      color: themeMode.black,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.regular,

      textAlign: 'center',
    },
    checkboxStyle: {
      justifyContent: 'flex-start',
      // padding: dimensions.dp_10,
    },
    checkedColor: themeMode.grey,

    uncheckedColor: themeMode.black,
  });

export default CheckboxComponent;
