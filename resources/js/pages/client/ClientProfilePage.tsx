import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';

const ClientProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (e) {
                console.error("Error al parsear el usuario desde localStorage:", e);
                setError("Error al cargar los datos del perfil.");
            }
        } else {
            setError("No se ha encontrado información del usuario. Por favor, inicia sesión nuevamente.");
        }
        setLoading(false); 
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0 }
    };

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center justify-center h-screen"
                >
                    <p className="text-lg text-gray-600">Cargando perfil...</p>
                </motion.div>
            )}

            {error && (
                <motion.div
                    key="error"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center justify-center h-screen text-red-500"
                >
                    <p className="text-red-500 text-lg">{error}</p>
                </motion.div>
            )}

            {!loading && !error && user && (
                <motion.div
                    key="profile"
                    className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-4 sm:px-6 lg:px-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="max-w-5xl mx-auto">
                        <motion.h1
                            className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#F62364] drop-shadow-md"
                            variants={itemVariants}
                        >
                            Mi Perfil
                        </motion.h1>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-lg mb-10 border-b-4 border-[#F62364] transform transition-transform duration-300 hover:scale-[1.01]"
                            variants={itemVariants}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-[#F62364]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.24-6-3.19.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.95-3.5-3.19-6-3.19z" /></svg>
                                Mis Datos Personales
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600">Nombre Completo:</span>
                                    <span className="text-gray-900">{user.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600">Correo Electrónico:</span>
                                    <span className="text-gray-900">{user.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-600">Rol:</span>
                                    <span className="text-gray-900">
                                        {user.roles && user.roles.length > 0
                                            ? user.roles.map((role: { name: string }) => role.name.charAt(0).toUpperCase() + role.name.slice(1)).join(', ')
                                            : 'Cliente'}
                                    </span>
                                </div>
                            </div>
                            
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-lg mb-10 border-b-4 border-[#F62364] transform transition-transform duration-300 hover:scale-[1.01]"
                            variants={itemVariants}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-[#F62364]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18v2H3V6zm0 4h18v2H3v-2zm0 4h18v2H3v-2zM1 18h22v2H1z" /></svg>
                                Historial de Compras
                            </h2>
                            <div className="text-center py-8">
                                <img
                                    src="/images/engranajes.gif"
                                    alt="Sección en construcción"
                                    className="w-24 h-24 object-contain mx-auto mb-6 opacity-80"
                                />
                                <p className="text-xl text-gray-700 font-semibold mb-4">
                                    ¡Próximamente! Estamos trabajando en esta sección.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    Aquí podrás ver un resumen de todas tus compras, pedidos y el estado de los mismos. ¡Agradecemos tu paciencia!
                                </p>
                                <Link
                                    to="/shop"
                                    className="inline-flex items-center bg-[#F62364] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#d81e56] transition duration-300 font-semibold"
                                >
                                    Explorar la Tienda
                                    <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ClientProfilePage;