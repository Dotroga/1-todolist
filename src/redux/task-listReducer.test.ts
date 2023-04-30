import {ListType, tasksToDo, TasksType} from "./state";
import {tasksReducer} from "./taskReducer";
import {addNewListAC, listsReducer, removeListAC} from "./listsReducer";
import {v1} from "uuid";

const startState: TasksType  = tasksToDo



// test('ids should be equals', () => {
//   const startTasksState: TasksType  = {}
//   const startListsState: ListType[] = []
//
//   const action = addNewListAC(v1(),'new todolist', '')
//
//   const endTasksState = tasksReducer(startTasksState, action)
//   const endListsState = listsReducer(startListsState, action)
//
//   const keys = Object.keys(endTasksState) // вернет масив ключей тасок
//   const idFromTasks = keys[0]
//   const idFromTodoLists = endListsState[0].id
//
//   expect(idFromTasks).toBe(action.id)
//   expect(idFromTodoLists).toBe(action.id)
// })
// test('property with todolistId should be deleted', () => {
//
//   const action = removeListAC('todolistId2')
//
//   const endState = tasksReducer(startState, action)
//
//
//   const keys = Object.keys(endState)
//
//   expect(keys.length).toBe(1)
//   expect(endState['todolistId2']).toBeUndefined()
// })
