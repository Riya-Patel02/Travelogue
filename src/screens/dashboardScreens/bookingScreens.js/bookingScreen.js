import {Image, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {useEffect} from 'react';
import {style} from './styles';

import {
  FontFamily,
  FontSize,
  ho,
  iconNames,
  images,
  strings,
  vo,
} from '../../../theme/index';

import useThemedStyles from '../../../services/useThemedStyles';
import HeaderComponent from '../../../components/headerComponent';
import IconComponent from '../../../components/iconComponent';
import TextComponent from '../../../components/textComponent';
import {FocusAwareStatusBar} from '../../../components/statusbarComponent';
import ValidationUtils from '../../../utils/validationUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
const validation = new ValidationUtils();

const headerTopMargin = StatusBar.currentHeight;

const BookingBody = ({navigation}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          margin: 15,
          padding: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              width: '20%',
            }}>
            <Image
              source={images.user}
              style={{
                height: vo(60),
                width: ho(60),
                resizeMode: 'cover',
                borderRadius: 10,
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
              }}
            />
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                width: '90%',
                marginHorizontal: 0,
              }}>
              <TextComponent
                text={'Place'}
                textStyle={{
                  color: 'black',
                  fontSize: FontSize.small,
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginLeft: 3,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={'star-sharp'}
                  color={'orange'}
                  size={20}
                  style={{
                    alignSelf: 'center',
                    marginLeft: 0,
                  }}
                />
                <TextComponent
                  text={'2.5'}
                  textStyle={{
                    color: 'black',
                    fontSize: FontSize.small,
                    padding: 0,
                    marginTop: 0,
                    fontFamily: FontFamily.bold,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 0,
                marginTop: 5,
                width: '90%',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name={'location-sharp'}
                  color={'black'}
                  size={20}
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: 0,
                  }}
                />
                <TextComponent
                  text={'Location'}
                  textStyle={{
                    color: 'black',
                    fontSize: FontSize.small,
                    padding: 0,
                    marginTop: 0,
                  }}
                />
              </View>

              <TextComponent
                text={'Rs. 10000'}
                textStyle={{
                  color: 'black',
                  fontSize: FontSize.small,
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginLeft: 3,
                  marginTop: 0,
                  fontFamily: FontFamily.bold,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const BookingScreen = ({navigation}) => {
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
              iconName={iconNames.menu}
              iconSize={25}
              onIconPress={() => navigation.toggleDrawer()}
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
              text={strings.bookScreen}
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
      <ScrollView>
        <BookingBody navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
