import { Dispatch } from "redux";
import { LoginType } from "Components/Login/Login";
import { authAPI } from "api/todoAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
    setIsInitializedAC(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    }
  }
})
export const {setIsLoggedInAC, setIsInitializedAC} = slice.actions
export const auth = slice.reducer

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC( true));
      } else {
        console.log("error");
      }
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
  authAPI.login(data).then((res) => {
    res.data.resultCode === 0 ? dispatch(setIsLoggedInAC(true)) : console.log("error");
  });
};
export const logOutTC = () => (dispatch: Dispatch) => {
  authAPI.logout().then((res) => {
    res.data.resultCode === 0 ? dispatch(setIsLoggedInAC(false)) : console.log("error");
  });
};
