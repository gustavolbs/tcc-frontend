import { createCity, getCities, getCity, getCityMembers } from "./routes/city";
import { checkAuth, createUser, login } from "./routes/auth";
import { getMe, updateRole } from "./routes/users";

export const createApiClient = () => {
  const auth = { checkAuth, createUser, login };

  const users = { getMe, updateRole };

  const city = { createCity, getCities, getCity, getCityMembers };

  return {
    ...auth,
    ...users,
    ...city,
  };
};

export const api = createApiClient();
