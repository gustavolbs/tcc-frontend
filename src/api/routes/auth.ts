import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { User } from "../../interfaces/user";

export const checkAuth = (isTokenValid: boolean) =>
  useFetch<User>(isTokenValid ? "/auth/check" : null);

export const createUser = (user: User): Promise<AxiosResponse> =>
  axiosInstance.post("/auth/register", user);

export const login = (credentials: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => axiosInstance.post("/auth/login", credentials);
