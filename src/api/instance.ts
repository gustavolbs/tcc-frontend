import axios, { AxiosInstance } from "axios";
import { notify } from "../helpers/notify";

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

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorMsg = error.response?.data?.msg;
      const errorMessage = error.response?.data?.message;
      const errorError = error.response?.data?.error;

      const err = errorMsg || errorMessage || errorError || "Erro desconhecido";
      notify("error", err);
      return Promise.reject(error);
    }
  );

  return api;
};

export const axiosInstance = createAxiosInstance();
