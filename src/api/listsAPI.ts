import {instance, ResponseType} from './instanse'


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




export type ResponseListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10
} as const
