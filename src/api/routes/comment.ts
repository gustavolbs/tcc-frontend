import { AxiosResponse } from "axios";

import { axiosInstance, useFetch } from "../instance";

import { Comment } from "../../interfaces/comment";

export const addComment = (
  issueId: number,
  data: {
    text: string;
    commentId?: number;
  }
): Promise<AxiosResponse<Comment>> =>
  axiosInstance.post<Comment>(`/issue/${issueId}/comment/create`, data);

export const deleteComment = (
  issueId: number,
  commentId: number
): Promise<AxiosResponse> =>
  axiosInstance.delete(`/issue/${issueId}/comment/delete/${commentId}`);

export const getAllCommentsFromIssue = (issueId: number) =>
  useFetch<Comment[]>(issueId ? `/issue/${issueId}/comment/all` : null);
