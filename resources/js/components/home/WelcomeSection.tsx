import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomeSection: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 px-4 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-semibold text-[#F62364] mb-4">¡Bienvenido a Tripasión!</h2>
      <p className="text-lg">
        En Tripasión, tu próxima aventura sobre ruedas empieza aquí. Alquiler de bicicletas premium, accesorios de alta calidad y un taller especializado que cuida cada detalle. ¡Explora, pedalea y siente la pasión por el ciclismo con nosotros!
      </p>

      <div className="flex space-x-6 mt-6">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link to="/tienda" className="text-[#F62364] underline hover:text-pink-400 transition-colors duration-300">
            Visita la Tienda
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link to="/taller" className="text-[#F62364] underline hover:text-pink-400 transition-colors duration-300">
            Reserva en el Taller
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
