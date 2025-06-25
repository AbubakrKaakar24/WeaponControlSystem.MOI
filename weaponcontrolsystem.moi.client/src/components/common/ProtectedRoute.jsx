import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Optional, if you want to decode the token
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  // You can add extra token validation logic here if needed
  const decodedToken = token ? jwtDecode(token) : null;
  console.log("Decoded Token:", decodedToken);
  if (!token || decodedToken.exp * 1000 < Date.now()) {
    // If no token, redirect to login page
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // Clear the token if it is invalid or expired
    return <Navigate to="/login" replace />;
  }
  // If token exists, render the nested routes/components
  return <Outlet />;
};
export default ProtectedRoute;
