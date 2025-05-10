import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Asumiendo que usas React Router

const AboutPage: React.FC = () => {
  
  const valuesImage = "/images/fondo_principal.gif"; // Imagen de un taller o alguien trabajando con bicis

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Retraso entre la animación de los hijos
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      className="w-full bg-white text-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sección Héroe: Imagen de fondo y título impactante */}
      <div
        className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight text-center drop-shadow-lg px-4"
            variants={itemVariants}
          >
            Nuestra <span className="text-[#F62364]">Pasión</span> <br />
            Tu Trayecto
          </motion.h1>
        </div>
      </div>

      {/* Sección de Introducción/Filosofía */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <motion.p
          className="text-xl md:text-2xl leading-relaxed font-medium text-center mb-10"
          variants={itemVariants}
        >
          En <strong className="text-[#F62364]">Tripasión</strong>, vivimos por y para la bicicleta. Somos ciclistas, deportistas y apasionados por la aventura sobre dos ruedas. Nuestra misión va más allá de alquilar bicicletas; queremos ser tu compañero en cada pedalada, ofreciéndote no solo el mejor equipo, sino una experiencia auténtica.
        </motion.p>
        <motion.p
          className="text-lg md:text-xl leading-relaxed text-center"
          variants={itemVariants}
        >
          Creemos firmemente que el ciclismo es más que un deporte; es una forma de vida, una conexión con la naturaleza y una vía para superar tus propios límites. Por eso, ponemos a tu disposición bicicletas premium y un servicio técnico que garantiza que cada detalle esté perfecto para tu próxima ruta.
        </motion.p>
      </div>

      {/* Sección de Valores/Cómo lo hacemos (con imagen lateral) */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <img
              src={valuesImage}
              alt="Taller de bicicletas y servicio técnico de Tripasión"
              className="w-full h-auto object-cover rounded-lg shadow-xl transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
            />
          </motion.div>
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-[#F62364] mb-6"
              variants={itemVariants}
            >
              Nuestros Pilares: <br className="hidden sm:inline"/> Calidad y Experiencia
            </motion.h3>
            <motion.ul className="text-lg text-gray-700 space-y-4 list-disc list-inside" variants={containerVariants}>
              <motion.li variants={itemVariants}>
                <strong className="text-gray-900">Equipamiento Premium:</strong> Solo trabajamos con bicicletas de alta gama y accesorios de calidad para garantizar tu rendimiento y seguridad.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong className="text-gray-900">Taller Especializado:</strong> Nuestro equipo de mecánicos expertos cuida cada detalle para que tu bicicleta esté siempre a punto.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong className="text-gray-900">Asesoramiento Personalizado:</strong> Te guiamos para que encuentres la bici perfecta y la ruta ideal según tus necesidades.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong className="text-gray-900">Pasión por el Ciclismo:</strong> Como tú, amamos este deporte. Por eso, cada servicio lo ofrecemos con dedicación y entusiasmo.
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Sección de Llamada a la Acción */}
      <div className="bg-[#F62364] py-16 px-6 text-white text-center">
        <motion.div className="max-w-4xl mx-auto" variants={containerVariants}>
          <motion.h3 className="text-3xl md:text-4xl font-bold mb-6" variants={itemVariants}>
            ¡Únete a la Comunidad Tripasión!
          </motion.h3>
          <motion.p className="text-lg md:text-xl mb-8 leading-relaxed" variants={itemVariants}>
            ¿Listo para vivir la experiencia Tripasión? Explora nuestra gama de bicicletas o reserva una visita en nuestro taller.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-6" variants={itemVariants}>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-full shadow-lg text-[#F62364] bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              Explora la Tienda
            </Link>
            <Link
              to="/workshop"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-semibold rounded-full shadow-lg text-white hover:bg-white hover:text-[#F62364] transition-colors duration-300"
            >
              Visita el Taller
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutPage;