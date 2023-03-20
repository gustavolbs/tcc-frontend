import React, { useState } from "react";
import { AppRoutes } from "./routes";
import "./index.css";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />;
};
