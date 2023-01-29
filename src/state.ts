import {v1} from "uuid";

export type ListType = {
  id: number
  name: string
}
export type TaskType = {
  id: string
  idList: number
  title: string
  isDone: boolean
}
export type stateType = {
  listTitle: ListType[]
  tasksTitle: TaskType[]
}

export const state: stateType = {
  listTitle: [
    {id: 1, name: 'What to learn'},
    {id: 2, name: 'What to bye'}
  ],
  tasksTitle: [
    {id: v1(), idList: 1, title: 'JS', isDone: true},
    {id: v1(), idList: 1, title: 'CSS - HTML', isDone: true},
    {id: v1(), idList: 1, title: 'TS', isDone: false},
    {id: v1(), idList: 1, title: 'Redux', isDone: false},
    {id: v1(), idList: 1, title: 'React', isDone: true}
  ]
}
