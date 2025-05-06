import React from 'react';
import { Link } from 'react-router-dom';

interface UserDropdownProps {
  showUserDropdown: boolean;
  userDropdownRef: React.RefObject<HTMLDivElement | null>;
  isLoggedIn: boolean;
  userRole: string | null; // ⭐ Prop para el rol del usuario
  handleLogout: () => void;
  setShowUserDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDropdown({
  showUserDropdown,
  userDropdownRef,
  isLoggedIn,
  userRole, // Usa el prop
  handleLogout,
  setShowUserDropdown,
}: UserDropdownProps) {
  if (!showUserDropdown) return null;

  const handleLinkClick = () => {
    setShowUserDropdown(false);
  };

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800"
      ref={userDropdownRef}
    >
      {isLoggedIn ? (
        userRole === 'client' ? (
          // Opciones para el usuario cliente
          <>
            <Link to="/client/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Perfil
            </Link>
            <Link to="/client/dates" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Mis Citas
            </Link>
            <Link to="/client/bike" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Mi Bicicleta
            </Link>
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : userRole === 'mechanic' ? (
          // Opciones para el usuario mecánico
          <>
            <Link to="/mechanic/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Ficha de Empleado
            </Link>
            <Link to="/mechanic/dates" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Citas
            </Link>
            <Link to="/mechanic/workshop" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Taller
            </Link>
            <Link to="/mechanic/documents" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Documentos
            </Link>
            <Link to="/mechanic/schedule" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Horario
            </Link>
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : userRole === 'admin' ? (
          // Opciones para el administrador
          <>
            <Link to="/admin/users" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Usuarios
            </Link>
            <Link to="/admin/dates" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Citas
            </Link>
            <Link to="/admin/bikes" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Bicicletas
            </Link>
            <Link to="/admin/stock" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Stock
            </Link>
            <Link to="/admin/schedule" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Horarios
            </Link>
            <Link to="/admin/documents" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Gestión de Documentos
            </Link>
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : null // ⭐ No renderizar nada si el rol no es ninguno de los especificados y está loggeado
      ) : (
        // Opciones cuando no está loggeado
        <>
          <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
            Iniciar Sesión
          </Link>
          <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
}