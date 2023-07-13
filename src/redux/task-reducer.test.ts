import {TasksType} from "Types";
import {tasks, taskThunk} from "redux/task.reducer";

const {removeTask, reorderTask, editTask, editTaskStatus, addTask, setTask} = taskThunk

let startState = {} as TasksType
beforeEach(() => {
  startState = {
    'todolistId1': [
      {
        addedDate: "2023-07-13T20:04:42.657",
        deadline: {date: 'Saturday 22 July', timestamp: 1690048800000},
        description: "Воскресенье ",
        id: "7",
        loading: false,
        order: -3,
        priority: ['#299238', 'Later', 4],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267881987},
        status: 0,
        title: "Sunday",
        todoListId: "todolistId1"
      },
      {
        addedDate: "2023-07-13T20:04:13.127",
        deadline: {date: 'Friday 21 July', timestamp: 1689962400000},
        description: "Суббота",
        id: "6",
        loading: false,
        order: -2,
        priority: ['#d73f35', 'Urgently', 3],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267852467},
        status: 0,
        title: "Saturday",
        todoListId: "todolistId1"
      },
      {
        addedDate: "2023-07-13T20:03:52.62",
        deadline: {date: 'Thursday 13 July', timestamp: 1689271200000},
        description: "Пятница",
        id: "5",
        loading: false,
        order: -1,
        priority: ['#f6cc00', 'High', 2],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267831950},
        status: 0,
        title: "Friday",
        todoListId: "todolistId1"
      },
      {
        addedDate: "2023-07-13T20:03:36.9",
        deadline: {date: 'Wednesday 19 July', timestamp: 1689789600000},
        description: "Четверг",
        id: "4",
        loading: false,
        order: 0,
        priority: ['#b6b6b6', 'Low', 0],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267816187},
        status: 0,
        title: "Thursday ",
        todoListId: "todolistId1"
      }
    ],
    'todolistId2': [
      {
        addedDate: "2023-07-13T20:02:52.663",
        deadline: {date: 'Tuesday 18 July', timestamp: 1689703200000},
        description: "Среда",
        id: "3",
        loading: false,
        order: -2,
        priority: ['#b6b6b6', 'Low', 0],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267771983},
        status: 0,
        title: "Wednesday",
        todoListId: "todolistId2"
      },
      {
        addedDate: "2023-07-13T20:02:27.383",
        deadline: {date: 'Monday 17 July', timestamp: 1689616800000},
        description: "Вторник",
        id: "2",
        loading: false,
        order: -1,
        priority: ['#b6b6b6', 'Low', 0],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267746717},
        status: 0,
        title: "Tuesday",
        todoListId: "todolistId2"
      },
      {
        addedDate: "2023-07-13T20:01:48.297",
        deadline: {date: 'Sunday 16 July', timestamp: 1689530400000},
        description: "Понедельник наверно",
        id: "1",
        loading: false,
        order: 0,
        priority: ['#3f71fb', 'Middle', 1],
        startDate: {date: 'Thursday 13 July', timestamp: 1689267707490},
        status: 0,
        title: "Monday",
        todoListId: "todolistId2"
      },
    ]
  }
})

test('correct task should be deleted from correct array', () => {
  let param = {todoListId: 'todolistId2', id: '2'}
  const action = removeTask.fulfilled(param, 'requestId', param)

  const endState = tasks(startState, action)

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})