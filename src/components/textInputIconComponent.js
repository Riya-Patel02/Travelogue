import { useState } from 'react';
import appColors from '../utils/colors';

import { View, TextInput, StyleSheet, Text } from 'react-native';
import TextComponent from './textComponent';
import sizeDimensions from '../utils/dimensions';
import iconNames from '../utils/iconNames';

import IconComponent from './iconComponent';
import { FontFamily, FontSize } from '../utils/typography';

///reusable textinput with icon component
function TextInputIconComponent({
  placeholder,
  keyboardType,
  labelText,
  onChangeText,
  inputMode,
  iconName,
  iconSize,
  iconColor,
  isPasswordMode,
  isMandatory,
  returnType,
  nextRef,
  isIconModeOn,
  onPress,
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
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [securePasswordEntry, setSecurePasswordEntry] = useState(false);

  const getPasswordIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setSecurePasswordEntry(!securePasswordEntry);
  };

  return (
    <View style={{}}>
      {labelText && (
        <TextComponent
          textStyle={[styles.labelStyle, labelStyle]}
          text={labelText}
          isMandatory={isMandatory}
        />
      )}
      {isIconModeOn && (
        <View>
          <View style={[styles.containerStyle, containerStyle]}>
            {leftChildren != undefined && leftChildren}
            <TextInput
              style={[styles.inputStyle, inputStyle]}
              inputMode={inputMode}
              placeholderTextColor={appColors.placeholderGrey}
              secureTextEntry={securePasswordEntry}
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              underlineColorAndroid={appColors.transparent}
              returnKeyType={returnType}
              ref={nextRef}
              
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit={returnType == 'done' ? true : false}
              onEndEditing={onEndEditing}
              value={value}
            />

            {isPasswordMode && (
              <IconComponent
                onIconPress={getPasswordIcon}
                iconViewStyle={{
                  alignItems: 'flex-end',
                  padding: sizeDimensions.dp_10,
                }}
                iconName={isPasswordVisible ? iconNames.eye : iconNames.eyeOff}
                iconColor={iconColor}
                iconSize={iconSize}
              />
            )}

            {isPasswordMode == false && (
              <IconComponent
                onIconPress={onPress}
                iconViewStyle={{
                  alignItems: 'flex-end',
                  padding: sizeDimensions.dp_10,
                }}
                iconName={iconName}
                iconColor={iconColor}
                iconSize={iconSize}
              />
            )}
          </View>
          {error != null && error[param] != undefined && (
            <Text style={{color: 'red', marginTop: sizeDimensions.dp_4}}>
              {error[param]}
            </Text>
          )}
        </View>
      )}
      {isIconModeOn == false && (
        <View>
          <View
            style={{
              
              borderColor: appColors.darkGrey,
              borderWidth: sizeDimensions.dp_1,
              marginTop: sizeDimensions.dp_5,
            }}>
            <TextInput
              style={[styles.inputStyle, inputStyle]}
              inputMode={inputMode}
              placeholderTextColor={appColors.placeholderGrey}
              secureTextEntry={false}
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={text => onChangeText(text)}
              underlineColorAndroid={appColors.transparent}
              returnKeyType={returnType}
              ref={nextRef}
              blurOnSubmit={false}
              onSubmitEditing={onSubmitEditing}
              onEndEditing={onEndEditing}
            />
          </View>
          {error != null && error[param] != undefined && (
            <Text style={[styles.errorStyle, errorStyle]}>{error[param]}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: appColors.darkGreen,
    borderWidth: sizeDimensions.dp_1,
    marginTop: sizeDimensions.dp_5,
  },
  labelStyle: {
    fontSize:FontSize.regular,
    color: appColors.darkGreen,
    fontFamily: FontFamily.regular,
    fontWeight: sizeDimensions.fontWeights.l,
    textAlign: 'left',
    marginTop: sizeDimensions.dp_12,
    lineHeight: sizeDimensions.dp_18,
    justifyContent: 'flex-start',
  },
  inputStyle: {
    color: appColors.black,
    fontSize: FontSize.regular,
    textDecorationLine: 'none',
    textDecorationColor: appColors.transparent,
    fontWeight: sizeDimensions.fontWeights.xs,
    lineHeight: sizeDimensions.dp_16,
    fontFamily: FontFamily.regular,
    justifyContent: 'flex-start',
    textAlign: 'left',
    flex: 1,
    marginHorizontal: 5,
  },
  errorStyle: {color: 'red', marginTop: sizeDimensions.dp_4},
});
export default TextInputIconComponent;
