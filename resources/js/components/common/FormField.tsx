import React from 'react';
import { FormFieldProps } from '../../types/form';

const FormField: React.FC<FormFieldProps> = ({ label, type = 'text', name, value, onChange, required, placeholder, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#F62364] focus:ring-[#F62364]' // <-- Revertido a tus colores si los habías cambiado
        } sm:text-sm text-gray-900`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;