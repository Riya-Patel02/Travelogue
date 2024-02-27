import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleAsyncReadData,
  handleRemoveAsyncData,
} from '../../services/storeAsyncData';
import {constants} from '../../theme';

const initialState = {
  isLoggedIn: false,
  currentUser: {},
  allUsers: [],
  rememberUsers: [],
  allFavs: [],
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isLoggedIn = true;
    },
    setSignup: (state, action) => {
      state.isLoggedIn = true;
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
    },
    setUserData: (state, action) => {
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setRememberUsers: (state, action) => {
      state.rememberUsers = action.payload;
    },
    setFav: (state, action) => {
      state.allFavs = action.payload;
    },
  },
});

export const {
  setSignIn,
  setSignup,
  setUserData,
  setAllUsers,
  setRememberUsers,
  setLogout,
  setFav,
  setEmailToFavList,
} = authSlice.actions;

//Thunk action to remove user data
export const removeUser = key => async dispatch => {
  try {
    const item = await handleRemoveAsyncData(key);

  
    return true;
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

// Thunk action to save data asynchronously
export const saveAsyncData = (key, value) => async dispatch => {
  try {
    await AsyncStorage.setItem(key, value);
    // Dispatch action to indicate successful data save if necessary
    dispatch(userSaved(true));
    return true;
  } catch (error) {
    // Handle error if necessary
    console.error('Error saving data:', error);
    dispatch(userSaved(false));
    return false;
  }
};

///Thunk action to fetch saved data
export const fetchData = key => async dispatch => {
  try {
    const item = await handleAsyncReadData(key);
    if (key === constants.storageKeys.REMEMBERUSER) {
      dispatch(setRememberUsers(item));
    } else if (key === constants.storageKeys.CURRENTUSER) {
      dispatch(setUserData(item));
    } else if (key === constants.storageKeys.SAVEDLANGUAGE) {
      dispatch(setAppLanguage(item));
    } else if (key === constants.storageKeys.STOREDATA) {
      dispatch(setAllUsers(item));
    } else if (key === constants.storageKeys.demo) {
    
      dispatch(setFav(item));
    }
  } catch (error) {
    // Handle error if necessary
    console.error('Error fetching  data:', error);
  }
};
// Action creator for user save status
export const userSaved = isSaved => ({
  type: 'userAuth/userSaved',
  payload: isSaved,
});
///thunk to update existing user
export const updateUserData = (key, value) => async dispatch => {
  try {
   
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Handle error if necessary
    console.error('Error saving data:', error);

    return false;
  }
};
///thunk function to set all users
export const setAllUsersApi = data => async dispatch => {
  try {
    dispatch(setAllUsers(data));
  } catch (error) {
    console.log('error fetchintg data', error);
  }
};

export const selectIsLoggedIn = state => state.userAuth.isLoggedIn;
export const selectAllUsers = state => state.userAuth.allUsers;
export const selectRememberUser = state => state.userAuth.rememberUsers;
export const selectAllFavs = state => state.userAuth.allFavs;
export const selectCurrentUser = state => state.userAuth.currentUser;

// Export reducer
export default authSlice.reducer;
