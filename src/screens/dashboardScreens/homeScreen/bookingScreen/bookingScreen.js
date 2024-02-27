import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
} from 'react-native';

import {useEffect, useRef, useState} from 'react';
import {style} from './styles';

import {
  FontFamily,
  FontSize,
  ho,
  hp,
  iconNames,
  images,
  routeKeys,
  spacing,
  strings,
  vo,
} from '../../../../theme/index';

import useThemedStyles from '../../../../services/useThemedStyles';
import HeaderComponent from '../../../../components/headerComponent';
import IconComponent from '../../../../components/iconComponent';
import TextComponent from '../../../../components/textComponent';
import {FocusAwareStatusBar} from '../../../../components/statusbarComponent';
import ValidationUtils from '../../../../utils/validationUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatingTextInputIconComponent from '../../../../components/floatingTextInputIconComponent';
import DatePicker from '@react-native-community/datetimepicker';
import ButtonComponent from '../../../../components/buttonComponent';
import CustomRatingsBar from '../../../../components/customRatingsBar';

const validation = new ValidationUtils();

const headerTopMargin = StatusBar.currentHeight;

const BookingBody = ({navigation, selectedCard}) => {
  const endDateRef = useRef();
  const currentDate = new Date();
  const [dateDialogVisible, setDateDialogVisible] = useState(false);

  const styles = useThemedStyles(style);
  const [newDate, setNewDate] = useState(new Date());

  const [state, setState] = useState({
    startDate: {
      value: '',
      timestamp: '',
    },
    endDate: {
      value: '',
      timestamp: '',
    },
    adults: 0,
    childrens: 0,
    totalRooms: 1,
    totalDays: 0,
    totalPrice: '',
  });

  const [selectBtn, setSelectBtn] = useState('');
  const [error, setErrors] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);

  /// handle input fields change

  const handleInputChange = (field, text) => {
    setState(prevState => ({...prevState, [field]: text}));
  };
  ///function to handle date change
  const handleDateChange = date => {
    selectBtn === 'start'
      ? handleInputChange('startDate', {
          value: new Date(date.nativeEvent.timestamp).toLocaleDateString(
            'en-GB',
          ),
          timestamp: date.nativeEvent.timestamp,
        })
      : handleInputChange('endDate', {
          value: new Date(date.nativeEvent.timestamp).toLocaleDateString(
            'en-GB',
          ),
          timestamp: date.nativeEvent.timestamp,
        });
  };

  useEffect(() => {
    const getDays = () => {
      if (state.startDate.timestamp != '' && state.endDate.timestamp != '') {
        const diffTime =
          new Date(state.endDate.timestamp) -
          new Date(state.startDate.timestamp);
        const daysDiff = Math.round(diffTime / (1000 * 3600 * 24));

        setState(prevState => ({...prevState, totalDays: daysDiff}));
      }
    };

    const getPrice = () => {
      if (state.totalDays != '' && state.adults != '') {
        const totalPrice =
          state.totalRooms *
          parseInt(selectedCard.details.price.replace(/,/g, ''));

        setState(prevState => ({
          ...prevState,
          totalPrice: numberWithCommas(totalPrice),
        }));


        setBtnDisabled(false)

       
      }
    };

    getDays();
    getPrice();
  }, [state.startDate, state.endDate, state.adults, state.totalRooms]);

  ///function to validate selected date
  const handleDateValidation = date => {
    console.log('inn');

    if (selectBtn === 'start') {
      if (
        state.endDate.timestamp != '' &&
        state.endDate.timestamp < date.nativeEvent.timestamp
      ) {
        setErrors({endDate: 'Invalid End Date'});
        handleDateChange(date);
      } else if (date.type == 'dismissed' && state.startDate.value == '') {
      } else {
        setErrors({startDate: null});
        handleDateChange(date);
      }
    } else if (selectBtn === 'end') {
      if (
        state.startDate.timestamp != '' &&
        state.startDate.timestamp > date.nativeEvent.timestamp
      ) {
        setErrors({endDate: 'Invalid End Date'});
        handleDateChange(date);
      } else if (date.type == 'dismissed' && state.endDate.value == '') {
      } else {
        setErrors({endDate: null});
        handleDateChange(date);
      }
    }
  };

  ///function to handle on proceed
