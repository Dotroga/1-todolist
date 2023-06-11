import {listAPI, ResponseListType} from "api/listsAPI";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { ThunkDispatchType } from "redux/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {taskThunk} from "redux/task.reducer";
import {appActions} from "redux/app.reducer";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {handleServerNetworkError} from "utils/errorUtils";
import {FilterType} from "Types";

const parse = (title: string) => [title.slice(7), title.substring(0, 7)];

const fetchData = () => async (dispatch: ThunkDispatchType) => {
  try {
    const lists = await listAPI.getLists();
    dispatch(listsActions.setLists({lists: lists.data}));
    lists.data.map((l) => {
      dispatch(taskThunk.setTask(l.id))
    });
  } catch (e) {
    console.log('hello')
  }
};

const addList = createAppAsyncThunk<{ id: string, title: string }, {navigate: NavigateFunction}>
('lists/addList', async ({navigate}, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  const state = getState()
  const color = state.app.addListForm.color ? state.app.addListForm.color[0] : state.app.arrColor[3][0];
  const title = state.app.addListForm.title.trim();
  try {
      if (title !== "") {
        dispatch(appActions.setIsLoadingAddListForm('loading'));
        const colorAndTitle = color + title
        const res = await listAPI.createList(colorAndTitle)
        dispatch(appActions.setIsLoadingAddListForm('normal' ));
        dispatch(appActions.toggleAddListForm(false));
        navigate(`/${title}`);
        return {id: res.data.data.item.id, title: colorAndTitle}
      } else {
        // handleServerAppError(res.data, dispatch)
        dispatch(appActions.setIsLoadingAddListForm('normal' ));
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
       dispatch(appActions.setIsLoadingAddListForm('normal' ));
      return rejectWithValue(null)
    }
  }
)

const editingList = createAppAsyncThunk<{ listId: string, title: string }, {listId: string, navigate: NavigateFunction}>
('lists/editingList', async ({navigate, listId}, thunkAPI) => {
  const {dispatch, rejectWithValue, getState} = thunkAPI
  const state = getState()
  const color = state.app.addListForm.color ? state.app.addListForm.color[0] : state.app.arrColor[3][0];
  const title = state.app.addListForm.title.trim();
  try {
    if (title  !== "") {
      dispatch(appActions.setIsLoadingAddListForm('loading'));
      const colorAndTitle = color + title
      await listAPI.updateList(listId, colorAndTitle)
      navigate(title);
      dispatch(appActions.setIsLoadingAddListForm('normal' ));
      dispatch(appActions.toggleAddListForm(false));
      return {listId, title: colorAndTitle}
    }  else {
      dispatch(listsActions.setIsLoading({listId, isLoading: false}));
      dispatch(appActions.setError(true));
      dispatch(appActions.setIsLoadingAddListForm('normal' ));
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    dispatch(appActions.setIsLoadingAddListForm('normal' ));
    dispatch(listsActions.setIsLoading({listId, isLoading: false}));
    return rejectWithValue(null)
  }
})

// const _editingList =
//   (listId: string, title: string, color: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
//     const newTitle = title.trim();
//
//   };

const removeList = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
  dispatch(listsActions.setIsLoading({listId, isLoading: true}));
  listAPI
    .deleteList(listId)
    .then(() => {
      dispatch(listsActions.removeList({listId}));
      navigate("/");
    })
    .catch((e) => {
      dispatch(appActions.setErrorSnackbar(e.message));
    });
};

const reorderList = (listId: string, lists: ListType[], change: 'up' | 'down') => (dispatch: Dispatch) => {
  const index = lists.findIndex(l=>l.id===listId)
  let afterListId: string | null
  if (change === 'up') {
    afterListId = index > 1 ? lists[index - 2].id : null
  }  else {
    afterListId = index === lists.length - 1 ? listId : lists[index + 1].id
  }
  listAPI.reorderList(listId, afterListId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(listsActions.reorderList({index, change}))
      }
    })
}

const slice = createSlice({
  name: 'lists',
  initialState: [] as ListType[],
  reducers: {
    setLists(state, action: PayloadAction<{lists: ResponseListType[]}>) {
      return action.payload.lists.map((l) => {
        const titleAndColor = parse(l.title);
        return {
          ...l,
          title: titleAndColor[0],
          color: titleAndColor[1],
          filter: "All",
          path: l.title,
          isLoading: false,
          numberOfTasks: 0,
        };
      });
    },
    setNumberOfTasks(state, action: PayloadAction<{ listId: string, num: number }>) {
      const list = state.find((l) => action.payload.listId === l.id)
      if (list) {list.numberOfTasks = action.payload.num}
    },
    editingList(state, action: PayloadAction<{ listId: string, title: string }>) {
      const titleAndColor = parse(action.payload.title);
      const todo = state.find((l) => l.id === action.payload.listId);
      if (todo) {
        todo.title = titleAndColor[0]
        todo.color = titleAndColor[1]
      }
    },
    removeList(state, action: PayloadAction<{ listId: string }>) {
     const index = state.findIndex((l) => l.id === action.payload.listId);
     index !== -1 && state.splice(index, 1)
    },
    setIsLoading(state, action: PayloadAction<{ listId: string, isLoading: boolean }>) {
      const list = state.find((l) => action.payload.listId === l.id)
      if (list) {list.isLoading = action.payload.isLoading}
    },
    reorderList(state, action: PayloadAction<{ index: number, change: 'up' | 'down' }>) {
      const newLists = [...state]
      if (action.payload.change === 'up') {
        newLists[action.payload.index] = state[action.payload.index - 1];
        newLists[action.payload.index - 1] = state[action.payload.index];
      } else {
        newLists[action.payload.index] = state[action.payload.index + 1];
        newLists[action.payload.index + 1] = state[action.payload.index];
      }
      return newLists
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addList.fulfilled, (state,action)=>{
        const titleAndColor = parse(action.payload.title);
        const newList: ListType = {
          id: action.payload.id,
          title: titleAndColor[0],
          color: titleAndColor[1],
          path: action.payload.title,
          addedDate: "",
          order: 0,
          filter: "All",
          numberOfTasks: 0,
          isLoading: false,
        };
        state.unshift(newList)
      })
      .addCase(editingList.fulfilled, (state, action)=> {
        const titleAndColor = parse(action.payload.title);
        const todo = state.find((l) => l.id === action.payload.listId);
        if (todo) {
          todo.title = titleAndColor[0]
          todo.color = titleAndColor[1]
        }
      })
  }
})

export const lists = slice.reducer
export const listsActions = slice.actions
export const listsThunks = {fetchData, addList, editingList, removeList, reorderList}


export type ListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  path: string;
  color: string;
  numberOfTasks: number;
  filter: FilterType;
  isLoading: boolean;
};

export type ListThunkType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  numberOfTasks?: number;
};


