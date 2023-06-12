import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {'API-KEY': '7bc2302e-d37a-46c7-ba9d-fd7a4a394831'}
});

export type ResponseType<T = {}> = {
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
  data: T;
};