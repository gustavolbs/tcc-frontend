import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes/router";
import L from "leaflet";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";
import { ReactSVG } from "react-svg";

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

import logoSVG from "./assets/logo-128.svg";

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
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isTokenValid, setIsTokenValid] = useState(
    !!localStorage.getItem("myapp-token")
  );

  const handleLogin = (token: string) => {
    localStorage.setItem("myapp-token", token);
    setIsTokenValid(true);
  };

  const handleInstallClick = () => {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou a instalação");
      } else {
        console.log("Usuário recusou a instalação");
      }
      setIsInstallable(false);
      setDeferredPrompt(null);
    });
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setIsInstallable(true);
      setDeferredPrompt(e);
    });
    window.addEventListener("appinstalled", () => {
      console.log("App instalado");
    });
  }, []);

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
          {isInstallable && (
            <button
              className="fixed bottom-0 w-full bg-blue-100 p-4 flex items-center justify-center gap-2"
              onClick={handleInstallClick}
            >
              {" "}
              <ReactSVG src={logoSVG} className="installable w-fit" />
              Instale nosso app e tenha uma melhor experiência
            </button>
          )}
          <AppRoutes isAuthenticated={isTokenValid} onLogin={handleLogin} />
        </CityProvider>
      </UserProvider>
    </SkeletonTheme>
  );
};
