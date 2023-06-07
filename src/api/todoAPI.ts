import axios from "axios";
import {LoginType} from "Components/Content/Login/Login";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const authAPI = {
  login: (data: LoginType) => instance.post<ResponseType<{ userId: number }>>("auth/login", data),
  logout: () => instance.delete<ResponseType>("auth/login"),
  me: () => instance.get<ResponseType<MeType>>("auth/me"),
};

export const listAPI = {
  getLists: () =>
    instance.get<ResponseListType[]>("todo-lists"),
  createList: (title: string) =>
    instance.post<ResponseType<{ item: ResponseListType }>>("todo-lists", { title }),
  updateList: (listId: string, title: string) =>
    instance.put<ResponseType>(`todo-lists/${listId}`, { title }),
  deleteList: (listId: string) =>
    instance.delete<ResponseType>(`todo-lists/${listId}`),
  reorderList: (listId: string, putAfterItemId: string | null) =>
   instance.put<ResponseType>(`/todo-lists/${listId}/reorder`, {putAfterItemId})
 };

export const taskAPI = {
  getTasks: (listId: string) =>
    instance.get<GetTasksResponse>(`todo-lists/${listId}/tasks`),
  createTask: (listId: string, title: string) =>
    instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${listId}/tasks`, { title }),
}

type MeType = {
  userId: number;
  email: string;
  login: string;
};

export type ResponseListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type ResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: T;
};
type GetTasksResponse<T = []> = {
  error: string | null;
  totalCount: number;
  items: T;
};
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: string;
  priority: string;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10
} as const
