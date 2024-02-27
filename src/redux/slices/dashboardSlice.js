import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncReadData } from '../../services/storeAsyncData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { constants } from '../../theme';

const initialState = {
  apiData: null,
  favList: [],
};

const dashboardSlice = createSlice({
  
  name: 'userDashboard',
  initialState,

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setApiData: (state, action) => {
      if (Array.isArray(action.payload)) {
        // If it's already an array, assign it directly
        state.apiData = JSON.parse(action.payload);
      } else {
        // If it's not an array, convert it to an array and assign
        state.apiData = JSON.parse([action.payload]);
      }
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setFavList: (state, action) => {
      state.favList = action.payload;
    },
  },
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

///Thunk action to fetch saved data
export const fetchData = key => async dispatch => {
  try {
    const item = await handleAsyncReadData(key);
    if (key === constants.storageKeys.FAVLIST) {
      dispatch(setFavList(item));
    } else if (key === constants.storageKeys.CURRENTUSER) {
      dispatch(setCurrentUser(item));
    } else if (key === constants.storageKeys.STOREDATA) {
      dispatch(setAllUsers(item));
    }
  } catch (error) {
    // Handle error if necessary
    console.error('Error fetching  data:', error);
  }
};

export const pushApiData = apiData => async dispatch => {
  try {
  
    if (apiData != null) {
      dispatch(setApiData(apiData));
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToFavList = data => async dispatch => {
  try {
    if (data != null) {
      dispatch(setFavList(d));
    }
  } catch (err) {
    console.log(err);
  }
};

const {setApiData, setFavList} = dashboardSlice.actions;

export const selectApiData = state => state.userDashboard.apiData;
export const selectFavList = state => state.userDashboard.favList;

export default dashboardSlice.reducer;
