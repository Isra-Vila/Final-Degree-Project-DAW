import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6">Sobre Nosotros</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Tripasión nació del amor por los viajes auténticos y las experiencias únicas. 
        Somos un equipo apasionado que cree en el turismo responsable, el descubrimiento cultural y la conexión humana.
      </p>

      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
        Nuestra misión es ayudarte a encontrar y vivir experiencias que recordarás para toda la vida.
        Ya sea en una tienda local, un taller artesanal o una aventura culinaria, queremos que sientas la esencia de cada lugar que visitas.
      </p>
    </section>
  );
};

export default AboutPage;
