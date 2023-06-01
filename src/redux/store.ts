import { combineReducers, AnyAction } from "redux";
import { tasksReducer } from "./taskReducer";
import { listsReducer } from "./listsReducer";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import ThunkMiddleware, { ThunkDispatch } from "redux-thunk";
import {auth} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {app} from "redux/appReducer";

const rootReducer = combineReducers({
  auth, lists: listsReducer, tasks: tasksReducer, app
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
