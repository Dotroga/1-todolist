import {FilterValueType, ListsType} from "../App";


export const listsReducer = (lists: ListsType[], action:aType):ListsType[] => {
  switch (action.type) {
    case 'ADD-LIST': {
      const newList = {id: action.id, title: action.title, filter: 'Active'}
      return [...lists, newList]
    }
    default: return lists
  }
}

type aType = addListACType

type addListACType = ReturnType<typeof addListAC>

export const addListAC = (id: string, title: string) => ({type: 'ADD-LIST', id, title} as const)























const addTaskList = (title: string) => {
  // const id = v1()
  // setState({...state,
  //   lists:[{id, title},...state.lists],
  //   tasks:{...state.tasks, [id]:{data:[], filter: 'All'}}})
}

const removeTaskList = (listId: string) => {
  // setState({...state,
  //   lists: state.lists.filter(l=>l.id!==listId)})
  // delete state.tasks[listId]
}
const changeFilter = (listId: string, filter: FilterValueType) => {
  // setState({...state, tasks:
  //     {...state.tasks, [listId]:
  //     {...state.tasks[listId], filter}}})
}

const renameTaskList = (listId: string, title: string) => {
  // setState({...state, lists: state.lists.map(l=>l.id===listId ?{...l, title}: l)})
}