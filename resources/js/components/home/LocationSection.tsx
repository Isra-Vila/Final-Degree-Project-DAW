import React from 'react';
import { motion } from 'framer-motion';

const LocationSection: React.FC = () => {
  
  const googleMapsEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d361.97603984138885!2d-13.667265251798737!3d28.920864040622337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc462596eebae857%3A0xb6327fe6861772d6!2sTripasion!5e0!3m2!1ses!2slu!4v1746812368950!5m2!1ses!2slu";

  return (
    <motion.div
      
      className="w-full mx-auto py-16 flex flex-col items-center overflow-hidden bg-white sm:px-6 lg:px-8" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-12 text-[#F62364]">
        ¡Tu próximo punto de partida!
      </h2>

      
      <div
        className="relative w-full max-w-5xl h-[400px] sm:h-[480px] md:h-[550px] lg:h-[650px] mx-auto shadow-2xl rounded-xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-[1.02] border-2 border-gray-200" 
      >
        <iframe
          title="Tripasión Location"
          src={googleMapsEmbedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full filter grayscale-0 hover:grayscale-0 transition-all duration-500 ease-in-out" 
        ></iframe>
      </div>

      <p className="text-center text-xl lg:text-2xl text-gray-700 mt-12 font-semibold px-4 leading-relaxed">
        CALLE ALEGRANZA S/N ESQUINA TIMANFAYA<br/>
        35510, PUERTO DEL CARMEN, TÍAS
      </p>
      
      <div className="mt-8 flex justify-center w-full">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <a
            href="https://maps.app.goo.gl/5mL8L1sh1QW6DWei9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            Abrir en Google Maps
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationSection;