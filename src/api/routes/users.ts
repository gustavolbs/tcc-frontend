import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { User } from "../../interfaces/user";

export const getMe = (isTokenValid: boolean) =>
  useFetch<User>(isTokenValid ? "/users/me" : null);

export const updateRole = (
  email: string,
  role: string
): Promise<AxiosResponse<User>> =>
  axiosInstance.put("/users/role", {
    email,
    role,
  });
