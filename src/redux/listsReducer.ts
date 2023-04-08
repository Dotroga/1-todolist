import {listsToDo, ListType, ServerSideListType} from "./state";
import {v1} from "uuid";
import {todoApi} from "../api/todo-api";
import {Dispatch} from "redux";
import {setErrorAC, toggleAddListFormAC} from "./statusOffWindowsReducer";



export const listsReducer = (lists = listsToDo, action:Actions) => {
  switch (action.type) {
    case "GET-LISTS": {
      return action.lists.map((l)=>
          ({...l, color: '', filter: 'All', path: l.title,}))
    }
    case 'ADD-LIST': {
      const newList: ListType = {
        id: action.id,
        title: action.title,
        path: '',
        color: action.color,
        addedDate:'',
        order: 0,
        filter: 'All'
      }
      return  [...lists, newList]
    }
    case "RENAME-TASK-LIST": {
      return lists.map(l=>l.id === action.listId ? {...l, title: action.title}: l)
    }
    case 'REMOVE-TASK-LIST': return lists.filter(l=>l.id!==action.listId)
    default: return lists
  }
}

export type Actions =
    getListsACType
    | renameListACType
    | removeListACType
    | addListACType

export type getListsACType = ReturnType<typeof setListsAC>
export type addListACType = ReturnType<typeof addNewListAC>
export type renameListACType = ReturnType<typeof renameListAC>
export type removeListACType = ReturnType<typeof removeListAC>

export const setListsAC = (lists: ServerSideListType[]) => ({
  type: 'GET-LISTS', lists} as const)
export const addNewListAC = (title: string, color: string) => ({
  type: 'ADD-LIST', id: v1(), title, color} as const)
export const renameListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)
export const fetchListTC = () => (dispatch: Dispatch) => {
  todoApi.getLists().then((res) =>
      dispatch(setListsAC(res.data))
  )
}
export const addListTK = (title: string, navigate: any, color: string) => (dispatch: Dispatch) => {
  const  newTitle = title.trim();
  if (newTitle !== "") {
    todoApi.createList(newTitle).then((res)=>{
      dispatch(addNewListAC(newTitle, color))
      navigate(`/${newTitle}`)
      dispatch(toggleAddListFormAC())
    })
  } else {
    dispatch(setErrorAC())
  }
}












