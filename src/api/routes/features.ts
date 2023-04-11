import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { FeatureFlag } from "../../interfaces/feature-flag";

export const createFeatureFlag = (
  slug: string,
  description: string
): Promise<AxiosResponse<FeatureFlag>> =>
  axiosInstance.post<FeatureFlag>("/features/create", { slug, description });

export const getFeatureFlag = (featureId: number) =>
  useFetch<FeatureFlag>(featureId ? `/features/${featureId}` : null);

export const getAllFeatureFlags = () =>
  useFetch<FeatureFlag[]>("/features/all");

export const updateFeatureFlag = (
  data: FeatureFlag
): Promise<AxiosResponse<FeatureFlag>> =>
  axiosInstance.put(`/features/edit`, data);

export const deleteFeatureFlag = (featureId: number): Promise<AxiosResponse> =>
  axiosInstance.delete(`/features/delete/${featureId}`);
