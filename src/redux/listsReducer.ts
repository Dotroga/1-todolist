import { FilterType } from "./state";
import {listAPI, taskAPI} from "api/todoAPI";
import { Dispatch } from "redux";
import { setError, setErrorSnackbar, setIsLoadingAddListForm, toggleAddListForm } from "redux/appReducer";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { setTasksAC } from "./taskReducer";
import { ThunkDispatchType } from "./store";

const parse = (title: string) => [title.slice(7), title.substring(0, 7)];

export const listsReducer = (lists: ListType[] = [], action: Actions): ListType[] => {
  switch (action.type) {
    case "SET-LISTS": {
      return action.lists.map((l) => {
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
    }
    case "SET-NUMBER": {
      return lists.map((l) => (action.listId === l.id ? { ...l, numberOfTasks: action.number } : l));
    }
    case "ADD-LIST": {
      const titleAndColor = parse(action.title);
      const newList: ListType = {
        id: action.id,
        title: titleAndColor[0],
        color: titleAndColor[1],
        path: action.title,
        addedDate: "",
        order: 0,
        filter: "All",
        numberOfTasks: 0,
        isLoading: false,
      };
      return [newList, ...lists];
    }
    case "RENAME-TASK-LIST": {
      const titleAndColor = parse(action.title);
      return lists.map((l) =>
        l.id === action.listId
          ? {
              ...l,
              title: titleAndColor[0],
              color: titleAndColor[1],
              path: action.title,
            }
          : l
      );
    }
    case "REMOVE-TASK-LIST":
      return lists.filter((l) => l.id !== action.listId);
    case "SET-IS-LOADING":
      return lists.map((l) => (l.id === action.listId ? { ...l, isLoading: action.isLoading } : l));
    case "REORDER-LIST": {
      const newLists = [...lists]
      if (action.change === 'up') {
        newLists[action.index] = lists[action.index - 1];
        newLists[action.index - 1] = lists[action.index];
      } else {
        newLists[action.index] = lists[action.index + 1];
        newLists[action.index + 1] = lists[action.index];
      }
      return newLists
    }
    default:
      return lists;
  }
};

export const setListsAC = (lists: ListThunkType[]) =>
  ({
    type: "SET-LISTS",
    lists,
  } as const);
export const setNumberOfTasks = (listId: string, number: number) =>
  ({
    type: "SET-NUMBER",
    listId,
    number,
  } as const);
export const addNewListAC = (id: string, title: string) =>
  ({
    type: "ADD-LIST",
    id,
    title,
  } as const);
export const editingListAC = (listId: string, title: string) =>
  ({
    type: "RENAME-TASK-LIST",
    listId,
    title,
  } as const);
export const removeListAC = (listId: string) =>
  ({
    type: "REMOVE-TASK-LIST",
    listId,
  } as const);
export const setIsLoading = (listId: string, isLoading: boolean) =>
  ({type: "SET-IS-LOADING", listId, isLoading} as const);
export const reorderList = (index: number, change: 'up' | 'down') =>
  ({type: 'REORDER-LIST', index, change} as const)
export const fetchDataTC = () => async (dispatch: ThunkDispatchType) => {
  try {
    const lists = await listAPI.getLists();
    dispatch(setListsAC(lists));
    lists.map(async (l) => {
      const tasks = await taskAPI.getTasks(l.id);
      dispatch(setTasksAC(l.id, tasks.items));
      dispatch(setNumberOfTasks(l.id, tasks.totalCount));
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
        dispatch(addNewListAC(res.data.data.item.id, colorAndTitle));
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
      dispatch(setIsLoading(listId, true));
      const colorAndTitle = color + title;
      listAPI
        .updateList(listId, colorAndTitle)
        .then(() => {
          dispatch(editingListAC(listId, colorAndTitle));
          navigate(title);
          dispatch(setIsLoadingAddListForm(false));
        })
        .finally(() => {
          dispatch(toggleAddListForm(false));
          dispatch(setIsLoading(listId, false));
        });
    }  else {
  dispatch(setError(true));
}
  };

export const removeListTK = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
  dispatch(setIsLoading(listId, true));
  listAPI
    .deleteList(listId)
    .then(() => {
      dispatch(removeListAC(listId));
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
          dispatch(reorderList(index, change))
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

export type Actions =
  | getListsACType
  | renameListACType
  | removeListACType
  | addListACType
  | setNumberOfTasksType
  | setIsLoadingType
  | reorderListType

export type getListsACType = ReturnType<typeof setListsAC>;
export type addListACType = ReturnType<typeof addNewListAC>;
export type renameListACType = ReturnType<typeof editingListAC>;
export type removeListACType = ReturnType<typeof removeListAC>;
export type setNumberOfTasksType = ReturnType<typeof setNumberOfTasks>;
export type setIsLoadingType = ReturnType<typeof setIsLoading>;
export type reorderListType = ReturnType<typeof reorderList>;

