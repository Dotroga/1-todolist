import {v1} from "uuid";

export type ListsType = {id: string, title: string, path: string, color: string, isActive: boolean}
export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = { id: string, title: string, isDone: boolean ,date: string}
export type TasksType = {
  [key: string]: TaskType[]
}

export let todolistId1 = v1();
export let todolistId2 = v1();

export const listsToDo: ListsType[] = [
  {id: todolistId1, title: "What to learn", path: '/sgsag', color: '#c70505' , isActive: false},
  {id: todolistId2, title: "What to buy", path: '/sgsag', color: '#c70505', isActive: true}
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
const idSubsection =  '1234'
export const newState = {
  tasks: {
    [idSubsection]: [
      {id: v1(),
        title: 'learn in a week',
        description: 'all js and react',
        priority: '3.2.1',
        dateAdded: {
          date: {month: 'March', day: '15', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
        termExecution: {
          date: {month: 'March', day: '22', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
      }
    ]
  },
  sections: {
    ['idList']: {
      id: '123',
      title: 'Подраздел',
      color: '#8241d2',
    }
  },
  lists: [
    {
      id: '1234',
      title: 'section',

    }
  ]
}


