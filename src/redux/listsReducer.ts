import {ListThunkType, ListType} from "./state";

import {todoApi} from "../api/todoAPI";
import {Dispatch} from "redux";
import {
    changeColorAC, changeModeAddListAC,
    changeTitleNewListAC,
    ColorType,
    setErrorAC,
    toggleAddListFormAC
} from "./statusOffWindowsReducer";
import {listsColorAPI} from "../api/listsColorAPI";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {setTasksAC} from "./taskReducer";





export const listsReducer = (lists: ListType[] = [], action:Actions): ListType[] => {
  switch (action.type) {
    case "SET-LISTS": {
      return action.list.map((l) => ({...l, filter: 'All', path: l.title}))
    }
      case "SET-NUMBER": {
         return lists.map((l) =>
                  action.listId === l.id
                      ? {...l, numberOfTasks: action.number}
                      : l
          )
      }
      case 'ADD-LIST': {
      const newList: ListType = {
          id: action.id,
          colorId: action.colorId,
          title: action.title,
          path: action.title,
          color: action.color,
          addedDate:'', order: 0,
          filter: 'All',
          numberOfTasks: 0}
      return  [newList, ...lists]
    }
    case "RENAME-TASK-LIST": {
      return lists.map(l=>l.id === action.listId ? {...l, title: action.title, path: action.title}: l)
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
    | setNumberOfTasks

export type getListsACType = ReturnType<typeof setListsAC>
export type addListACType = ReturnType<typeof addNewListAC>
export type renameListACType = ReturnType<typeof editingListAC>
export type removeListACType = ReturnType<typeof removeListAC>
export type setNumberOfTasks = ReturnType<typeof setNumberOfTasks>

export const setListsAC = (list: ListThunkType[]) => ({
  type: 'SET-LISTS', list} as const)
export const setNumberOfTasks = (listId: string, number: number) => ({
    type: 'SET-NUMBER', listId, number} as const)
export const addNewListAC = (id:string, title: string, color: string, colorId: number) => ({
  type: 'ADD-LIST', id, title, color, colorId} as const)
export const editingListAC = (listId: string, title: string) => ({
  type: 'RENAME-TASK-LIST', listId, title} as const)
export const removeListAC = (listId: string) => ({
  type: 'REMOVE-TASK-LIST', listId} as const)

export const fetchDataTC = () => (dispatch: Dispatch) => {
    const getList = todoApi.getLists()
    const getColors = listsColorAPI.getListsColor()
    Promise.all([getList, getColors])
        .then((result) => {
            return result[0].data.map(l => {
                const data = (result[1].filter(c => c.listId === l.id))
                return {...l, color: data[0].color, colorId:data[0].id}})
        })
        .then((lists)=>{

            dispatch(setListsAC(lists))
          lists.map((l)=>{
              todoApi.getTasks(l.id).then((res)=>{
                  dispatch(setTasksAC(l.id, res.data.items))
                  dispatch(setNumberOfTasks(l.id, res.data.totalCount))
                  // listArr = [...listArr, {...l, numberOfTasks: res.data.totalCount}]
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
    todoApi.createList(newTitle)
        .then((res)=> res.data.data.item.id)
        .then((listId)=>{
          listsColorAPI.createListColor({color, listId}).then((res)=>{
              console.log(res)
            dispatch(addNewListAC(listId ,newTitle, color, res.data.id))
            navigate(`/${newTitle}`)
            dispatch(toggleAddListFormAC(false))
          }).finally(()=>setLoading(false))
        })
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
        todoApi.updateList(listId, title).then((res) => {
            dispatch(editingListAC(listId, title))
            navigate(title)
            setLoading(false)
            dispatch(toggleAddListFormAC(false))
        })
    }

export const removeListTK = (listId: string,colorId: number, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    debugger
    todoApi.deleteList(listId).then(() => {
      listsColorAPI.removeListColor(colorId).then(r => r)
    dispatch(removeListAC(listId))
      navigate('/')
  })
}












