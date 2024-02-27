import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import { useCallback, useEffect, useRef, useState } from 'react';
import { style } from './styles';


import {
  constants,
  hp,
  iconNames,
  images,
  spacing,
  strings,
} from '../../../../theme/index';

import useThemedStyles from '../../../../services/useThemedStyles';
import HeaderComponent from '../../../../components/headerComponent';
import IconComponent from '../../../../components/iconComponent';
import TextComponent from '../../../../components/textComponent';
import { FocusAwareStatusBar } from '../../../../components/statusbarComponent';
import ValidationUtils from '../../../../utils/validationUtils';
import FloatingTextInputIconComponent from '../../../../components/floatingTextInputIconComponent';
import ButtonComponent from '../../../../components/buttonComponent';
import { ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Permissions from '../../../../services/handlePermissions';
import { useFocusEffect } from '@react-navigation/native';
import CustomToastComponent from '../../../../components/customToastComponent';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAllUsers,
  selectCurrentUser,
  setAllUsersApi,
  updateUserData,
  fetchData
} from '../../../../redux/slices/authSlice';
import {
  getUserAuthData,
  updateUserAuthData,
} from '../../../../controllers/apiController';

const validation = new ValidationUtils();
const headerTopMargin = StatusBar.currentHeight;

const ShowProfileModel = ({isVisible, setVisible, data}) => {
  const styles = useThemedStyles(style);

  console.log('isvisible', isVisible);

  return (
    isVisible && (
      <View
        style={{
        
          position: 'absolute',
          width: '100%',
          bottom: 0,
          backgroundColor: 'red',
        }}>
        <Modal
          visible={isVisible}
          coverScreen={true}
          onBackdropPress={() => setVisible(false)}
          transparent={true}
          onAccessibilityTap={() => console.log('pressed')}
         
          style={{
            bottom: 0,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            paddingBottom: 0,
            marginBottom: 0,
            marginTop: spacing.xs,
            height: 0,
           
          }}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextComponent
                text={strings.chooseFrom}
                textStyle={styles.chooseFromText}
              />
              <IconComponent
                iconName={iconNames.cancel}
                iconColor={'black'}
                iconSize={20}
                onIconPress={() => setVisible(false)}
                iconViewStyle={{
                  marginTop: 5,
                }}
              />
            </View>
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
      </View>
    )
  );
};

