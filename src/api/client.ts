import { createCity, getCities, getCity, getCityMembers } from "./routes/city";
import { checkAuth, createUser, login } from "./routes/auth";
import { getMe, updateRole } from "./routes/users";
import {
  createIssue,
  getIssue,
  getAllIssuesFromCity,
  getAllMyIssues,
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
    updateIssueAssignees,
  };

  return {
    ...auth,
    ...users,
    ...city,
    ...issue,
  };
};

export const api = createApiClient();
