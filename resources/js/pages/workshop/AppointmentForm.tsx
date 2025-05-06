import React, { useState, useEffect, useCallback } from 'react';

interface AppointmentFormProps {
  bikes: any[];
  api: any;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

interface FormState {
  bike_id: string;
  mechanic_id: string;
  type: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
}

const initialFormState: FormState = {
  bike_id: '',
  mechanic_id: '',
  type: '',
  title: '',
  description: '',
  start_time: '',
  end_time: '',
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ bikes, api, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [loadingMechanics, setLoadingMechanics] = useState<boolean>(true);
  const [errorMechanics, setErrorMechanics] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchMechanics = useCallback(async () => {
    try {
      setLoadingMechanics(true);
      const response = await api.get('/mechanics');
      setMechanics(response.data);
      setErrorMechanics(null);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      setErrorMechanics("Hubo un error al cargar la lista de mecánicos.");
    } finally {
      setLoadingMechanics(false);
    }
  }, [api]);

  useEffect(() => {
    fetchMechanics();
  }, [fetchMechanics]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post('/client/appointments', formData); // ⭐ Asignamos la respuesta a la variable 'response'
      console.log('Cita creada con éxito:', response.data);
      onSubmitSuccess();
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      setSubmitError(error?.response?.data?.message || "Hubo un error al solicitar la cita.");
    } finally {
      setSubmitting(false);
    }
  }, [api, formData, onSubmitSuccess]);

  const renderInputField = useCallback((label: string, id: keyof FormState, type = 'text', options?: { value: string; label: string }[], rows?: number) => (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">{label}:</label>
      {type === 'select' && options ? (
        <select
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
          required
        >
          <option value="">Selecciona una opción</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          rows={rows || 3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
          required
        />
      )}
    </div>
  ), [formData, handleChange]);

  if (loadingMechanics) {
    return <div>Cargando mecánicos disponibles...</div>;
  }

  if (errorMechanics) {
    return <div className="text-red-600">Error al cargar los mecánicos: {errorMechanics}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Solicitar Nueva Cita</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderInputField("Bicicleta", "bike_id", 'select', [{ value: '', label: 'Selecciona una bicicleta' }, ...bikes.map(bike => ({ value: bike.id, label: `${bike.brand} - ${bike.model}` }))])}
        {renderInputField("Mecánico", "mechanic_id", 'select', [{ value: '', label: 'Selecciona un mecánico' }, ...mechanics.map(mechanic => ({ value: mechanic.id, label: mechanic.name }))])}
        {renderInputField("Tipo de Cita", "type", 'select', [{ value: '', label: 'Selecciona el tipo' }, { value: 'reparacion', label: 'Reparación' }, { value: 'mantenimiento', label: 'Mantenimiento' }])}
        {renderInputField("Título", "title")}
        {renderInputField("Descripción (Opcional)", "description", 'textarea')}
        {renderInputField("Fecha y Hora de Inicio", "start_time", 'datetime-local')}
        {renderInputField("Fecha y Hora de Fin", "end_time", 'datetime-local')}

        {submitError && <div className="text-red-600 mt-4 text-center">{submitError}</div>}

        <div className="flex items-center justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition mr-2"
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            disabled={submitting}
          >
            {submitting ? 'Solicitando...' : 'Solicitar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;