const ProfileBody = ({navigation}) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    countryCode: 'IN',
    userObj: {},
  });

  const styles = useThemedStyles(style);
  const [profileImage, setProfileImage] = useState('');

  const [errors, setErrors] = useState({});
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef(null);
  const passwordRef = useRef();
  const [allUsers, setAllUsers] = useState([]);
  const [saveError, setSaveError] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const allUsersfromRedux = useSelector(selectAllUsers);

  ///handle input fields change
  const handleInputChange = (field, text) => {
    setState(prevState => ({...prevState, [field]: text}));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAllUser = () => {
        getUserAuthData()
          .then(res => {
            dispatch(setAllUsersApi(res));
          })
          .catch(err => console.log('error', err));

        if (allUsersfromRedux) {
          setAllUsers(allUsersfromRedux);
        }
      };

      const fetchCurrentUserData = () => {
        dispatch(fetchData(constants.storageKeys.CURRENTUSER));

        if (currentUser) {
          setState({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: currentUser.password,
            contact: currentUser.contact,
            countryCode: currentUser.countryCode,
          });
          setProfileImage(currentUser.profileImage);
        }
      };

      fetchAllUser();
      fetchCurrentUserData();
    }, [navigation]),
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setErrors({});
      setSaveError('');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (allUsersfromRedux) {
      setAllUsers(allUsersfromRedux);
    }
    if (currentUser) {
      setState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: currentUser.password,
        contact: currentUser.contact,
        countryCode: currentUser.countryCode,
      });
      setProfileImage(currentUser.profileImage);
    }
  }, [allUsersfromRedux, currentUser]);
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

  const imageOptions = [
    {
      optionTitle: strings.camera,
      icon: iconNames.camera,
      onPress: () => onCameraPress(),
    },
    {
      optionTitle: strings.gallery,
      icon: iconNames.gallery,
      onPress: () => onGalleryPress(),
    },
    {
      optionTitle: strings.remove,
      icon: iconNames.remove,
      onPress: () => {
        setModalVisible(false);
        setProfileImage(undefined);
      },
    },
  ];

  ///function to handle camera picker
  const onCameraPress = async () => {
    setModalVisible(false);
    const options = {
      quality: 1,
      saveToPhotos: true,

      mediaType: 'mixed',
    };

    const cameraPermitted = await Permissions.handleCameraPermission();

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


        for (var items in response) {
          const resArr = response[items];
          for (var i in resArr) {
            const resObj = resArr[i];
            console.log('uri -> ', resObj.uri);
            console.log('fileName -> ', resObj.fileName);
            setProfileImage(resObj.uri);
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
          setProfileImage(resObj.uri);
        }
      }
    });
  };

  const handleModalVisibilty = bool =>
    bool == undefined ? setModalVisible(!modalVisible) : setModalVisible(bool);

  /// function to handle on signup
  const handleOnSave = () => {
    const validatedFname = validation.ValidateFName({fname: state.firstName});
    const validatedLname = validation.ValidateLName({lname: state.lastName});
    const validatedEmail = validation.ValidateEmail({email: state.email});
   
    const validatedPassword = validation.ValidatePassword({
      password: state.password,
    });

    if (
      validatedFname &&
      validatedLname &&
      validatedEmail &&
      validatedPassword
    ) {
      console.log('valid');
      handleErrors(null);

      const userObj = {
        firstName: state.firstName,
        lastName: state.lastName,
        contact: state.contact,
        email: state.email,
        password: state.password,
        profileImage: profileImage,
      };

      setAllUsers(prevUsers => [
        userObj,
        ...prevUsers.filter(user => user.email !== state.email),
      ]);

      dispatch(
        updateUserData(
          constants.storageKeys.CURRENTUSER,
          JSON.stringify(userObj),
        ),
      );

      setSaveSuccess(true);
      updateUserAuthData(currentUser.id, userObj).then(res =>
        console.log('update res', res),
      );

      

      setTimeout(() => setSaveSuccess(false), 1000);

      setIsEditable(false);
    } else {
      const updatedErrors = validation.errors;
      handleErrors({...updatedErrors});
    }
  };

  const handleValidCountryLength = country => {
    setState({countryCode: country.cca2});
    setTimeout(() => setContact(null), 1000);
  };

  console.log(currentUser.profileImage);

  return (
    <View
      style={{
    
        paddingBottom: 0,
        borderWidth: 0,
        marginBottom: 0,
        height: '100%',
      }}>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          disabled={!isEditable}
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
        
          onPress={() => setModalVisible(!modalVisible)}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',

              marginTop: spacing.xs,
            }}>
            {profileImage == undefined && (
              <Image
                source={images.profileImg}
                resizeMode="cover"
                style={styles.dummyProfile}
              />
            )}
            {profileImage != undefined && (
              <Image
                source={{uri: profileImage}}
                resizeMode="cover"
                style={styles.profile}
              />
            )}
            {/* {profileImage == undefined && (
                <Image
                  source={images.profileImg}
                  resizeMode="cover"
                  style={styles.dummyProfile}
                />
              )} */}

            <TextComponent
              text={strings.chooseProfileImage}
              textStyle={styles.modalTitle}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            marginHorizontal: 0,
          }}>
          <FloatingTextInputIconComponent
            labelText={!isEditable ? '' : strings.firstName}
            value={state.firstName}
            placeholder={strings.firstNameMsg}
            keyboardType="default"
            inputMode="text"
            isPasswordMode={false}
            error={errors}
            errorStyle={styles.errorStyle}
            editable={isEditable}
            viewStyle={
              isEditable
                ? {
                    paddingLeft: 0,
                    paddingRight: 0,

                    padding: 5,

                    justifyContent: 'center',
                  }
                : {
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: 'auto',
                  }
            }
            inputStyle={
              isEditable
                ? {}
                : {
                    padding: 0,
                    marginTop: 0,
                  }
            }
            topLabel={isEditable ? '' : strings.firstName}
            showTopLabel={!isEditable}
            containerStyle={[
              styles.containerStyle,
              isEditable ? {height: 'auto'} : {height: hp(5)},
            ]}
            onChangeText={text =>
              setState(prevState => ({...prevState, firstName: text}))
            }
            onSubmitEditing={() => lastNameRef.current.focus()}
            returnType={'next'}
            onEndEditing={() =>
              handleValidation({
                fieldLabel: 'firstName',
                fieldValue: state.firstName,
              })
            }
            param={'firstName'}
            customLabelStyles={styles.customLabelStyles}
            rightChildren={
              <IconComponent
                iconName={'account'}
                iconViewStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: spacing.xxs,
                }}
              />
            }
          />
          <FloatingTextInputIconComponent
            labelText={!isEditable ? '' : strings.lastName}
            value={state.lastName}
            placeholder={strings.lastNameMsg}
            keyboardType="default"
            inputMode="text"
            isPasswordMode={false}
            editable={isEditable}
            error={errors}
            nextRef={lastNameRef}
            onChangeText={text => handleInputChange('lastName', text)}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnType={'next'}
            errorStyle={styles.errorStyle}
            param={'lastName'}
            viewStyle={
              isEditable
                ? {
                    paddingLeft: 0,
                    paddingRight: 0,
               
                    padding: 5,

                    justifyContent: 'center',
                  }
                : {
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: 'auto',
                  }
            }
            inputStyle={
              isEditable
                ? {}
                : {
                    padding: 0,
                    marginTop: 0,
                  }
            }
            topLabel={isEditable ? '' : strings.lastName}
            showTopLabel={!isEditable}
            containerStyle={[
              styles.containerStyle,
              isEditable ? {height: 'auto'} : {height: hp(5)},
            ]}
            onEndEditing={() =>
              handleValidation({
                fieldLabel: 'lastName',
                fieldValue: state.lastName,
                setValidErrors: handleErrors,
              })
            }
            customLabelStyles={styles.customLabelStyles}
            rightChildren={
              <IconComponent
                iconName={iconNames.account}
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
            labelText={!isEditable ? '' : strings.email}
            value={state.email}
            placeholder={strings.emailHint}
            keyboardType="email-address"
            inputMode="email"
            isPasswordMode={false}
            error={errors}
            nextRef={emailRef}
            editable={false}
            viewStyle={
              isEditable
                ? {
                    paddingLeft: 0,
                    paddingRight: 0,
                    padding: 5,
                    justifyContent: 'center',
                  }
                : {
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: 'auto',
                  }
            }
            inputStyle={
              isEditable
                ? {}
                : {
                    padding: 0,
                    marginTop: 0,
                  }
            }
            topLabel={isEditable ? '' : strings.email}
            showTopLabel={!isEditable}
            containerStyle={[
              styles.containerStyle,
              isEditable ? {height: 'auto'} : {height: hp(5)},
            ]}
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
            errorStyle={styles.errorStyle}
            customLabelStyles={styles.customLabelStyles}
            rightChildren={
              <IconComponent
                iconName={'email'}
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
            labelText={!isEditable ? '' : strings.contact}
            value={state.contact}
            placeholder={strings.contactMsg}
            keyboardType="phone-pad"
            inputMode="numeric"
            isPasswordMode={false}
            error={errors}
            nextRef={contactRef}
            editable={false}
            viewStyle={
              isEditable
                ? {
                    paddingLeft: 0,
                    paddingRight: 0,
                 
                    padding: 5,

                    justifyContent: 'center',
                  }
                : {
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: 'auto',
                  }
            }
            inputStyle={
              isEditable
                ? {}
                : {
                    padding: 0,
                    marginTop: 0,
                  }
            }
            topLabel={isEditable ? '' : strings.contact}
            showTopLabel={!isEditable}
            containerStyle={[
              styles.containerStyle,
              isEditable ? {height: 'auto'} : {height: hp(5)},
            ]}
            onSubmitEditing={() => passwordRef}
            returnType={'done'}
            onEndEditing={() => null}
            param={'contact'}
            errorStyle={styles.errorStyle}
            customLabelStyles={styles.customLabelStyles}
            rightChildren={
              <IconComponent
                iconName={iconNames.phone}
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
            labelText={!isEditable ? '' : strings.password}
            value={state.password}
            placeholder={strings.passwordHint}
            keyboardType="default"
            inputMode="text"
            isPassword={true}
            error={errors}
            editable={isEditable}
            onChangeText={text =>
              setState(prevState => ({...prevState, password: text}))
            }
            nextRef={passwordRef}
            viewStyle={
              isEditable
                ? {
                    paddingLeft: 0,
                    paddingRight: 0,
                    padding: 5,
                    justifyContent: 'center',
                  }
                : {
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: 'auto',
                  }
            }
            inputStyle={
              isEditable
                ? {}
                : {
                    padding: 0,
                    marginTop: 0,
                  }
            }
            topLabel={isEditable ? '' : strings.password}
            showTopLabel={!isEditable}
            containerStyle={[
              styles.containerStyle,
              isEditable ? {height: 'auto'} : {height: hp(5)},
            ]}
        
            returnType={'done'}
            errorStyle={styles.errorStyle}
            customLabelStyles={styles.customLabelStyles}
            toggleIconColor={styles.toggleIconColor}
            onEndEditing={() =>
              handleValidation({
                fieldLabel: 'password',
                fieldValue: state.password,
              })
            }
            param={'password'}
          />

          {isEditable && (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                flex: 1,
              }}>
              <ButtonComponent
                btnTitle={strings.cancel}
                btnTitleStyle={[styles.btnTitle, {width: '45%'}]}
                btnStyle={[styles.btnStyle]}
                btnOnPress={() => {
                  setIsEditable(false);

                  dispatch(fetchData(constants.storageKeys.CURRENTUSER));
                  // handleReadData(constants.storageKeys.CURRENTUSER);
                }}
              />
              <ButtonComponent
                btnTitle={strings.save}
                btnTitleStyle={[styles.btnTitle, {width: '45%'}]}
                btnStyle={styles.btnStyle}
                btnOnPress={() => handleOnSave()}
              />
            </View>
          )}

          {!isEditable && (
            <ButtonComponent
              btnTitle={strings.editProfile}
              btnTitleStyle={styles.btnTitle}
              btnStyle={styles.btnStyle}
              btnOnPress={() => {
                setIsEditable(true);
              }}
            />
          )}

          {saveSuccess === true && (
            <CustomToastComponent message={'Profile Updated Successfully'} />
          )}
        </View>
      </View>
      <ShowProfileModel
        isVisible={modalVisible}
        data={imageOptions}
        setVisible={handleModalVisibilty}
      />
    </View>
  );
};

const ProfileScreen = ({navigation, route}) => {
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
              iconName={iconNames.leftArrow}
              iconSize={25}
              onIconPress={() => navigation.goBack()}
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
              text={strings.profile}
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
        <ProfileBody navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
