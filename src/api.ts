import axios, { AxiosInstance, AxiosResponse } from "axios";
import { City } from "./interfaces/city";
import { User } from "./interfaces/user";

export interface ApiClient {
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  getCities: () => Promise<AxiosResponse<City[]>>;
  createUser: (user: User) => Promise<AxiosResponse>;
}

export const createApiClient = (): ApiClient => {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const login = (credentials: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> => api.post("/api/auth/login", credentials);

  const getCities = (): Promise<AxiosResponse<City[]>> =>
    api.get<City[]>("/cities");

  const createUser = (user: User): Promise<AxiosResponse> =>
    api.post("/users", user);

  return {
    login,
    getCities,
    createUser,
  };
};

export const api = createApiClient();
