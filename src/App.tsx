import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes";

import {
  checkAuthenticated,
  UserProvider,
  useUser,
} from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";

import "./index.scss";
import "leaflet/dist/leaflet.css";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("myapp-token")
  );

  const { logout } = useUser();

  useEffect(() => {
    const check = async () => {
      const authenticated = await checkAuthenticated();

      if (authenticated) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    };

    check();
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("myapp-token", token);
    setIsAuthenticated(true);
  };

  return (
    <UserProvider isAuthenticated={isAuthenticated}>
      <CityProvider>
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      </CityProvider>
    </UserProvider>
  );
};
