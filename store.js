import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import LoginSlice from "./Slice/auth/Loginslice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import { combineReducers } from "redux";


const reducers = combineReducers({
  LoginSlice: LoginSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
//   blacklist: ["RejectTripSlice", "GetAllDriverTripsSlice", "logoutSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },

      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
