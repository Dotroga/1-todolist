import {v1} from "uuid";
import {tasksToDo, TasksType} from "./state";
import {addListACType, getListsACType, removeListACType} from "./listsReducer";
import {Dispatch} from "redux";
import {TaskType, todoApi} from "../api/todo-api";
export const tasksReducer = (tasks: TasksType = tasksToDo, action:TsarType): TasksType => {
  switch (action.type) {
    case "GET-LISTS": {
      const copyState = {...tasks}
      action.lists.forEach(l=> {
        copyState[l.id] = []
      })
      return copyState
    }
    case 'REMOVE-TASK': {
      return {...tasks, [action.listId] :tasks[action.listId]
          .filter(t=>t.id!==action.id)  }
    }
    case 'ADD-TASK': {
      const d = new Date()
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
      const startDate = `${d.getMonth() + 1} ${monthNames[d.getMonth()]} ${d.toTimeString().slice(0,5)}`
      let task: TaskType = {description: '', id: v1(), title: action.title, completed: false, startDate,
        status: '', priority: '', deadline: '', todoListId: '', order: 1, addedDate: ''};
      return {...tasks, [action.listId]: [...tasks[action.listId], task]}
    }
    case 'CHANGE-TASK-STATUS': {
      return {...tasks, [action.listId]: tasks[action.listId]
          .map(t=> t.id === action.id ? {...t, isDone: action.isDone}: t)}
    }
    case "RENAME-TASK": {
      return {...tasks, [action.listId]: tasks[action.listId]
          .map(t=> t.id === action.id ? {...t, title: action.title}: t)}
    }
    case 'ADD-LIST': {
      return {...tasks, [action.id]:[]}
    }
    case "REMOVE-TASK-LIST": {
      const {[action.listId]: [], ...rest} = {...tasks}
      return rest
    }
    default: return tasks
  }
}

type TsarType =
    getListsACType
  | removeTaskACType
  | addTaskACType
  | changeTaskStatusACType
  | renameTaskACType
  | addListACType
  | removeListACType
  | ReturnType<typeof setTasksAC>

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type renameTaskACType = ReturnType<typeof renameTaskAC>

export const setTasksAC = (listId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', listId, tasks} as const )
export const removeTaskAC = (listId: string, id: string) =>
  ({type: 'REMOVE-TASK', listId, id} as const )
export const addTaskAC = (listId: string, title: string) =>
  ({type: 'ADD-TASK', listId, title} as const )
export const changeTaskStatusAC = (listId:string, id:string, isDone: boolean) =>
  ({type: 'CHANGE-TASK-STATUS', listId, id, isDone} as const);
export const renameTaskAC = (listId: string, id: string, title: string) =>
  ({type: 'RENAME-TASK', listId, id, title} as const)
export const setTaskTC = (todoId: string) => (dispatch: Dispatch) => {
  todoApi.getTasks(todoId).then((res)=>{
    console.log(res.data.items)
    dispatch(setTasksAC(todoId, res.data.items))
  })
}




