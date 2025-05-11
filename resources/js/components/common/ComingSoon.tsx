// resources/js/components/common/ComingSoon.tsx

import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon: React.FC = () => {
  const imageUrl = "/images/engranajes.gif"; 

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-xl border-b-4 border-[#F62364]">
        <h1 className="text-5xl font-extrabold mb-6 text-[#F62364]">
          ¡Página en Construcción!
        </h1>
        <p className="text-2xl text-gray-800 leading-relaxed mb-8">
          Estamos trabajando para traerte esta sección lo antes posible.
        </p>
        
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Disculpa las molestias. Estamos esforzándonos para que la espera valga la pena.
        </p>
        
        <div className="mt-12 flex justify-center">
          <img
            src={imageUrl}
            alt="Engranajes de construcción"
            className="w-32 h-32 object-contain"
          />
        </div>

        <a href="/" className="mt-12 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300">
          Volver a Inicio
        </a> 
      </div>
    </motion.section>
  );
};

export default ComingSoon;