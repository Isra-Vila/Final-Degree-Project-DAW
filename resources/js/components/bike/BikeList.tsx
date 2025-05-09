import React, { memo } from 'react';
import { Bike } from '../../types/bike'; // Asegúrate de que la ruta sea correcta

interface BikeListProps {
  bikes: Bike[];
  selectedBikeId: number | null;
  onSelectBike: (bike: Bike) => void;
  onAddBike: () => void; // Esta prop sigue siendo necesaria para la interfaz, aunque el botón se oculte
  hideAddBikeButton?: boolean; // Nuevo prop: si es true, oculta el botón de añadir bici
  customBorderColor?: string; // Nuevo prop: para especificar el color del borde
}

const BikeList: React.FC<BikeListProps> = memo(({
  bikes,
  selectedBikeId,
  onSelectBike,
  onAddBike,
  hideAddBikeButton = false, // Valor por defecto: mostrar el botón
  customBorderColor = "border-[#F62364]" // Valor por defecto: el color rosa original
}) => (
  // Usa customBorderColor para el borde
  <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${customBorderColor}`}>
    <h2 className="text-lg font-semibold mb-4 text-gray-800"><svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0-6l-3 3m7 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Tu Garaje</h2>

    {/* Renderiza el botón "Dar de Alta Nueva Bici" solo si no hay bicis Y no está oculto */}
    {bikes.length === 0 && !hideAddBikeButton && (
      <button
        className="w-full bg-[#F62364] text-white py-3 rounded-full hover:bg-[#D91E5B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F62364] shadow-md"
        onClick={onAddBike}
      >
        <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Dar de Alta Nueva Bici
      </button>
    )}

    {/* Si hay bicicletas, muestra la lista */}
    {bikes.length > 0 && (
      <>
        <ul className="space-y-2">
          {bikes.map(bike => (
            <li
              key={bike.id}
              className={`cursor-pointer rounded-md shadow-sm transition duration-150 ease-in-out ${
                selectedBikeId === bike.id ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800' // Cambiado a azul aquí también para la selección
              }`}
              onClick={() => onSelectBike(bike)}
            >
              <div className="px-4 py-3">
                <h3 className="font-semibold text-md">{bike.brand}</h3>
                <p className="text-sm text-gray-300">{bike.model}</p> {/* Cambié el color del texto a gray-300 cuando está seleccionado para que se vea bien en fondo azul */}
              </div>
            </li>
          ))}
        </ul>
        {/* Renderiza el botón "Añadir Otra Bici" solo si no está oculto */}
        {!hideAddBikeButton && (
          <button
            className="w-full bg-[#F62364] text-white py-3 mt-4 rounded-full hover:bg-[#D91E5B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F62364] shadow-md"
            onClick={onAddBike}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Añadir Otra Bici
          </button>
        )}
      </>
    )}

    {/* Si no hay bicis y el botón de añadir está oculto (para mecánicos), mostrar un mensaje alternativo */}
    {bikes.length === 0 && hideAddBikeButton && (
        <p className="text-gray-500 italic text-center py-4">No tienes máquinas asignadas.</p>
    )}
  </div>
));

export default BikeList;