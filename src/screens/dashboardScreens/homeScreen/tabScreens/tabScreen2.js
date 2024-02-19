import { StyleSheet, View } from 'react-native';
import useThemedStyles from '../../../../services/useThemedStyles';
import TextComponent from '../../../../components/textComponent';
import { FontFamily, FontSize } from '../../../../utils/typography';
import CustomRatingsBar from '../../../../components/customRatingsBar';
import IconComponent from '../../../../components/iconComponent';
import { useEffect } from 'react';

const TabScreen2 = ({route, navigation}) => {
  const styles = useThemedStyles(style);
  const {selectedCard} = route.params;

  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: () => {
        <IconComponent iconName={'star'} />;
      },
    });
  });
  return (
    <View style={styles.viewContainer}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 10,
          justifyContent: 'flex-start',
        }}>
        <TextComponent
          text={'Ratings'}
          textStyle={{
            textAlign: 'left',
            marginTop: 5,
            fontSize: FontSize.small,
            fontFamily: FontFamily.bold,
          }}
        />
        <CustomRatingsBar
          ratings={selectedCard.details.ratings}
          isDisabled={true}
        />
      </View>
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1
    
    },
    iconColor: themeMode.black,
  });
export default TabScreen2;
