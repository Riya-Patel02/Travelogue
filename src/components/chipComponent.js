import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import dimensions from '../utils/dimensions';

import themes from '../theme/themes';
import {Image} from 'react-native';
import TextComponent from './textComponent';

import useThemedStyles from '../services/useThemedStyles';
import {spacing, FontFamily, FontSize, hp, wp} from '../theme';

const ChipComponent = ({currentIndex, chipData, onPress, viewStyle}) => {
  const styles = useThemedStyles(style);
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: spacing.r,
        marginHorizontal: 5,
        height: hp('6%'),
        justifyContent: 'center',
        marginBottom: 0,
      }}>
      <FlatList
        data={chipData}
        keyExtractor={(item, index) => 'key' + index}
        bounces
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={
          <View style={{paddingHorizontal: spacing.xxs}} />
        }
        renderItem={({item, index}) => {
          const selected = index === currentIndex;
          return (
            <View style={{}}>
              <TouchableOpacity
                style={
                  selected ? [styles.selectedChip] : [styles.unSelectedChip]
                }
                onPress={() => onPress(index)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    padding: spacing.xxs,
                  }}>
                  <Image
                    source={item.icon}
                    style={{
                      height: hp(4),
                      width: wp(8),
                      borderRadius: 15,
                    }}></Image>
                  <TextComponent
                    text={item.name}
                    textStyle={
                      selected ? [styles.selectedText] : [styles.unSelectedText]
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    selectedChip: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 5,
      paddingBottom: 0,
      borderRadius: 25,
      borderColor: themeMode.transparent,
      backgroundColor: themeMode.orange,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0,
      shadowColor: themeMode.orange,
    },
    unSelectedChip: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 5,
      paddingBottom: 0,
      borderRadius: 25,
      borderColor: themeMode.transparent,
      backgroundColor: themeMode.backgroundGrey,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0,
      shadowColor: themeMode.transparent,
    },
    selectedText: {
      fontSize: FontSize.small,
      paddingLeft: 5,
      color: themeMode.whiteNoTheme,
      marginTop: 0,
      fontFamily: FontFamily.bold,
    },
    unSelectedText: {
      fontSize: FontSize.small,
      paddingLeft: 5,
      color: themeMode.blackNoTheme,
      marginTop: 0,
      fontFamily: FontFamily.regular,
    },
    viewStyle: {
      flexDirection: 'row',
      margin: spacing.r,
      marginHorizontal: spacing.xs,
      height: hp('6%'),
      justifyContent: 'center',
      marginBottom: 0,
    },
  });
export default ChipComponent;
