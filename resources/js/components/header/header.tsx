import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartDropdown from './CartDropdown';
import UserDropdown from './UserDropdown';
import MobileNavLinks from './MobileNavLinks';

interface HeaderProps {
    userRole: string | null;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ userRole, isLoggedIn, setIsLoggedIn }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hasCartItems, setHasCartItems] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const cartDropdownRef = useRef<HTMLDivElement | null>(null);
    const userDropdownRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (!isHomePage) {
            setScrolled(true);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setScrolled(!entry.isIntersecting);
            });
        }, { threshold: 0.01 });

        const target = document.querySelector("#intro");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [isHomePage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node) && showCartDropdown) {
                setShowCartDropdown(false);
            }
        };

        if (showCartDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCartDropdown]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node) && showUserDropdown) {
                setShowUserDropdown(false);
            }
        };

        if (showUserDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserDropdown]);

    useEffect(() => {
        setHasCartItems(isLoggedIn);
    }, [isLoggedIn]);

    const linkClasses = useCallback(({ isActive }: { isActive: boolean }) =>
        `transition-colors duration-300 no-underline-navbar ${
            isActive ? 'text-white border-b-2 border-white pb-1' : 'hover:text-yellow-300'
        }`, []
    );

    const toggleCartDropdown = () => {
        if (hasCartItems) {
            setShowCartDropdown(prev => !prev);
            setShowUserDropdown(false);
        }
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(prev => !prev);
        setShowCartDropdown(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setShowUserDropdown(false);
    };

    const closeMobileMenu = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 bg-[#F62364] shadow-md py-6 md:py-4`}
        >
            <motion.nav
                className="relative flex items-center justify-between text-white px-6"
            >
                <div
                    className={`absolute left-6 top-1/2 -translate-y-1/2 transition-opacity duration-500 ${isHomePage ? (scrolled ? 'opacity-100' : 'opacity-0') : 'opacity-100'}`}
                    style={{ transition: 'opacity 0.5s ease' }}
                >
                    <img src="/images/Tripasion_Logo.gif" alt="Tripasión" className="w-[2.5rem] md:w-[3.5rem]" />
                </div>

                {/* Enlaces de navegación en escritorio con Framer Motion */}
                <motion.div
                    className={`hidden md:flex gap-8 font-semibold text-lg`}
                    initial="center"
                    animate={isHomePage ? (scrolled ? "left" : "center") : "left"}
                    variants={{
                        center: { x: 450 },
                        left: { x: 80 },
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <NavLink to="/" className={linkClasses}>
                        Inicio
                    </NavLink>
                    <NavLink to="/shop" className={linkClasses}>
                        Tienda
                    </NavLink>
                    <NavLink to="/workshop" className={linkClasses}>
                        Taller
                    </NavLink>
                    <NavLink to="/about" className={linkClasses}>
                        Sobre Nosotros
                    </NavLink>
                    <NavLink to="/contact" className={linkClasses}>
                        Contáctanos
                    </NavLink>
                </motion.div>

                {/* Iconos de Cesta y Usuario a la derecha */}
                <div className={`relative hidden md:flex items-center gap-6 pr-6 transition-opacity duration-500 ${isHomePage ? (scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none') : 'opacity-100 pointer-events-auto'}`}>
                    <div className="relative" ref={cartDropdownRef}>
                        <button onClick={toggleCartDropdown} className="focus:outline-none" aria-label="Cesta de la compra">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                {...{
                                    fill: 'none',
                                    viewBox: '0 0 24 24',
                                    stroke: 'currentColor',
                                } as React.SVGProps<SVGSVGElement>}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.697.707 1.697H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {hasCartItems && (
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            )}
                        </button>
                        <CartDropdown
                            showCartDropdown={showCartDropdown}
                            cartDropdownRef={cartDropdownRef}
                            hasCartItems={hasCartItems}
                        />
                    </div>

                    <div className="relative" ref={userDropdownRef}>
                        <button onClick={toggleUserDropdown} className="focus:outline-none" aria-label="Menú de usuario">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                {...{
                                    fill: 'none',
                                    viewBox: '0 0 24 24',
                                    stroke: 'currentColor',
                                } as React.SVGProps<SVGSVGElement>}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </button>
                        <UserDropdown
                            showUserDropdown={showUserDropdown}
                            userDropdownRef={userDropdownRef}
                            isLoggedIn={isLoggedIn}
                            userRole={userRole}
                            handleLogout={handleLogout}
                            setShowUserDropdown={setShowUserDropdown}
                        />
                    </div>
                </div>
            </motion.nav>

            {/* Menú móvil usando el nuevo componente */}
            {open && (
                <MobileNavLinks
                    isLoggedIn={isLoggedIn}
                    userRole={userRole}
                    handleLogout={handleLogout}
                    closeMenu={closeMobileMenu}
                />
            )}
        </header>
    );
}