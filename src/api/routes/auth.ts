import { AxiosResponse } from "axios";

import { axiosInstance } from "../instance";

import { User } from "../../interfaces/user";

export const checkAuth = (): Promise<AxiosResponse> =>
  axiosInstance.get<User>("/auth/check");

export const createUser = (user: User): Promise<AxiosResponse> =>
  axiosInstance.post("/auth/register", user);

export const login = (credentials: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => axiosInstance.post("/auth/login", credentials);
