import {AppRootStateType} from "redux/store";

export const selectTheme = (state: AppRootStateType) => state.app.theme
export const selectIsCollapsedSB = (state: AppRootStateType) => state.app.isCollapsedSB
export const selectIsVisibleALF = (state: AppRootStateType) => state.app.isVisibleALF
export const selectAddListForm = (state: AppRootStateType) => state.app.addListForm
export const selectArrColor = (state: AppRootStateType) => state.app.arrColor
export const selectIsLoading = (state: AppRootStateType) => state.app.addListForm.isLoading
export const selectCollapsedSB = (state: AppRootStateType) => state.app.isCollapsedSB
export const selectPrioritiesArr = (state: AppRootStateType) => state.app.prioritiesArr

// export const select = (state: AppRootStateType) =>