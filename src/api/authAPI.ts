import {LoginType} from "../Components/Content/Login/Login";
import {instance, ResponseType} from './instanse'


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