import { applyMiddleware, combineReducers, legacy_createStore as createStore, AnyAction } from "redux";
import { tasksReducer } from "./taskReducer";
import { listsReducer } from "./listsReducer";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { StatusOffWindowsReducer } from "./statusOffWindowsReducer";
import ThunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  StatusOffWindows: StatusOffWindowsReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
//@ts-ignore
window.store = store;
