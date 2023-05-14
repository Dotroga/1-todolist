import {ListThunkType, ListType} from "./state";
import {todoApi} from "../api/todoAPI";
import {Dispatch} from "redux";
import {setErrorAC, toggleAddListFormAC} from "./statusOffWindowsReducer";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {setTasksAC} from "./taskReducer";


const parse = (title: string) => ([title.slice(7),title.substring(0, 7)])

export const listsReducer = (lists: ListType[] = [], action: Actions): ListType[] => {
    switch (action.type) {
        case "SET-LISTS": {
            return action.lists.map((l) => {
                const titleAndColor = parse(l.title)
                return {...l, title: titleAndColor[0], color: titleAndColor[1], filter: 'All', path: l.title}
            })
        }
        case "SET-NUMBER": {
            return lists.map((l) =>
                action.listId === l.id
                    ? {...l, numberOfTasks: action.number}
                    : l
            )
        }
        case 'ADD-LIST': {
            const titleAndColor = parse(action.title)
            const newList: ListType = {
                id: action.id,
                title: titleAndColor[0],
                color: titleAndColor[1],
                path: action.title,
                addedDate: '', order: 0,
                filter: 'All',
                numberOfTasks: 0
            }
            return [newList, ...lists]
        }
        case "RENAME-TASK-LIST": {
            const titleAndColor = parse(action.title)
            return lists.map(l => l.id === action.listId ?
                {...l, title: titleAndColor[0], color: titleAndColor[1], path: action.title} : l)
        }
        case 'REMOVE-TASK-LIST':
            return lists.filter(l => l.id !== action.listId)
        default:
            return lists
    }
}

export type Actions = getListsACType | renameListACType | removeListACType
    | addListACType | setNumberOfTasks

export type getListsACType = ReturnType<typeof setListsAC>
export type addListACType = ReturnType<typeof addNewListAC>
export type renameListACType = ReturnType<typeof editingListAC>
export type removeListACType = ReturnType<typeof removeListAC>
export type setNumberOfTasks = ReturnType<typeof setNumberOfTasks>

export const setListsAC = (lists: ListThunkType[]) => ({
  type: 'SET-LISTS', lists} as const)
export const setNumberOfTasks = (listId: string, number: number) => ({
    type: 'SET-NUMBER', listId, number} as const)
export const addNewListAC = (id:string, title: string) => ({
  type: 'ADD-LIST', id, title} as const)
export const editingListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)

export const fetchDataTC = () => (dispatch: Dispatch) => {
    todoApi.getLists()
        .then((res) => {
            dispatch(setListsAC(res.data))
            return res.data
        })
        .then((lists) => {
            lists.map((l) => {
                todoApi.getTasks(l.id).then((res) => {
                    dispatch(setTasksAC(l.id, res.data.items))
                    dispatch(setNumberOfTasks(l.id, res.data.totalCount))
                })
            })
        })
}

export const addListTK = (
    title: string,
    navigate: NavigateFunction,
    color: string,
    setLoading: (loading: boolean) => void
) => (dispatch: Dispatch) => {
  const  newTitle = title.trim();
  if (newTitle !== "") {
      setLoading(true)
      const colorAndTitle = color + newTitle
    todoApi.createList(colorAndTitle)
        .then((res) => {
            dispatch(addNewListAC(res.data.data.item.id ,colorAndTitle))
            navigate(`/${colorAndTitle}`)
            dispatch(toggleAddListFormAC(false))
            return res.data.data.item.id
       })
        .finally(()=>setLoading(false))
  } else {
    dispatch(setErrorAC(true))
  }
}

export const editingListTK = (
    listId: string,
    title: string,
    color: string,
    navigate: NavigateFunction,
    setLoading: (loading: boolean) => void) =>
    (dispatch: Dispatch) => {
        setLoading(true)
        const colorAndTitle = color + title
        todoApi.updateList(listId, colorAndTitle)
            .then(() => {
                dispatch(editingListAC(listId, colorAndTitle))
                navigate(title)
                setLoading(false)
                dispatch(toggleAddListFormAC(false))
            })
    }


export const removeListTK = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    todoApi.deleteList(listId).then(() => {
    dispatch(removeListAC(listId))
      navigate('/')
  })
}












