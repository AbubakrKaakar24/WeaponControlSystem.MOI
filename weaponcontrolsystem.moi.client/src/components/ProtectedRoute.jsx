import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // You can add extra token validation logic here if needed

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the nested routes/components
  return <Outlet />;
};

export default ProtectedRoute;
