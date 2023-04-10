import * as city from "./routes/city";
import * as auth from "./routes/auth";
import * as users from "./routes/users";
import * as comment from "./routes/comment";
import * as issue from "./routes/issue";

export const createApiClient = () => {
  return {
    ...auth,
    ...users,
    ...city,
    ...issue,
    ...comment,
  };
};

export const api = createApiClient();
