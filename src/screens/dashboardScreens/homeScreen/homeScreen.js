import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import TextComponent from '../../../components/textComponent';

import HeaderComponent from '../../../components/headerComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FocusAwareStatusBar} from '../../../components/statusbarComponent';
import {useFocusEffect} from '@react-navigation/native';

import useThemedStyles from '../../../services/useThemedStyles';
import {style} from './styles';
import ChipComponent from '../../../components/chipComponent';
import {
  routeKeys,
  images,
  spacing,
  hp,
  ho,
  vo,
  strings,
  constants,
} from '../../../theme';
import LinearGradientComponent from '../../../components/linearGradientComponent';

import {useDispatch, useSelector} from 'react-redux';
import {pushApiData, selectApiData} from '../../../redux/slices/dashboardSlice';
import {
  getUserApiData,
  searchUserAuthData,
} from '../../../controllers/apiController';
import {
  fetchData,
  saveAsyncData,
  selectCurrentUser,
} from '../../../redux/slices/authSlice';
import usePushNotifications from '../../../services/notificationsContainer';
import SkeletonBodyComponent from '../../../components/skeletonBodyComponent';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const headerTopMargin = StatusBar.currentHeight;

const HomeScreenBody = ({navigation}) => {
  const [userApiData, setUserApiData] = useState([]);

  const styles = useThemedStyles(style);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [lastPage, setLastPage] = useState(0);
  const [chipsIndex, setChipsIndex] = useState(-1);

  const [offset, setOffset] = useState(0);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState(false);
  const dispatch = useDispatch();
  const getApiData = useSelector(selectApiData);
  const currentUser = useSelector(selectCurrentUser);

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotifications();

  const chipData = [
    {
      name: strings.resorts,
      icon: images.resort,
    },
    {
      name: strings.beaches,
      icon: images.beach,
    },
    {
      name: strings.mountains,
      icon: images.mountains,
    },
    {
      name: strings.recommended,
      icon: images.recommended,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      getUserApiData(offset)
        .then(res => {
          dispatch(pushApiData(res));
        })
        .catch(err => console.log('error', err));
      const listenToNotifications = () => {
        try {
          getFCMToken();
          requestUserPermission();
          onNotificationOpenedAppFromQuit();
          listenToBackgroundNotifications();
          listenToForegroundNotifications();
          onNotificationOpenedAppFromBackground();
        } catch (error) {
          console.log(error);
        }
      };

      listenToNotifications();

      return () => {
        // setOffset(0);
      };
    }, []),
  );

  useEffect(() => {
    dispatch(fetchData(constants.storageKeys.demo));
    const unsubscribe = navigation.addListener('focus', () => {
      // setIsDataLoading(true)
      setUserApiData([]);
    });
    setTimeout(
      () =>
        searchUserAuthData(currentUser.email).then(res =>
          // console.log('inres',...res),
          dispatch(
            saveAsyncData(
              constants.storageKeys.CURRENTUSER,
              JSON.stringify(...res),
            ),
          ),
        ),
      5000,
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (getApiData != null) {
      const parsedData = getApiData;
      if (parsedData.total_users % 10 === 0) {
        setLastPage(parsedData.total_users / 10);
      } else {
        setLastPage(parsedData.total_users / 10 + 1);
      }

      const newData = parsedData.users.filter(newUser => {
        return !userApiData.some(
          existingUser => existingUser.id === newUser.id,
        );
      });

      // Concatenate the filtered new data with the existing userApiData
      setUserApiData(prevData => [...prevData, ...newData]);

      setTimeout(() => setIsDataLoading(false), 1000);
    }
  }, [getApiData]);

  useFocusEffect(
    useCallback(() => {
      console.log('focused home');

      return () => {
        console.log('focused false');
        setOffset(0);
      };
    }, [navigation]),
  );
  const handleChipSelection = index => {
    setChipsIndex(index);

    switch (index) {
      case 0:
        navigation.navigate(routeKeys.RESORTSTACK);
        break;
      case 1:
        navigation.navigate(routeKeys.BEACHSTACK);
        break;
      case 2:
        navigation.navigate(routeKeys.MOUNTAINSTACK);
        break;
      case 3:
        navigation.navigate(routeKeys.RECOMMENDEDSTACK);
        break;
    }
  };

 

  // const fetchMoreData = async () => {
  //   console.log('in fetch');

  //   if (offset <= lastPage - 1) {
  //     setLoadMoreData(true);
  //     const nextPage = offset + 10;
  //     const data = await apiRequest({
  //       // country: 'us',
  //       // page: nextPage,
  //       // category: 'business',
  //       offset: nextPage,
  //     });

  //     if (data != null) {
  //       const parsedData = JSON.parse(data);
  //       // setCurrentPage(nextPage);
  //       setOffset(nextPage);
  //       setApiData([...apiData, ...parsedData.users]);
  //       setIsDataLoading(false);
  //     }
  //   } else {
  //     return;
  //   }
  // };

  //   const paddingToBottom = 20;
  //   return (
  //     layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom
  //   );
  // };

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    // Calculate the current scroll position
    const currentOffset = layoutMeasurement.height + contentOffset.y;

    // Calculate the total content size
    const totalSize = contentSize.height;

    // Define a threshold for when to fetch more data (e.g., 100 pixels from the bottom)
    const threshold = 100;

    if (totalSize - currentOffset < threshold && !isFetchingMoreData) {
      console.log('start fetch');
      setIsFetchingMoreData(true);

      if (offset <= lastPage - 1) {
        const nextPage = offset + 10;
        try {
          // Fetch the next page of data
          await getUserApiData(nextPage).then(res =>
            dispatch(pushApiData(res)),
          );

          setOffset(nextPage);
          setIsFetchingMoreData(false);
        } catch (error) {
          console.log('Error fetching data:', error);
          setIsFetchingMoreData(false);
        }
      } else {
        setIsFetchingMoreData(false);
      }
    }
  };

  const ListFooterComponent = () => (
    <ActivityIndicator
      size="small"
      color={styles.activityIndicatorColor}
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 10,
      }}
    />
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      snapToStart={true}
      scrollEventThrottle={10}>
      <>
        <ChipComponent
          currentIndex={chipsIndex}
          chipData={chipData}
          onPress={handleChipSelection}
        />

        {isDataLoading && (
          <SkeletonBodyComponent>
            {Array.from({length: 5}).map((item, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                flexDirection="row"
                justifyContent="flex-start"
                width={'auto'}
                height={'auto'}
                margin={5}
                padding={10}
                marginHorizontal={10}
                backgroundColor={'#adadad'}
                borderWidth={1}
                marginTop={10}
                borderColor={'#adadad'}
                borderRadius={10}>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="flex-start"
                  width={'100%'}
                  height={'100%'}
                  backgroundColor={'white'}
                  marginHorizontal={10}>
                  <SkeletonPlaceholder.Item
                    height={vo(80)}
                    width={ho(80)}
                    borderRadius={40}
                    alignSelf="center"
                    backgroundColor={'#adadad'}
                  />
                  <SkeletonPlaceholder.Item
                    flex={1}
                    marginLeft={10}
                    justifyContent="center">
                    <SkeletonPlaceholder.Item
                      backgroundColor={'#adadad'}
                      width={'90%'}
                      height={15}
                      marginBottom={3}
                      borderRadius={0}
                    />
                    <SkeletonPlaceholder.Item
                      backgroundColor={'#adadad'}
                      width={'80%'}
                      height={10}
                      borderRadius={0}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            ))}
          </SkeletonBodyComponent>
        )}

        {!isDataLoading && (
          <View
            style={{
              flex: 1,
              marginHorizontal: spacing.xxs,
              marginTop: 0,
            }}>
            <FlatList
              data={userApiData}
              isHorizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                marginTop: 5,
                flexGrow: 1,
            
              }}
              itemSeparator={() => <View />}
              // onEndReachedThreshold={0.5}
              onEndReached={null}
             
              pagingEnabled={true}
              ListFooterComponent={() =>
                isFetchingMoreData && <ListFooterComponent />
              }
              renderItem={({item, index}) => (
                <LinearGradientComponent
                  colorList={styles.headerBg}
                  linearStyle={{
                    height: hp(14),
                    margin: 5,
                    width: 'auto',
                    borderRadius: 10,
                  }}
                  children={
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 'auto',
                        height: 'auto',
                        justifyContent: 'flex-start',
                        margin: 10,
                      }}>
                      <Image
                        source={
                          item.profile_picture
                            ? {uri: item.profile_picture}
                            : images.newsPaper
                        }
                        defaultSource={images.newsPaper}
                        style={{
                          height: vo(80),
                          width: ho(80),
                          borderRadius: 40,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          resizeMode: 'contain',
                          borderColor: 'white',
                          objectFit: 'fill',
                          borderWidth: 2,
                        }}
                      />
                      <View
                        style={{
                          width: '50%',
                          alignItems: 'flex-start',
                          margin: spacing.xxs,
                          marginLeft: 10,
                          height: 'auto',
                          marginTop: 10,
                          flex: 1,
                        }}>
                        <TextComponent
                          text={item.first_name + ' ' + item.last_name}
                          numberOfLines={1}
                          textStyle={styles.cardTitle}
                        />
                        <TextComponent
                          text={'Email : ' + item.email}
                          numberOfLines={2}
                          textStyle={styles.cardSubTitle}
                        />
                      </View>
                    </View>
                  }
                />
              )}
            />
          </View>
        )}
      </>
    </ScrollView>
  );
};

const HomeScreen = ({route, navigation}) => {
  const [state, setState] = useState({
    userObj: {},
    searchVal: '',
  });
  const [chipsIndex, setChipsIndex] = useState(-1);
  const [searchVal, setSearchVal] = useState('');
  // const {currentEmail} = route.params;
  const styles = useThemedStyles(style);

  useFocusEffect(
    useCallback(() => {
      navigation.navigate(routeKeys.HOMESTACK);

      return () => {};
    }),
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
            padding: 0,
            marginTop: headerTopMargin,
            justifyContent: 'center',
          }}
          headerLeftChildren={
            <Ionicons
              name="menu"
              size={25}
              color={styles.whiteIcon}
              onPress={() => navigation.openDrawer()}
            />
          }
          headerMiddleViewStyle={{
            width: '90%',
            marginTop: headerTopMargin,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={strings.homeScreen}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  }, [navigation, chipsIndex]);

  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />

    

      <HomeScreenBody navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
