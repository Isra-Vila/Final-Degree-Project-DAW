import React, { useState, useEffect, useCallback } from 'react';
import api from '../../axiosInstance';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BikeList from '../../components/bike/BikeList';
import MechanicsChat from '../../components/MechanicsChat';

const localizer = momentLocalizer(moment);

interface EventType {
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

const MechanicDatePage: React.FC = () => {
  const [assignedBikes, setAssignedBikes] = useState<any[]>([]);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [loadingBikes, setLoadingBikes] = useState<boolean>(true);
  const [errorBikes, setErrorBikes] = useState<string | null>(null);
  const [assignedAppointments, setAssignedAppointments] = useState<EventType[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);

  // ** Lógica para obtener las bicicletas asignadas al mecánico **
  const fetchAssignedBikes = useCallback(async () => {
    try {
      setLoadingBikes(true);
      const response = await api.get('/mechanic/assigned-bikes'); // ❗ Asegúrate de que esta ruta exista en tu backend
      setAssignedBikes(response.data);
      setErrorBikes(null);
    } catch (error) {
      console.error("Error fetching assigned bikes:", error);
      setErrorBikes("Hubo un error al cargar las bicicletas asignadas.");
    } finally {
      setLoadingBikes(false);
    }
  }, [api]);

  // ** Lógica para obtener las citas asignadas al mecánico **
  const fetchAssignedAppointments = useCallback(async () => {
    try {
      setLoadingAppointments(true);
      const response = await api.get('/mechanic/assigned-appointments'); // ❗ Asegúrate de que esta ruta exista en tu backend
      const appointments = response.data;
      const formattedEvents: EventType[] = appointments.map((appt: any) => ({
        title: appt.title,
        start: new Date(appt.start_time),
        end: new Date(appt.end_time),
        resource: appt,
      }));
      setAssignedAppointments(formattedEvents);
      setErrorAppointments(null);
    } catch (error) {
      console.error("Error fetching assigned appointments:", error);
      setErrorAppointments("Hubo un error al cargar las citas asignadas.");
    } finally {
      setLoadingAppointments(false);
    }
  }, [api]);

  useEffect(() => {
    fetchAssignedBikes();
    fetchAssignedAppointments();
  }, [fetchAssignedBikes, fetchAssignedAppointments]);

  const handleSelectBike = useCallback((bike: any) => {
    setSelectedBike(bike);
  }, []);

  const handleSelectAppointment = useCallback((event: EventType) => {
    console.log('Cita seleccionada para editar estado:', event.resource);
    // ** ❗ Aquí implementarías la lógica para editar el estado de la cita **
    // Esto podría implicar mostrar un modal o redirigir a una página de edición de la cita.
    // Necesitarías una API endpoint para actualizar el estado de la cita.
  }, []);

  const renderCalendar = useCallback(() => {
    if (loadingAppointments) {
      return <div>Cargando citas asignadas...</div>;
    }
    if (errorAppointments) {
      return <div className="text-red-600">Error al cargar las citas asignadas: {errorAppointments}</div>;
    }
    return (
      <div className="h-full">
        <h3 className="text-lg font-semibold mb-2">Citas Asignadas</h3>
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={assignedAppointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectAppointment} // Usamos el handler para la selección de citas
          />
        </div>
        {/* Los botones de "Pedir Cita", "Editar Cita", "Cancelar Cita" NO son necesarios aquí */}
      </div>
    );
  }, [loadingAppointments, errorAppointments, assignedAppointments, handleSelectAppointment]);

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      {/* Listado de Bicicletas Asignadas (izquierda) */}
      {loadingBikes ? (
        <div>Cargando bicicletas asignadas...</div>
      ) : errorBikes ? (
        <div className="text-red-600">{errorBikes}</div>
      ) : (
        <BikeList
          bikes={assignedBikes}
          selectedBikeId={selectedBike?.id}
          onSelectBike={handleSelectBike}
          onAddBike={() => {
            // Los mecánicos probablemente no puedan "dar de alta" bicicletas desde aquí
            console.log("Opción para dar de alta bicicleta no disponible para mecánicos desde esta vista.");
          }}
        />
      )}

      {/* Calendario de Citas Asignadas (centro) */}
      <div className="w-2/4 px-4">
        {renderCalendar()}
      </div>

      {/* Chat (derecha) */}
      <div className="w-1/4 pl-4">
        <MechanicsChat />
      </div>
    </div>
  );
};

export default MechanicDatePage;