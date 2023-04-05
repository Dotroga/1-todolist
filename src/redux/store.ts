import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./taskReducer";
import {listsReducer} from "./listsReducer";
import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import {sectionsReducer} from "./sectionsReducer";
import {StatusOffWindowsReducer} from "./statusOffWindowsReducer";


const rootReducer = combineReducers({
  lists: listsReducer,
  sections : sectionsReducer,
  tasks: tasksReducer,
  StatusOffWindows: StatusOffWindowsReducer
})

export const store = createStore(rootReducer)

export type DispatchType = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector