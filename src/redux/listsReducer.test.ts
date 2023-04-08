import {v1} from 'uuid';
import {addNewListAC, setListsAC, listsReducer, removeListAC, renameListAC} from "./listsReducer";
import {ListType} from "./state";

let todolistId1: string
let todolistId2: string
let startState: ListType[]
beforeEach(()=> {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1, title: "What to learn", path: '/sgsag', color: '#c70505', addedDate:'',
      order: 0, filter: 'All'},
    {id: todolistId2, title: "What to buy", path: '/sgsag', color: '#c70505', addedDate:'',
      order: 0, filter: 'All'}
  ]
})

test('todoLists should be received',()=>{
  const action = setListsAC(startState)
  const endState = listsReducer([], action)
  expect(endState.length).toBe(2)
})


test('correct todolist should be removed', () => {

  const endState = listsReducer(startState, removeListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist";

  const endState = listsReducer(startState, addNewListAC(v1(),newTodolistTitle, ''))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {

  let newTodolistTitle = "New Todolist";

  const endState = listsReducer(startState, renameListAC(todolistId2,newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});



