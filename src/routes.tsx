import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useUser } from "./contexts/UserContext";

import { AdminRoute } from "./components/AdminRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Sidebar } from "./components/Sidebar";

import { CityMembers } from "./views/City/Members";
import { CreateCity } from "./views/City/Create";
import { HomePage } from "./views/HomePage";
import { LoginForm } from "./views/LoginForm";
import { MyRquests } from "./views/MyRquests";
import { RegisterForm } from "./views/RegisterForm";
import { RegisterIssue } from "./views/Issue/Create";
import { ViewIssue } from "./views/Issue/View";

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
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues/mine"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MyRquests />
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
            path="/issues/create"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RegisterIssue />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues/:issueId"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ViewIssue />
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
