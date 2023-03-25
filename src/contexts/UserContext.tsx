import React, { createContext, useContext, useState, useEffect } from "react";

import { api } from "../api";

import { User } from "../interfaces/user";

interface UserContextData {
  isAdmin: boolean;
  isLoading: boolean;
  isOwner: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
}

const UserContext = createContext<UserContextData>({
  isAdmin: false,
  isLoading: true,
  isOwner: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps extends React.PropsWithChildren {
  isTokenValid: boolean;
}

export const checkAuthenticated = async () => {
  try {
    const response = await api.checkAuth();
    return !!response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({
  isTokenValid,
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("myapp-token");
  };

  const isAdmin = user?.role === "admin";
  const isOwner = user?.role === "owner";

  useEffect(() => {
    const fetchUser = async () => {
      const authenticated = await checkAuthenticated();
      if (!authenticated) {
        // redireciona o usuário para a página de login ou exibe uma mensagem de erro
        return;
      }

      try {
        const { data } = await api.getMe();
        login(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoading(false);
      }
    };

    if (isTokenValid) {
      fetchUser();
    } else {
      logout();
    }
  }, [isTokenValid]);

  return (
    <UserContext.Provider
      value={{ isAdmin, isLoading, isOwner, login, logout, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
