import {AppRootStateType} from "redux/store";

export const selectTaskLength = (id: string) => (state: AppRootStateType) => state.tasks[id].length
