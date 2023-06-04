import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {U2K_APIKEY} from '@env';

import { Alert } from "react-native";

let userAPi = process.env.SMOOTHRIDE_NEWAPI + "login";

const initialState = {
  loginuser: null,
  registeruser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  logindata: null,
  registerdata:null,
  verifyData: null,
  setPinData: null,
};
export const RegisterAuth = createAsyncThunk(
    "register/userRegister",
    async (details, { rejectWithValue }) => {
    //   const tokengot = await AsyncStorage.getItem("token");
    //   const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: U2K_APIKEY,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .post("/users", details)
        .then(async (response) => {
            // console.log("respone register ", response.data)
            Alert.alert('Registration Successfull')
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


export const loginAuth = createAsyncThunk(
    "login/userlogin",
    async (details, { rejectWithValue }) => {
    //   const tokengot = await AsyncStorage.getItem("token");
    //   const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: U2K_APIKEY,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .post("/users/login", details)
        .then(async (response) => {
          await AsyncStorage.setItem("token", response.data?.extra?.token);
            console.log("respone login ", response.data)
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


  export const VerifyAuth = createAsyncThunk(
    "verify/userVerify",
    async (details, { rejectWithValue }) => {
      console.log(details)
    //   const tokengot = await AsyncStorage.getItem("token");
    //   const infoneeded = `Bearer ${tokengot}`;
      const instance = axios.create({
        baseURL: U2K_APIKEY,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return await instance
        .put("/users/verify", details)
        .then(async (response) => {
            console.log("verify status ", response.data)
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

  export const SetPinApi = createAsyncThunk(
    "setPin/userSetPin",
    async (details, { rejectWithValue }) => {
        // console.log("slice ",details)
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
        .put("/users/pin", details)
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

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(RegisterAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(RegisterAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = true;
        state.registerdata = action.payload;
      })
      .addCase(RegisterAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.registeruser = false;
      })
      .addCase(loginAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginuser = true;
        state.logindata = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(VerifyAuth.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(VerifyAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginuser = true;
        state.verifyData = action.payload;
      })
      .addCase(VerifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      })
      .addCase(SetPinApi.pending, (state) => {
        state.isLoading = true;
        state.null = true;
      })
      .addCase(SetPinApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginuser = true;
        state.setPinData = action.payload;
      })
      .addCase(SetPinApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = false;
      });
  },
});

export const { reset } = LoginSlice.actions;

export const selectLoginSlice = (state) => state.LoginSlice;
export default LoginSlice.reducer;
