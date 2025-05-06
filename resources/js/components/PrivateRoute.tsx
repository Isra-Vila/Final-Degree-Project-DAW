import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  requiredRole?: string; // ⭐ Prop opcional para el rol requerido
  loading: boolean; // ⭐ Nueva prop para indicar si la autenticación está cargando
  userRole: string | null; // ⭐ Nueva prop para el rol del usuario
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

  // ⭐ Verificar el rol si se proporciona un requiredRole
  if (requiredRole) {
    if (userRole !== requiredRole) {
      // Redirigir a una página de "acceso denegado" o a la página de inicio
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;