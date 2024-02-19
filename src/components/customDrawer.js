import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import TextComponent from './textComponent';
import {useState, useEffect, useCallback} from 'react';

import useThemedStyles from '../services/useThemedStyles';
import {
  ho,
  vo,
  hp,
  images,
  constants,
  FontFamily,
  FontSize,
  spacing,
  wp,
} from '../theme';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  fetchData,
  saveAsyncData,
  selectCurrentUser,
} from '../redux/slices/authSlice';
import {searchUserAuthData} from '../controllers/apiController';

const CustomDrawer = props => {
  const [state, setState] = useState({
    userObj: {},
  });

  const styles = useThemedStyles(style);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData(constants.storageKeys.CURRENTUSER));
    }, [props.navigation]),
  );
  useEffect(() => {
    if (currentUser) {
      console.log('current', currentUser);
      setState({userObj: currentUser});
    }
  }, [currentUser]);
  console.log('props', props.params);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled
          onPress={() => {
            null;
          }}
          style={{
            width: ho(110),
            height: vo(110),
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {state.userObj.profileImage != undefined && (
            <Image
              source={{uri: state.userObj.profileImage}}
              resizeMode="cover"
              style={styles.profile}
            />
          )}
          {state.userObj.profileImage == undefined && (
            <Image
              source={images.profileImg}
              resizeMode="cover"
              style={styles.dummyProfile}
            />
          )}
        </TouchableOpacity>
        <TextComponent
          text={state.userObj.firstName + ' ' + state.userObj.lastName}
          textStyle={styles.title}
        />
        <TextComponent text={state.userObj.email} textStyle={styles.subTitle} />
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const style = themeMode =>
  StyleSheet.create({
    header: {
      backgroundColor: themeMode.purple200,
      height: hp(23),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      padding: 0,
    },
    dummyProfile: {
      borderRadius: 55,
      height: 110,
      width: 110,
      tintColor: themeMode.whiteNoTheme,
      borderWidth: 1,
    },
    profile: {
      borderRadius: 55,
      height: 110,
      width: 110,
      borderWidth: 2,
      borderColor: themeMode.blackNoTheme,
      marginTop: 5,
      objectFit: 'cover',
      overflow: 'hidden',
    },
    title: {
      color: themeMode.whiteNoTheme,
      marginTop: 5,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.bold,
    },
    subTitle: {
      color: themeMode.whiteNoTheme,
      marginTop: 0,
      fontSize: FontSize.small,
    },
    footerView: {
      height: 'auto',
      width: '100%',
      backgroundColor: themeMode.purple200,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: spacing.xxs,
      marginHorizontal: spacing.m,
      padding: 0,
    },
    iconColor: themeMode.whiteNoTheme,

    footerText: {
      color: themeMode.whiteNoTheme,
      marginTop: 0,
      marginLeft: wp('8%'),
    },
  });
export default CustomDrawer;
