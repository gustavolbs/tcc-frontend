import axios, { AxiosInstance, AxiosResponse } from "axios";
import { City } from "./interfaces/city";
import { User } from "./interfaces/user";

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

export const createApiClient = (): ApiClient => {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("myapp-token"),
    },
  });

  const checkAuth = (): Promise<AxiosResponse> => api.get<User>("/auth/check");

  const createCity = (data: Omit<City, "id">): Promise<AxiosResponse<City>> =>
    api.post<City>("/city/create", data);

  const createUser = (user: User): Promise<AxiosResponse> =>
    api.post("/auth/register", user);

  const getCities = (): Promise<AxiosResponse<City[]>> =>
    api.get<City[]>("/city/all");

  const getCity = (id: number): Promise<AxiosResponse<City>> =>
    api.get<City>(`/city/${id}`);

  const getCityMembers = (cityId: number): Promise<AxiosResponse<User[]>> =>
    api.get<User[]>(`/users/all/${cityId}`);

  const getMe = (): Promise<AxiosResponse<User>> =>
    api.get<User>("/users/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("myapp-token"),
      },
    });

  const login = (credentials: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> => api.post("/auth/login", credentials);

  const updateRole = (
    email: string,
    role: string
  ): Promise<AxiosResponse<User>> =>
    api.put("/users/role", {
      email,
      role,
    });

  return {
    checkAuth,
    createCity,
    createUser,
    getCities,
    getCity,
    getCityMembers,
    getMe,
    login,
    updateRole,
  };
};

export const api = createApiClient();
