import {listsActions, ListType} from "redux/lists.reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState:ListType[] = []
const {removeList, reorderList, editingList, setLists, setNumberOfTasks, setIsLoading} = listsActions

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {
      addedDate: "2023-06-25T14:23:12.527",
      color: "#299338",
      filter: "All",
      id: todolistId1,
      isLoading: false,
      numberOfTasks: 0,
      order: 22,
      path: "Sundry#299338",
      title: "Sundry"
    },
    {
      addedDate: "2023-07-25T14:23:12.527",
      color: "#95c1e9",
      filter: "All",
      id: todolistId2,
      isLoading: false,
      numberOfTasks: 0,
      order: 22,
      path: "Test#95c1e9",
      title: "Test"
    },
    ]
})

// test('correct todolist should be removed', () => {
//   const endState = lists(startState, removeList(){ id: todolistId1}, 'requestId', todolistId1))
//
//   expect(endState.length).toBe(1)
//   expect(endState[0].id).toBe(todolistId2)
// })