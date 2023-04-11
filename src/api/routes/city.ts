import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { City, FullCity } from "../../interfaces/city";
import { User } from "../../interfaces/user";

export const createCity = (
  data: Omit<City, "id">
): Promise<AxiosResponse<City>> =>
  axiosInstance.post<City>("/city/create", data);

export const getCities = () => useFetch<City[]>("/city/all");

export const getCity = (cityId: number) =>
  useFetch<FullCity>(cityId ? `/city/${cityId}` : null);

export const getCityMembers = (cityId: number) =>
  useFetch<User[]>(cityId ? `/users/all/${cityId}` : null);

export const updateCity = (data: City): Promise<AxiosResponse<City>> =>
  axiosInstance.put<City>("/city/edit", data);

export const deleteCity = (cityId: number): Promise<AxiosResponse> =>
  axiosInstance.delete(`/city/delete/${cityId}`);
