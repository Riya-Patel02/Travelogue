import {Alert, Image, StatusBar, TouchableOpacity, View} from 'react-native';
import TextComponent from '../../../components/textComponent';
import HeaderComponent from '../../../components/headerComponent';
import {useCallback, useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FocusAwareStatusBar} from '../../../components/statusbarComponent';

import {useFocusEffect} from '@react-navigation/native';
import useThemedStyles from '../../../services/useThemedStyles';
import {style} from './styles';
import {
  constants,
  hp,
  iconNames,
  images,
  routeKeys,
  spacing,
  strings,
} from '../../../theme';
import IconComponent from '../../../components/iconComponent';
import {Switch} from 'react-native-gesture-handler';
import {ThemeContext} from '../../../themeProvider';
import CustomFlatListComponent from '../../../components/customFlatListComponent';
import LinearGradientComponent from '../../../components/linearGradientComponent';
import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchData,
  removeUser,
  selectCurrentUser,
  setLogout,
} from '../../../redux/slices/authSlice';

Sound.setCategory('Playback');
const headerTopMargin = StatusBar.currentHeight;

const SettingsBody = ({navigation}) => {
  const styles = useThemedStyles(style);
  const {toggleTheme, theme} = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(theme.dark);

  const [currentUser, setCurrentUser] = useState({});
  const [currentLang, setCurrentLang] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(false);
  const dispatch = useDispatch();
  const getCurrentUser = useSelector(selectCurrentUser);

  var tune = new Sound('tune.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    // console.log(
    //   'duration in seconds: ' +
    //     tune.getDuration() +
    //     'number of channels: ' +
    //     tune.getNumberOfChannels(),
    // );
  });

  const settingsData = [
    {
      title: strings.notifications,
      icon: iconNames.notifications,
      onPress: () => null,
    },
    {
      title: strings.language,
      icon: iconNames.language,
      onPress: () => navigation.navigate(routeKeys.settings.LANGUAGESCREEN),
      initialValue: currentLang,
    },
    {
      title: strings.privacy,
      icon: iconNames.privacy,
      onPress: () => null,
    },
    {
      title: strings.aboutUs,
      icon: iconNames.information,
      onPress: () => null,
    },
    {
      title: strings.logout,
      icon: iconNames.logout,
      onPress: () => handleRemoveData(constants.storageKeys.CURRENTUSER),
    },
  ];

  const handleSwitchTheme = () => {
    setIsEnabled(!isEnabled);
    // const newTheme = theme.dark === true ? 'dark' : 'light';

    toggleTheme(theme.dark);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUser = () => {
        console.log('in focus');
        dispatch(fetchData(constants.storageKeys.CURRENTUSER));
      };

      const getLanguageName = () => {
        const langauge = strings.getLanguage();
        console.log('lan in', langauge);
        switch (langauge) {
          case 'en':
            setCurrentLang(strings.English);
            break;
          case 'fr':
            setCurrentLang(strings.French);
            break;
          case 'gu':
            setCurrentLang(strings.gujarati);
            break;
        }
      };

      fetchUser();
      getLanguageName();
    }, [navigation]),
  );

  useEffect(() => {
    setIsEnabled(theme.dark);
  }, [theme]);

  useEffect(() => {
    if (isSoundOn) {
      const vol = tune.getVolume();
      console.log(vol);
      tune.play();
    } else {
      tune.stop();
    }
  }, [isSoundOn]);

  useEffect(() => {
    if (getCurrentUser) {
      console.log('curr', getCurrentUser);
      setCurrentUser(getCurrentUser);
    }
  }, [getCurrentUser]);
  const handleRemoveData = async key => {
    setTimeout(() => {
      Alert.alert(strings.logout, strings.logoutMsg, [
        {
          text: strings.cancel,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: strings.ok,
          onPress: async () => {
            dispatch(setLogout());
            const removedData = dispatch(
              removeUser(constants.storageKeys.CURRENTUSER),
            );

            console.log(removedData);
            if (removedData) {
              navigation.push(routeKeys.LOGINKEY);
            }

            // navigation.navigate(routeKeys.HOMESTACK);
          },
        },
      ]);
    }, 1000);
  };

  const DarkTheme = theme.dark ? strings.on : strings.off;

  console.log('lang', currentLang);

  return (
    <View
      style={{
        marginHorizontal: spacing.xs,
        marginTop: hp(2),
        flex: 1,
      }}>
      <View style={[styles.cardTitleBg, {marginBottom: 10}]}>
        <TextComponent text={strings.profile} textStyle={styles.accountText} />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routeKeys.PROFILEKEY, {
            userData: currentUser,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: 'auto',
            height: hp(10),
            marginTop: 10,
            marginBottom: 6,
            padding: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={
              currentUser.profileImage
                ? {uri: currentUser.profileImage}
                : images.profileImg
            }
            style={styles.dummyProfile}
          />
          <View
            style={{
              width: '50%',
              alignItems: 'flex-start',
            }}>
            <TextComponent
              text={currentUser.firstName + ' ' + currentUser.lastName}
              textStyle={styles.titleText}
            />
            <TextComponent
              text={currentUser.email}
              textStyle={styles.subTitleText}
            />
          </View>
          <IconComponent
            iconName={isSoundOn ? iconNames.soundOn : iconNames.soundOff}
            size={25}
            color={styles.whiteIcon}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            iconViewStyle={{
              // backgroundColor:'red',
              padding: spacing.xs,
            }}
            onIconPress={() => {
              setIsSoundOn(!isSoundOn);
            }}
          />
          <IconComponent
            isDisabled={true}
            iconName={iconNames.forward}
            iconColor={styles.forwardIcon}
            iconSize={20}
            iconViewStyle={{
              paddingRight: 8,
            }}
          />
        </View>
      </TouchableOpacity>

      <View style={[styles.cardTitleBg, {marginTop: 10}, {marginBottom: 10}]}>
        <TextComponent text={strings.general} textStyle={styles.accountText} />
      </View>

      <LinearGradientComponent
        colorList={styles.headerBg}
        linearStyle={[styles.cardBg, {marginTop: 10}, {marginBottom: 10}]}
        children={
          <View style={[styles.cardBg, {marginTop: 10}, {marginBottom: 10}]}>
            <IconComponent
              iconName={iconNames.theme}
              iconColor={styles.whiteIcon}
              iconSize={22}
              iconViewStyle={{
                justifyContent: 'center',
              }}
            />
            <View
              style={{
                width: '75%',
                alignItems: 'center',
                paddingLeft: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextComponent
                text={strings.darkTheme}
                textStyle={[styles.cardSubTitle]}
              />
              <TextComponent
                text={DarkTheme}
                textStyle={[styles.initialText, {justifyContent: 'flex-end'}]}
              />
            </View>

            <Switch
              trackColor={{
                false: styles.thumbBgColor,
                true: styles.activeThumbColor,
              }}
              thumbColor={
                isEnabled ? styles.activeThumbColor : styles.inactiveThumbColor
              }
              onValueChange={handleSwitchTheme}
              value={isEnabled}
              style={{
                padding: 8,
              }}
            />
          </View>
        }
      />

      <CustomFlatListComponent
        data={settingsData}
        isHorizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        itemSeperator={() => (
          <View
            style={{
              padding: spacing.xxs,
            }}
          />
        )}
        renderItem={({item, index}) => {
          return (
            <LinearGradientComponent
              colorList={styles.headerBg}
              linearStyle={styles.cardBg}
              children={
                <TouchableOpacity onPress={item.onPress}>
                  <View style={styles.cardBg}>
                    <IconComponent
                      iconName={item.icon}
                      iconColor={styles.whiteIcon}
                      iconSize={22}
                      iconViewStyle={{
                        justifyContent: 'center',
                      }}
                    />
                    <View
                      style={{
                        width: '80%',
                        alignItems: 'center',
                        paddingLeft: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextComponent
                        text={item.title}
                        textStyle={styles.cardSubTitle}
                      />

                      {item.initialValue && (
                        <TextComponent
                          text={item.initialValue}
                          textStyle={styles.initialText}
                        />
                      )}
                    </View>

                    <IconComponent
                      iconName={iconNames.forward}
                      iconColor={styles.whiteIcon}
                      iconSize={18}
                      iconViewStyle={{
                        justifyContent: 'flex-end',
                        width: '20%',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              }
            />
          );
        }}
      />
    </View>
  );
};

const SettingsScreen = ({navigation}) => {
  const styles = useThemedStyles(style);

  useFocusEffect(
    useCallback(() => {
      navigation.navigate(routeKeys.SETTINGSSTACK);

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
            width: '85%',
            marginTop: headerTopMargin,
            justifyContent: 'center',

            paddingLeft: 0,
            alignSelf: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={strings.settingsScreen}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  });
  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      <SettingsBody navigation={navigation} />
    </View>
  );
};

export default SettingsScreen;
