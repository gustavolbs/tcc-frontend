import { AxiosResponse } from "axios";

import { axiosInstance } from "../instance";

import { City } from "../../interfaces/city";
import { User } from "../../interfaces/user";

export const createCity = (
  data: Omit<City, "id">
): Promise<AxiosResponse<City>> =>
  axiosInstance.post<City>("/city/create", data);

export const getCities = (): Promise<AxiosResponse<City[]>> =>
  axiosInstance.get<City[]>("/city/all");

export const getCity = (id: number): Promise<AxiosResponse<City>> =>
  axiosInstance.get<City>(`/city/${id}`);

export const getCityMembers = (
  cityId: number
): Promise<AxiosResponse<User[]>> =>
  axiosInstance.get<User[]>(`/users/all/${cityId}`);
