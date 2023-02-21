import {v1} from "uuid";

export type ListsType = {id: string, title: string, filter: FilterType}
export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksType = {
  [key: string]: TaskType[]
}

export let todolistId1 = v1();
export let todolistId2 = v1();

export const listsToDo: ListsType[] = [
  {id: todolistId1, title: "What to learn", filter: "All"},
  {id: todolistId2, title: "What to buy", filter: "Active"}
]

export const tasksToDo: TasksType = {
  [todolistId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true}
  ],
  [todolistId2]: [
    {id: v1(), title: "Books", isDone: true},
    {id: v1(), title: "Food", isDone: true}
  ]
}

