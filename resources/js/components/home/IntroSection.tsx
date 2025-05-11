import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IntroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const logoY = useTransform(scrollYProgress, [0, 0.3], ["0%", "60%"]); 
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 2]); 
  const logoOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]); 

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]); 
  const textScale = useTransform(scrollYProgress, [0.4, 0.6], [2.5, 1]); 
  const textY = useTransform(scrollYProgress, [0.4, 0.6], ["20%", "0%"]); 
  const textOpacityOut = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]); 

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[300vh] w-full overflow-x-hidden flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      
      {!logoLoaded && (
        <div className="fixed top-1/2 left-1/2 w-[300px] h-[300px] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      
      <motion.div
        className="fixed top-[15vh] z-40 pointer-events-none"
        style={{
          y: logoY,      
          scale: logoScale, 
          opacity: logoOpacity, 
          display: logoLoaded ? 'block' : 'none' 
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

      
      <motion.div
        
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10" 
        style={{
          
          backgroundImage: 'url("/images/fondo_principal.gif")',
          backgroundSize: 'cover',      
          backgroundPosition: 'center', 
          backgroundAttachment: 'scroll', 
          filter: 'blur(4px)',          

          opacity: textOpacityOut,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full bg-black opacity-30 -z-10"
      ></div>
    </motion.div>
  );
};

export default IntroSection;