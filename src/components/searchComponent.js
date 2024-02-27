import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';

import dimensions from '../utils/dimensions';

import FloatingTextInputIconComponent from './floatingTextInputIconComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {iconNames, hp, ho, spacing} from '../theme';
import {useState} from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input';

const SearchComponent = ({
  searchVal,
  setSearchVal,

  placeholder,
  searchView,
  onBlur,
  onFocus,
}) => {
  const styles = useThemedStyles(style);
  const [isFocused, setIsFocused] = useState(false);
  const [showClear, setShowClear] = useState(false);
  console.log('se', searchVal);
  console.log('foc', isFocused);

  return (
    <FloatingTextInputIconComponent
      viewStyle={[styles.searchView, searchView]}
      returnType={'done'}
      staticLabel={true}
      value={searchVal}
      onChangeText={text => setSearchVal(text)}
      hintTextColor={styles.hintTextColor}
      containerStyle={{
        borderBottomWidth: 0,
      }}
      inputStyle={{
        lineHeight: dimensions.dp_16,
        padding: 0,
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
      customLabelStyles={{
        colorFocused: styles.blackText,
        colorBlurred: styles.blackText,
      }}
      placeholder={placeholder}
      leftChildren={
        <Ionicons
          name={iconNames.ionicons.search}
          size={20}
          color={styles.blackText}
        />
      }
      onFocus={() => setShowClear(true)}
      onSubmitEditing={() => setShowClear(false)}
      rightChildren={
        showClear && (
          <TouchableOpacity
            onPress={() => {
              setSearchVal('');
              Keyboard.dismiss();
              setShowClear(false);
            }}>
            <Ionicons
              name={iconNames.ionicons.close}
              size={20}
              color={styles.blackText}
              style={{
                padding: 0,
                margin: 0,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        )
      }
    />
  );
};

const style = themeMode =>
  StyleSheet.create({
    searchView: {
      marginTop: hp('2%'),
      height: hp('6%'),
      backgroundColor: themeMode.backgroundGrey,
      marginHorizontal: ho(10),
      borderRadius: 30,
      borderWidth: 1,
      padding: 0,
      borderColor: themeMode.backgroundGrey,
      paddingLeft: spacing.xs,
      paddingRight: spacing.xs,
      justifyContent: 'flex-start',

      marginBottom: 0,
    },
    blackText: themeMode.blackNoTheme,
    hintTextColor: themeMode.grey,
  });

export default SearchComponent;
