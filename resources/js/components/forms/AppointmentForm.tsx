import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');

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
}

const initialFormState: FormState = {
  bike_id: '',
  mechanic_id: '',
  type: '',
  title: '',
  description: '',
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ bikes, api, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [loadingMechanics, setLoadingMechanics] = useState<boolean>(true);
  const [errorMechanics, setErrorMechanics] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

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

  const loadMechanicAvailability = useCallback(async (mechanicId: string) => {
    setLoadingAvailability(true);
    setAvailabilityError(null);
    try {
      const response = await api.get(`/mechanics/${mechanicId}/unavailable-dates?from=${moment().format('YYYY-MM-DD')}`);
      
      const datesArray: string[] = Array.isArray(response.data) ? response.data.map((date: any) => String(date)) : [];
      const datesSet = new Set<string>(datesArray.map((dateString: string) => moment(dateString).format('YYYY-MM-DD')));
      setUnavailableDates(datesSet);
    } catch (error) {
      console.error("Error al cargar la disponibilidad del mecánico:", error);
      setAvailabilityError("No se pudo cargar la disponibilidad de este mecánico.");
      setUnavailableDates(new Set<string>()); 
    } finally {
      setLoadingAvailability(false);
    }
  }, [api]);

  useEffect(() => {
    fetchMechanics();
  }, [fetchMechanics]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

    if (name === 'mechanic_id' && value) {
      loadMechanicAvailability(value);
      setSelectedDate(null); 
      setSubmitError(null); 
    }
  }, [loadMechanicAvailability]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    if (!formData.bike_id || !formData.mechanic_id || !selectedDate || !formData.type) {
      setSubmitError("Por favor, selecciona tu bicicleta, un mecánico, una fecha y el tipo de servicio.");
      setSubmitting(false);
      return;
    }

    const selectedDateMoment = moment(selectedDate);
    const todayStartOfDay = moment().startOf('day'); 

    const isPastDate = selectedDateMoment.isBefore(todayStartOfDay);
    const isUnavailable = unavailableDates.has(selectedDateMoment.format('YYYY-MM-DD'));

    if (isPastDate || isUnavailable) {
      setSubmitError("La fecha seleccionada no es válida (es pasada o no disponible).");
      setSubmitting(false);
      return;
    }

    const startTime = moment(selectedDate).toISOString();
    const endTime = moment(selectedDate).add(1, 'hour').toISOString(); 

    const appointmentData = {
      client_id: 1, 
      mechanic_id: formData.mechanic_id,
      bike_id: formData.bike_id,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      start_time: startTime,
      end_time: endTime, 
      status: 'pendiente',
    };

    try {
      const response = await api.post('/client/appointments', appointmentData);
      console.log('Cita creada con éxito:', response.data);
      onSubmitSuccess();
      setFormData(initialFormState);
      setSelectedDate(null);
      setSubmitError(null); 
    } catch (error: any) {
      console.error("Error al crear la cita:", error);
      if (error.response && error.response.status === 422 && error.response.data.errors) {
        const validationMessages = Object.values(error.response.data.errors).flat().join(', ');
        setSubmitError(`Error de validación: ${validationMessages}`);
      } else {
        setSubmitError(error.response?.data?.message || "¡Vaya! Hubo un error al solicitar la cita.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [api, formData, onSubmitSuccess, selectedDate, unavailableDates]);

  const renderInputField = useCallback((label: string, id: keyof FormState, type = 'text', options?: { value: string; label: string }[], rows?: number, colSpan?: string, defaultOptionLabel?: string) => (
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
          {defaultOptionLabel && <option value="" disabled hidden>{defaultOptionLabel}</option>}
          
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

  const todayStartOfDay = moment().startOf('day'); 

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center tracking-wide"><svg className="w-8 h-8 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> ¡Pide tu Servicio!</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {renderInputField("Tu Bicicleta", "bike_id", 'select', bikes.map(bike => ({ value: bike.id, label: `${bike.brand} - ${bike.model}` })), undefined, undefined, 'Elige tu máquina')}
        {renderInputField("¿Quién te atiende?", "mechanic_id", 'select', mechanics.map(mechanic => ({ value: mechanic.id, label: mechanic.name })), undefined, undefined, 'Selecciona al crack')}
        {renderInputField("Tipo de Servicio", "type", 'select', [{ value: 'reparacion', label: 'Reparación' }, { value: 'mantenimiento', label: 'Mantenimiento' }], undefined, undefined, '¿Qué necesita tu bici?')}
        {renderInputField("Trabajito a realizar", "title")}
        {renderInputField("Cuéntanos los detalles...", "description", 'textarea', undefined, 5, 'col-span-2')}

        {formData.mechanic_id && loadingAvailability && <p className="text-sm italic text-gray-600">Cargando disponibilidad...</p>}
        {formData.mechanic_id && availabilityError && <p className="text-red-500 text-sm">{availabilityError}</p>}

        {formData.mechanic_id && (
          <div className="mb-5 col-span-2">
            <label className="block text-gray-800 text-md font-semibold mb-2">Selecciona una fecha disponible:</label>
            <div style={{ height: 300 }}>
              <Calendar
                localizer={momentLocalizer(moment)}
                date={selectedDate || new Date()} 
                onNavigate={(newDate) => setSelectedDate(newDate)}
                views={['month']}
                selectable
                onSelectSlot={(slotInfo) => {
                  const selectedMoment = moment(slotInfo.start);
                  const isPastDate = selectedMoment.isBefore(todayStartOfDay, 'day'); 
                  const isUnavailable = unavailableDates.has(selectedMoment.format('YYYY-MM-DD'));
                  
                  if (!isPastDate && !isUnavailable) {
                    setSelectedDate(slotInfo.start);
                    setSubmitError(null); 
                  } else {
                    setSelectedDate(null); 
                    setSubmitError("Lo sentimos, esta fecha no está disponible. Por favor, elige otra."); 
                  }
                }}
                dayPropGetter={(date) => {
                  const dateMoment = moment(date);
                  const isPastDate = dateMoment.isBefore(todayStartOfDay, 'day'); 
                  const isUnavailable = unavailableDates.has(dateMoment.format('YYYY-MM-DD'));
                  
                  const isDisabled = isPastDate || isUnavailable;
                  const isSelected = selectedDate && dateMoment.isSame(selectedDate, 'day');

                  let style: React.CSSProperties = {};
                  let className = '';

                  if (isDisabled) {
                    className = 'rbc-day-unavailable'; 
                    style.cursor = 'not-allowed';      
                    style.color = '#CC0000';           
                  } else {
                    style.cursor = 'pointer';         
                  }

                  if (isSelected && !isDisabled) {
                    style.backgroundColor = '#F62364'; 
                    style.color = 'white';             
                  }
                  
                  
                  style.position = 'relative'; 
                  style.zIndex = 1; 

                  return {
                    className: className,
                    style: style,
                  };
                }}
                eventPropGetter={() => ({
                  className: 'rbc-event-hidden',
                  style: { display: 'none' },
                })}
              />
            </div>
            
            {selectedDate && !submitError && ( 
              <p className="text-sm text-gray-600 mt-2">Fecha seleccionada: {moment(selectedDate).format('YYYY-MM-DD')}</p>
            )}
            
            {submitError && <p className="text-sm text-red-500 mt-2">{submitError}</p>}
            {!selectedDate && !submitError && formData.mechanic_id && ( 
                <p className="text-sm text-red-500 mt-2">Por favor, selecciona una fecha en el calendario.</p>
            )}
          </div>
        )}

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