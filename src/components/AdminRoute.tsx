import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

interface AdminRouteProps {
  children: any;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
