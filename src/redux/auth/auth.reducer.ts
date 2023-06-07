import { LoginType } from "Components/ Content/Login/Login";
import {authAPI, ResultCode} from "api/todoAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";

const initializeApp = createAppAsyncThunk<void, void>
('auth/initializeApp', async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  try {
    const res = await authAPI.me()
    res.data.resultCode === ResultCode.Success
      ? dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
      : handleServerAppError(res.data, dispatch)
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
  dispatch(authActions.setIsInitialized({isInitialized: true}));
})

const login = createAppAsyncThunk<void, LoginType>
('auth/login', async (data, thunkAPI) => {
  const {dispatch} = thunkAPI
  try {
    const res = await authAPI.login(data)
    res.data.resultCode === ResultCode.Success
    ? dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
    : handleServerAppError(res.data, dispatch)
  } catch (e) {
    handleServerNetworkError(e, dispatch )
  }
})

const logOut = createAppAsyncThunk<void, void>
('auth/logOut', async (arg, thunkAPI) => {
  const {dispatch} = thunkAPI
  try {
    const res = await authAPI.logout()
    res.data.resultCode === ResultCode.Success
      ? dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
      : handleServerAppError(res.data, dispatch)
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
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
  }
})

export const authActions = slice.actions
export const auth = slice.reducer
export const authThunks = {initializeApp, login, logOut}


