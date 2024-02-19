import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { useCallback, useEffect, useState } from 'react';
import HeaderComponent from '../../../../../components/headerComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TextComponent from '../../../../../components/textComponent';
import { FocusAwareStatusBar } from '../../../../../components/statusbarComponent';
import useThemedStyles from '../../../../../services/useThemedStyles';
import { style } from './styles';
import ImageBackgroundComponent from '../../../../../components/imageBackground';
import CustomRatingsBar from '../../../../../components/customRatingsBar';

import { useFocusEffect } from '@react-navigation/native';
import IconComponent from '../../../../../components/iconComponent';

import LinearGradientComponent from '../../../../../components/linearGradientComponent';

import SearchComponent from '../../../../../components/searchComponent';
import {
  routeKeys,
  constants,
  hp,
  iconNames,
  strings,
} from '../../../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  selectFavList,
} from '../../../../../redux/slices/dashboardSlice';
import {
  saveAsyncData
} from '../../../../../redux/slices/authSlice';

const headerTopMargin = StatusBar.currentHeight;

const ResortBody = ({data, favList, setFavList, navigation}) => {
  const styles = useThemedStyles(style);

  const getState = msg => {
    var state = msg.split(' ');
    return state[state.length - 2];
  };

  const addToFavList = async itemData => {
    setFavList(previous => [...previous, itemData]);
  };

  const removeFromList = itemName => {
    setFavList(
      favList.filter(favItems => {
        return favItems.name != itemName.name;
      }),
    );
  };
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: hp('2%'),
        width: 'auto',
      }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              padding: 8,
            }}
          />
        )}
        renderItem={({item, index}) => {
          const isFav =
            Array.isArray(favList) &&
            favList.some(favItem => favItem.name === item.name);

          return (
            <View
              style={{
                height: 'auto',
                borderColor: 'white',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routeKeys.DETAILSSCREEN, {
                    selectedCard: item,
                    routeKeys: constants.storageKeys.FAVLIST,
                  })
                }>
                <ImageBackgroundComponent
                  uri={item.url}
                  resizeMode={'stretch'}
                  containerStyle={{
                    height: hp('15%'),
                  }}
                  imageStyle={styles.cardImageStyle}
                />

                <LinearGradientComponent
                  colorList={styles.headerBg}
                  locations={[0.0, 0.4, 0.6, 0.8]}
                  linearStyle={styles.cardTextView}
                  children={
                    <View style={styles.cardTextView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 0,
                          paddingBottom: 0,
                        }}>
                        <TextComponent
                          text={item.name}
                          textStyle={styles.cardText}
                        />
                        <IconComponent
                          iconColor={styles.redIcon}
                          iconName={
                            isFav === true
                              ? iconNames.favorites
                              : iconNames.favorites_outline
                          }
                          iconSize={25}
                          iconViewStyle={{
                            justifyContent: 'flex-end',
                            alignSelf: 'flex-end',
                            paddingRight: 10,
                            marginTop: 5,
                          }}
                          onIconPress={() => {
                            isFav ? removeFromList(item) : addToFavList(item);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 0,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: 0,
                        }}>
                        <TextComponent
                          text={getState(item.details.location)}
                          textStyle={styles.cardSubText}
                        />
                        <CustomRatingsBar
                          isDisabled={true}
                          ratings={item.details.ratings}
                        />
                      </View>
                    </View>
                  }
                />
                {/* <View style={styles.cardTextView}></View> */}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const ResortScreen = ({navigation}) => {
  const styles = useThemedStyles(style);
  const userJson = require('../../../../../data/jsonData/resort.json');

  const [favList, setFavList] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(true);

  const dispatch = useDispatch();
const getFavlist= useSelector(selectFavList)

  useFocusEffect(
    useCallback(() => {
      console.log('resort foc');
      dispatch(fetchData(constants.storageKeys.FAVLIST));
      // dispatch(fetchData(constants.storageKeys.demo));
    }, [navigation]),
  );

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
            marginTop: headerTopMargin,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerLeftChildren={
            <Ionicons
              name="arrow-back"
              size={25}
              color={styles.whiteIcon}
              onPress={() => {
                navigation.goBack();
              }}
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
              text={strings.resorts}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });

    dispatch(
      saveAsyncData(constants.storageKeys.FAVLIST, JSON.stringify(favList)),
    );

    if (searchVal.length > 0) {
      setIsDataVisible(false);
      setIsLoading(true);
      handleSearchData();
    }
    if (searchVal.length == 0) {
      setIsDataVisible(true);
    }
  }, [navigation, favList, searchVal]);

  useEffect(() => {
    if (getFavlist) {
      setFavList(getFavlist);
    } else {
      setFavList([]);
    }
  }, [getFavlist]);



  const handleSearchData = () => {
    const filteredData = userJson.filter(item => {
      return item.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    if (filteredData != null) {
      setIsLoading(false);
      setFilteredList(filteredData);
    } else {
      setFilteredList([]);
    }
  };

  const clearTextInput = () => {
    setSearchVal('');
    Keyboard.dismiss(), setIsFocused(false); // Clear the text input value
  };

  // console.log('allFav', email);
  console.log('localFav', favList);
  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 10,
        }}>
        <SearchComponent
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          onClear={clearTextInput}
          placeholder={strings.searchResorts}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isDataVisible && (
          <ResortBody
            data={userJson}
            favList={favList}
            setFavList={setFavList}
            navigation={navigation}
          />
        )}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
        {!isLoading && !isDataVisible && (
          <ResortBody
            data={filteredList}
            favList={favList}
            setFavList={setFavList}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ResortScreen;
