import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Outlet } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  component?: React.ReactElement;
  [key: string]: unknown;
}

const ProtectedRoute = ({ allowedRoles, component, ...rest }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // Redirect if user doesn't have an allowed role
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/signin" replace />;

   // If `component` is provided, clone it and pass `...rest` to it
   if (component) return React.cloneElement(component, { ...rest });

   // Otherwise use <Outlet /> and pass `...rest` to it (if needed)
   return <Outlet context={rest} />;
};

export default ProtectedRoute;
