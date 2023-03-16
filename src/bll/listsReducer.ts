import {FilterType, listsToDo, ListsType} from "./state";
import {v1} from "uuid";


export const listsReducer = (lists: ListsType[] = listsToDo, action:ListActionsType):ListsType[] => {
  switch (action.type) {
    case 'ADD-LIST': {
      const newList: ListsType = {id: action.id, title: action.title, filter:'All'}
      return [...lists, newList]
    }
    case "RENAME-TASK-LIST": {
      return lists.map(l=>l.id === action.listId ? {...l, title: action.title}: l)
    }
    case 'REMOVE-TASK-LIST': {
      return lists.filter(l=>l.id!==action.listId)
    }
    case "CHANGE-FILTER": {
      return lists.map(l=>l.id===action.listId ? {...l, filter: action.filter} : l)
    }
    default: return lists
  }
}

export type ListActionsType =
  addNewListACType |
  renameTaskListACType |
  removeTaskListACType |
  changeFilterACType

export type addNewListACType = ReturnType<typeof addNewListAC>
type renameTaskListACType = ReturnType<typeof renameListAC>
export  type removeTaskListACType = ReturnType<typeof removeListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const addNewListAC = (title: string) => ({
  type: 'ADD-LIST', id: v1(), title} as const)
export const renameListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)
export const changeFilterAC = (listId: string, filter: FilterType) => ({
  type: 'CHANGE-FILTER', listId, filter} as const )



