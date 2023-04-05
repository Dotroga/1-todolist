import {listsToDo, ListsType} from "./state";
import {v1} from "uuid";



export const listsReducer = (lists = listsToDo, action:ListActionsType) => {
  switch (action.type) {
    case 'ADD-LIST': {
      const newList: ListsType = {id: action.id, title: action.title, path: '',
        color: action.color}
      return  [...lists, newList]
    }
    case "RENAME-TASK-LIST": {

      return lists.map(l=>l.id === action.listId ? {...l, title: action.title}: l)
    }
    case 'REMOVE-TASK-LIST': {
      return lists.filter(l=>l.id!==action.listId)
    }

    default: return lists
  }

}

export type ListActionsType =
  addNewListACType |
  renameTaskListACType |
  removeTaskListACType


export type addNewListACType = ReturnType<typeof addNewListAC>
type renameTaskListACType = ReturnType<typeof renameListAC>
export  type removeTaskListACType = ReturnType<typeof removeListAC>


export const addNewListAC = (title: string, color: string) => ({
  type: 'ADD-LIST', id: v1(), title, color} as const)
export const renameListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)







