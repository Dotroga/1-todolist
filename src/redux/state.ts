import {v1} from "uuid";
import {TaskType} from "../api/todo-api";
export type ServerSideListType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ListType = {
  id: string
  title: string
  addedDate: string
  order: number
  path: string
  color: string
  filter: FilterType
}
export type FilterType = 'All' | 'Active' | 'Completed'

export type TasksType = { [key: string]: TaskType[] }

export let todolistId1 = v1();
export let todolistId2 = v1();

export const listsToDo: ListType[] = [
  {id: todolistId1, title: "What to learn", path: '/whattolearn', color: '#ae38e9' , addedDate:'',
    order: 0, filter: 'All'},
  {id: todolistId2, title: "What to buy", path: '/whattobuy', color: '#7dca48', addedDate: '',
    order: 1, filter: 'All'}
]

export const tasksToDo: TasksType = {
  [todolistId1]: [
    {description: '', id: v1(), title: "HTML&CSS", completed: true, startDate: '10 July 22:03',
      status: '', priority: '', deadline: '', todoListId: '', order: 1, addedDate: ''},
    {description: '', id: v1(), title: "JS", completed: false, startDate: '20 July 9:13',
      status: '', priority: '', deadline: '', todoListId: '', order: 2, addedDate: ''}
  ],
  [todolistId2]: [
    {description: '', id: v1(), title: "Books", completed: true, startDate: '1 February 17:56',
      status: '', priority: '', deadline: '', todoListId: '', order: 1, addedDate: ''},
    {description: '', id: v1(), title: "Food", completed: true, startDate: '4 March 22:31',
      status: '', priority: '', deadline: '', todoListId: '', order: 2, addedDate: ''}
  ]
}


// const idSubsection =  '1234'
// export const newState = {
//   tasks: {
//     [idSubsecticompleted
//       {id: v1(),
//         title: 'learn in a week',
//         description: 'all js and react',
//         priority: '3.2.1',
//         dateAdded: {
//           date: {month: 'March', day: '15', dayOfWeek: 'Wednesday'},
//           time: '22:03'
//         },
//         termExecution: {
//           date: {month: 'March', day: '22', dayOfWeek: 'Wednesday'},
//           time: '22:03'
//         },
//       }
//     ]
//   }
// }


