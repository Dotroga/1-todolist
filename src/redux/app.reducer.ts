import {baseTheme, lightTheme} from "theme";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ColorType = { color: any; title: string };

const initialState = {
  theme: baseTheme,
  isCollapsedSB: false,
  isVisibleALF: false,
  addListForm: {
    listId: null as string | null,
    mode: true,
    title: "",
    error: null as string | null,
    color: null  as ColorType | null,
    isLoading: false,
  },
  addTaskForm: {
    visibleForm: false,
    title: "",
    description: null,
    error: null,
  },
  arrColor: [
    { color: "#b7256e", title: "Berry Red" },
    { color: "#d93f35", title: "Red" },
    { color: "#fd9833", title: "Orange" },
    { color: "#f8ce00", title: "Yellow" },
    { color: "#aeb73b", title: "Olive Green" },
    { color: "#7dca48", title: "Lime Green" },
    { color: "#299338", title: "Green" },
    { color: "#69cabb", title: "Mint Green" },
    { color: "#158eac", title: "Teal" },
    { color: "#14a9f3", title: "Sky Blue" },
    { color: "#95c1e9", title: "Light Blue" },
    { color: "#3f72fd", title: "Blue" },
    { color: "#874cfd", title: "Grape" },
    { color: "#ae38e9", title: "Violet" },
    { color: "#e995e9", title: "Lavender" },
    { color: "#de5093", title: "Magenta" },
    { color: "#fd8c84", title: "Salmon" },
    { color: "#7f7f7f", title: "Charcoal" },
    { color: "#b7b7b7", title: "Grey" },
    { color: "#caab92", title: "Taupe" },
  ],
  errorSnackbar: null as string | null,
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeTheme(state) {
      state.theme.type === 'dark'
        ? state.theme = lightTheme
        : state.theme = baseTheme
    },
    toggleSideBar(state) {
      state.isCollapsedSB = !state.isCollapsedSB
      state.isVisibleALF = false
    },
    toggleAddListForm(state, action: PayloadAction<boolean>) {
      state.isVisibleALF = action.payload
      state.addListForm = {...state.addListForm,
        title: "", mode: true, error: null, color: null, listId: null,};
    },
    changeTitleNewList(state, action: PayloadAction<string>) {
      state.addListForm.title = action.payload
    },
    changeColor(state, action: PayloadAction<string>) {
      const newColor = state.arrColor.filter((i) => i.color === action.payload);
      state.addListForm = {...state.addListForm, color: newColor[0]}
    },
    setError(state, action: PayloadAction<boolean>) {
        state.addListForm.error = action.payload ? "Title is required" : null
    },
    changeModeAddList(state, action: PayloadAction<{listId: string, mode: boolean}>) {
      state.addListForm.mode = action.payload.mode
      state.addListForm.listId = action.payload.listId
    },
    setErrorSnackbar(state, action: PayloadAction<{error: null | string}>) {
      state.errorSnackbar = action.payload.error
    },
    setIsLoadingAddListForm(state, action: PayloadAction<boolean>) {
        state.addListForm.isLoading = action.payload
    },
  }
})

export const app = slice.reducer
export const appActions = slice.actions


