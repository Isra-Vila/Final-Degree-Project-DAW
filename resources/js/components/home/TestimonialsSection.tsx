import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-semibold mb-4 text-[#F62364]">¿Qué dicen nuestros clientes?</h2>
      <blockquote className="italic text-lg">
        “Tuve una experiencia increíble alquilando una bicicleta con Tripasión. El servicio fue excelente y las bicicletas estaban en perfectas condiciones. ¡Sin duda, repetiré!”
      </blockquote>
      <p className="mt-4 font-semibold">- Carlos Martínez</p>
    </motion.div>
  );
};

export default TestimonialsSection;
