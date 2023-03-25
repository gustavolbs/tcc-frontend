import { AxiosResponse } from "axios";

import { axiosInstance } from "../instance";

import { User } from "../../interfaces/user";

export const getMe = (): Promise<AxiosResponse<User>> =>
  axiosInstance.get<User>("/users/me");

export const updateRole = (
  email: string,
  role: string
): Promise<AxiosResponse<User>> =>
  axiosInstance.put("/users/role", {
    email,
    role,
  });
