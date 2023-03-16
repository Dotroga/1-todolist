import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./taskReducer";
import {listsReducer} from "./listsReducer";
import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'


const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector