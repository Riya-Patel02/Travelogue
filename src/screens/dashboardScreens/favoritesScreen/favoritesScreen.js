import {useCallback, useEffect, useState} from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import HeaderComponent from '../../../components/headerComponent';

import TextComponent from '../../../components/textComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FocusAwareStatusBar} from '../../../components/statusbarComponent';

import {useFocusEffect} from '@react-navigation/native';
import {style} from './styles';
import useThemedStyles from '../../../services/useThemedStyles';
import IconComponent from '../../../components/iconComponent';

import LinearGradientComponent from '../../../components/linearGradientComponent';
import ImageBackgroundComponent from '../../../components/imageBackground';
import {
  routeKeys,
  constants,
  hp,
  spacing,
  iconNames,
  strings,
  vo,
  ho,
} from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData, selectFavList} from '../../../redux/slices/dashboardSlice';
import {saveAsyncData} from '../../../redux/slices/authSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonBodyComponent from '../../../components/skeletonBodyComponent';

const headerTopMargin = StatusBar.currentHeight;

const FavoriteBody = ({data, favList, setFavList, navigation}) => {
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favList.length == 0) {
      dispatch(
        saveAsyncData(constants.storageKeys.FAVLIST, JSON.stringify(favList)),
      );
    }
  }, [favList]);
  const addToFavList = itemData => {
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
     
        marginTop: hp('2%'),
        width: '100%',
      }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100%',
          flex: 1,
        }}
        contentContainerStyle={{
          width: 'auto',
          marginHorizontal: spacing.xs,
          justifyContent: 'space-between',
        }}
        ListEmptyComponent={() => (
          <View
            style={{
           
              justifyContent: 'center',
              height: hp(100) * 0.7,
              flex: 1,
            }}>
            <TextComponent text={strings.noFavAdded} />
          </View>
        )}
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
                width: '49%',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routeKeys.DETAILSSCREEN, {
                    selectedCard: item,
                  })
                }>
                <ImageBackgroundComponent
                  uri={item.url}
                  resizeMode={'cover'}
                  containerStyle={{
                    height: hp('20%'),
                  }}
                  imageStyle={styles.cardImageStyle}
                  children={
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
                        paddingRight: spacing.xxs,
                        marginTop: spacing.xxs,
                      }}
                      onIconPress={() => {
                        isFav ? removeFromList(item) : addToFavList(item);
                      }}
                    />
                  }
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

const FavoritesScreen = ({navigation}) => {
  const styles = useThemedStyles(style);
  const [favList, setFavList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const getFavlist = useSelector(selectFavList);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData(constants.storageKeys.FAVLIST));
      navigation.navigate(routeKeys.FAVSTACK);

      return () => {
        setIsLoading(true);
      };
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
            width: '85%',
            marginTop: headerTopMargin,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={strings.favScreen}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });

    if (favList.length > 0) {
      dispatch(
        saveAsyncData(constants.storageKeys.FAVLIST, JSON.stringify(favList)),
      );
    }
  }, [navigation, favList]);

  useEffect(() => {
    if (getFavlist) {
      setFavList(getFavlist);
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setFavList([]);
      setIsLoading(false);
    }
  }, [getFavlist]);

  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      {isLoading && (
        <SkeletonBodyComponent>
          {Array.from({length: 5}).map((item, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="row"
              justifyContent="space-between"
              alignContent="space-between"
              width={'auto'}
              height={'24%'}
              margin={5}
              padding={5}
              marginHorizontal={5}
              backgroundColor={'#adadad'}
            
              borderColor={'#adadad'}
              marginBottom={0}
              borderRadius={10}>
              <SkeletonPlaceholder.Item
                flexDirection="column"
                justifyContent="flex-start"
                width={'49%'}
                height={'auto'}
                backgroundColor={'white'}
                marginHorizontal={0}>
                <SkeletonPlaceholder.Item
                  height={'100%'}
                  width={'100%'}
                  backgroundColor={'#adadad'}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                flexDirection="column"
                justifyContent="flex-start"
                width={'49%'}
                height={'auto'}
                backgroundColor={'white'}>
                <SkeletonPlaceholder.Item
                  height={'100%'}
                  width={'100%'}
                  backgroundColor={'#adadad'}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonBodyComponent>
      )}

      {!isLoading && (
        <FavoriteBody
          setFavList={setFavList}
          data={favList}
          favList={favList}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
