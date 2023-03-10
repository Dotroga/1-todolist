import {v1} from "uuid";
import {tasksToDo, TasksType, TaskType} from "../state";
import {addNewListACType, removeTaskListACType} from "./listsReducer";

export const tasksReducer = (tasks: TasksType = tasksToDo, action:TsarType): TasksType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...tasks, [action.listId] :tasks[action.listId]
          .filter(t=>t.id!==action.id)  }
    }
    case 'ADD-TASK': {
      const d = new Date()
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
      const date = `${d.getMonth() + 1} ${monthNames[d.getMonth()]} ${d.toTimeString().slice(0,5)}`
      let task: TaskType = { id: v1(), title: action.title, isDone: false, date};
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

type TsarType = removeTaskACType
  | addTaskACType
  | changeTaskStatusACType
  | renameTaskACType
  | addNewListACType
  | removeTaskListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type renameTaskACType = ReturnType<typeof renameTaskAC>


export const removeTaskAC = (listId: string, id: string) =>
  ({type: 'REMOVE-TASK', listId, id} as const )
export const addTaskAC = (listId: string, title: string) =>
  ({type: 'ADD-TASK', listId, title} as const )
export const changeTaskStatusAC = (listId:string, id:string, isDone: boolean) =>
  ({type: 'CHANGE-TASK-STATUS', listId, id, isDone} as const);
export const renameTaskAC = (listId: string, id: string, title: string) =>
  ({type: 'RENAME-TASK', listId, id, title} as const)



