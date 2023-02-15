import {v1} from "uuid";
import {TasksType} from "../App";


// не забыть про тесты

export const tasksReducer = (tasks: TasksType, action:TsarType): TasksType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...tasks, [action.listId] :tasks[action.listId]
          .filter(t=>t.id!==action.id)  }
    }
    case 'ADD-TASK': {
      let task = { id: v1(), title: action.title, isDone: false };
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
    case 'ADD-NEW-TASK-LIST': {
      return {...tasks, [action.listId]:[]}
    }
    default: return tasks
  }
}
type TsarType =
  removeTaskACType |
  addTaskACType |
  changeTaskStatusACType |
  renameTaskACType |
  addNewTaskListAC

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type renameTaskACType = ReturnType<typeof renameTaskAC>
type addNewTaskListAC = ReturnType<typeof addNewTaskListAC>

export const removeTaskAC = (listId: string, id: string) =>
  ({type: 'REMOVE-TASK', listId, id} as const )

export const addTaskAC = (listId: string, title: string) =>
  ({type: 'ADD-TASK', listId, title} as const )

export const changeTaskStatusAC = (listId:string, id:string, isDone: boolean) =>
  ({type: 'CHANGE-TASK-STATUS', listId, id, isDone} as const);

export const renameTaskAC = (listId: string, id: string, title: string) =>
  ({type: 'RENAME-TASK', listId, id, title} as const)

export const addNewTaskListAC = (listId: string) =>
  ({type: 'ADD-NEW-TASK-LIST', listId} as const)



