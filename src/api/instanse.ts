import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
});

export type ResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: T;
};