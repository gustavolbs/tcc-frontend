import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { City } from "../../interfaces/city";
import { User } from "../../interfaces/user";

export const createCity = (
  data: Omit<City, "id">
): Promise<AxiosResponse<City>> =>
  axiosInstance.post<City>("/city/create", data);

export const getCities = () => useFetch<City[]>("/city/all");

export const getCity = (id: number) =>
  useFetch<City>(id ? `/city/${id}` : null);

export const getCityMembers = (cityId: number) =>
  useFetch<User[]>(cityId ? `/users/all/${cityId}` : null);
