import { Dispatch } from "redux";
import { LoginType } from "Components/Login/Login";
import { authAPI } from "api/todoAPI";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) => ({ type: "SET-IS-LOGGED-IN", value } as const);
export const setIsInitializedAC = (value: boolean) => ({ type: "SET-IS-INITIALIZED", value } as const);

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      } else {
        console.log("error");
      }
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI.login(data).then((res) => {
    res.data.resultCode === 0 ? dispatch(setIsLoggedInAC(true)) : console.log("error");
  });
};
export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
  authAPI.logout().then((res) => {
    res.data.resultCode === 0 ? dispatch(setIsLoggedInAC(false)) : console.log("error");
  });
};

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>;
