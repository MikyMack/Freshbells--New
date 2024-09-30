// utils/PublicRoutes.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />;
}

export default PublicRoutes;
