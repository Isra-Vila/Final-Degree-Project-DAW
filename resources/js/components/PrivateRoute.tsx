import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  requiredRole?: string; 
  loading: boolean; 
  userRole: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  requiredRole,
  loading,
  userRole,
}) => {
  const location = useLocation();

  if (loading) {
    return <div>Cargando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (requiredRole) {
    if (userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;