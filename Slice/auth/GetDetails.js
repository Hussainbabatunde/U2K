import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {U2K_APIKEY} from '@env';

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let userAPi = process.env.SMOOTHRIDE_NEWAPI + "login";

const initialState = {
  loginuser: null,
  registeruser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  getUserdata: null,
  getWalletData: null,
};
export const GetUserDetails = createAsyncThunk(
    "getUser/userGetUser",
    async (details, { rejectWithValue }) => {
      const tokengot = await AsyncStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: U2K_APIKEY,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .get(`/users/${details}`)
        .then(async (response) => {
            // console.log("response register ", response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          Alert.alert(`${errdata.message}`)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  export const GetWalletBalanceApi = createAsyncThunk(
    "getWallet/userGetWallet",
    async (_, { rejectWithValue }) => {
      const tokengot = await AsyncStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: U2K_APIKEY,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: infoneeded
        },
      });
      return await instance
        .get("/users/wallet/balance")
        .then(async (response) => {
            console.log("wallet balance ", response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );



export const GetDetailsSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(GetUserDetails.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getUserdata = action.payload;
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.registeruser = false;
      })
      .addCase(GetWalletBalanceApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(GetWalletBalanceApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.getWalletData = action.payload;
      })
      .addCase(GetWalletBalanceApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.registeruser = false;
      });
  },
});

export const { reset } = GetDetailsSlice.actions;

export const selectLoginSlice = (state) => state.GetDetailsSlice;
export default GetDetailsSlice.reducer;
