import { FlatList, StyleSheet, View } from 'react-native';
import useThemedStyles from '../../../../services/useThemedStyles';
import IconComponent from '../../../../components/iconComponent';
import TextComponent from '../../../../components/textComponent';
import { FontSize } from '../../../../utils/typography';

const TabScreen3 = ({route}) => {
  const styles = useThemedStyles(style);
  const facilities = require('../../../../data/jsonData/hotelFacilities.json');

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={facilities}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%',
          flex: 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              padding: 5,
            }}
          />
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                width: '50%',
                marginHorizontal: 10,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <IconComponent
                iconName={item.icon}
                iconColor={styles.iconColor}
                iconSize={25}
                isDisabled={true}
              />
              <TextComponent
                text={item.facilityName}
                textStyle={{
                  textAlign: 'left',
                  marginTop: 0,

                  paddingLeft: 5,
                  fontSize: FontSize.small,
                }}
              />
            </View>
          );
        }}
      />
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
export default TabScreen3;
