import {ListThunkType, ListType} from "./state";

import {todoApi} from "../api/todoAPI";
import {Dispatch} from "redux";
import {setErrorAC, toggleAddListFormAC} from "./statusOffWindowsReducer";
import {listsColorAPI} from "../api/listsColorAPI";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {setTasksAC} from "./taskReducer";





export const listsReducer = (lists: ListType[] = [], action:Actions): ListType[] => {
  switch (action.type) {
    case "SET-LISTS": {
      return [...lists, {...action.list, filter: 'All', path: action.list.title}]
    }
    case 'ADD-LIST': {
      const newList: ListType = {id: action.id, title: action.title, path: '',
        color: action.color, addedDate:'', order: 0, filter: 'All', numberOfTasks: 0}
      return  [newList, ...lists]
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

export const setListsAC = (list: ListThunkType) => ({
  type: 'SET-LISTS', list} as const)
export const addNewListAC = (id:string, title: string, color: string) => ({
  type: 'ADD-LIST', id, title, color} as const)
export const renameListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)
export const fetchDataTC = () => (dispatch: Dispatch) => {
    const getList = todoApi.getLists()
    const getColors = listsColorAPI.getListsColor()
    Promise.all([getList, getColors])
        .then((result) => {
            return result[0].data.map(l => {
                const color = (result[1].filter(c => c.listId === l.id))[0].color
                return {...l, color}})
        })
        .then((list)=>{
          list.map((l)=>{
              todoApi.getTasks(l.id).then((res)=>{
                  dispatch(setListsAC({...l, numberOfTasks: res.data.totalCount}))
                  dispatch(setTasksAC(l.id, res.data.items))
                })
            })
        })
}
//
//             const getTasks = todoApi.getTasks(todoId)
//                 return
//             res
//         }
//
//       listsColorAPI.getListsColor().then((data) => {
//
//         dispatch(setListsAC(newData))
//       }))
// }
export const addListTK = (
    title: string,
    navigate: NavigateFunction,
    color: string,
    setLoading: (loading: boolean) => void
) => (dispatch: Dispatch) => {
  const  newTitle = title.trim();
  if (newTitle !== "") {
      setLoading(true)
    todoApi.createList(newTitle)
        .then((res)=> res.data.data.item.id)
        .then((listId)=>{
          listsColorAPI.createListColor({color, listId}).then(()=>{
            dispatch(addNewListAC(listId ,newTitle, color))
            navigate(`/${newTitle}`)
            dispatch(toggleAddListFormAC())
          }).finally(()=>setLoading(false))
        })
  } else {
    dispatch(setErrorAC(true))
  }
}
export const removeListTK = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
  todoApi.deleteList(listId).then(() => {
    dispatch(removeListAC(listId))
      navigate('/')
  })
}












