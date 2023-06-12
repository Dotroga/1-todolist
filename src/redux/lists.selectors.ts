import {AppRootStateType} from "./store";


export const selectLists = (state: AppRootStateType) => state.lists
export const selectListsLength = (state: AppRootStateType) => state.lists.length
