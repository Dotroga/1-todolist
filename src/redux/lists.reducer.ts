import { FilterType } from "redux/state";
import {listAPI, taskAPI} from "api/todoAPI";
import { Dispatch } from "redux";
import { setError, setErrorSnackbar, setIsLoadingAddListForm, toggleAddListForm } from "redux/app.reducer";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { setTasks } from "redux/task.reducer";
import { ThunkDispatchType } from "redux/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const parse = (title: string) => [title.slice(7), title.substring(0, 7)];

const slice = createSlice({
  name: 'lists',
  initialState: [] as ListType[],
  reducers: {
    setLists(state, action: PayloadAction<{ lists: ListThunkType[] }>) {
      return action.payload.lists.map((l) => {
        const titleAndColor = parse(l.title);
        return {
          ...l,
          title: titleAndColor[0],
          color: titleAndColor[1],
          filter: "All",
          path: l.title,
          isLoading: false,
        };
      });
    },
    setNumberOfTasks(state, action: PayloadAction<{ listId: string, number: number }>) {
      const list = state.find((l) => action.payload.listId === l.id)
      if (list) {list.numberOfTasks = action.payload.number}
    },
    addNewList(state, action: PayloadAction<{ id: string, title: string }>) {
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
    },
    editingList(state, action: PayloadAction<{ listId: string, title: string }>) {
      debugger
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
  }
})

export const lists = slice.reducer
export  const {setLists, setNumberOfTasks, addNewList, editingList, removeList, setIsLoading, reorderList} = slice.actions

export const fetchDataTC = () => async (dispatch: ThunkDispatchType) => {
  try {
    const lists = await listAPI.getLists();
    dispatch(setLists({lists}));
    lists.map(async (l) => {
      const tasks = await taskAPI.getTasks(l.id);
      dispatch(setTasks({listId:l.id, tasks: tasks.items}));
      dispatch(setNumberOfTasks({listId: l.id, number: tasks.totalCount}));
    });
  } catch (error) {}
};

export const addListTK = (title: string, navigate: NavigateFunction, color: string) => (dispatch: Dispatch) => {
  const newTitle = title.trim();
  if (newTitle !== "") {
    dispatch(setIsLoadingAddListForm(true));
    const colorAndTitle = color + newTitle;
    listAPI
      .createList(colorAndTitle)
      .then((res) => {
        dispatch(addNewList({id: res.data.data.item.id, title: colorAndTitle}));
        navigate(`/${colorAndTitle}`);
        dispatch(toggleAddListForm(false));
        return res.data.data.item.id;
      })
      .finally(() => dispatch(setIsLoadingAddListForm(false)));
  } else {
    dispatch(setError(true));
  }
};
export const editingListTK =
  (listId: string, title: string, color: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    const newTitle = title.trim();
    if (newTitle !== "") {
      dispatch(setIsLoadingAddListForm(true));
      dispatch(setIsLoading({listId, isLoading: true}));
      const colorAndTitle = color + title;
      listAPI
        .updateList(listId, colorAndTitle)
        .then(() => {
          dispatch(editingList({listId, title: colorAndTitle}));
          navigate(title);
          dispatch(setIsLoadingAddListForm(false));
        })
        .finally(() => {
          dispatch(toggleAddListForm(false));
          dispatch(setIsLoading({listId, isLoading: false}));
        });
    }  else {
  dispatch(setError(true));
}
  };

export const removeListTK = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
  dispatch(setIsLoading({listId, isLoading: true}));
  listAPI
    .deleteList(listId)
    .then(() => {
      dispatch(removeList({listId}));
      navigate("/");
    })
    .catch((e) => {
      dispatch(setErrorSnackbar(e.message));
    });
};

export const reorderUpListTK = (listId: string, lists: ListType[], change: 'up' | 'down') => (dispatch: Dispatch) => {
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
          dispatch(reorderList({index, change}))
        }
    })
}

export type ListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  path: string;
  color: string;
  numberOfTasks?: number;
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


