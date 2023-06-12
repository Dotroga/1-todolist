import {instance, ResponseType} from './instanse'


export const taskAPI = {
  getTasks: (listId: string) =>
    instance.get<GetTasksResponse>(`todo-lists/${listId}/tasks`),
  createTask: (listId: string, task: TaskRequestType) =>
    instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${listId}/tasks`, task),
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

export type TaskType = {
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
  completed: boolean
}

export type TaskRequestType = {
  title: string
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
