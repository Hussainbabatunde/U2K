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
  banksData: null,
  verifyAcc: null,
  withdrawalData: null
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

  export const GetAllBanksApi = createAsyncThunk(
    "allBanks/userAllBanks",
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
        .get("/banks")
        .then(async (response) => {
            // console.log("banks ", response.data)
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

  export const VerifyAccNumberApi = createAsyncThunk(
    "verifyAcc/userVerifyAcc",
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
        .post("/banks/verify", details)
        .then(async (response) => {
            // console.log("banks verify ", response.data)
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

  export const WithdrawMoneyApi = createAsyncThunk(
    "withdrawal/userWithdrawal",
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
        .post("/users/wallet/withdraw", details)
        .then(async (response) => {
            // console.log("withdrawal ", response.data)
            Alert.alert(`${response.data?.message}`)
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
        })
        .addCase(GetAllBanksApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(GetAllBanksApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.banksData = action.payload;
        })
        .addCase(GetAllBanksApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.registeruser = false;
        })
        .addCase(VerifyAccNumberApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(VerifyAccNumberApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.verifyAcc = action.payload;
        })
        .addCase(VerifyAccNumberApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.registeruser = false;
        })
        .addCase(WithdrawMoneyApi.pending, (state) => {
          state.isLoading = true;
          state.null = true;
        })
        .addCase(WithdrawMoneyApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = true;
          state.withdrawalData = action.payload;
        })
        .addCase(WithdrawMoneyApi.rejected, (state, action) => {
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
  