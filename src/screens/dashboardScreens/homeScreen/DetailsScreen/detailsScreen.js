import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { FocusAwareStatusBar } from '../../../../components/statusbarComponent';
import TextComponent from '../../../../components/textComponent';
import HeaderComponent from '../../../../components/headerComponent';

import useThemedStyles from '../../../../services/useThemedStyles';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { style } from './styles';
import TopTabNavigator from '../../../../components/navigators/topTabNavigator';
import ButtonComponent from '../../../../components/buttonComponent';
import SwiperFlatList from 'react-native-swiper-flatlist';
import MoreLessTextComponent from '../../../../components/moreLessText';

import LinearGradientComponent from '../../../../components/linearGradientComponent';
import IconComponent from '../../../../components/iconComponent';
import {
  constants,
  hp,
  iconNames,
  wp,
  strings,
  routeKeys,
} from '../../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  selectFavList,
} from '../../../../redux/slices/dashboardSlice';
import { saveAsyncData } from '../../../../redux/slices/authSlice';

const {width} = Dimensions.get('window');
const headerTopMargin = StatusBar.currentHeight;

const ShowDetailBody = ({data, cardData}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = useThemedStyles(style);
  return (
    <View
      style={{
        height: 'auto',
        marginBottom: 0,
        paddingBottom: 0,
        // flex: 1,
      }}>
      <View
        style={{
          height: hp('30%'),
          backgroundColor: 'white',
        }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination
          data={data}
          paginationActiveColor={styles.paginationActiveColor}
          paginationDefaultColor={styles.paginationDefaultColor}
          paginationStyleItem={{
            height: hp(1),
            width: wp(2),
            alignSelf: 'center',
          }}
          renderItem={({item}) => (
            <View
              style={{
                width,

                justifyContent: 'center',
                backgroundColor: 'grey',
              }}>
              <Image
                source={{
                  uri: item,
                }}
                style={{
                  width,
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
          )}
        />
      </View>

      <View
        style={{
          justifyContent: 'flex-start',
          marginTop: 10,
          padding: 5,
          marginHorizontal: 10,
          width: 'auto',
        }}>
        <MoreLessTextComponent
          data={cardData.description}
          numberOfLines={3}
          textStyle={styles.cardSubText}
          isExpanded={isExpanded}
          toggleExpanded={setIsExpanded}
        />
      </View>
    </View>
  );
};

const ShowDetailFooter = ({selectedCard, navigation}) => {
  const styles = useThemedStyles(style);
  return (
    <View
      style={{
        width: '100%',
        marginTop: '20.5%',
        height: 'auto',
        flex: 1,

        justifyContent: 'space-between',
      }}>
      <LinearGradientComponent
        colorList={styles.gradientBg}
        locations={[0.0, 0.4, 0.6, 0.8]}
        linearStyle={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: hp(8),
          padding: 10,
          justifyContent: 'space-between',
        }}
        children={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'space-between',
            }}>
            <Text style={styles.subTitle}>
              {'Price : '}
              <Text style={styles.cardText}>
                {'Rs ' + selectedCard.details.price}
              </Text>
            </Text>

            <ButtonComponent
              btnTitle={strings.bookResorts}
              btnStyle={styles.btnStyle}
              btnTitleStyle={styles.btnTitle}
              btnOnPress={() =>
                navigation.navigate(routeKeys.BOOKINGKEY, {
                  selectedCard: selectedCard,
                })
              }
            />
          </View>
        }
      />
    </View>
  );
};
const DetailsScreen = ({route, navigation}) => {
  const {selectedCard} = route.params;
  const isFocused = useIsFocused();
  const [infavList, setInFavList] = useState(false);
  const [favList, setFavList] = useState([]);
  const dispatch = useDispatch();
  const getFavlist = useSelector(selectFavList);

  const styles = useThemedStyles(style);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData(constants.storageKeys.FAVLIST));
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
            elevation: 0,
            height: 'auto',
          }}
          headerStyle={{
            height: 'auto',
            justifyContent: 'space-between',
          }}
          headerLeftViewStyle={{
            width: 'auto',
            marginTop: headerTopMargin,
            padding: 0,
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
            width: 'auto',
            marginTop: headerTopMargin,
            paddingLeft: 10,
            justifyContent: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={selectedCard.name}
              textStyle={styles.headerTitle}
            />
          }
          headerRightChildren={
            <IconComponent
              iconColor={'red'}
              iconName={
                infavList ? iconNames.favorites : iconNames.favorites_outline
              }
              iconSize={25}
              iconViewStyle={{
                alignContent: 'flex-end',
                justifyContent: 'flex-end',
                marginTop: 0,
              }}
              onIconPress={() =>
                infavList
                  ? removeFromList(selectedCard)
                  : addToFavList(selectedCard)
              }
            />
          }
          headerRightViewStyle={{
            width: 'auto',
            marginTop: headerTopMargin,
            paddingLeft: 10,
            justifyContent: 'center',
          }}
        />
      ),
    });

    dispatch(
      saveAsyncData(constants.storageKeys.FAVLIST, JSON.stringify(favList)),
    );
  }, [navigation, favList, infavList]);

  useEffect(() => {
    if (getFavlist) {
      if (getFavlist.some(itemName => itemName.name === selectedCard.name)) {
        console.log('in true');
        setInFavList(true);
      }
      setFavList(getFavlist);
    } else {
      setInFavList(false);
      setFavList([]);
    }
  }, [getFavlist]);

  const data = [selectedCard.url, ...selectedCard.otherImages];

  const addToFavList = itemData => {
    setFavList(previous => [...previous, itemData]);
    setInFavList(true);
  };

  const removeFromList = itemName => {
    setFavList(
      favList.filter(favItems => {
        return favItems.name != itemName.name;
      }),
    );
    setInFavList(false);
  };

  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      <ScrollView>
        <ShowDetailBody data={data} cardData={selectedCard} />
        <View
          style={{
            height: hp('35%'),
          }}>
          <>
            <TopTabNavigator navigation={navigation} route={route} />
          </>
        </View>

        <>
          <ShowDetailFooter selectedCard={selectedCard} navigation={navigation} />
        </>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
