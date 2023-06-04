import { LoginType } from "Components/Login/Login";
import { authAPI } from "api/todoAPI";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initializeApp = createAsyncThunk('auth/initializeApp', async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  const res = await authAPI.me()
  if (res.data.resultCode === 0) {
    dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
  } else {
    console.log("error");
  }
  dispatch(authActions.setIsInitialized({isInitialized: true}));
})

const login = createAsyncThunk('auth/login', async (data: LoginType, thunkAPI) => {
  const res = await authAPI.login(data)
  if (res.data.resultCode === 0) {
    return {isLoggedIn: true}
  } else  {
    console.log("error");
    return {isLoggedIn: false}
  }
})

const logOut = createAsyncThunk('auth/logOut', async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  const res = await authAPI.logout()
  res.data.resultCode === 0
    ? dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
    : console.log("error");
})


const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  }
})

export const authActions = slice.actions
export const auth = slice.reducer
export const authThunks = {initializeApp, login, logOut}


