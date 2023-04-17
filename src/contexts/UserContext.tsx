import React, { createContext, useContext, useEffect, useState } from "react";
import { mutate } from "swr";

import { api } from "../api/client";

import { User } from "../interfaces/user";

interface UserContextData {
  isResident: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isOwner: boolean;
  logout: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

const UserContext = createContext<UserContextData>({
  isResident: false,
  isAdmin: false,
  isLoading: true,
  isOwner: false,
  logout: () => {},
  setCurrentUser: () => {},
  user: null,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps extends React.PropsWithChildren {
  isTokenValid: boolean;
  setIsTokenValid: (value: boolean) => void;
}

export const checkAuthenticated = (isTokenValid: boolean) => {
  const response = api.checkAuth(isTokenValid);
  return response;
};

export const UserProvider: React.FC<UserProviderProps> = ({
  isTokenValid,
  setIsTokenValid,
  children,
}) => {
  const {
    data: authenticated,
    isError: isCheckError,
    isLoading: isCheckLoading,
  } = api.checkAuth(isTokenValid);
  const { data: user, isError, isLoading } = api.getMe(isTokenValid);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const logout = () => {
    localStorage.removeItem("myapp-token");
    setCurrentUser(null);
    setIsTokenValid(false);
    // mutate("/users/me", null); // invalida o cache do hook SWR -> Avaliar porque tinha colocado essa linha
  };

  useEffect(() => {
    if (user && localStorage.getItem("myapp-token")) {
      setCurrentUser(user);
    }
  }, [user]);

  const isResident = currentUser?.role === "resident";
  const isAdmin = currentUser?.role === "admin";
  const isOwner = currentUser?.role === "owner";

  if (isCheckError) {
    logout();
  }

  return (
    <UserContext.Provider
      value={{
        isResident,
        isAdmin,
        isLoading,
        isOwner,
        logout,
        user: currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
