import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomeSection: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6 px-6 py-10" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F62364] leading-tight">
        Desafía tus límites. <br className="hidden sm:inline"/> Vive la adrenalina.
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
        En cada pedalada, en cada ruta. Descubre el equipo premium que te impulsa y el servicio técnico experto que te mantiene en movimiento. Tu pasión por el ciclismo, nuestra dedicación.
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mt-8"> 
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link
            to="/shop" 
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-[#F62364] hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F62364]"
          >
            Explora la Tienda
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link
            to="/workshop" 
            className="inline-flex items-center justify-center px-8 py-4 border border-[#F62364] text-base font-medium rounded-full text-[#F62364] bg-white hover:bg-pink-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F62364]"
          >
            Servicio Técnico
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;