import {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {FloatingLabelInput} from 'react-native-floating-label-input';

import useThemedStyles from '../services/useThemedStyles';
import {FontFamily, FontSize, hp, iconNames, spacing} from '../theme';
import IconComponent from './iconComponent';
import TextComponent from './textComponent';

///reusable textinput with icon component
function FloatingTextInputIconComponent({
  placeholder,
  keyboardType,
  labelText,
  onChangeText,
  inputMode,
  isPassword,
  returnType,
  nextRef,
  onSubmitEditing,
  onEndEditing,
  error,
  param,
  value,
  containerStyle,
  inputStyle,
  errorStyle,
  leftChildren,
  labelStyle,
  rightChildren,
  togglePassword,
  onTogglePassword,
  viewStyle,
  editable,
  onMagicTap,
  staticLabel,
  customLabelStyles,
  onBlur,
  hintTextColor,
  toggleIconColor,
  onFocus,
  showTopLabel,
  topLabel,
  topLabelStyle,
  isFocused,
  blurOnSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [hasFocus, setHasFocus] = useState(false);
  const styles = useThemedStyles(style);
  return (
    <View style={[styles.viewStyle, viewStyle]}>
      {showTopLabel && (
        <TextComponent
          textStyle={[styles.topLabelStyle, topLabelStyle]}
          text={topLabel}
        />
      )}

      <FloatingLabelInput
        label={labelText}
        labelProps={{}}
        labelStyles={[styles.labelStyle, labelStyle]}
        hint={placeholder}
        hintTextColor={hintTextColor ? hintTextColor : styles.hintText}
        leftComponent={leftChildren != undefined ? leftChildren : null}
        rightComponent={rightChildren ? rightChildren : null}
        ref={nextRef}
        inputMode={inputMode}
        keyboardType={keyboardType}
        value={value}
        customLabelStyles={[styles.customLabelStyles, customLabelStyles]}
        isFocused={isFocused ? isFocused : false}
        editable={editable}
        onMagicTap={onMagicTap}
        underlineColorAndroid={styles.hideUnderline}
        containerStyles={[styles.containerStyle, containerStyle]}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnType}
        autoFocus={false}
        onChangeText={text => onChangeText(text)}
        onEndEditing={onEndEditing}
        inputStyles={[styles.inputStyle, inputStyle]}
        isPassword={isPassword}
        staticLabel={staticLabel != undefined ? staticLabel : false}
        togglePassword={showPassword}
        showPasswordContainerStyles={{}}
        blurOnSubmit={returnType == 'done' ? true : false}
        customHidePasswordComponent={
          <IconComponent
            iconName={iconNames.eye}
            iconColor={toggleIconColor ? toggleIconColor : styles.darkBlueColor}
            onIconPress={togglePasswordVisibility}
            iconSize={20}
            iconViewStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: spacing.xxs,
            }}
          />
        }
        onFocus={onFocus}
        onBlur={onBlur}
        customShowPasswordComponent={
          <IconComponent
            iconName={iconNames.eyeOff}
            iconColor={toggleIconColor ? toggleIconColor : styles.darkBlueColor}
            onIconPress={togglePasswordVisibility}
            iconSize={20}
            iconViewStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: spacing.xxs,
            }}
          />
        }
      />

      {error != null && error[param] != undefined && (
        <Text style={[styles.errorStyle, errorStyle]}>{error[param]}</Text>
      )}
    </View>
  );
}

const style = themeMode =>
  StyleSheet.create({
    labelStyle: {
      fontSize: FontSize.small,
      color: themeMode.black,
      fontFamily: FontFamily.bold,
      textAlign: 'left',
      alignItems: 'center',
      height: 'auto',
      alignContent: 'center',
    },
    inputStyle: {
      color: themeMode.blackNoTheme,
      fontSize: FontSize.small,
      textDecorationLine: 'none',
      textDecorationColor: themeMode.transparent,
     
      fontFamily: FontFamily.regular,
      justifyContent: 'flex-start',
      textAlign: 'left',
      alignContent: 'center',
      padding: spacing.r,
      paddingLeft: spacing.xxs,
      marginTop: spacing.xxs,
      paddingBottom: 0,


    },
    containerStyle: {
     
      borderRadius: 5,
      borderColor: themeMode.blackText,
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      padding: 0,
      alignItems: 'center',

      height: 'auto',
    },
    errorStyle: {
      color: 'red',
      marginTop: spacing.xxs,
      paddingLeft: 5,
      fontFamily: FontFamily.regular,
      height: 'auto',
    },
    viewStyle: {
      paddingLeft: spacing.xs,
      paddingRight: spacing.xs,
      justifyContent: 'flex-start',

      marginBottom: 2,

      height: 'auto',
    },
    customLabelStyles: {
      leftFocused: spacing.xxs,
      colorFocused: themeMode.darkBlueNoTheme,
      colorBlurred: themeMode.darkBlueNoTheme,
      fontSizeFocused: FontSize.xsmall,
      fontSizeBlurred: FontSize.xsmall,
    },
    darkBlueColor: themeMode.darkBlueNoTheme,

    hintText: themeMode.grey,
    hideUnderline: themeMode.transparent,
    topLabelStyle: {
      fontSize: FontSize.small,
      color: themeMode.black,
      fontFamily: FontFamily.bold,
   
      textAlign: 'left',
      alignItems: 'center',
      lineHeight: 24,
      height: 'auto',
      alignContent: 'center',
    },
  });
export default FloatingTextInputIconComponent;
