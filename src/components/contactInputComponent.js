import {StyleSheet, View} from 'react-native';
import TextComponent from './textComponent';
import dimensions from '../utils/dimensions';
import PhoneInput from 'react-native-phone-number-input';

import useThemedStyles from '../services/useThemedStyles';
import {FontFamily, FontSize} from '../theme';

const ContactInputComponent = ({
  countryCode,
  value,
  labelStyle,
  labelText,
  ref,
  onChangeCountry,
  onChangeText,
  placeholder,
  viewStyle,
  inputStyle,
  onChangeFormattedText,
  containerStyle,
}) => {
  const styles = useThemedStyles(style);
  return (
    <View style={[styles.viewStyle, viewStyle]}>
      {labelText && (
        <TextComponent
          textStyle={[styles.labelStyle, labelStyle]}
          text={labelText}
        />
      )}

      <PhoneInput
        ref={ref}
        defaultValue={value}
        defaultCode="IN"
        layout="first"
        withShadow={false}
        autoFocus={false}
        placeholder={placeholder}
        containerStyle={[styles.containerStyle, containerStyle]}
        textContainerStyle={[styles.inputStyle, inputStyle]}
        onChangeFormattedText={onChangeFormattedText}
      />
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    labelStyle: {
      fontSize: FontSize.small,
      color: themeMode.black,
      fontFamily: FontFamily.regular,

      textAlign: 'left',
      alignItems: 'flex-start',
      lineHeight: 14,
      paddingHorizontal: 0,
    },
    containerStyle: {
      width: '100%',
      height: 50,
      backgroundColor: themeMode.white,
      elevation: 0,
    },
    viewStyle: {
      backgroundColor: themeMode.white,
      elevation: 0,
      marginLeft: dimensions.dp_15,
      marginRight: dimensions.dp_15,
      width: 'auto',
      borderBottomWidth: 1,
    },
    inputStyle: {
      backgroundColor: themeMode.transparent,
      elevation: 0,
      color: themeMode.black,
    },
  });

export default ContactInputComponent;
