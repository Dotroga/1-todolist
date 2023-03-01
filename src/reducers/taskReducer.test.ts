import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, tasksReducer} from "./taskReducer";
import {TasksType} from "../state";

const startState: TasksType  = {
  "todolistId1": [
    {id: "1", title: "CSS", isDone: false},
    {id: "2", title: "JS", isDone: true},
    {id: "3", title: "React", isDone: false}
  ],
  "todolistId2": [
    {id: "1", title: "bread", isDone: false},
    {id: "2", title: "milk", isDone: true},
    {id: "3", title: "tea", isDone: false}
  ]
}

test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC('todolistId2', '2')
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({ // сравнивает на эдентичность сложные структуры
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false }
    ]
  });
})
test('correct task should be added to correct array', () => {

  const action = addTaskAC('todolistId2', "newTasks")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3); // сравнивает финальное значение с ожидаемым
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined(); // значение !== undefined
  expect(endState["todolistId2"][3].title).toBe('newTasks');
  expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {

  const action = changeTaskStatusAC("todolistId2", '2', false);

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId2"][2].isDone).toBe(false);
});
test('title task should be changed', () => {
  const action = renameTaskAC('todolistId2', "2", 'newTitle')
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId2"][1].title).toBe('newTitle');
})