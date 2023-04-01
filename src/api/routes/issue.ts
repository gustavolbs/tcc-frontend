import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { Issue, IssueInput } from "../../interfaces/issue";

export const createIssue = (
  data: Omit<IssueInput, "id">
): Promise<AxiosResponse<Issue>> =>
  axiosInstance.post<Issue>("/issue/create", data);

export const getIssue = (issueId: number) =>
  useFetch<Issue>(issueId ? `/issue/${issueId}` : null);

export const getAllIssuesFromCity = (cityId: number) =>
  useFetch<Issue[]>(cityId ? `/issue/all/${cityId}` : null);

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
