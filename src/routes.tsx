import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { HomePage } from "./components/HomePage";

interface RoutesProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
}

export const AppRoutes: React.FC<RoutesProps> = ({
  isAuthenticated,
  onLogin,
}) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
        <Route path="/register" element={<RegisterForm onLogin={onLogin} />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              path="/"
              isAuthenticated={isAuthenticated}
              element={<HomePage />}
            />
          }
        />
      </Routes>
    </Router>
  );
};
