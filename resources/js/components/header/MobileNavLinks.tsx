import React from 'react';
import { NavLink } from 'react-router-dom';

interface MobileNavLinksProps {
  isLoggedIn: boolean;
  userRole: string | null;
  handleLogout: () => void;
  closeMenu: () => void;
}

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `block w-full text-left py-2 transition-colors duration-300 no-underline-navbar ${
    isActive ? 'text-white border-b-2 border-white pb-1' : 'hover:text-yellow-300'
  }`;

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ isLoggedIn, userRole, handleLogout, closeMenu }) => {
  return (
    <div className="md:hidden px-6 pb-6 bg-[#F62364] space-y-4 font-semibold text-white text-base">
      <NavLink to="/" onClick={closeMenu} className={linkClasses}>
        Inicio
      </NavLink>
      <NavLink to="/shop" onClick={closeMenu} className={linkClasses}>
        Tienda
      </NavLink>
      <NavLink to="/workshop" onClick={closeMenu} className={linkClasses}>
        Taller
      </NavLink>
      <NavLink to="/about" onClick={closeMenu} className={linkClasses}>
        Sobre Nosotros
      </NavLink>
      <NavLink to="/contact" onClick={closeMenu} className={linkClasses}>
        Contáctanos
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink to="/login" onClick={closeMenu} className={linkClasses}>
            Iniciar Sesión
          </NavLink>
          <NavLink to="/register" onClick={closeMenu} className={linkClasses}>
            Registrarse
          </NavLink>
        </>
      ) : (
        <>
          {userRole === 'client' && (
            <>
              <NavLink to="/client/profile" onClick={closeMenu} className={linkClasses}>
                Perfil
              </NavLink>
              <NavLink to="/workshop/client/dates" onClick={closeMenu} className={linkClasses}>
                Mis Citas
              </NavLink>
              <NavLink to="/client/bike" onClick={closeMenu} className={linkClasses}>
                Mi Bicicleta
              </NavLink>
            </>
          )}
          {userRole === 'mechanic' && (
            <>
              <NavLink to="/mechanic/profile" onClick={closeMenu} className={linkClasses}>
                Perfil
              </NavLink>
              <NavLink to="/mechanic/dates" onClick={closeMenu} className={linkClasses}>
                Mis Citas
              </NavLink>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <NavLink to="/admin/users" onClick={closeMenu} className={linkClasses}>
                Gestión de Usuarios
              </NavLink>
              <NavLink to="/admin/dates" onClick={closeMenu} className={linkClasses}>
                Gestión de Citas
              </NavLink>
              <NavLink to="/admin/bikes" onClick={closeMenu} className={linkClasses}>
                Gestión de Bicicletas
              </NavLink>
              <NavLink to="/admin/stock" onClick={closeMenu} className={linkClasses}>
                Gestión de Stock
              </NavLink>
              <NavLink to="/admin/schedule" onClick={closeMenu} className={linkClasses}>
                Gestión de Horarios
              </NavLink>
              <NavLink to="/admin/documents" onClick={closeMenu} className={linkClasses}>
                Gestión de Documentos
              </NavLink>
            </>
          )}
          <button onClick={() => { handleLogout(); closeMenu(); }} className={`${linkClasses({ isActive: false })} w-full text-left`}>
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default MobileNavLinks;