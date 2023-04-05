export type ColorType = { color: any, title: string }
export type StatusWindowsType = {
    isCollapsedSB: boolean
    isVisibleALF: boolean
    addListForm: addListFormType
    arrColor: ColorType[]
}
export type addListFormType =  {
    title: string
    error: string | null,
    color: ColorType
}
const initialState =  {
    isCollapsedSB: false,
    isVisibleALF: false,
    addListForm: {
        title: '',
        error: null,
        color: {color: '#b7256e', title: 'Berry Red'}
    },
    arrColor: [
        {color: '#b7256e', title: 'Berry Red'},
        {color: '#d93f35', title: 'Red'},
        {color: '#fd9833', title: 'Orange'},
        {color: '#f8ce00', title: 'Yellow'},
        {color: '#aeb73b', title: 'Olive Green'},
        {color: '#7dca48', title: 'Lime Green'},
        {color: '#299338', title: 'Green'},
        {color: '#69cabb', title: 'Mint Green'},
        {color: '#158eac', title: 'Teal'},
        {color: '#14a9f3', title: 'Sky Blue'},
        {color: '#95c1e9', title: 'Light Blue'},
        {color: '#3f72fd', title: 'Blue'},
        {color: '#874cfd', title: 'Grape'},
        {color: '#ae38e9', title: 'Violet'},
        {color: '#e995e9', title: 'Lavender'},
        {color: '#de5093', title: 'Magenta'},
        {color: '#fd8c84', title: 'Salmon'},
        {color: '#7f7f7f', title: 'Charcoal'},
        {color: '#b7b7b7', title: 'Grey'},
        {color: '#caab92', title: 'Taupe'}
    ]
}

export const StatusOffWindowsReducer = (
    state:StatusWindowsType = initialState, action: Actions):StatusWindowsType => {
    switch (action.type) {
        case "TOGGLE-SIDE-BAR":
            return {...state, isCollapsedSB: !state.isCollapsedSB, isVisibleALF: false}
        case 'TOGGLE-ADD-LIST-FORM': {
            const color = state.arrColor[0]
            const addListForm = {...state.addListForm, title: '', error: null, color}
            return {...state, isVisibleALF: !state.isVisibleALF, addListForm}
        }
        case 'CHANGE-TITLE-NEW-LIST' :
            return {...state, addListForm: {...state.addListForm, title: action.text}}
        case "CHANGE-COLOR":
            return {...state, addListForm: {...state.addListForm, color: action.color}}
        case "SET-ERROR":
            return {...state, addListForm: {...state.addListForm, error: 'Title is required'}}
        default: return state
    }
};

type Actions =
    ReturnType<typeof toggleSideBarAC>
    | ReturnType<typeof toggleAddListFormAC>
    | ReturnType<typeof changeTitleNewListAC>
    | ReturnType<typeof changeColorAC>
    | ReturnType<typeof setErrorAC>

export const toggleSideBarAC = () => ({type: 'TOGGLE-SIDE-BAR'} as const)
export const toggleAddListFormAC = () => ({type: 'TOGGLE-ADD-LIST-FORM'} as const)
export const changeTitleNewListAC = (text: string) =>
    ({type: 'CHANGE-TITLE-NEW-LIST', text} as const )
export const changeColorAC = (color: ColorType) => ({type: 'CHANGE-COLOR', color} as const )
export const setErrorAC = () => ({type: 'SET-ERROR'} as const )
