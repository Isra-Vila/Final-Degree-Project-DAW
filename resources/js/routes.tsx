import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Ruta corregida
import LoginPage from './pages/LoginPage'; // Ruta corregida
import RegisterPage from './pages/RegisterPage'; // Ruta corregida
import HomePage from './pages/HomePage'; // Ruta corregida
// import ShopPage from './pages/ShopPage'; // Importaci\u00f3n normal
import AboutPage from './pages/AboutPage'; // Ruta corregida
import ContactPage from './pages/ContactPage'; // Ruta corregida

import ClientWorkshopPage from './pages/workshop/ClientWorkshopPage'; // Ruta corregida
// import ClientProfilePage from './pages/client/ClientProfilePage'; // Importaci\u00f3n normal
import ClientDatePage from './pages/workshop/ClientDatePage'; // Ruta corregida
// import ClientBikePage from './pages/client/ClientBikePage'; // Importaci\u00f3n normal

// import MechanicProfilePage from './pages/mechanic/MechanicProfilePage'; // Importaci\u00f3n normal
// import MechanicDatesPage from './pages/mechanic/MechanicDatesPage'; // Importaci\u00f3n normal
import MechanicWorkshopPage from './pages/mechanic/MechanicWorkshopPage'; // Ruta corregida
// import MechanicDocumentsPage from './pages/mechanic/MechanicDocumentsPage'; // Importaci\u00f3n normal
// import MechanicSchedulePage from './pages/mechanic/MechanicSchedulePage'; // Importaci\u00f3n normal

// import UserManagementPage from './pages/admin/UserManagementPage'; // Importaci\u00f3n normal
// import BikeManagementPage from './pages/admin/BikeManagementPage'; // Importaci\u00f3n normal
// import StockManagementPage from './pages/admin/StockManagementPage'; // Importaci\u00f3n normal
// import ScheduleManagementPage from './pages/admin/ScheduleManagementPage'; // Importaci\u00f3n normal
// import DocumentManagementPage from './pages/admin/DocumentManagementPage'; // Importaci\u00f3n normal
// import DateManagementPage from './pages/admin/DateManagementPage'; // Importaci\u00f3n normal

const BuildBikePlaceholder = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Montar Bicicleta por Piezas</h1>
      <p>Esta página está en construcción.</p>
    </div>
  );
};

// Importaciones din\u00e1micas (lazy loading)
const ShopPage = lazy(() => import('./pages/ShopPage')); // Ruta corregida
const ClientProfilePage = lazy(() => import('./pages/client/ClientProfilePage')); // Ruta corregida
const ClientBikePage = lazy(() => import('./pages/client/ClientBikePage')); // Ruta corregida
const MechanicProfilePage = lazy(() => import('./pages/mechanic/MechanicProfilePage')); // Ruta corregida
const MechanicDatesPage = lazy(() => import('./pages/mechanic/MechanicDatesPage')); // Ruta corregida
const MechanicDocumentsPage = lazy(() => import('./pages/mechanic/MechanicDocumentsPage')); // Ruta corregida
const MechanicSchedulePage = lazy(() => import('./pages/mechanic/MechanicSchedulePage')); // Ruta corregida
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage')); // ¡Ahora importaci\u00f3n din\u00e1mica!
const BikeManagementPage = lazy(() => import('./pages/admin/BikeManagementPage')); // Ruta corregida
const StockManagementPage = lazy(() => import('./pages/admin/StockManagementPage')); // Ruta corregida
const ScheduleManagementPage = lazy(() => import('./pages/admin/ScheduleManagementPage')); // Ruta corregida
const DocumentManagementPage = lazy(() => import('./pages/admin/DocumentManagementPage')); // Ruta corregida
const DateManagementPage = lazy(() => import('./pages/admin/DateManagementPage')); // Ruta corregida

interface AppRoutesProps {
  isAuthenticated: boolean;
  loading: boolean;
  userRole: string | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  user: any; // Considera definir un tipo m\u00e1s espec\u00edfico para 'user' si es posible
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated, loading, userRole, setIsAuthenticated, setUserRole, user }) => {
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

        {/* Ruta /workshop: redirige seg\u00fan el rol */}
        <Route
          path="/workshop"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} loading={loading} userRole={userRole}>
              {userRole === 'client' && <Navigate to="/workshop/client" replace />}
              {userRole === 'mechanic' && <Navigate to="/workshop/mechanic" replace />}
              {userRole !== 'client' && userRole !== 'mechanic' && <div>Acceso Denegado</div>}
            </PrivateRoute>
          }
        />

        {/* Rutas del taller para CLIENTES (anidadas bajo /workshop/client) */}
        <Route
          path="/workshop/client/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="client" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando secci&oacute;n cliente...</div>}>
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

        {/* Rutas del taller para MEC\u00c1NICOS (anidadas bajo /workshop/mechanic) */}
        <Route
          path="/workshop/mechanic/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando secci&oacute;n mec&aacute;nico...</div>}>
                <Routes>
                  <Route index element={<MechanicWorkshopPage />} />
                  <Route path="dates" element={<MechanicDatesPage />} />
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

        {/* Rutas de perfil de mec\u00e1nico */}
        <Route
          path="/mechanic/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando perfil de mec&aacute;nico...</div>}>
                <MechanicProfilePage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/mechanic/workshop"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <MechanicWorkshopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mechanic/documents"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando documentos de mec&aacute;nico...</div>}>
                <MechanicDocumentsPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/mechanic/schedule"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="mechanic" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando horario de mec&aacute;nico...</div>}>
                <MechanicSchedulePage />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas para la administraci\u00f3n */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de usuarios...</div>}>
                <UserManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dates"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de citas...</div>}>
                <DateManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bikes"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de bicicletas...</div>}>
                <BikeManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de stock...</div>}>
                <StockManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/schedule"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de horario...</div>}>
                <ScheduleManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin" loading={loading} userRole={userRole}>
              <Suspense fallback={<div>Cargando gesti&oacute;n de documentos...</div>}>
                <DocumentManagementPage />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;