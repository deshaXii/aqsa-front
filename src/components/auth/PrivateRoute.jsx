import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

const PrivateRoute = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute state:", { isAuthenticated, isLoading, user });

  if (isLoading) {
    console.log("Loading user data...");
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required permissions
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some(
      (permission) => user[permission]
    );

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