const handleOnProceed=()=>{
  if(state.adults != '' && state.totalDays != '' && state.totalPrice != '' && error){
    navigation.navigate(routeKeys.BOOKINGDETAILSKEY)

  }
}
  ///get location state from whole address
  const getState = msg => {
    var state = msg.split(' ');
    return state[state.length - 2];
  };

  ///function to convert number string to price
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // console.log(parseInt(selectedCard.details.price.replace(/,/g, '')));
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          margin: spacing.r,
          padding: spacing.xs,
          borderRadius: 5,
          height: hp(13),
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
              source={{uri: selectedCard.url}}
              style={{
                height: vo(80),
                width: ho(80),
                resizeMode: 'cover',
                borderRadius: 10,
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 20,
              justifyContent: 'center',
            }}>
            <TextComponent
              text={selectedCard.name}
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
                  text={getState(selectedCard.details.location)}
                  textStyle={{
                    color: 'black',
                    fontSize: FontSize.small,
                    padding: 0,
                    marginTop: 0,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <CustomRatingsBar
                  isDisabled={true}
                  ratings={selectedCard.details.ratings}
                />
                <TextComponent
                  text={selectedCard.details.ratings}
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

       
            <TextComponent
              text={'Price : ' + selectedCard.details.price + '/Room'}
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: spacing.xs,
        }}>
        <View
          style={{
            marginHorizontal: spacing.r,
            height: hp(9),
            width: '40%',
            borderBottomWidth: 0,
      
            borderRadius: 5,
          }}>
          <FloatingTextInputIconComponent
            showTopLabel={false}
            blurOnSubmit={false}
            value={state.startDate.value}
            editable={false}
            viewStyle={{
              backgroundColor: '#f5f5f5',
              height: hp(7),
              width: '100%',
              borderBottomWidth: 0,
              paddingLeft: spacing.xxs,
              paddingRight: spacing.xs,
              borderRadius: 5,
            }}
            customLabelStyles={{
              colorBlurred: 'black',
              colorFocused: 'black',
            }}
            labelText={'Start Date'}
            containerStyle={{
              height: hp(6),
              borderBottomWidth: 0,
              marginTop: spacing.xxs,
              paddingLeft: 0,
              justifyContent: 'center',
            }}
            onChangeText={() => {}}
            inputStyle={{
              marginTop: 0,
            }}
            inputMode={'numeric'}
            returnType={'done'}
            onSubmitEditing={() => endDateRef.current.focus()}
            placeholder={'DD/MM/YYYY'}
            isFocused={true}
            rightChildren={
              <IconComponent
                iconName={'calendar'}
                iconColor={'grey'}
                iconSize={20}
                iconViewStyle={{
                  justifyContent: 'center',
                  marginTop: 15,
                  alignSelf: 'center',
                
                }}
                onIconPress={() => {
                  if (state.startDate.timestamp != '') {
                    setNewDate(new Date(state.startDate.timestamp));
                  }
                  setDateDialogVisible(true);
                  setSelectBtn('start');
                }}
              />
            }
          />
          {error != null && error['startDate'] != undefined && (
            <Text style={[styles.errorStyle]}>{error['startDate']}</Text>
          )}
        </View>
        <View
          style={{
            marginHorizontal: spacing.r,
            height: hp(8),
            width: '40%',
            borderBottomWidth: 0,

            borderRadius: 5,
          }}>
          <FloatingTextInputIconComponent
            showTopLabel={false}
            blurOnSubmit={false}
            value={state.endDate.value}
            editable={false}
            viewStyle={{
              backgroundColor: '#f5f5f5',
              height: hp(7),
              width: '100%',
              borderBottomWidth: 0,

              paddingLeft: spacing.xxs,
              paddingRight: spacing.xs,
              borderRadius: 5,
            }}
            customLabelStyles={{
              colorBlurred: 'black',
              colorFocused: 'black',
            }}
            nextRef={endDateRef}
            labelText={'End Date'}
            containerStyle={{
              height: hp(6),
              borderBottomWidth: 0,
              marginTop: spacing.xxs,
              paddingLeft: 0,
              justifyContent: 'center',
            }}
            onChangeText={() => {}}
            inputStyle={{
              marginTop: 0,
            }}
            inputMode={'numeric'}
            returnType={'done'}
            onSubmitEditing={() => endDateRef.current.focus()}
            placeholder={'DD/MM/YYYY'}
            isFocused={true}
            rightChildren={
              <IconComponent
                iconName={'calendar'}
                iconColor={'grey'}
                iconSize={20}
                iconViewStyle={{
                  justifyContent: 'center',
                  marginTop: 15,
                  alignSelf: 'center',
                }}
                onIconPress={() => {
                  if (state.endDate.timestamp != '') {
                    setNewDate(new Date(state.endDate.timestamp));
                  }

                  setDateDialogVisible(true);
                  setSelectBtn('end');
                }}
              />
            }
          />
          {error != null && error['endDate'] != undefined && (
            <Text style={[styles.errorStyle]}>{error['endDate']}</Text>
          )}
        </View>
      </View>

      <View
        style={{
          marginHorizontal: spacing.r,
          height: 'auto',
          padding: spacing.xs,
          borderRadius: 5,
          backgroundColor: '#f5f5f5',
          marginTop: spacing.xs,
        }}>
        <TextComponent
          text={'Guests'}
          textStyle={{
            marginTop: 0,
            textAlign: 'left',
            fontSize: FontSize.regular,
            fontFamily: FontFamily.bold,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Adults'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              width: '30%',
            }}>
            <IconComponent
              iconName={'minus-circle'}
              iconColor={'black'}
              iconSize={25}
              onIconPress={() => {
                if (state.adults != 0) {
                  setState(prevState => ({
                    ...prevState,
                    adults: state.adults - 1,
                  }));
                }
              }}
            />
            <TextComponent
              text={state.adults}
              textStyle={{
                marginTop: '0',
                textAlign: 'left',
                fontSize: FontSize.small,
              }}
            />
            <IconComponent
              iconColor={'black'}
              iconName={'plus-circle'}
              iconSize={25}
              onIconPress={() => {
                setState(prevState => ({
                  ...prevState,
                  adults: state.adults + 1,
                }));
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <TextComponent
            text={'Childrens'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              width: '30%',
            }}>
            <IconComponent
              iconName={'minus-circle'}
              iconColor={'black'}
              iconSize={25}
              onIconPress={() => {
                if (state.adults != 0) {
                  setState(prevState => ({
                    ...prevState,
                    childrens: state.childrens - 1,
                  }));
                }
              }}
            />
            <TextComponent
              text={state.childrens}
              textStyle={{
                marginTop: '0',
                textAlign: 'left',
                fontSize: FontSize.small,
              }}
            />
            <IconComponent
              iconColor={'black'}
              iconName={'plus-circle'}
              iconSize={25}
              onIconPress={() => {
                setState(prevState => ({
                  ...prevState,
                  childrens: state.childrens + 1,
                }));
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Rooms'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              width: '30%',
            }}>
            <IconComponent
              iconName={'minus-circle'}
              iconColor={'black'}
              iconSize={25}
              onIconPress={() => {
                if (state.totalRooms != 1) {
                  setState(prevState => ({
                    ...prevState,
                    totalRooms: state.totalRooms - 1,
                  }));
                }
              }}
            />
            <TextComponent
              text={state.totalRooms}
              textStyle={{
                marginTop: '0',
                textAlign: 'left',
                fontSize: FontSize.small,
              }}
            />
            <IconComponent
              iconColor={'black'}
              iconName={'plus-circle'}
              iconSize={25}
              onIconPress={() => {
                setState(prevState => ({
                  ...prevState,
                  totalRooms: state.totalRooms + 1,
                }));
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: spacing.r,
          height: 'auto',
          padding: spacing.xs,
          borderRadius: 5,
          backgroundColor: '#f5f5f5',
          marginTop: spacing.r,
        }}>
        <TextComponent
          text={'Room Details'}
          textStyle={{
            marginTop: 0,
            textAlign: 'left',
            fontSize: FontSize.regular,
            fontFamily: FontFamily.bold,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Total Persons'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <TextComponent
            text={state.adults + state.childrens}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Total Days'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <TextComponent
            text={state.totalDays}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Room Price/Day'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <TextComponent
            text={selectedCard.details.price}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />
        </View>

        <View
          style={{
            borderWidth: 0.5,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.xs,
          }}>
          <TextComponent
            text={'Total Price'}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />

          <TextComponent
            text={state.totalPrice}
            textStyle={{
              marginTop: '0',
              textAlign: 'left',
              fontSize: FontSize.small,
            }}
          />
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          width: '93%',
          marginHorizontal: spacing.r,
        }}>
        <ButtonComponent
          btnTitle={'Proceed'}
          btnStyle={
            btnDisabled
              ? [styles.btnStyle, {backgroundColor: 'grey'}]
              : [styles.btnStyle]
          }
          btnTitleStyle={styles.btnTitle}
          isDisabled={btnDisabled}
          btnOnPress={() => handleOnProceed()}
        />
      </View>
      {dateDialogVisible && (
        <DatePicker
          value={newDate}
          minimumDate={currentDate}
          dateFormat="day month year"
          is24Hour={false}
          mode="date"
          display="calendar"
          negativeButton={() => console.log('pressed')}
          onChange={date => {
            console.log('data', date);
            setDateDialogVisible(false);
            handleDateValidation(date);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const BookingScreen = ({navigation, route}) => {
  const styles = useThemedStyles(style);
  const {selectedCard} = route.params;

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
              onIconPress={() => navigation.goBack()}
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
        <BookingBody navigation={navigation} selectedCard={selectedCard} />
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
