import {BackHandler, Text, View} from 'react-native';
import ImageBackgroundComponent from '../../../components/imageBackground';

import TextComponent from '../../../components/textComponent';

import IconComponent from '../../../components/iconComponent';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import FloatingTextInputIconComponent from '../../../components/floatingTextInputIconComponent';
import ButtonComponent from '../../../components/buttonComponent';

import ValidationUtils from '../../../utils/validationUtils';
import CheckboxComponent from '../../../components/checkboxComponent';

import {useFocusEffect} from '@react-navigation/native';
import {FocusAwareStatusBar} from '../../../components/statusbarComponent';
import style from './styles';
import useThemedStyles from '../../../services/useThemedStyles';
import {
  constants,
  hp,
  images,
  routeKeys,
  spacing,
  strings,
} from '../../../theme';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveAsyncData,
  selectRememberUser,
  setSignIn,
  removeUser,
  fetchData,
  selectAllUsers,
  setAllUsersApi,
} from '../../../redux/slices/authSlice';
import {
  getUserApiData,
  getUserAuthData,
} from '../../../controllers/apiController';

const validation = new ValidationUtils();

const LoginBody = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isChecked: false,
    userObj: {},
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const passwordRef = useRef();
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();
  const udata = useSelector(selectRememberUser);
  const allUsersfromRedux = useSelector(selectAllUsers);

  useFocusEffect(
    useCallback(() => {
   
      dispatch(fetchData(constants.storageKeys.REMEMBERUSER));
      // dispatch(fetchData(constants.storageKeys.STOREDATA));
      getUserAuthData()
        .then(res => {
          dispatch(setAllUsersApi(res));
        })
        .catch(err => console.log('error', err));

      BackHandler.addEventListener('hardwareBackPress', () =>
        BackHandler.exitApp(),
      );

      return () => {
       
        setErrors({});
        setState({userObj: {}});
        setLoginError('');
      };
    }, []),
  );

  useEffect(() => {
    if (allUsersfromRedux) {
      setAllUsers(allUsersfromRedux);
    }
    if (udata) {
      setState({
        email: udata.email,
        password: udata.password,
        isChecked: udata.isChecked,
      });
    }
  }, [allUsersfromRedux, udata]);

  ///handle single field validation
  const handleSingleValidation = ({fieldLabel, fieldValue}) => {
    switch (fieldLabel) {
      case 'email':
        validation.ValidateEmail({email: fieldValue});
        break;

      case 'password':
        validation.ValidatePassword({password: fieldValue});
        break;
    }
    const updatedErrors = validation.errors;
    handleErrors({...updatedErrors});
  };

  ///function to handle on login
  const handleOnLogin = ({email, password, setValidErrors}) => {
    const validatedEmail = validation.ValidateEmail({email: email});
    const validatedPassword = validation.ValidatePassword({password: password});

    if (validatedEmail && validatedPassword) {
      setValidErrors(null);
      const userPassExists = allUsers.some(
        user => user.email === email && user.password === password,
      );
      const userEmailExists = allUsers.some(user => user.email === email);

      if (userEmailExists && userPassExists) {
        console.log('validated');
        setLoginError('');
        const userObj = {
          email: state.email,
          password: state.password,
          isChecked: state.isChecked,
        };
        const currentUser = allUsers.filter(user => user.email === email);

        if (state.isChecked) {
          dispatch(
            saveAsyncData(
              constants.storageKeys.REMEMBERUSER,
              JSON.stringify(userObj),
            ),
          );
        } else {
          dispatch(removeUser(constants.storageKeys.REMEMBERUSER));
        }

        dispatch(
          saveAsyncData(
            constants.storageKeys.CURRENTUSER,
            JSON.stringify(...currentUser),
          ),
        );

        dispatch(setSignIn());

        dispatch(
          saveAsyncData(constants.storageKeys.FAVLIST, JSON.stringify([])),
        );
        setTimeout(
          () =>
            navigation.push(routeKeys.HOMEKEY, {
              currentEmail: state.email,
            }),
          1000,
        );
      } else {
        if (userEmailExists || userPassExists) {
          setLoginError('Incorrect Password or Email Credentials');
        } else if (userEmailExists == false && userPassExists == false) {
          setLoginError('Please Register User');
        }
      }

      // handleSaveData(constants.storageKeys.ISLOGGEDIN, JSON.stringify(true));
    } else {
      const updatedErrors = validation.errors;
      handleErrors({...updatedErrors});
    }
  };

  ///function to handle errors
  const handleErrors = errorMessage => {
    setErrors({
      ...errorMessage,
    });
  };

  

  return (
    <View
      style={{
        margin: spacing.m,
        marginBottom: 0,
        marginTop: hp(5),
        padding: spacing.xxs,
        height: 'auto',
      }}>
      {loginError && (
        <View
          style={{
            height: hp(5),
            marginBottom: 5,
            justifyContent: 'center',
            backgroundColor: styles.errorBg,
          }}>
          <TextComponent text={loginError} textStyle={styles.errorStyle} />
        </View>
      )}
      <View style={styles.viewContainer}>
        <FloatingTextInputIconComponent
          labelText={strings.email}
          value={state.email}
          placeholder={strings.emailHint}
          keyboardType="email-address"
          inputMode="email"
          isPasswordMode={false}
          error={errors}
          onChangeText={text =>
            setState(prevState => ({...prevState, email: text}))
          }
          onSubmitEditing={() => passwordRef.current.focus()}
          returnType={'next'}
          customLabelStyles={styles.customLabelStyles}
          onEndEditing={() =>
            handleSingleValidation({
              fieldLabel: 'email',
              fieldValue: state.email,
            })
          }
          viewStyle={{
            marginTop: spacing.xs,
          }}
          param={'email'}
          rightChildren={
            <IconComponent
              iconName={'email'}
              iconColor={styles.iconColor}
              isDisabled={true}
              iconSize={20}
              iconViewStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: spacing.xxs,
              }}
            />
          }
        />

        <FloatingTextInputIconComponent
          labelText={strings.password}
          value={state.password}
          placeholder={strings.passwordHint}
          keyboardType="default"
          inputMode="text"
          isPassword={true}
          error={errors}
          onChangeText={text =>
            setState(prevState => ({...prevState, password: text}))
          }
          nextRef={passwordRef}
          returnType={'done'}
          customLabelStyles={styles.customLabelStyles}
          onEndEditing={() =>
            handleSingleValidation({
              fieldLabel: 'password',
              fieldValue: state.password,
            })
          }
          param={'password'}
          viewStyle={{
            paddingBottom: 0,
          }}
        />

        <View style={styles.rowContainer}>
          <CheckboxComponent
            checkboxStyle={{
              padding: 0,
              alignSelf: 'flex-start',
              paddingBottom: 0,

              width: 'auto',
            }}
            isChecked={state.isChecked}
            uncheckedCheckBoxColor={styles.uncheckedCheckBoxColor}
            checkedCheckBoxColor={styles.checkedCheckBoxColor}
            checkboxColor={styles.uncheckedCheckBoxColor}
            onClick={() =>
              setState(prevState => ({
                ...prevState,
                isChecked: !state.isChecked,
              }))
            }
          />
          <TextComponent
            text={strings.rememberMe}
            textStyle={styles.rememberMe}
          />
          <TextComponent
            text={strings.forgotPassword}
            textStyle={styles.forgotPass}
          />
        </View>

        <ButtonComponent
          btnTitle={strings.login}
          btnTitleStyle={styles.btnTitle}
          btnStyle={styles.btnStyle}
          btnOnPress={() =>
            handleOnLogin({
              email: state.email,
              password: state.password,
              setValidErrors: handleErrors,
            })
          }
        />
      </View>
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const styles = useThemedStyles(style);
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
          <View
            style={{
              justifyContent: 'center',
              marginTop: '20%',
            }}>
            <TextComponent text={strings.travelogue} textStyle={styles.title} />
            <TextComponent
              text={strings.travelMess}
              textStyle={styles.subTitle}
            />
            <LoginBody navigation={navigation} />

            <TouchableOpacity
              onPress={() => navigation.navigate(routeKeys.SIGNUPKEY)}>
              <Text style={styles.createAcc}>
                {strings.createAccountMsg}
                <Text
                  style={{
                    color: styles.orangeText,
                  }}>
                  {' '}
                  {strings.signup}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;
