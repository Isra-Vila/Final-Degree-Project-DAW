import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Animaciones para el logo (NO TOCADAS)
  const logoY = useTransform(scrollYProgress, [0, 0.3], ["0%", "60%"]); // Movimiento vertical del logo
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 2]); // Escala del logo (crece)
  const logoOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]); // Desaparece a partir del 25%-40% scroll

  // Animaciones para el texto (NO TOCADAS)
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]); // Aparece el texto
  const textScale = useTransform(scrollYProgress, [0.4, 0.6], [2.5, 1]); // El texto baja su escala a normal
  const textY = useTransform(scrollYProgress, [0.4, 0.6], ["20%", "0%"]); // El texto baja un poquito
  // textOpacityOut AHORA TAMBIÉN CONTROLA LA OPACIDAD DE LA IMAGEN DE FONDO/FADE FINAL
  const textOpacityOut = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]); // El texto desaparece

  return (
    <motion.div
      ref={ref}
      // Eliminamos el bg-black de aquí. El fondo ahora se manejará en el "Fade final".
      className="relative min-h-[300vh] w-full overflow-x-hidden flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Spinner mientras carga (NO TOCADO) */}
      {!logoLoaded && (
        <div className="fixed top-1/2 left-1/2 w-[300px] h-[300px] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Logo animado (NO TOCADO) */}
      <motion.div
        className="fixed top-[15vh] z-40 pointer-events-none"
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

      {/* Texto animado (NO TOCADO) */}
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

      {/* Fade final / IMAGEN DE FONDO AQUI */}
      <motion.div
        // Mantenemos 'absolute' para que siga la sección (no 'fixed' a la ventana)
        // Ajustamos el z-index para que la imagen de fondo esté detrás de todo lo demás
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10" // -z-10 para que esté muy al fondo
        style={{
          // Propiedades de fondo para la imagen
          backgroundImage: 'url("/images/fondo_principal.gif")',
          backgroundSize: 'cover',      // La imagen cubre todo el contenedor
          backgroundPosition: 'center', // Centra la imagen
          backgroundAttachment: 'scroll', // La imagen se desplaza con el contenido
          filter: 'blur(4px)',          // Aplica el difuminado. Ajusta el valor según necesites.

          // La opacidad final de este div será controlada por textOpacityOut
          // Esto creará el efecto de "oscurecer todo" al final, aplicando una capa negra
          // sobre la imagen de fondo a medida que la opacidad se reduce de 1 a 0.
          // NOTA: La opacidad del filtro y la opacidad del div se combinan.
          opacity: textOpacityOut,
        }}
      />

      {/* Opcional: Una capa de oscurecimiento adicional si la imagen es muy clara
          y necesitas más contraste para el texto antes de que textOpacityOut haga su efecto.
          Asegúrate de que esté por encima del fondo pero por debajo del logo/texto.
          Usa un z-index entre -10 y el resto de elementos (que tienen z-index 30, 40, 50).
          Si no lo necesitas, simplemente bórralo. */}
      <div
        className="absolute inset-0 w-full h-full bg-black opacity-30 -z-10"
      ></div>
    </motion.div>
  );
};

export default IntroSection;