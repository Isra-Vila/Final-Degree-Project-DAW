import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import ClientWorkshopPage from './pages/workshop/ClientWorkshopPage';
import ClientDatePage from './pages/workshop/ClientDatePage';
import MechanicDatePage from './pages/workshop/MechanicDatePage'; // ❗ Importa MechanicDatePage

const BuildBikePlaceholder = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Montar Bicicleta por Piezas</h1>
    <p>Esta página está en construcción.</p>
  </div>
);

const ShopPage = lazy(() => import('./pages/ShopPage'));
const ClientProfilePage = lazy(() => import('./pages/client/ClientProfilePage'));
const ClientBikePage = lazy(() => import('./pages/client/ClientBikePage'));
const MechanicProfilePage = lazy(() => import('./pages/mechanic/MechanicProfilePage'));
// const MechanicDatesPage = lazy(() => import('./pages/mechanic/MechanicDatesPage')); // Ya no es necesario importar aquí directamente
const MechanicDocumentsPage = lazy(() => import('./pages/mechanic/MechanicDocumentsPage'));
const MechanicSchedulePage = lazy(() => import('./pages/mechanic/MechanicSchedulePage'));
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage'));
const BikeManagementPage = lazy(() => import('./pages/admin/BikeManagementPage'));
const StockManagementPage = lazy(() => import('./pages/admin/StockManagementPage'));
const ScheduleManagementPage = lazy(() => import('./pages/admin/ScheduleManagementPage'));
const DocumentManagementPage = lazy(() => import('./pages/admin/DocumentManagementPage'));
const DateManagementPage = lazy(() => import('./pages/admin/DateManagementPage'));

interface AppRoutesProps {
  isAuthenticated: boolean;
  loading: boolean;
  userRole: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated, loading, userRole, setIsAuthenticated, setUserRole, user }) => (
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
            {userRole === 'mechanic' && <Navigate to="/workshop/mechanic/dates" replace />} {/* ❗ Redirige a /workshop/mechanic/dates */}
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
                <Route path="build-bike" element={<BuildBikePlaceholder />} />
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
                {/* Ya no necesitamos una ruta index aquí, la redirección se encarga */}
                <Route path="dates" element={<MechanicDatePage />} /> {/* ❗ MechanicDatePage está aquí */}
              </Routes>
            </Suspense>
          </PrivateRoute>
        }
      />

      {/* Rutas de perfil de cliente */}
      <Route
        path="/client/profile"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando perfil de cliente...</div>}>
              <ClientProfilePage />
            </Suspense>
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

      {/* Rutas de perfil de mecánico */}
      <Route
        path="/mechanic/profile"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando perfil de mecánico...</div>}>
              <MechanicProfilePage />
            </Suspense>
          </PrivateRoute>
        }
      />
      {/* Eliminamos la ruta directa a MechanicWorkshopPage */}
      <Route
        path="/mechanic/documents"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando documentos de mecánico...</div>}>
              <MechanicDocumentsPage />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/mechanic/schedule"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando horario de mecánico...</div>}>
              <MechanicSchedulePage />
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
      <Route
        path="/admin/stock"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando gestión de stock...</div>}>
              <StockManagementPage />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/schedule"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando gestión de horario...</div>}>
              <ScheduleManagementPage />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/documents"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
            <Suspense fallback={<div>Cargando gestión de documentos...</div>}>
              <DocumentManagementPage />
            </Suspense>
          </PrivateRoute>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;