import React from 'react';

export default function ClientProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Perfil del Cliente</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Mis Datos</h2>
        <p>Aquí se mostrarán los datos del cliente.</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Historial de Compras (Provisional)</h2>
        <p>Aún no hay compras registradas.</p>
      </div>
    </div>
  );
}