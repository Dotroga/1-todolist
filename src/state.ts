import {v1} from "uuid";

export type ListsType = {id: string, title: string, filter: FilterType}
export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = { id: string, title: string, isDone: boolean ,date: string}
export type TasksType = {
  [key: string]: TaskType[]
}

export let todolistId1 = v1();
export let todolistId2 = v1();

export const listsToDo: ListsType[] = [
  {id: todolistId1, title: "What to learn", filter: "All"},
  {id: todolistId2, title: "What to buy", filter: "All"}
]

export const tasksToDo: TasksType = {
  [todolistId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true, date: '10 July 22:03'},
    {id: v1(), title: "JS", isDone: false, date: '20 July 9:13'},
    {id: v1(), title: "React", isDone: true, date: '2 September 20:40'},
    {id: v1(), title: "Redux", isDone: false, date: '9 October 22:07'}
  ],
  [todolistId2]: [
    {id: v1(), title: "Books", isDone: true, date: '1 February 17:56'},
    {id: v1(), title: "Food", isDone: true, date: '4 March 22:31'}
  ]
}

