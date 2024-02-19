import { useState, useRef, useEffect } from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FloatingTextInputIconComponent from '../../../components/floatingTextInputIconComponent';

import ImageBackgroundComponent from '../../../components/imageBackground';

import TextComponent from '../../../components/textComponent';
import IconComponent from '../../../components/iconComponent';
import ValidationUtils from '../../../utils/validationUtils';
import ButtonComponent from '../../../components/buttonComponent';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import Permissions from '../../../services/handlePermissions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FocusAwareStatusBar } from '../../../components/statusbarComponent';
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input';
import useThemedStyles from '../../../services/useThemedStyles';
import { style } from './styles';
import {
  hp,
  images,
  spacing,
  iconNames,
  routeKeys,
  constants,
  strings,
} from '../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveAsyncData,
  selectAllFavs,
  selectAllUsers,
  setAllUsersApi,
  setSignup
} from '../../../redux/slices/authSlice';
import {
  getUserAuthData,
  postUserAuthData,
} from '../../../controllers/apiController';


const validation = new ValidationUtils();

const ShowProfileModel = ({isVisible, setVisible, data}) => {
  const styles = useThemedStyles(style);

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      onBackdropPress={() => setVisible(false)}
      style={{
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: spacing.xs,
      }}>
      <View style={styles.modalView}>
        <TextComponent
          text={'Choose From : '}
          textStyle={styles.chooseFromText}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={data}
          key={item => item.optionTitle}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginTop: spacing.xxs,
          }}
          ItemSeparatorComponent={<View style={{padding: spacing.xxs}} />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={item.onPress}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: dimensions.dp_5,
                padding: spacing.xxs,
              }}>
              <IconComponent
                iconName={item.icon}
                iconColor={styles.modalIcon}
                iconSize={20}
                onIconPress={item.onPress}
                isDisabled={true}
              />
              <TextComponent
                text={item.optionTitle}
                textStyle={styles.optionTitle}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const SignupBody = ({onShowImageModel, navigation, profileImage}) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    countryCode: 'IN',
    userObj: {},
  });

  const styles = useThemedStyles(style);

  const [validLength, setValidLength] = useState(11);
  const [contact, setContact] = useState(0);
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef(null);
  const confirmPassRef = useRef();
  const passwordRef = useRef();
  const [allUsers, setAllUsers] = useState([]);
  const [signupError, setSignupError] = useState('');
  const dispatch = useDispatch();
  const allUsersfromRedux = useSelector(selectAllUsers);
  const getAllFav = useSelector(selectAllFavs);

  ///handle input fields change
  const handleInputChange = (field, text) => {
    setState(prevState => ({...prevState, [field]: text}));
  };

  console.log('email', getAllFav);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setErrors({});
      setSignupError('');
    });

    getUserAuthData()
      .then(res => {
        dispatch(setAllUsersApi(res));
      })
      .catch(err => console.log('error', err));

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (allUsersfromRedux != null) {
      setAllUsers(allUsersfromRedux);
    } else {
      setAllUsers([]);
    }
  }, [allUsersfromRedux]);
  ///handle single field validation
  const handleValidation = ({fieldLabel, fieldValue, passVal}) => {
    switch (fieldLabel) {
      case 'email':
        validation.ValidateEmail({email: fieldValue});
        break;

      case 'password':
        validation.ValidatePassword({password: fieldValue});
        break;

      case 'firstName':
        validation.ValidateFName({fname: fieldValue});

        break;

      case 'lastName':
        validation.ValidateLName({lname: fieldValue});
        break;

      case 'dob':
        validation.ValidateDob({dob: fieldValue});
        break;
      case 'contact':
        validation.ValidateContact({
          contact: contact,
          countryCode: state.countryCode,
        });
        break;
      case 'confirmPass':
        validation.ValidateConfirmPass({
          confirmPass: fieldValue,
          pass: passVal,
        });
        break;
    }
    const updatedErrors = validation.errors;
    handleErrors({...updatedErrors});
  };

  ///function to handle errors
  const handleErrors = errorMessage => {
    setErrors({
      ...errorMessage,
    });
  };

  /// function to handle on signup
  const handleOnSignup = () => {
    const validatedFname = validation.ValidateFName({fname: state.firstName});
    const validatedLname = validation.ValidateLName({lname: state.lastName});
    const validatedEmail = validation.ValidateEmail({email: state.email});
    const validatedContact = validation.ValidateContact({
      contact: contact,
      countryCode: state.countryCode,
    });
    const validatedPassword = validation.ValidatePassword({
      password: state.password,
    });
    const validatedConfirmPassword = validation.ValidateConfirmPass({
      confirmPass: state.confirmPassword,
      pass: state.password,
    });

    if (
      validatedFname &&
      validatedLname &&
      validatedEmail &&
      validatedContact &&
      validatedPassword &&
      validatedConfirmPassword
    ) {
      console.log('valid');
      handleErrors(null);

      const userEmailExists = allUsers.some(user => user.email === state.email);
      // const userEmailExists = allUsers.email === state.email;

      if (!userEmailExists) {
        setSignupError('');
        const userObj = {
          firstName: state.firstName,
          lastName: state.lastName,
          contact: contact,
          email: state.email,
          password: state.password,
          profileImage: profileImage.uri,
          countryCode: state.countryCode,
        };

        dispatch(setSignup());

        postUserAuthData(userObj).then(res => console.log('post res', res));

        dispatch(
          saveAsyncData(
            constants.storageKeys.CURRENTUSER,
            JSON.stringify(userObj),
          ),
        );

        setTimeout(
          () =>
            navigation.navigate(routeKeys.HOMEKEY, {
              currentEmail: state.email,
            }),
          1000,
        );
      } else {
        setSignupError('User Already Exists. Please Login');
      }
    } else {
      const updatedErrors = validation.errors;
      handleErrors({...updatedErrors});
    }
  };

  const handleValidCountryLength = country => {
    setState({countryCode: country.cca2});
    setTimeout(() => setContact(null), 1000);
  };

  console.log('all', allUsersfromRedux);

  return (
    <View
      style={{
        height: 'auto',
        margin: spacing.m,
        paddingBottom: 0,
        borderWidth: 0,
        marginBottom: 0,
      }}>
      {signupError && (
        <View
          style={{
            height: hp(5),
            marginBottom: 5,
            justifyContent: 'center',
            backgroundColor: styles.errorBg,
          }}>
          <TextComponent
            text={signupError}
            textStyle={styles.signupErrorStyle}
          />
        </View>
      )}

      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={{
            height: hp(15),
            width: 'auto',
            borderRadius: 50,
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: spacing.xs,
            marginBottom: spacing.r,
          }}
          onPress={() => onShowImageModel()}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',

              marginTop: spacing.xs,
            }}>
            {profileImage.uri != undefined && (
              <Image
                source={{uri: profileImage.uri}}
                resizeMode="cover"
                style={styles.profile}
              />
            )}
            {profileImage.uri == undefined && (
              <Image
                source={images.profileImg}
                resizeMode="cover"
                style={styles.dummyProfile}
              />
            )}

            <TextComponent
              text={strings.chooseProfileImage}
              textStyle={styles.modalTitle}
            />
          </View>
        </TouchableOpacity>
        <FloatingTextInputIconComponent
          labelText={strings.firstName}
          value={state.firstName}
          placeholder={strings.firstNameMsg}
          keyboardType="default"
          inputMode="text"
          isPasswordMode={false}
          error={errors}
          viewStyle={{
            marginTop: 5,
          }}
          onChangeText={text =>
            setState(prevState => ({...prevState, firstName: text}))
          }
          onSubmitEditing={() => lastNameRef.current.focus()}
          returnType={'next'}
          customLabelStyles={styles.customLabelStyles}
          onEndEditing={() =>
            handleValidation({
              fieldLabel: 'firstName',
              fieldValue: state.firstName,
            })
          }
          param={'firstName'}
          rightChildren={
            <IconComponent
              iconName={'account'}
              iconColor={styles.darkBlueColor}
              iconViewStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: spacing.xxs,
              }}
            />
          }
        />
        <FloatingTextInputIconComponent
          labelText={strings.lastName}
          value={state.lastName}
          placeholder={strings.lastNameMsg}
          keyboardType="default"
          inputMode="text"
          isPasswordMode={false}
          error={errors}
          nextRef={lastNameRef}
          customLabelStyles={styles.customLabelStyles}
          onChangeText={text => handleInputChange('lastName', text)}
          onSubmitEditing={() => emailRef.current.focus()}
          returnType={'next'}
          param={'lastName'}
          viewStyle={{}}
          onEndEditing={() =>
            handleValidation({
              fieldLabel: 'lastName',
              fieldValue: state.lastName,
              setValidErrors: handleErrors,
            })
          }
          rightChildren={
            <IconComponent
              iconName={iconNames.account}
              iconColor={styles.darkBlueColor}
              isDisabled={true}
              iconViewStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: spacing.xxs,
              }}
            />
          }
        />
        <FloatingTextInputIconComponent
          labelText={strings.email}
          value={state.email}
          placeholder={strings.emailHint}
          keyboardType="email-address"
          inputMode="email"
          isPasswordMode={false}
          error={errors}
          nextRef={emailRef}
          customLabelStyles={styles.customLabelStyles}
          onChangeText={text =>
            setState(prevState => ({...prevState, email: text}))
          }
          onSubmitEditing={() => contactRef}
          returnType={'done'}
          onEndEditing={() =>
            handleValidation({
              fieldLabel: 'email',
              fieldValue: state.email,
            })
          }
          param={'email'}
          rightChildren={
            <IconComponent
              iconName={'email'}
              iconColor={styles.darkBlueColor}
              isDisabled={true}
              iconViewStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: spacing.xxs,
              }}
            />
          }
        />

        <View style={{height: hp(9.5)}}>
          <View style={styles.contactView}>
            <TextComponent
              text={strings.contact}
              textStyle={styles.contactLabel}
            />
            <PhoneInput
              ref={contactRef}
              defaultValue={contact}
              defaultCode="IN"
              layout="first"
              withShadow={false}
              value={contact}
              textInputProps={{
                maxLength: validLength,
                placeholderTextColor: styles.placeholderColor,
              }}
              autoFocus={false}
              disableArrowIcon={false}
              placeholder={strings.contactMsg}
              textInputStyle={[styles.textInputStyle]}
              containerStyle={styles.phoneContainer}
              flagButtonStyle={{
                justifyContent: 'flex-start',
                width: 'auto',
              }}
              codeTextStyle={styles.countryCodeTextStyle}
              textContainerStyle={styles.textContainer}
              onChangeFormattedText={text => {
                // setState(prevState => ({...prevState, contact: text}));
              }}
              onChangeCountry={country => {
                handleValidCountryLength(country);
              }}
              onChangeText={text => {
                setContact(text);

                // setState(prevState => ({...prevState, contact: text}));
                if (isValidNumber(text, state.countryCode)) {
                  setValidLength(text.length);
                }
              }}
            />
          </View>
          {errors != null && errors['contact'] != undefined && (
            <Text style={[styles.errorStyle]}>{errors['contact']}</Text>
          )}
        </View>

        <FloatingTextInputIconComponent
          labelText={strings.password}
          value={state.password}
          placeholder={strings.passwordHint}
          keyboardType="default"
          inputMode="text"
          isPassword={true}
          error={errors}
          customLabelStyles={styles.customLabelStyles}
          onChangeText={text =>
            setState(prevState => ({...prevState, password: text}))
          }
          nextRef={passwordRef}
          onSubmitEditing={() => confirmPassRef.current.focus()}
          returnType={'next'}
          onEndEditing={() =>
            handleValidation({
              fieldLabel: 'password',
              fieldValue: state.password,
            })
          }
          param={'password'}
          viewStyle={{
            paddingBottom: 0,
          }}
        />

        <FloatingTextInputIconComponent
          labelText={strings.confirmPass}
          value={state.confirmPassword}
          placeholder={strings.confirmPassMsg}
          keyboardType="default"
          inputMode="text"
          isPassword={true}
          error={errors}
          customLabelStyles={styles.customLabelStyles}
          onChangeText={text =>
            setState(prevState => ({...prevState, confirmPassword: text}))
          }
          nextRef={confirmPassRef}
          returnType={'done'}
          onEndEditing={() =>
            handleValidation({
              fieldLabel: 'confirmPass',
              fieldValue: state.confirmPassword,
              passVal: state.password,
            })
          }
          param={'confirmPass'}
          viewStyle={{
            paddingBottom: 0,
          }}
        />

        <ButtonComponent
          btnTitle={strings.signup}
          btnTitleStyle={styles.btnTitle}
          btnStyle={styles.btnStyle}
          btnOnPress={() => handleOnSignup()}
        />
      </View>
    </View>
  );
};

const SignupScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState({});
  const styles = useThemedStyles(style);
  const imageOptions = [
    {
      optionTitle: 'Camera',
      icon: iconNames.camera,
      onPress: () => onCameraPress(),
    },
    {
      optionTitle: 'Gallery',
      icon: iconNames.gallery,
      onPress: () => onGalleryPress(),
    },
    {
      optionTitle: 'Remove',
      icon: iconNames.remove,
      onPress: () => {
        setModalVisible(false);
        setProfileImagePath({});
      },
    },
  ];

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.log('Write permission err', err);
      }
      return false;
    } else return true;
  };
  ///function to handle camera picker
  const onCameraPress = async () => {
    setModalVisible(false);
    const options = {
      quality: 1,
      saveToPhotos: true,

      mediaType: 'mixed',
    };

    const cameraPermitted = await Permissions.handleCameraPermission();
    const storagePermitted = await requestExternalWritePermission();

    if (cameraPermitted) {
      console.log('Permitted');
      await launchCamera(options, response => {
        console.log(response);

        if (response.didCancel) {
          console.log('User pressed the cancel button');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera permission unavailable');
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }

        // console.log(response.assets.entries());
        for (var items in response) {
          const resArr = response[items];
          for (var i in resArr) {
            const resObj = resArr[i];
            console.log('uri -> ', resObj.uri);
            console.log('fileName -> ', resObj.fileName);
            setProfileImagePath(resObj);
          }
        }
      });
    }
  };

  ///function to handle gallery
  const onGalleryPress = async () => {
    setModalVisible(false);
    let options = {
      mediaType: 'image',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets);

      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
      }

      for (var items in response) {
        const resArr = response[items];
        for (var i in resArr) {
          const resObj = resArr[i];
          console.log('uri -> ', resObj.uri);
          console.log('fileName -> ', resObj.fileName);
          setProfileImagePath(resObj);
        }
      }
    });
  };

  const handleModalVisibilty = bool =>
    bool == undefined ? setModalVisible(!modalVisible) : setModalVisible(bool);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      <ImageBackgroundComponent
        imageSrc={images.loginBg}
        resizeMode={'center'}
        children={
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                marginTop: hp(8),
              }}>
              <TextComponent text={strings.signup} textStyle={styles.title} />
              <TextComponent
                text={strings.signupMess}
                textStyle={styles.subTitle}
              />

              <SignupBody
                onShowImageModel={() => handleModalVisibilty()}
                navigation={navigation}
                profileImage={profileImagePath}
              />

              <TouchableOpacity onPress={() => navigation.pop()}>
                <Text style={styles.alreadyAccMsg}>
                  {strings.alreadyHaveAccount}
                  <Text
                    style={{
                      color: styles.orangeText,
                    }}>
                    {' '}
                    {strings.login}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        }
      />

      <ShowProfileModel
        isVisible={modalVisible}
        data={imageOptions}
        setVisible={handleModalVisibilty}
      />
    </View>
  );
};

export default SignupScreen;
