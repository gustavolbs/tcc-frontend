import { AxiosResponse } from "axios";

import { City } from "../interfaces/city";
import { User } from "../interfaces/user";

export interface ApiClient {
  checkAuth: () => Promise<AxiosResponse>;
  createCity: (city: Omit<City, "id">) => Promise<AxiosResponse<City>>;
  createUser: (user: User) => Promise<AxiosResponse>;
  getCities: () => Promise<AxiosResponse<City[]>>;
  getCity: (id: number) => Promise<AxiosResponse<City>>;
  getCityMembers: (cityId: number) => Promise<AxiosResponse<User[]>>;
  getMe: () => Promise<AxiosResponse<User>>;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  updateRole: (email: string, role: string) => Promise<AxiosResponse<User>>;
}
