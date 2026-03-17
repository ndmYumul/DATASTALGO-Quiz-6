import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, isSeller }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return <Navigate to="/signin" replace />;
  }

  if (isAdmin && userInfo.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  if (isSeller && userInfo.role !== 'Seller' && userInfo.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;