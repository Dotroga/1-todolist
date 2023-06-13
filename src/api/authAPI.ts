import {LoginType} from "Components/Content/Login/Login";
import {instance} from "api/instanse";
import {ResponseType} from 'api/instanse'

export const authAPI = {
  login: (data: LoginType) => instance.post<ResponseType<{ userId: number }>>("auth/login", data),
  logout: () => instance.delete<ResponseType>("auth/login"),
  me: () => instance.get<ResponseType<MeType>>("auth/me"),
};

type MeType = {
  userId: number;
  email: string;
  login: string;
};