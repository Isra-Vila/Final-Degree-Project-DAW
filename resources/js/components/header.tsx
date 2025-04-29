import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
    const [open, setOpen] = useState(false); // Estado para abrir/cerrar el menú móvil
    const [scrolled, setScrolled] = useState(false); // Estado para detectar si hemos hecho scroll

    // UseEffect para detectar el scroll y activar el cambio de estado
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Cambiar el estado solo cuando el elemento sale de la vista
                if (entry.isIntersecting) {
                    setScrolled(false); // Cuando el logo no está en la vista
                } else {
                    setScrolled(true); // Cuando el logo entra en la vista
                }
            });
        }, { threshold: 0.30 }); // Umbral de visibilidad

        const target = document.querySelector("#intro"); // Asegúrate de que tu "IntroSection" tenga un id "intro"
        if (target) observer.observe(target);

        return () => {
            
            if (target) observer.unobserve(target); // Limpiamos el observador cuando el componente se desmonte
        };
    }, []); // Este useEffect solo se ejecuta una vez cuando el componente se monta

    const linkClasses = ({ isActive }) =>
        `transition-colors duration-300 no-underline-navbar ${
            isActive ? 'text-white border-b-2 border-white pb-1' : 'hover:text-yellow-300'
        }`;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 bg-[#F62364] shadow-md py-4`} // Barra de navegación fija
        >
            <motion.nav 
                className="relative flex items-center justify-between text-white"
            >
                {/* Logo visible solo después del scroll */}
                <div 
                    className={`absolute left-6 top-1/2 -translate-y-1/2 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ transition: 'opacity 0.5s ease' }}
                >
                    <img src="/images/Tripasion_Logo.png" alt="Tripasión" className="w-[3.5rem]" />
                </div>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden absolute right-4 z-50 focus:outline-none"
                    aria-label="Abrir menú"
                >
                    {open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Enlaces de navegación en escritorio */}
                <div
                    className={`hidden md:flex gap-8 font-semibold text-lg transform transition-all duration-500 ${scrolled ? 'ml-auto mr-12 translate-x-4' : 'mx-auto'}`}
                >
                    <NavLink to="/" className={linkClasses}>
                        Inicio
                    </NavLink>
                    <NavLink to="/tienda" className={linkClasses}>
                        Tienda
                    </NavLink>
                    <NavLink to="/taller" className={linkClasses}>
                        Taller
                    </NavLink>
                    <NavLink to="/sobre-nosotros" className={linkClasses}>
                        Sobre Nosotros
                    </NavLink>
                    <NavLink to="/contacto" className={linkClasses}>
                        Contáctanos
                    </NavLink>
                </div>
            </motion.nav>

            {/* Menú móvil */}
            {open && (
                <div className="md:hidden px-6 pb-6 bg-[#F62364] space-y-4 font-semibold text-white text-base">
                    <NavLink to="/" onClick={() => setOpen(false)} className={linkClasses}>
                        Inicio
                    </NavLink>
                    <NavLink to="/tienda" onClick={() => setOpen(false)} className={linkClasses}>
                        Tienda
                    </NavLink>
                    <NavLink to="/taller" onClick={() => setOpen(false)} className={linkClasses}>
                        Taller
                    </NavLink>
                    <NavLink to="/sobre-nosotros" onClick={() => setOpen(false)} className={linkClasses}>
                        Sobre Nosotros
                    </NavLink>
                    <NavLink to="/contacto" onClick={() => setOpen(false)} className={linkClasses}>
                        Contáctanos
                    </NavLink>
                </div>
            )}
        </header>
    );
}
