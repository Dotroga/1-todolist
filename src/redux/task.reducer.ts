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
        loading: false,
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
        loading: false,
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

const editTaskStatus = createAppAsyncThunk<void, TaskAppType>
('tasks/editStatus', async (task, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  const {todoListId, id, status, title, priority} = task
  const newStatus = status === 0 ? 2 : 0
  const res = await taskAPI.editTask(todoListId, id, {status: newStatus, title, priority: priority[2]})
  try {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(tasksActions.editTask({...task, status: newStatus}))
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const editTask = createAppAsyncThunk<void, {task: TaskAppType, newTask: TaskRequestType}>
('tasks/edit', async ({task, newTask}, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  const {todoListId, id} = task
  dispatch(tasksActions.setLoading({todoListId, id, value: true}))
  const res = await taskAPI.editTask(task.todoListId, task.id, newTask)
  try {
    if (res.data.resultCode === ResultCode.Success) {
      const {title, description, priority, deadline} = res.data.data.item
      const colorArr = getState().app.prioritiesArr
      const newTask: TaskAppType = {...task,
        title,
        description,
        priority: colorArr.filter(i => i[2] === priority)[0],
        deadline: makeAppDate(deadline),
        loading: false
      }
      dispatch(tasksActions.editTask(newTask))
    } else {
      handleServerAppError(res.data, dispatch)
      dispatch(tasksActions.setLoading({todoListId, id, value: false}))
      return rejectWithValue(null)
    }
  } catch (e) {
    dispatch(tasksActions.setLoading({todoListId, id, value: false}))
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const removeTask = createAppAsyncThunk<{todoListId: string, id: string}, {todoListId: string, id: string}>
('tasks/remove', async ({todoListId, id}, thunkAPI) => {
  debugger
  const {dispatch, rejectWithValue} = thunkAPI
  dispatch(tasksActions.setLoading({todoListId, id, value: true}))
  const res = await taskAPI.removeTask(todoListId, id)
  try {
    if (res.data.resultCode === ResultCode.Success) {
    return {todoListId, id}
    } else {
      handleServerAppError(res.data, dispatch)
      dispatch(tasksActions.setLoading({todoListId, id, value: false}))
      return rejectWithValue(null)
    }
  } catch (e) {
    dispatch(tasksActions.setLoading({todoListId, id, value: false}))
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    setLoading(state, action: PayloadAction<{todoListId: string, id: string, value: boolean}>) {
      const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[action.payload.todoListId][index].loading = action.payload.value;
      }
    },
    editTask(state, action: PayloadAction<TaskAppType>) {
      const listId = action.payload.todoListId
      const index = state[listId].findIndex((t) => t.id === action.payload.id);
      state[listId] = [...state[listId].slice(0, index), action.payload,
        ...state[listId].slice(index + 1)
      ]
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
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
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todoListId].findIndex((t) => t.id === action.payload.id);
        index !== -1 && state[action.payload.todoListId].splice(index, 1)
      })
  }
})
export const tasks = slice.reducer
export const tasksActions = slice.actions
export const taskThunk = {setTask, addTask, editTaskStatus, editTask, removeTask}

