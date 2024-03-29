import {ResponseType} from 'api/instanse'
import {instance} from "api/instanse";
import {ArrType} from "redux/app.reducer";


export const taskAPI = {
  getTasks: (listId: string) =>
    instance.get<GetTasksResponse<TaskResponseType[]>>(`todo-lists/${listId}/tasks`),
  createTask: (listId: string, task: TaskRequestType) =>
    instance.post<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${listId}/tasks`, task),
  editTask: (listId: string, taskId: string, task: TaskRequestType) =>
    instance.put<ResponseType<{ item : TaskResponseType }>>(`todo-lists/${listId}/tasks/${taskId}`, task),
  removeTask: (listId: string, taskId: string) =>
    instance.delete<ResponseType>(`todo-lists/${listId}/tasks/${taskId}`),
  reorderTask: (listId: string, id: string, putAfterItemId: string | null) =>
    instance.put<ResponseType>(`todo-lists/${listId}/tasks/${id}/reorder`, {putAfterItemId})
}

type GetTasksResponse<T = []> = {
  error: string | null;
  totalCount: number;
  items: T;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4
}

export type TaskResponseType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type TaskAppType = {
  description: string
  title: string
  status: TaskStatuses
  priority: ArrType
  startDate: AppDate | undefined
  deadline: AppDate | undefined
  id: string
  todoListId: string
  order: number
  addedDate: string
  loading: boolean
}

export type TaskRequestType = {
  title?: string
  description?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type AppDate = {
  date: string
  timestamp: number
}

