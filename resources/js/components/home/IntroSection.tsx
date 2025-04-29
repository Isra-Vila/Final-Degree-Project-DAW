import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Animaciones para el logo
  const logoY = useTransform(scrollYProgress, [0, 0.3], ["0%", "60%"]); // Movimiento vertical del logo
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 2]); // Escala del logo (crece)
  const logoOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]); // Desaparece a partir del 25%-40% scroll

  // Animaciones para el texto
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]); // Aparece el texto
  const textScale = useTransform(scrollYProgress, [0.4, 0.6], [2.5, 1]); // El texto baja su escala a normal
  const textY = useTransform(scrollYProgress, [0.4, 0.6], ["20%", "0%"]); // El texto baja un poquito
  const textOpacityOut = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]); // El texto desaparece

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[300vh] w-full overflow-x-hidden bg-black flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Spinner mientras carga */}
      {!logoLoaded && (
        <div className="fixed top-1/2 left-1/2 w-[300px] h-[300px] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Logo animado */}
      <motion.div
        className="fixed top-[15vh] z-40 pointer-events-none" 
        // <--- CAMBIADO: antes era absolute, ahora es fixed para que la imagen se quede fija en pantalla al hacer scroll
        style={{
          y: logoY,       // Movimiento vertical
          scale: logoScale, // Cambio de tamaño
          opacity: logoOpacity, // Fade-out
          display: logoLoaded ? 'block' : 'none' // Ocultar mientras no carga
        }}
      >
        <img
          src="/images/Tripasion_Logo.gif"
          alt="Tripasión - Alquiler de bicicletas"
          className="w-[300px] max-w-[80vw] h-auto object-contain"
          loading="eager"
          onLoad={() => setLogoLoaded(true)}
        />
      </motion.div>

      {/* Texto animado */}
      <div className="relative z-30 flex items-center justify-center w-full pt-[200vh] px-4">
        <motion.h1
          className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-lg max-w-[90vw]"
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY
          }}
        >
          Vive la aventura con Tripasión
        </motion.h1>
      </div>

      {/* Fade final para oscurecer todo */}
      <motion.div
        className="absolute top-0 w-full h-full bg-black pointer-events-none"
        style={{
          opacity: textOpacityOut
        }}
      />
    </motion.div>
  );
};

export default IntroSection;
