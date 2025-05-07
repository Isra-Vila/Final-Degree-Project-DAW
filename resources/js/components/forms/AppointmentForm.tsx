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
      setErrorMechanics("¡No encontramos a los mecánicos!");
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
      const response = await api.post('/client/appointments', formData);
      console.log('Cita creada con éxito:', response.data);
      onSubmitSuccess();
    } catch (error: any) {
      console.error("Error al crear la cita:", error);
      setSubmitError(error?.response?.data?.message || "¡Vaya! Hubo un error al solicitar la cita.");
    } finally {
      setSubmitting(false);
    }
  }, [api, formData, onSubmitSuccess]);

  const renderInputField = useCallback((label: string, id: keyof FormState, type = 'text', options?: { value: string; label: string }[], rows?: number, colSpan?: string) => (
    <div className={`mb-5 ${colSpan}`}>
      <label htmlFor={id} className="block text-gray-800 text-md font-semibold mb-2">{label}:</label>
      {type === 'select' && options ? (
        <select
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          className="bg-white border border-[#F62364] text-gray-900 rounded-md focus:ring-[#F62364] focus:border-[#F62364] block w-full p-3 shadow-sm"
          required
        >
          <option value="" className="text-gray-500">Selecciona una opción</option>
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
          rows={rows || 5}
          className="bg-white border border-[#F62364] text-gray-900 rounded-md focus:ring-[#F62364] focus:border-[#F62364] block w-full p-3 shadow-sm"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          className="bg-white border border-[#F62364] text-gray-900 rounded-md focus:ring-[#F62364] focus:border-[#F62364] block w-full p-3 shadow-sm"
          required
        />
      )}
    </div>
  ), [formData, handleChange]);

  if (loadingMechanics) {
    return <div className="text-lg italic text-gray-700">Buscando a los expertos...</div>;
  }

  if (errorMechanics) {
    return <div className="text-red-600 font-bold">{errorMechanics}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center tracking-wide"><svg className="w-8 h-8 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> ¡Pide tu Servicio!</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {renderInputField("Tu Bicicleta", "bike_id", 'select', [{ value: '', label: 'Elige tu máquina' }, ...bikes.map(bike => ({ value: bike.id, label: `${bike.brand} - ${bike.model}` }))])}
        {renderInputField("¿Quién te atiende?", "mechanic_id", 'select', [{ value: '', label: 'Selecciona al crack' }, ...mechanics.map(mechanic => ({ value: mechanic.id, label: mechanic.name }))])}
        {renderInputField("Tipo de Servicio", "type", 'select', [{ value: '', label: '¿Qué necesita tu bici?' }, { value: 'reparacion', label: 'Reparación' }, { value: 'mantenimiento', label: 'Mantenimiento' }])}
        {renderInputField("Asunto de la Cita", "title")}
        {renderInputField("Fecha y Hora de Inicio", "start_time", 'datetime-local')}
        {renderInputField("Fecha y Hora de Fin", "end_time", 'datetime-local')}
        {renderInputField("Cuéntanos los detalles...", "description", 'textarea', undefined, 5, 'col-span-2')}

        {submitError && <div className="col-span-2 text-red-600 mt-4 text-center font-bold">{submitError}</div>}

        <div className="col-span-2 flex items-center justify-end mt-10">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-gray-300 transition duration-300"
            disabled={submitting}
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-[#F62364] hover:bg-[#D91E5B] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-[#F62364] shadow-md transition duration-300"
            disabled={submitting}
          >
            {submitting ? <svg className="animate-spin h-6 w-6 mr-3 inline-block" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> : '¡Enviar Solicitud!'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;