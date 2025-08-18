import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
