import { combineReducers, AnyAction } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {app} from "./app.reducer";
import {auth} from "./auth/auth.reducer";
import {lists} from "./lists.reducer";
import {configureStore} from "@reduxjs/toolkit";
import {tasks} from "./task.reducer";


const rootReducer = combineReducers({auth, lists, tasks, app});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(ThunkMiddleware)
})
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
//@ts-ignore
window.store = store;
