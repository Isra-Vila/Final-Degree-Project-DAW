import React, { memo } from 'react';
import { Bike } from '../../types/bike'; // Asegúrate de que la ruta sea correcta

interface BikeListProps {
  bikes: Bike[];
  selectedBikeId: number | null;
  onSelectBike: (bike: Bike) => void;
  onAddBike: () => void;
}

const BikeList: React.FC<BikeListProps> = memo(({ bikes, selectedBikeId, onSelectBike, onAddBike }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#F62364]">
    <h2 className="text-lg font-semibold mb-4 text-gray-800"><svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0-6l-3 3m7 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Tu Garaje</h2>
    {bikes.length === 0 ? (
      <button
        className="w-full bg-[#F62364] text-white py-3 rounded-full hover:bg-[#D91E5B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F62364] shadow-md"
        onClick={onAddBike}
      >
        <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Dar de Alta Nueva Bici
      </button>
    ) : (
      <>
        <ul className="space-y-2">
          {bikes.map(bike => (
            <li
              key={bike.id}
              className={`cursor-pointer rounded-md shadow-sm transition duration-150 ease-in-out ${
                selectedBikeId === bike.id ? 'bg-[#F62364] text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
              }`}
              onClick={() => onSelectBike(bike)}
            >
              <div className="px-4 py-3">
                <h3 className="font-semibold text-md">{bike.brand}</h3>
                <p className="text-sm text-white-500">{bike.model}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="w-full bg-[#F62364] text-white py-3 mt-4 rounded-full hover:bg-[#D91E5B] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F62364] shadow-md"
          onClick={onAddBike}
        >
          <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Añadir Otra Bici
        </button>
      </>
    )}
  </div>
));

export default BikeList;