import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./taskReducer";
import {listsReducer} from "./listsReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

