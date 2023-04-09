import React, { useState } from "react";
import { AppRoutes } from "./routes/router";
import L from "leaflet";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./contexts/UserContext";
import { CityProvider } from "./contexts/CityContext";

import "./index.css";
import "./app.scss";
import "leaflet/dist/leaflet.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-modal/styles.css";

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
    <SkeletonTheme borderRadius="0.5rem" duration={3}>
      <UserProvider
        isTokenValid={isTokenValid}
        setIsTokenValid={setIsTokenValid}
      >
        <CityProvider>
          <Toaster
            containerStyle={{
              top: window.innerWidth <= 640 ? 70 : 20,
              zIndex: 99999,
            }}
          />
          <AppRoutes isAuthenticated={isTokenValid} onLogin={handleLogin} />
        </CityProvider>
      </UserProvider>
    </SkeletonTheme>
  );
};
