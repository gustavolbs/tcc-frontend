import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

import { PrivateRoute } from "../components/PrivateRoute";
import { AdminRoute } from "../components/AdminRoute";
import { Sidebar } from "../components/Sidebar";

import { LoginForm } from "../views/LoginForm";
import { RegisterForm } from "../views/RegisterForm";

import { ROUTES } from "./routes";

interface RoutesProps {
  isAuthenticated: boolean;
  onLogin: (token: string) => void;
}

export const AppRoutes: React.FC<RoutesProps> = ({
  isAuthenticated,
  onLogin,
}) => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user && <LoginForm onLogin={onLogin} />}
        />
        <Route
          path="/register"
          element={!user && <RegisterForm onLogin={onLogin} />}
        />
        <Route element={<Sidebar />}>
          {ROUTES.map(({ path, isPrivate, isAdmin, component }) => (
            <Route
              key={path}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    {component}
                  </PrivateRoute>
                ) : isAdmin ? (
                  <AdminRoute isAuthenticated={isAuthenticated}>
                    {component}
                  </AdminRoute>
                ) : (
                  component
                )
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
