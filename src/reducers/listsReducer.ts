import {FilterValueType, ListsType} from "../App";


export const listsReducer = (lists: ListsType[], action:aType):ListsType[] => {
  switch (action.type) {
    case 'ADD-LIST': {
      const newList = {id: action.id, title: action.title, filter: 'Active'}
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

type aType =
  addListACType |
  renameTaskListACType |
  removeTaskListACType |
  changeFilterACType

type addListACType = ReturnType<typeof addListAC>
type renameTaskListACType = ReturnType<typeof renameTaskListAC>
type removeTaskListACType = ReturnType<typeof removeTaskListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const addListAC = (id: string, title: string) => ({
  type: 'ADD-LIST', id, title} as const)
export const renameTaskListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeTaskListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)
export const changeFilterAC = (listId: string, filter: FilterValueType) => ({
  type: 'CHANGE-FILTER', listId, filter} as const )



