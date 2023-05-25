import { FilterType } from "./state";
import { todoApi } from "api/todoAPI";
import { Dispatch } from "redux";
import { setErrorAC, setErrorSnackbar, setIsLoadingAddListForm, toggleAddListFormAC } from "./statusOffWindowsReducer";
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
  ({
    type: "SET-IS-LOADING",
    listId,
    isLoading,
  } as const);

export const fetchDataTC = () => async (dispatch: ThunkDispatchType) => {
  try {
    const lists = await todoApi.getLists();
    dispatch(setListsAC(lists));
    lists.map(async (l) => {
      const tasks = await todoApi.getTasks(l.id);
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
    todoApi
      .createList(colorAndTitle)
      .then((res) => {
        dispatch(addNewListAC(res.data.data.item.id, colorAndTitle));
        navigate(`/${colorAndTitle}`);
        dispatch(toggleAddListFormAC(false));
        return res.data.data.item.id;
      })
      .finally(() => dispatch(setIsLoadingAddListForm(false)));
  } else {
    dispatch(setErrorAC(true));
  }
};

export const editingListTK =
  (listId: string, title: string, color: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAddListForm(true));
    dispatch(setIsLoading(listId, true));
    const colorAndTitle = color + title;
    todoApi
      .updateList(listId, colorAndTitle)
      .then(() => {
        dispatch(editingListAC(listId, colorAndTitle));
        navigate(title);
        dispatch(setIsLoadingAddListForm(false));
      })
      .finally(() => {
        dispatch(toggleAddListFormAC(false));
        dispatch(setIsLoading(listId, false));
      });
  };

export const removeListTK = (listId: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
  dispatch(setIsLoading(listId, true));
  todoApi
    .deleteList(listId)
    .then(() => {
      dispatch(removeListAC(listId));
      navigate("/");
    })
    .catch((e) => {
      dispatch(setErrorSnackbar(e.message));
    });
};

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
  | setIsLoadingType;

export type getListsACType = ReturnType<typeof setListsAC>;
export type addListACType = ReturnType<typeof addNewListAC>;
export type renameListACType = ReturnType<typeof editingListAC>;
export type removeListACType = ReturnType<typeof removeListAC>;
export type setNumberOfTasksType = ReturnType<typeof setNumberOfTasks>;
export type setIsLoadingType = ReturnType<typeof setIsLoading>;
