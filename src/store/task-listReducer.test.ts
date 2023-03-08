import {ListsType, TasksType} from "../state";
import {tasksReducer} from "./taskReducer";
import {addNewListAC, listsReducer, removeListAC} from "./listsReducer";

const startState: TasksType  = {
  "todolistId1": [
    {id: "1", title: "CSS", isDone: false, date:'4 March 22:31'},
    {id: "2", title: "JS", isDone: true, date:'4 March 22:31'},
    {id: "3", title: "React", isDone: false, date:'4 March 22:31'}
  ],
  "todolistId2": [
    {id: "1", title: "bread", isDone: false, date:'4 March 22:31'},
    {id: "2", title: "milk", isDone: true, date:'4 March 22:31'},
    {id: "3", title: "tea", isDone: false, date:'4 March 22:31'}
  ]
}

test('ids should be equals', () => {
  const startTasksState: TasksType  = {}
  const startListsState: ListsType[] = []

  const action = addNewListAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endListsState = listsReducer(startListsState, action)

  const keys = Object.keys(endTasksState) // вернет масив ключей тасок
  const idFromTasks = keys[0]
  const idFromTodoLists = endListsState[0].id

  expect(idFromTasks).toBe(action.id)
  expect(idFromTodoLists).toBe(action.id)
})
test('property with todolistId should be deleted', () => {

  const action = removeListAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()
})
