import React from 'react';
import { motion } from 'framer-motion';

const LocationSection: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center space-y-6 px-4 py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-semibold text-[#F62364]">¡Ven a visitarnos!</h2>
      <div className="w-full max-w-4xl h-96">
        <iframe
          title="Tripasión Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.878779048561!2d-13.663657924679422!3d28.92293447482624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc464d2109c7932d%3A0xf7ecf31d2c68071c!2sPuerto%20del%20Carmen%2C%2035510%20T%C3%ADas%2C%20Las%20Palmas!5e0!3m2!1ses!2ses!4v1684134567981!5m2!1ses!2ses"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="text-center text-lg">
        CALLE ALEGRANZA S/N ESQUINA TIMANFAYA<br/>
        35510, PUERTO DEL CARMEN, TÍAS
      </p>
    </motion.div>
  );
};

export default LocationSection;
