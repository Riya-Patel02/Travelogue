import {useEffect} from 'react';
import {View} from 'react-native';
import HeaderComponent from '../../../../../components/headerComponent';
import IconComponent from '../../../../../components/iconComponent';
import {iconNames} from '../../../../../theme';
import useThemedStyles from '../../../../../services/useThemedStyles';
import {style} from '../styles';
import {FocusAwareStatusBar} from '../../../../../components/statusbarComponent';

const BookingDetailsScreen = ({navigation}) => {
  const styles = useThemedStyles(style);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderComponent
          colorList={styles.headerBg}
          containerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
            height: 'auto',
          }}
          headerStyle={{
            height: 'auto',
          }}
          headerLeftViewStyle={{
            width: 'auto',
            padding: 0,
            marginTop: headerTopMargin,
            justifyContent: 'center',
          }}
          headerLeftChildren={
            <IconComponent
              iconColor={styles.whiteIcon}
              iconName={iconNames.leftArrow}
              iconSize={25}
              onIconPress={() => navigation.pop()}
            />
          }
          headerMiddleViewStyle={{
            width: '85%',
            marginTop: headerTopMargin,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={'Booking Details'}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
    </View>
  );
};

export default BookingDetailsScreen;
