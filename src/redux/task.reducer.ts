import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtils";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {listsActions, listsThunks} from "redux/lists.reducer";
import {taskAPI, TaskAppType, TaskRequestType} from "api/taskAPI";
import {ResultCode} from "api/listsAPI";
import {TasksType} from "Types";
import {makeAppDate} from "utils/makeAppDate";


const setTask = createAppAsyncThunk<{ listId: string, tasks: TaskAppType[] }, string>
('tasks/setTask', async (listId, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  try {
    const res = await taskAPI.getTasks(listId)
    const colorArr = getState().app.prioritiesArr
    const tasks = res.data.items.map((i) => {
      return {
        ...i,
        startDate: makeAppDate(i.startDate),
        deadline: makeAppDate(i.deadline),
        priority: colorArr.filter((p) => {
          return p[2] === i.priority
        })[0]
      }
    })
    dispatch(listsActions.setNumberOfTasks({listId, num: res.data.totalCount}));
    return {listId, tasks: tasks}
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const addTask = createAppAsyncThunk<TaskAppType, { listId: string, task: TaskRequestType, num: number }>
('tasks/addTask', async ({listId, task, num}, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  const colorArr = getState().app.prioritiesArr
  try {
    const date = new Date
    const res = await taskAPI.createTask(listId, {...task, startDate: date.toISOString()})
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(listsActions.setNumberOfTasks({listId, num: num + 1}));
      const task = res.data.data.item
      return {
        ...task,
        priority: colorArr.filter(i => i[2] === task.priority)[0],
        startDate: makeAppDate(task.startDate),
        deadline: makeAppDate(task.deadline)
      }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const editTaskStatus = createAppAsyncThunk<TaskAppType, TaskAppType>
('tasks/editTask', async (task, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  const {todoListId, id, status, title, priority} = task
  const newStatus = status === 0 ? 2 : 0
  const res = await taskAPI.editTask(todoListId, id, {status: newStatus, title, priority: priority[2]})
  try {
    if (res.data.resultCode === ResultCode.Success) {
      return {...task, status: newStatus}
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
        state[action.payload.todoListId].unshift(action.payload)
      })
      .addCase(setTask.fulfilled, (state, action) => {
        state[action.payload.listId] = action.payload.tasks
      })
      .addCase(editTaskStatus.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.id);
        state[action.payload.todoListId] = [
          ...state[action.payload.todoListId].slice(0, index),
          action.payload,
          ...state[action.payload.todoListId].slice(index + 1)
        ]
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
export const taskThunk = {setTask, addTask, editTaskStatus}


//
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"]
// const startDate = `${date.getMonth() + 1} ${monthNames[date.getMonth()]} ${date.toTimeString().slice(0, 5)}`

