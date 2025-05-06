import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientBikePage() {
  const hasBike = false; // Simulación de si el cliente tiene una bicicleta registrada

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mi Bicicleta</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {hasBike ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Detalles de tu Bicicleta</h2>
            <p>Aquí se mostrarán los detalles de tu bicicleta registrada, historial de reparaciones, etc.</p>
          </>
        ) : (
          <>
            <p className="mb-4">Aún no tienes ninguna bicicleta registrada.</p>
            {/* ⭐ El enlace ahora apunta a /client/build-bike */}
            <Link to="/client/build-bike" className="text-blue-500 hover:underline">
              ¡Registra tu propia bicicleta o ármala por piezas!
            </Link>
          </>
        )}
      </div>
    </div>
  );
}