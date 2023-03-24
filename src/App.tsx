import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes";
import L from "leaflet";

import {
  checkAuthenticated,
  UserProvider,
  useUser,
} from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";

import "./index.scss";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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
