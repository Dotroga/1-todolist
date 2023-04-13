import {addTaskAC, changeTaskStatusAC, renameTaskAC, tasksReducer} from "./taskReducer";
import {listsToDo, tasksToDo, TasksType} from "./state";
import {setListsAC} from "./listsReducer";


const startState: TasksType  = tasksToDo

// test('correct task should be deleted from correct array', () => {
//
//   const action = removeTaskAC('todolistId2', '2')
//   const endState = tasksReducer(startState, action)
//
//   expect(endState).toEqual({ // сравнивает на эдентичность сложные структуры
//     "todolistId1": [
//       { id: "1", title: "CSS", isDone: false, date: '4 March 22:31'},
//       { id: "2", title: "JS", isDone: true, date: '4 March 22:31'},
//       { id: "3", title: "React", isDone: false, date: '4 March 22:31'}
//     ],
//     "todolistId2": [
//       { id: "1", title: "bread", isDone: false, date: '4 March 22:31'},
//       { id: "3", title: "tea", isDone: false, date: '4 March 22:31'}
//     ]
//   });
// })
test('creating an empty array in tasks when adding a list', ()=>{
  const action = setListsAC(listsToDo)
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(2);
  expect(endState[listsToDo[0].id]).toStrictEqual([]);
  expect(endState[listsToDo[1].id]).toStrictEqual([]);
})
// test('correct task should be added to correct array', () => {
//   const action = addTaskAC('todolistId2', "newTasks")
//   const endState = tasksReducer(startState, action)
//   expect(endState["todolistId1"].length).toBe(3); // сравнивает финальное значение с ожидаемым
//   expect(endState["todolistId2"].length).toBe(4);
//   expect(endState["todolistId2"][0].id).toBeDefined(); // значение !== undefined
//   expect(endState["todolistId2"][3].title).toBe('newTasks');
//   expect(endState["todolistId2"][0].completed).toBe(false);
// })
test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC("todolistId2", '2', false);
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId2"][1].completed).toBe(false);
  expect(endState["todolistId2"][2].completed).toBe(false);
});
test('title task should be changed', () => {
  const action = renameTaskAC('todolistId2', "2", 'newTitle')
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId2"][1].title).toBe('newTitle');
})