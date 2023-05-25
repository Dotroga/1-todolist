import axios from "axios";
import { LoginType } from "Components/Login/Login";
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export const authAPI = {
  login: (data: LoginType) => instance.post<ResponseType<{ userId: number }>>("auth/login", data),
  logout: () => instance.delete<ResponseType>("auth/login"),
  me: () => instance.get<ResponseType<MeType>>("auth/me"),
};

export const todoApi = {
  getLists: () => instance.get<ListType[]>("todo-lists").then((res) => res.data),
  createList: (title: string) => instance.post<ResponseType<{ item: ListType }>>("todo-lists", { title }),
  updateList: (listId: string, title: string) => instance.put<ResponseType>(`todo-lists/${listId}`, { title }),
  deleteList: (listId: string) => instance.delete<ResponseType>(`todo-lists/${listId}`),
  getTasks: (listId: string) =>
    instance.get<GetTasksResponse<TaskType[]>>(`todo-lists/${listId}/tasks`).then((res) => res.data),
  createTask: (listId: string, title: string) =>
    instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${listId}/tasks`, { title }),
};

type MeType = {
  userId: number;
  email: string;
  login: string;
};

type ListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type ResponseType<T = {}> = {
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
