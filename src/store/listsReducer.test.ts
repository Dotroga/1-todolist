import {v1} from 'uuid';
import {addNewListAC, changeFilterAC, listsReducer, removeListAC, renameListAC} from "./listsReducer";
import {FilterType, ListsType} from "../state";

let todolistId1: string
let todolistId2: string
let startState: ListsType[]
beforeEach(()=> {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
  ]
})


test('correct todolist should be removed', () => {

  const endState = listsReducer(startState, removeListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist";

  const endState = listsReducer(startState, addNewListAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {

  let newTodolistTitle = "New Todolist";

  const endState = listsReducer(startState, renameListAC(todolistId2,newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct todolist should change filter', () => {

  const newFilter: FilterType = 'Completed'

  const endState = listsReducer(startState,changeFilterAC(todolistId2,newFilter))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe('Completed')
})


