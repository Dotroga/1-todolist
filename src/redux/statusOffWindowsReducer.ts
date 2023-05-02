export type ColorType = { color: any, title: string }
export type StatusWindowsType = {
    isCollapsedSB: boolean
    isVisibleALF: boolean
    addListForm: AddListFormType
    addTaskForm: AddTaskFormType
    arrColor: ColorType[]
}

export type AddListFormType =  {
    listId: string | null
    mode: boolean
    title: string
    error: string | null,
    color: ColorType | null
}
export type AddTaskFormType = {
    title: string
    description: string | null
    error: null | string
}


const initialState =  {
    isCollapsedSB: false,
    isVisibleALF: false,
    addListForm: {
        listId: null,
        mode: true,
        title: '',
        error: null,
        color: null
    },
    addTaskForm: {
        visibleForm: false,
        title: '',
        description: null,
        error: null,
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
            const color = null
            const addListForm = {...state.addListForm, title: '', mode: true, error: null, color, listId: null}
            return {...state, isVisibleALF: action.change, addListForm,}
        }
        case 'CHANGE-TITLE-NEW-LIST' :
            return {...state, addListForm: {...state.addListForm, title: action.text}}
        case "CHANGE-COLOR":
            const newColor = state.arrColor.filter(i=> i.color === action.color )
            return {...state, addListForm: {...state.addListForm, color: newColor[0]}}
        case "SET-ERROR":
            return {...state, addListForm: {...state.addListForm,
                    error: action.change ? 'Title is required' : null}}
        case "CHANGE-MODE-ADD-LIST": {
            return {...state, addListForm:{...state.addListForm, mode: action.mode, listId: action.listId}}
        }
        default: return state
    }
};

type Actions =
    | toggleSideBarACType
    | toggleAddListFormACType
    | changeTitleNewListACType
    | changeColorACType
    | setErrorACType
    | changeModeAddListACType

export type toggleSideBarACType = ReturnType<typeof toggleSideBarAC>
export type toggleAddListFormACType = ReturnType<typeof toggleAddListFormAC>
export type changeTitleNewListACType = ReturnType<typeof changeTitleNewListAC>
export type changeColorACType = ReturnType<typeof changeColorAC>
export type setErrorACType = ReturnType<typeof setErrorAC>
export type changeModeAddListACType = ReturnType<typeof changeModeAddListAC>




export const toggleSideBarAC = () => ({type: 'TOGGLE-SIDE-BAR'} as const)
export const toggleAddListFormAC = (change: boolean) => ({type: 'TOGGLE-ADD-LIST-FORM', change} as const)
export const changeTitleNewListAC = (text: string) => ({type: 'CHANGE-TITLE-NEW-LIST', text} as const )
export const changeColorAC = (color: string) => ({type: 'CHANGE-COLOR', color} as const )
export const setErrorAC = (change: boolean) => ({type: 'SET-ERROR', change} as const )
export const changeModeAddListAC = (listId: string ,mode: boolean) =>
    ({type: 'CHANGE-MODE-ADD-LIST', listId, mode} as const )