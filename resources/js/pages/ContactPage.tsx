import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6">Contáctanos</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        ¿Tienes preguntas o sugerencias? ¡Nos encantaría escucharte! Rellena el siguiente formulario o escríbenos directamente.
      </p>

      <form className="space-y-4 max-w-xl">
        <input type="text" placeholder="Tu nombre" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Tu correo" className="w-full border p-2 rounded" />
        <textarea placeholder="Tu mensaje" rows={5} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-[#F62364] text-white px-6 py-2 rounded hover:bg-[#d81e56] transition">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
