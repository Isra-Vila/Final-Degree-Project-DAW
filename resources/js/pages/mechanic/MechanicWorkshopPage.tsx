import React from 'react';

export default function MechanicWorkshopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Panel de Taller (Mecánico)</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Bicicletas Asignadas</h2>
        <p>Lista de bicicletas asignadas al mecánico, con la posibilidad de ver y actualizar su estado.</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Stock de Piezas</h2>
        <p>Consulta el stock de piezas disponibles en el almacén.</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Pedidos de Bicicletas por Piezas</h2>
        <p>Gestión de pedidos de bicicletas montadas por piezas hechas por los clientes.</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Chat con Clientes</h2>
        <p>Pequeño chat para comunicarse con los clientes.</p>
      </div>
    </div>
  );
}