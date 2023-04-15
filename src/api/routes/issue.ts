import { AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { Issue, IssueInput } from "../../interfaces/issue";

export const createIssue = (
  data: Omit<IssueInput, "id">
): Promise<AxiosResponse<Issue>> =>
  axiosInstance.post<Issue>("/issue/create", data);

export const getIssue = (issueId: number) =>
  useFetch<Issue>(issueId ? `/issue/${issueId}` : null);

export const getAllIssuesFromCity = (cityId: number, query?: string) =>
  useFetch<Issue[]>(
    cityId ? `/issue/all/${cityId}${query ? `?${query}` : ""}` : null
  );

export const exportAllIssuesFromCity = (
  cityId: number,
  extraConfigs?: AxiosRequestConfig
) => axiosInstance.get(`/issue/all/${cityId}`, extraConfigs);

export const getAllMyIssues = (cityId: number) =>
  useFetch<Issue[]>(cityId ? `/issue/all/${cityId}/mine` : null);

export const updateIssueAssignees = (
  issueId: string,
  field: string,
  userId: number
): Promise<AxiosResponse<Issue>> =>
  axiosInstance.put(`/issue/${issueId}/assign/update`, {
    field,
    userId,
  });

export const markIssueAsSolved = (
  issueId: string
): Promise<AxiosResponse<Issue>> =>
  axiosInstance.put(`/issue/${issueId}/solve`, {
    issueId,
  });
