import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = () => {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("myapp-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  return api;
};

export const axiosInstance = createAxiosInstance();
