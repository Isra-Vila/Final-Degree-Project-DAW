import React from 'react';
import { Link } from 'react-router-dom';

interface UserDropdownProps {
  showUserDropdown: boolean;
  userDropdownRef: React.RefObject<HTMLDivElement | null>;
  isLoggedIn: boolean;
  userRole: string | null; 
  handleLogout: () => void;
  setShowUserDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDropdown({
  showUserDropdown,
  userDropdownRef,
  isLoggedIn,
  userRole, 
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
          
          <>
            <Link to="/client/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Perfil
            </Link>
            <Link to="/workshop/client/dates" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Mis Citas
            </Link>
            <Link to="/workshop/client/bike" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Mi Bicicleta
            </Link>
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : userRole === 'mechanic' ? (
        
          <>
            <Link to="/mechanic/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Ficha de Empleado
            </Link>
            <Link to="/workshop/mechanic/dates" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLinkClick}>
              Citas
            </Link>
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : userRole === 'admin' ? (
          
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
            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </>
        ) : null 
      ) : (
        
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