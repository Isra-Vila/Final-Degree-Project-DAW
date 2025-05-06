import React from 'react';
import { FormFieldProps } from '../../types/form'; // Importa la interfaz
import FormField from '../common/FormField'; // Importa el componente

interface BikeFormProps {
  formData: any;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isEditMode: boolean;
  formError: string | null;
}

const repairStatesOptions = ['reparada', 'en reparacion', 'no reparada'];
const maintenanceStatesOptions = ['mantenimiento finalizado', 'en mantenimiento', 'mantenimiento no terminado'];

const BikeForm: React.FC<BikeFormProps> = ({ formData, onFormChange, isEditMode, formError }) => {
  return (
    <div className="space-y-4">
      {formError && <p className="text-red-600 mb-4 whitespace-pre-wrap">{formError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          label="Marca"
          name="brand"
          value={formData.brand || ''}
          onChange={onFormChange}
          required
        />
        <FormField
          label="Modelo"
          name="model"
          value={formData.model || ''}
          onChange={onFormChange}
          required
        />
        <FormField
          label="Manillar"
          name="handlebar"
          value={formData.handlebar || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Potencia"
          name="stem"
          value={formData.stem || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Sillín"
          name="saddle"
          value={formData.saddle || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Cuadro"
          name="frame"
          value={formData.frame || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Suspensión"
          name="suspension"
          value={formData.suspension || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Pedales"
          name="pedals"
          value={formData.pedals || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Cadena"
          name="chain"
          value={formData.chain || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Neumático"
          name="tyre"
          value={formData.tyre || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Llanta"
          name="rim"
          value={formData.rim || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Cámara"
          name="tube"
          value={formData.tube || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Frenos"
          name="brakes"
          value={formData.brakes || ''}
          onChange={onFormChange}
        />
        <FormField
          label="Año"
          type="number"
          name="year"
          value={formData.year || ''}
          onChange={onFormChange}
        />
        <FormField
          label="ID del Propietario (Cliente)"
          type="number"
          name="owner_id"
          value={formData.owner_id || ''}
          onChange={onFormChange}
        />
        <FormField
          label="ID del Mecánico Asignado"
          type="number"
          name="mechanic_id"
          value={formData.mechanic_id || ''}
          onChange={onFormChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado de Reparación</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="repair_state"
            value={formData.repair_state || ''} // Valor por defecto vacío
            onChange={onFormChange}
          >
            <option value="">Seleccionar estado</option> {/* Opción vacía */}
            {repairStatesOptions.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado de Mantenimiento</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="maintenance_state"
            value={formData.maintenance_state || ''} // Valor por defecto vacío
            onChange={onFormChange}
          >
            <option value="">Seleccionar estado</option> {/* Opción vacía */}
            {maintenanceStatesOptions.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        {/* Puedes añadir más campos utilizando el componente FormField */}
      </div>
    </div>
  );
};

export default BikeForm;