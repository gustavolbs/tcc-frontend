import { createCity, getCities, getCity, getCityMembers } from "./routes/city";
import { checkAuth, createUser, login } from "./routes/auth";
import { getMe, updateRole } from "./routes/users";
import {
  addComment,
  deleteComment,
  getAllCommentsFromIssue,
} from "./routes/comment";
import {
  createIssue,
  getIssue,
  getAllIssuesFromCity,
  getAllMyIssues,
  markIssueAsSolved,
  updateIssueAssignees,
} from "./routes/issue";

export const createApiClient = () => {
  const auth = { checkAuth, createUser, login };

  const users = { getMe, updateRole };

  const city = { createCity, getCities, getCity, getCityMembers };

  const issue = {
    createIssue,
    getIssue,
    getAllIssuesFromCity,
    getAllMyIssues,
    markIssueAsSolved,
    updateIssueAssignees,
  };

  const comment = {
    addComment,
    deleteComment,
    getAllCommentsFromIssue,
  };

  return {
    ...auth,
    ...users,
    ...city,
    ...issue,
    ...comment,
  };
};

export const api = createApiClient();
