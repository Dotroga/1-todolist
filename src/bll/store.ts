import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./taskReducer";
import {listsReducer} from "./listsReducer";
import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import {sectionsReducer} from "./sectionsReducer";


const rootReducer = combineReducers({
  lists: listsReducer,
  sections : sectionsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector