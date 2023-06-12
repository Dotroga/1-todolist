import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {taskAPI, TaskRequestType, TaskType} from "../api/taskAPI";
import {listsActions, listsThunks} from "./lists.reducer";
import {createAppAsyncThunk} from "../utils/createAppAsyncThunk";
import {ResultCode} from "../api/listsAPI";
import {TasksType} from "../Types";



const setTask = createAppAsyncThunk<{ listId: string, tasks: TaskType[] }, string>
('tasks/setTask', async (listId, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    const res = await taskAPI.getTasks(listId)
    dispatch(listsActions.setNumberOfTasks({listId, num: res.data.totalCount}));
    return {listId, tasks: res.data.items}
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const addTask = createAppAsyncThunk<{ listId: string, task: TaskType }, {listId: string, task: TaskRequestType, num: number}>
('tasks/addTask', async ({listId, task, num}, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    const res = await taskAPI.createTask(listId, task)
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(listsActions.setNumberOfTasks({listId, num: num + 1}));
      return {listId, task: res.data.data.item}
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    removeTask(state, action: PayloadAction<{ listId: string, id: string }>) {
      const index = state[action.payload.listId].findIndex((t) => t.id === action.payload.listId);
      index !== -1 && state[action.payload.listId].splice(index, 1)
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
      .addCase(addTask.fulfilled, (state, action) => {
        debugger
        state[action.payload.listId].unshift(action.payload.task)
      })
      .addCase(setTask.fulfilled, (state, action) => {
        state[action.payload.listId] = action.payload.tasks
      })
      .addCase(listsActions.setLists, (state, action) => {
        action.payload.lists.forEach((l) => state[l.id] = [])
      })
      .addCase(listsThunks.addList.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(listsActions.removeList, (state, action) => {
        delete state[action.payload.listId]
      })

  }
})
export const tasks = slice.reducer
export const tasksActions = slice.actions
export const taskThunk = {setTask, addTask}


// const d = new Date()
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"]
// const startDate = `${d.getMonth() + 1} ${monthNames[d.getMonth()]} ${d.toTimeString().slice(0,5)}`
// let task: TaskType = {description: '', id: v1(), title: action.title, completed: false, startDate,
//   status: '', priority: '', deadline: '', todoListId: '', order: 1, addedDate: ''};
