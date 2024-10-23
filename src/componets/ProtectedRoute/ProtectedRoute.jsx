import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdminLoggedIn, children }) => {
  return isAdminLoggedIn ? children : <Navigate to="/" />; // Redirect to homepage if not logged in
};

export default ProtectedRoute;
