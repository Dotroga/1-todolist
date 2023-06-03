import { combineReducers, AnyAction } from "redux";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {auth} from "redux/auth.reducer";
import {configureStore} from "@reduxjs/toolkit";
import {app} from "redux/app.reducer";
import {lists} from "redux/lists.reducer";
import {tasks} from "redux/task.reducer";

const rootReducer = combineReducers({auth, lists, tasks, app});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(ThunkMiddleware)
})
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
//@ts-ignore
window.store = store;
