import React from 'react';
import { FormFieldProps } from '../../types/form'; // Importa la interfaz
import FormField from '../common/FormField'; // Importa el componente

interface UserFormProps {
  formData: any;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isEditMode: boolean;
  formError: string | null;
}

const UserForm: React.FC<UserFormProps> = ({ formData, onFormChange, isEditMode, formError }) => {
  return (
    <div className="space-y-4">
      {formError && <p className="text-red-600 mb-4 whitespace-pre-wrap">{formError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Diseño de grid de 1 columna en pantallas pequeñas y 2 en medianas y grandes */}
        <FormField
          label="Nombre"
          name="name"
          value={formData.name || ''}
          onChange={onFormChange}
          required
        />
        <FormField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={onFormChange}
          required
        />
        <FormField
          label={`Contraseña ${isEditMode ? '(opcional)' : ''}`}
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={onFormChange}
          required={!isEditMode}
          placeholder={isEditMode ? 'Dejar en blanco para no cambiar' : ''}
        />
        <FormField
          label="Confirmar Contraseña"
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation || ''}
          onChange={onFormChange}
          required={!isEditMode}
          placeholder={isEditMode ? 'Dejar en blanco para no cambiar' : ''}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="role"
            value={formData.role || 'client'} // Establecer un valor por defecto si es necesario
            onChange={onFormChange}
          >
            <option value="client">Cliente</option>
            <option value="mechanic">Mecánico</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserForm;