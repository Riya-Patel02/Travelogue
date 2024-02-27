import {
  FlatList,
  Keyboard,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import useThemedStyles from '../../../../../services/useThemedStyles';
import { useCallback, useEffect, useState } from 'react';
import { FocusAwareStatusBar } from '../../../../../components/statusbarComponent';
import SearchComponent from '../../../../../components/searchComponent';
import HeaderComponent from '../../../../../components/headerComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from '../../../../../components/textComponent';
import { style } from './styles';

import ImageBackgroundComponent from '../../../../../components/imageBackground';
import LinearGradientComponent from '../../../../../components/linearGradientComponent';
import IconComponent from '../../../../../components/iconComponent';
import CustomRatingsBar from '../../../../../components/customRatingsBar';
import { useFocusEffect } from '@react-navigation/native';

import {
  constants,
  routeKeys,
  hp,
  iconNames,
  strings,
} from '../../../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData, selectFavList
} from '../../../../../redux/slices/dashboardSlice';
import { saveAsyncData } from '../../../../../redux/slices/authSlice';

const headerTopMargin = StatusBar.currentHeight;

const DisplayDataList = ({
  data,
  favList,
  navigation,
  removeFromList,
  addToFavList,
  getState,
}) => {
  const styles = useThemedStyles(style);
  return (
    <FlatList
      data={data}
      style={{
        marginTop: hp('2%'),
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => (
        <View
          style={{
            padding: 7,
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
                          paddingRight: 5,
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
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

const SearchBody = ({navigation}) => {
  const userJson = require('../../../../../data/jsonData/beaches.json');

  const [favList, setFavList] = useState([]);

  const [searchVal, setSearchVal] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const dispatch = useDispatch();
  const getFavlist = useSelector(selectFavList);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData(constants.storageKeys.FAVLIST));
    }, [navigation]),
  );

  useEffect(() => {
    
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
  }, [favList, searchVal]);

  useEffect(() => {
    if (getFavlist) {
      setFavList(getFavlist);
    } else {
      setFavList([]);
    }
  }, [getFavlist]);


  const getState = msg => {
    var state = msg.split(' ');
    return state[state.length - 1];
  };

 

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
  const addToFavList = async itemData => {
    setFavList(previous => [...previous, itemData]);
  };
  const clearTextInput = () => {
    setSearchVal('');
    Keyboard.dismiss(), setIsFocused(false); // Clear the text input value
  };
  const removeFromList = itemName => {
    setFavList(
      favList.filter(favItems => {
        return favItems.name != itemName.name;
      }),
    );
  };

  console.log(searchVal);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: hp('2%'),
        width: 'auto',
      }}>
      <SearchComponent
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placeholder={strings.searchBeaches}
        searchView={{
          marginTop: 0,
          marginHorizontal: 0,
        }}
      />
      {/* <FlatList
        data={userJson}
        style={{
          marginTop: hpd('2%'),
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              padding: 5,
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
                    height: hpd('15%'),
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
                            paddingRight: 5,
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
                <View style={styles.cardTextView}></View>
              </TouchableOpacity>
            </View>
          );
        }}
      /> */}

      {isDataVisible && (
        <DisplayDataList
          data={userJson}
          favList={favList}
          getState={getState}
          navigation={navigation}
          addToFavList={addToFavList}
          removeFromList={removeFromList}
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
        <DisplayDataList
          data={filteredList}
          favList={favList}
          getState={getState}
          navigation={navigation}
          addToFavList={addToFavList}
          removeFromList={removeFromList}
        />
      )}
    </View>
  );
};

const Beach = ({navigation}) => {
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
              text={strings.beaches}
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
        <SearchBody navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Beach;
