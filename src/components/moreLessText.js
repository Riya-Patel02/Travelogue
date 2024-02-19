// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';
import {useState} from 'react';
import {FontFamily, FontSize} from '../utils/typography';
import TextComponent from './textComponent';

const MoreLessTextComponent = ({
  data,
  numberOfLines,
  textStyle,
  isExpanded,
  toggleExpanded,
}) => {
  const styles = useThemedStyles(style);

  const [clippedText, setClippedText] = useState('');

  return clippedText ? (
    <Text style={[styles.textStyle, textStyle]}>
      {!isExpanded ? `${clippedText} ` : data}

      <Text
        style={styles.showMoreText}
        onPress={() => toggleExpanded(!isExpanded)}>
        {isExpanded ? '...Read Less' : '...Read More'}
      </Text>
    </Text>
  ) : (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.textStyle, textStyle]}
      onTextLayout={event => {
        const {lines} = event.nativeEvent;

        let text = lines
          .splice(0, numberOfLines)
          .map(line => line.text)
          .join('');

        setClippedText(text.substring(0, text.length - 8));
      }}>
      {data}
    </Text>
  );
};

const style = themeMode =>
  StyleSheet.create({
    textStyle: {
      color: themeMode.black,
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular,
      textAlign: 'justify',
    },
    showMoreText: {
      color: themeMode.orangeNoTheme,
      fontSize: FontSize.small,
      fontFamily: FontFamily.bold,
    },
  });

export default MoreLessTextComponent;
