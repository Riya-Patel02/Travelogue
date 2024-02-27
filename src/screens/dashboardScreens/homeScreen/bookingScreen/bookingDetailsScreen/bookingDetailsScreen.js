import {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import HeaderComponent from '../../../../../components/headerComponent';
import IconComponent from '../../../../../components/iconComponent';
import {ho, iconNames} from '../../../../../theme';
import useThemedStyles from '../../../../../services/useThemedStyles';
import {style} from '../styles';
import {FocusAwareStatusBar} from '../../../../../components/statusbarComponent';
import TextComponent from '../../../../../components/textComponent';
import LinearGradientComponent from '../../../../../components/linearGradientComponent';
import Slider from '@react-native-community/slider';

const headerTopMargin = StatusBar.currentHeight;

const BookingBodyScreen = () => {
  const styles = useThemedStyles(style);

  return (
    <View>
      <LinearGradientComponent
        colorList={styles.headerBg}
        children={
          <View
            style={{
              padding: 20,
            }}>
            <View
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                height: 20,
                backgroundColor: 'white',
              }}>
              <View style={{flexDirection: 'row', position: 'absolute'}}>
                <View
                  style={{
                    width: 200,
                    height: 20,
                    borderRadius: 50,
                    position: 'absolute',
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: (10 / 20) * 60,
                    height: 20,
                  }}></View>
              </View>
              <Slider
                style={{
                  width:  300,
                  height: 20,
                  borderRadius: 50,
                }}
                minimumValue={0}
                maximumValue={100}
                step={2}
                value={10}
              
                // onValueChange={val => setState({sliderVal: val})}
                onValueChange={val => null}
                maximumTrackTintColor="transparent"
                minimumTrackTintColor="transparent"
              />
            </View>
          </View>
        }
      />
    </View>
  );
};
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

      <BookingBodyScreen />
    </View>
  );
};

export default BookingDetailsScreen;
