import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  path: string;
  element: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  path,
  element,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
