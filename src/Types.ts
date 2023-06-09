import {TaskType} from "api/taskAPI";

export type ListColorType = { color: string; listId: string };

export type ServerSideListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type ListThunkType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  numberOfTasks?: number;
};

export type FilterType = "All" | "Active" | "Completed";

export type TasksType = { [key: string]: TaskType[] };
