import React from 'react';

export default function MechanicDatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Citas Asignadas</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Calendario de Citas</h2>
        <p>Aquí se mostrará una cuadrícula con los días del mes y las citas asignadas al mecánico. También se indicarán los días libres.</p>
      </div>
    </div>
  );
}