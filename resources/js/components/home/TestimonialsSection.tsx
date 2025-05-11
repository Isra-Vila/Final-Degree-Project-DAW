import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
  return (
    <motion.div
      
      className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 py-6" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold mb-4 text-[#F62364] leading-tight"> 
        La voz de nuestros ciclistas
      </h2>
      <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed italic mb-4">
        “Tuve una experiencia increíble alquilando una bicicleta con Tripasión. El servicio fue excelente y las bicicletas estaban en perfectas condiciones. ¡Sin duda, repetiré!”
      </blockquote>
      <p className="mt-2 font-semibold text-gray-700 text-base">
        - Carlos Martínez, Ciclista Urbano
      </p>
    </motion.div>
  );
};

export default TestimonialsSection;