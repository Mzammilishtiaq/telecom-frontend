import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { IsAuthenticated } from "./authservice";
import { StorageI } from "./interface";

interface AuthGuideProps {
  protectedPath: boolean;
  children: React.ReactNode;
  role?: string;
}

const AuthGuide: React.FC<AuthGuideProps> = ({ protectedPath, children, role }) => {
  const location = useLocation();
  const isAuthenticated: StorageI | null = IsAuthenticated();
  const redirectUrl = `/?redirectUrl=${location.pathname}`;

  const hasRequiredRole = role ? isAuthenticated?.role === role : true;

  // Check for redirectUrl on the home page after authentication
  if (isAuthenticated && location.pathname === '/') {
    const params = new URLSearchParams(location.search);
    const storedRedirectUrl = params.get('redirectUrl');
    if (storedRedirectUrl && storedRedirectUrl !== location.pathname) {
      // Navigate to the stored redirect URL and replace the history entry
      return <Navigate to={storedRedirectUrl} replace />;
    }
  }

  if (protectedPath && (!isAuthenticated || !hasRequiredRole)) {
    return <Navigate to={redirectUrl} replace />;
  }

  return <>{children}</>;
};

export default AuthGuide;
