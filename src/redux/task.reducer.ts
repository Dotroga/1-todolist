import {TasksType} from "redux/state";
import {addNewList, removeList, setLists, setNumberOfTasks} from "redux/lists.reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskType} from "api/todoAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    setTasks(state, action: PayloadAction<{ listId: string, tasks: TaskType[] }>) {
      state[action.payload.listId] = action.payload.tasks
    },
    removeTask(state, action: PayloadAction<{ listId: string, id: string }>) {
      const index = state[action.payload.listId].findIndex((t) => t.id === action.payload.listId);
      index !== -1 && state[action.payload.listId].splice(index, 1)
    },
    addTask(state, action: PayloadAction<{ listId: string, task: TaskType }>) {
      state[action.payload.listId].unshift(action.payload.task)
    },
    changeTaskStatus(state, action: PayloadAction<{ listId: string, id: string, isDone: boolean }>) {
      const task = state[action.payload.listId].find((t) => t.id === action.payload.id)
      // task!.status = action.payload.isDone
    },
    renameTask(state, action: PayloadAction<{ listId: string, id: string, title: string }>) {

    },
  },
  extraReducers: builder => {
    builder
      .addCase(setLists, (state, action) => {
        action.payload.lists.forEach((l) => state[l.id] = [])
      })
      .addCase(addNewList, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(removeList, (state, action) => {
        delete state[action.payload.listId]
      })

  }
})
export const tasks = slice.reducer
export const {setTasks, removeTask, addTask, renameTask, changeTaskStatus} = slice.actions

export const setTaskTC = (listId: string) => (dispatch: Dispatch) => {
  taskAPI.getTasks(listId).then((res) => {
    dispatch(setTasks({listId, tasks: res.items}));
  });
};
export const addTaskTK = (listId: string, title: string, numberOfTasks: number | undefined) => (dispatch: Dispatch) => {
  taskAPI.createTask(listId, title).then((res) => {
    const number = numberOfTasks ? numberOfTasks + 1 : 1;
    dispatch(addTask({listId, task: res.data.data.item}));
    dispatch(setNumberOfTasks({listId, number}));
  });
};

// const d = new Date()
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"]
// const startDate = `${d.getMonth() + 1} ${monthNames[d.getMonth()]} ${d.toTimeString().slice(0,5)}`
// let task: TaskType = {description: '', id: v1(), title: action.title, completed: false, startDate,
//   status: '', priority: '', deadline: '', todoListId: '', order: 1, addedDate: ''};
