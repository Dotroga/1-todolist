import { combineReducers, AnyAction } from "redux";
import { tasksReducer } from "./taskReducer";
import { listsReducer } from "./listsReducer";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppReducer } from "redux/appReducer";
import ThunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  app: AppReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(ThunkMiddleware)
})
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
//@ts-ignore
window.store = store;
