import React, { useState } from "react";
import { AppRoutes } from "./routes";
import L from "leaflet";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";

import "./index.scss";
import "leaflet/dist/leaflet.css";

import iconUrl from "./assets/marker-icon.png";
import shadowUrl from "./assets/marker-shadow.png";
import iconRetinaUrl from "./assets/marker-icon-2x.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconRetinaUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const App: React.FC = () => {
  const [isTokenValid, setIsTokenValid] = useState(
    !!localStorage.getItem("myapp-token")
  );

  const handleLogin = (token: string) => {
    localStorage.setItem("myapp-token", token);
    setIsTokenValid(true);
  };

  return (
    <UserProvider isTokenValid={isTokenValid} setIsTokenValid={setIsTokenValid}>
      <CityProvider>
        <Toaster />
        <AppRoutes isAuthenticated={isTokenValid} onLogin={handleLogin} />
      </CityProvider>
    </UserProvider>
  );
};
