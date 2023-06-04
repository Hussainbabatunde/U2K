import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {U2K_APIKEY} from '@env';

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const initialState = {
  loginuser: null,
  registeruser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  addMoneydata: null,
};

export const AddMoneyApi = createAsyncThunk(
    "addMoney/userAddMoney",
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
        .post("/users/wallet/deposit", details)
        .then(async (response) => {
            // console.log("added money ", response.data)
          return response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log('error ', errdata)
          Alert.alert(`${errdata?.message}`)
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );


  
export const PaymentSlice = createSlice({
    name: "paymentSlice",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(AddMoneyApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(AddMoneyApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.addMoneydata = action.payload;
        })
        .addCase(AddMoneyApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.registeruser = false;
        });
    },
  });
  
  export const { reset } = PaymentSlice.actions;
  
  export const selectLoginSlice = (state) => state.PaymentSlice;
  export default PaymentSlice.reducer;
  