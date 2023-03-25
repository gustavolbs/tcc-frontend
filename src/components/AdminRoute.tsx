import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

interface AdminRouteProps {
  isAuthenticated: boolean;
  children: any;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  const { user, isAdmin, isLoading } = useUser();

  if (!isAuthenticated || (!isLoading && user && !isAdmin)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
