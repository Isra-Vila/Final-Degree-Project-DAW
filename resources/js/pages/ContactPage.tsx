import React from 'react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const contactImage = "/images/contacto_ciclismo.jpg"; 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    alert("Mensaje enviado (simulado). Esta funcionalidad está en desarrollo."); 
  };

  return (
    <motion.section
      className="w-full bg-white text-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contactImage})` }} 
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight text-center drop-shadow-lg px-4"
            variants={itemVariants}
          >
            ¿Listo para tu <span className="text-[#F62364]">Próxima Aventura</span>?
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div className="order-2 md:order-1" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-[#F62364] mb-6">Envíanos un Mensaje</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            ¿Preguntas sobre alquiler, servicio técnico o simplemente quieres saludar? Rellena el formulario y te responderemos a la mayor brevedad.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}> 
            <div>
              <label htmlFor="name" className="sr-only">Tu nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F62364] focus:border-transparent transition duration-200 outline-none text-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Tu correo</label>
              <input
                type="email"
                id="email"
                placeholder="Tu correo electrónico"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F62364] focus:border-transparent transition duration-200 outline-none text-lg"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Tu mensaje</label>
              <textarea
                id="message"
                placeholder="Tu mensaje"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F62364] focus:border-transparent transition duration-200 resize-y outline-none text-lg"
              />
            </div>
            <motion.button
              type="submit" 
              className="w-full bg-[#F62364] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-[#d81e56] transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Enviar Mensaje
              
            </motion.button>
          </form>
        </motion.div>
        
        <motion.div className="order-1 md:order-2 bg-gray-50 p-8 rounded-lg shadow-md border-l-4 border-[#F62364] flex flex-col justify-center items-center md:items-start text-center md:text-left h-full" variants={itemVariants}>
          <h3 className="text-3xl font-bold mb-4 text-gray-900">O Contáctanos Directamente</h3>
          <p className="text-lg text-gray-700 mb-6">
            Prefieres hablar con nosotros o visitarnos? Aquí tienes nuestra información de contacto y horarios.
          </p>
          <ul className="space-y-4 text-lg text-gray-800 mb-8 w-full">
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#F62364] mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
              <span>Tripasión Cycling & Adventures</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#F62364] mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM15.5 9c.83 0 1.5-.67 1.5-1.5S16.33 6 15.5 6 14 6.67 14 7.5s.67 1.5 1.5 1.5zM8.5 9c.83 0 1.5-.67 1.5-1.5S9.33 6 8.5 6 7 6.67 7 7.5s.67 1.5 1.5 1.5zm4.5 9.5c-2.48 0-4.5-2.02-4.5-4.5h9c0 2.48-2.02 4.5-4.5 4.5z"/></svg>
              <span>CALLE ALEGRANZA S/N ESQUINA TIMANFAYA, 35510, PUERTO DEL CARMEN, TÍAS</span>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#F62364] mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.12.35.03.75-.24 1.02l-2.2 2.2z"></path></svg>
              <span>+34 123 456 789</span> 
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#F62364] mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
              <span>info@tripasion.com</span> 
            </li>
          </ul>
          <motion.button
            className="w-full bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            Ver en Google Maps
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactPage;