import {baseTheme, lightTheme} from "theme";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type ArrType = [string, string, number?]

const initialState = {
  theme: baseTheme,
  isCollapsedSB: false,
  isVisibleALF: false,
  addListForm: {
    listId: null as string | null,
    mode: true,
    title: "",
    error: null as string | null,
    color: null  as ArrType | null,
    isLoading: 'normal' as 'normal' | 'loading',
  },
  addTaskForm: {
    visibleForm: false,
    title: "",
    description: null,
    error: null,
  },
  taskLoading: false,
  arrColor: [
    ["#b7256e", "Berry Red" ],
    ["#d93f35", "Red" ],
    ["#fd9833", "Orange" ],
    ["#f8ce00", "Yellow" ],
    ["#aeb73b", "Olive Green" ],
    ["#7dca48", "Lime Green" ],
    ["#299338", "Green" ],
    ["#69cabb", "Mint Green" ],
    ["#158eac", "Teal" ],
    ["#14a9f3", "Sky Blue" ],
    ["#95c1e9", "Light Blue" ],
    ["#3f72fd", "Blue" ],
    ["#874cfd", "Grape" ],
    ["#ae38e9", "Violet" ],
    ["#e995e9", "Lavender" ],
    ["#de5093", "Magenta" ],
    ["#fd8c84", "Salmon" ],
    ["#7f7f7f", "Charcoal" ],
    ["#b7b7b7", "Grey" ],
    ["#caab92", "Taupe" ],
  ] as ArrType[],
  prioritiesArr: [
    ["#b6b6b6", 'Low', 0],
    ["#3f71fb", 'Middle', 1],
    ["#f6cc00", 'High', 2],
    ["#d73f35", 'Urgently', 3],
    ["#299238", 'Later', 4]
  ]  as ArrType[],
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
    toggleSideBar(state, action: PayloadAction<boolean>) {
      state.isCollapsedSB = action.payload
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
      const newColor = state.arrColor.filter((i) => i[0] === action.payload);
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
    setIsLoadingAddListForm(state, action: PayloadAction<'normal' | 'loading'>) {
        state.addListForm.isLoading = action.payload
    },
  }
})

export const app = slice.reducer
export const appActions = slice.actions


