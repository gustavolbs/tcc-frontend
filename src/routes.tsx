import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { HomePage } from "./views/HomePage";
import { LoginForm } from "./views/LoginForm";
import { RegisterForm } from "./views/RegisterForm";

interface RoutesProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
}

export const AppRoutes: React.FC<RoutesProps> = ({
  isAuthenticated,
  onLogin,
}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
        <Route path="/register" element={<RegisterForm onLogin={onLogin} />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
