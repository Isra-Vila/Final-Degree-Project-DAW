import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../../types/user';
import ComingSoon from '../../components/common/ComingSoon';

interface MechanicProfilePageProps {
  user: User | null;
}

const MechanicProfilePage: React.FC<MechanicProfilePageProps> = ({ user }) => {
  const [mechanicData, setMechanicData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setMechanicData(user);
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  if (!mechanicData) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex items-center justify-center h-screen"
      >
        <p className="text-lg text-gray-600">Cargando perfil...</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
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
            Ficha de Empleado
          </motion.h1>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg mb-10 border-b-4 border-[#F62364] transform transition-transform duration-300 hover:scale-[1.01]"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-[#F62364]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.24-6-3.19.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.95-3.5-3.19-6-3.19z"
                />
              </svg>
              Mis Datos Personales y de Empleado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Nombre Completo:</span>
                <span className="text-gray-900">{mechanicData.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Correo Electrónico:</span>
                <span className="text-gray-900">{mechanicData.email}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg mb-10 border-b-4 border-[#F62364] transform transition-transform duration-300 hover:scale-[1.01]"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-[#F62364]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 20h4v-2h-4v2zm-4 4h12v-2H6v2zm14-9V9c0-1.1-.9-2-2-2h-4V3c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v4H2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM6 7h4v10H6V7zm8 0h4v10h-4V7z"
                />
              </svg>
              Mis Documentos
            </h2>
            <ComingSoon />
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-[#F62364] transform transition-transform duration-300 hover:scale-[1.01]"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-[#F62364]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-4 4c0-1.33 2.67-2 4-2 1.33 0 4 .67 4 2s-2.67 2-4 2-4-.67-4-2z"
                />
              </svg>
              Mi Horario
            </h2>
            <ComingSoon />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MechanicProfilePage;
