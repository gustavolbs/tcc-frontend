import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUser } from "./contexts/UserContext";

import { AdminRoute } from "./components/AdminRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Sidebar } from "./components/Sidebar";

import { CityMembers } from "./views/City/Members";
import { CreateCity } from "./views/City/Create";
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
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <LoginForm onLogin={onLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !user ? (
              <RegisterForm onLogin={onLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route element={<Sidebar />}>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/city/members"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CityMembers />
              </PrivateRoute>
            }
          />
          <Route
            path="/city/create"
            element={
              <AdminRoute isAuthenticated={isAuthenticated}>
                <CreateCity />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
