import { StyleSheet, View } from 'react-native';
import useThemedStyles from '../../../../services/useThemedStyles';
import IconComponent from '../../../../components/iconComponent';
import TextComponent from '../../../../components/textComponent';
import { FontSize, spacing } from '../../../../theme';


const TabScreen1 = ({route}) => {
  const styles = useThemedStyles(style);
  const {selectedCard} = route.params;

  return (
    <View style={styles.viewContainer}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: spacing.xs,
          marginHorizontal: spacing.xs,
        }}>
        <IconComponent
          iconName={'google-maps'}
          iconColor={styles.iconColor}
          iconSize={25}
          isDisabled={true}
        />
        <TextComponent
          text={selectedCard.details.location}
          textStyle={{
            textAlign: 'left',
            marginTop: 0,
            marginHorizontal: spacing.xs,
            fontSize: FontSize.small,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 10,
        }}>
        <IconComponent
          iconName={'phone'}
          iconColor={styles.iconColor}
          iconSize={25}
          isDisabled={true}
        />
        <TextComponent
          text={selectedCard.details.contact}
          textStyle={{
            textAlign: 'left',
            marginTop: 3,

            marginHorizontal: spacing.xs,
            fontSize: FontSize.small,
          }}
        />
      </View>
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      backgroundColor: themeMode.white,
      flex: 1,
     
    },
    iconColor: themeMode.black,
  });
export default TabScreen1;
