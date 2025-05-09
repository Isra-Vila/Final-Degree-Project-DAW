import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import ClientWorkshopPage from './pages/workshop/ClientWorkshopPage';
import ClientDatePage from './pages/workshop/ClientDatePage';
import MechanicDatePage from './pages/workshop/MechanicDatePage';
import ClientBikeBuildingPage from './pages/client/ClientBikeBuildingPage'; // Importa el nuevo componente

const ShopPage = lazy(() => import('./pages/ShopPage'));
const ClientProfilePage = lazy(() => import('./pages/client/ClientProfilePage'));
const ClientBikePage = lazy(() => import('./pages/client/ClientBikePage'));
const MechanicProfilePage = lazy(() => import('./pages/mechanic/MechanicProfilePage'));
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage'));
const BikeManagementPage = lazy(() => import('./pages/admin/BikeManagementPage'));
const DateManagementPage = lazy(() => import('./pages/admin/DateManagementPage'));

interface AppRoutesProps {
  isAuthenticated: boolean;
  loading: boolean;
  userRole: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated, loading, userRole, setIsAuthenticated, setUserRole, user }) => {
  const navigate = useNavigate();

  // Función para redirigir al perfil del usuario (cliente o mecánico)
    const redirectToProfile = () => {
        if (user && user.id) {
            if (userRole === 'client') {
                navigate(`/client/${user.id}`);
            } else if (userRole === 'mechanic') {
                navigate(`/mechanic/${user.id}`); // Redirige al perfil del mecánico usando su ID
            } else {
                console.error("User role is not defined.");
                navigate('/');
            }
        } else {
            console.error("User object or user ID is missing.");
            navigate('/error');
        }
    };

  // Componente para realizar la redirección
  const RedirectToProfile = () => {
    useEffect(() => {
      redirectToProfile();
    }, []);
    return null;
  };

  return (
    <Suspense fallback={<div>Cargando rutas...</div>}>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
        />
        <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Ruta /workshop: redirige según el rol */}
        <Route
          path="/workshop"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} loading={loading} userRole={userRole}>
              {userRole === 'client' && <Navigate to="/workshop/client" replace />}
              {userRole === 'mechanic' && <Navigate to="/workshop/mechanic/dates" replace />}
              {userRole !== 'client' && userRole !== 'mechanic' && <div>Acceso Denegado</div>}
            </PrivateRoute>
          }
        />

        {/* Rutas del taller para CLIENTES (anidadas bajo /workshop/client) */}
        <Route
          path="/workshop/client/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando sección cliente...</div>}>
                <Routes>
                  <Route index element={<ClientWorkshopPage user={user} />} />
                  <Route path="dates" element={<ClientDatePage />} />
                  <Route path="bike" element={<ClientBikePage />} />
                  <Route path="build-bike" element={<ClientBikeBuildingPage />} /> {/* Usa el nuevo componente */}
                </Routes>
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Rutas del taller para MECÁNICOS (anidadas bajo /workshop/mechanic) */}
        <Route
          path="/workshop/mechanic/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando sección mecánico...</div>}>
                <Routes>
                  <Route path="dates" element={<MechanicDatePage />} />
                </Routes>
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Rutas de perfil */}
        <Route
            path="/client/profile"
            element={
                <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
                    <RedirectToProfile />
                </PrivateRoute>
            }
        />
        <Route
          path="/client/bike"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando bicicleta de cliente...</div>}>
                <ClientBikePage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/client/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando perfil de cliente...</div>}>
                <ClientProfilePage />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/mechanic/:id"  // Cambiado a una ruta dinámica
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando perfil de mecánico...</div>}>
                <MechanicProfilePage user={user} />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas para la administración */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gestión de usuarios...</div>}>
                <UserManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dates"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gestión de citas...</div>}>
                <DateManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bikes"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gestión de bicicletas...</div>}>
                <BikeManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
