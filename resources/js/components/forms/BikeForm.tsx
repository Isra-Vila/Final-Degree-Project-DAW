import React from 'react';
import { Bike } from '../../types/bike';

interface BikeFormProps {
  formData: Partial<Bike>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCreateBike: () => void;
  onCancel: () => void;
  isEditMode: boolean;
  formError: string | null;
  hideClientMechanicIds?: boolean;
}

const fields = [
  { id: 'brand', label: 'Marca', type: 'text', required: true },
  { id: 'model', label: 'Modelo', type: 'text', required: true },
  { id: 'handlebar', label: 'Manillar', type: 'text' },
  { id: 'stem', label: 'Potencia', type: 'text' },
  { id: 'saddle', label: 'Sillín', type: 'text' },
  { id: 'frame', label: 'Cuadro', type: 'text' },
  { id: 'suspension', label: 'Suspensión', type: 'text' },
  { id: 'pedals', label: 'Pedales', type: 'text' },
  { id: 'chain', label: 'Cadena', type: 'text' },
  { id: 'tyre', label: 'Neumático', type: 'text' },
  { id: 'rim', label: 'Llanta', type: 'text' },
  { id: 'tube', label: 'Cámara', type: 'text' },
  { id: 'brakes', label: 'Frenos', type: 'text' },
  { id: 'year', label: 'Año', type: 'number' },
  { id: 'owner_id', label: 'ID del Propietario (Cliente)', type: 'number' },
  { id: 'mechanic_id', label: 'ID del Mecánico Asignado', type: 'number' },
];

const inputClasses = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#F62364] focus:border-[#D91E5B]';
const labelClasses = 'block text-gray-700 text-sm font-bold mb-2';

const BikeForm: React.FC<BikeFormProps> = ({ formData, onFormChange, isEditMode, formError, onCancel, onCreateBike, hideClientMechanicIds = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        <svg className="w-6 h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0-6l-3 3m7 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {isEditMode ? 'Editar Bicicleta' : 'Dar de Alta Nueva Bicicleta'}
      </h3>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formError && (
          <div className="col-span-2 text-red-500 mb-4">{formError}</div>
        )}

        {fields.map(({ id, label, type, required }) => {
          if (hideClientMechanicIds && (id === 'owner_id' || id === 'mechanic_id')) {
            return null;
          }
          const value = formData[id as keyof Bike] as string | number | undefined; // Type assertion
          return (
            <div key={id}>
              <label htmlFor={id} className={labelClasses}>
                {label}:
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={value || ''}
                onChange={onFormChange}
                className={inputClasses}
                required={required}
              />
            </div>
          );
        })}
      </form>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-gray-300 transition duration-300"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onCreateBike}
          className="bg-[#F62364] hover:bg-[#D91E5B] text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-[#F62364] shadow-md transition duration-300"
        >
          {isEditMode ? 'Guardar Cambios' : 'Crear Bicicleta'}
        </button>
      </div>
    </div>
  );
};

export default BikeForm;