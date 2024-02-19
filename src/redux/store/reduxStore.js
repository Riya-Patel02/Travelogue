import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import authSlice from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dashboardSlice from '../slices/dashboardSlice';

///persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['userAuth', 'userDashboard'],
};

const RootReducers = combineReducers({
  ///reducers
  userAuth: authSlice,
  userDashboard: dashboardSlice,
});
const persistedReducer = persistReducer(persistConfig, RootReducers);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),

  devTools: true,
});
const persister = persistStore(reduxStore);

export {reduxStore, persister};
