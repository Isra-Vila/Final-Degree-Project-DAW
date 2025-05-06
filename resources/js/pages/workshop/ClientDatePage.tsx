import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance'; // Asegúrate de que la ruta sea correcta
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from './AppointmentForm'; // ⭐ Importa el nuevo componente del formulario

const localizer = momentLocalizer(moment);

interface EventType {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

const ClientDatePage: React.FC = () => {
  const [bikes, setBikes] = useState<any[]>([]);
  const [selectedBike, setSelectedBike] = useState<any>(null);
  const [loadingBikes, setLoadingBikes] = useState<boolean>(true);
  const [errorBikes, setErrorBikes] = useState<string | null>(null);
  const [myEventsList, setMyEventsList] = useState<EventType[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false); // ⭐ Nuevo estado para controlar la vista

  const navigate = useNavigate();

  const fetchBikes = async () => {
    try {
      setLoadingBikes(true);
      const response = await api.get('/client/bikes');
      setBikes(response.data);
      setErrorBikes(null);
    } catch (error) {
      console.error("Error fetching bikes:", error);
      setErrorBikes("Hubo un error al cargar tus bicicletas.");
    } finally {
      setLoadingBikes(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      // ⭐ Descomenta la llamada real a tu backend para obtener las citas
      const response = await api.get('/client/appointments');
      const appointments = response.data;

      const formattedEvents: EventType[] = appointments.map((appt: any) => ({
        title: appt.title,
        start: new Date(appt.start_time),
        end: new Date(appt.end_time),
        resource: appt, // ⭐ Guarda la cita completa en 'resource' si necesitas m\u00e1s detalles
      }));

      setMyEventsList(formattedEvents);
      setErrorAppointments(null);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorAppointments("Hubo un error al cargar las citas.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    fetchBikes();
    fetchAppointments();
  }, []);

  const handleSelectBike = (bike: any) => {
    setSelectedBike(bike);
  };

  const handleAddBike = () => {
    navigate('/client/bike/create');
  };

  const handleAddAppointmentClick = () => {
    setShowAppointmentForm(true);
    setSelectedBike(null); // Opcional: Deseleccionar la bici al ir al formulario de cita
  };

  const handleAppointmentFormSuccess = () => {
    setShowAppointmentForm(false);
    fetchAppointments(); // ⭐ Vuelve a cargar las citas despu\u00e9s de crear una nueva
    setSelectedBike(null); // Opcional
  };

  const handleCancelAppointmentForm = () => {
    setShowAppointmentForm(false);
  };

  // ** Implementaci\u00f3n del Calendario **
  const renderCalendar = () => {
    if (loadingAppointments) {
      return <div>Cargando citas del calendario...</div>;
    }

    if (errorAppointments) {
      return <div className="text-red-600">Error al cargar las citas: {errorAppointments}</div>;
    }

    return (
      <div className="h-full">
        <h3 className="text-lg font-semibold mb-2">Calendario de Citas</h3>
        <div style={{ height: '500px' }}> {/* Revertir a una altura fija para probar */}
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            // ⭐ Puedes a\u00f1adir un manejador para cuando se selecciona un evento (una cita)
            onSelectEvent={(event) => {
              console.log('Cita seleccionada:', event.resource); // 'event.resource' contendr\u00e1 los datos completos de la cita
              // ⭐ Aqu\u00ed podr\u00edas mostrar los detalles de la cita seleccionada o habilitar la edici\u00f3n
            }}
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddAppointmentClick} // ⭐ Llama a la nueva funci\u00f3n para mostrar el formulario
          >
            Pedir Cita
          </button>
          {/* ** Los botones de editar y cancelar los implementaremos m\u00e1s adelante ** */}
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition" disabled>
            Editar Cita
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:hover:bg-red-600 transition" disabled>
            Cancelar Cita
          </button>
        </div>
      </div>
    );
  };

  // ** Placeholder para los detalles de la bicicleta seleccionada **
  const renderSelectedBikeDetails = () => {
    if (!selectedBike) {
      return <p>Selecciona una bicicleta para ver sus detalles.</p>;
    }

    const isInRepairOrMaintenance = selectedBike.repair_state === 'en reparacion' || selectedBike.maintenance_state === 'en mantenimiento';

    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{selectedBike.brand} - {selectedBike.model}</h3>
        {/* ** Aseg\u00farate de que tu API devuelva estos datos para 'selectedBike' ** */}
        <p>**Estado de Reparaci\u00f3n:** {selectedBike.repair_state}</p>
        <p>**Estado de Mantenimiento:** {selectedBike.maintenance_state}</p>
        <h4 className="font-semibold mt-4">Historial de Citas:</h4>
        {/* ⭐ Aqu\u00ed usamos la relaci\u00f3n 'appointments' del modelo Bike */}
        <ul>
          {selectedBike.appointments && selectedBike.appointments.length > 0 ? (
            selectedBike.appointments.map((appointment: any) => (
              <li key={appointment.id}>
                **{appointment.type === 'reparacion' ? 'Reparaci\u00f3n' : 'Mantenimiento'}** - {moment(appointment.start_time).format('YYYY-MM-DD HH:mm')} a {moment(appointment.end_time).format('HH:mm')} con {appointment.mechanic?.name || 'Mec\u00e1nico no asignado'} (Estado: {appointment.status})
              </li>
            ))
          ) : (
            <li>No hay historial de citas para esta bicicleta.</li>
          )}
        </ul>

        {!isInRepairOrMaintenance && (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
              onClick={() => navigate(`/client/bike/edit/${selectedBike.id}`)}
            >
              Editar Bici
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:hover:bg-red-600 transition"
              onClick={async () => {
                if (window.confirm('\u00bfEst\u00e1s seguro de que quieres eliminar esta bicicleta?')) {
                  try {
                    await api.delete(`/client/bikes/${selectedBike.id}`);
                    setBikes(bikes.filter(bike => bike.id !== selectedBike.id));
                    setSelectedBike(null);
                  } catch (error) {
                    console.error("Error deleting bike:", error);
                    alert("Hubo un error al eliminar la bicicleta.");
                  }
                }
              }}
            >
              Eliminar Bici
            </button>
          </div>
        )}
      </div>
    );
  };

  // ** Placeholder para el listado de mec\u00e1nicos y chat **
  const renderMechanicsChat = () => {
    // ⭐ En un caso real, obtendr\u00edas los mec\u00e1nicos con citas del cliente
    // O podr\u00edas tener una forma de buscar mec\u00e1nicos disponibles para chatear
    const mechanics = [
      { id: 1, name: 'Mec\u00e1nico Juan' },
      { id: 2, 'name': 'Mec\u00e1nico Mar\u00eda' },
    ];

    const handleOpenChat = (mechanicId: number) => {
      console.log(`Abrir chat con el mec\u00e1nico ${mechanicId}`);
      // ** Aqu\u00ed implementar\u00edas la l\u00f3gica para abrir el chat **
    };

    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Mec\u00e1nicos con Cita</h3>
        <ul>
          {mechanics.map(mechanic => (
            <li
              key={mechanic.id}
              className="cursor-pointer hover:underline mb-2"
              onClick={() => handleOpenChat(mechanic.id)}
            >
              {mechanic.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loadingBikes) {
    return <div>Cargando bicicletas...</div>;
  }

  if (errorBikes) {
    return <div className="text-red-600">{errorBikes}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      {/* Listado de Bicicletas (izquierda) */}
      <div className="w-1/4 pr-4">
        <h2 className="text-2xl font-bold mb-4">Mis Bicicletas</h2>
        {bikes.length === 0 ? (
          <button
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            onClick={handleAddBike}
          >
            Dar de Alta Nueva Bici
          </button>
        ) : (
          <>
            <ul>
              {bikes.map(bike => (
                <li
                  key={bike.id}
                  className={`cursor-pointer py-2 px-4 rounded-md ${selectedBike?.id === bike.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  onClick={() => handleSelectBike(bike)}
                >
                  {bike.brand} - {bike.model}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition"
              onClick={handleAddBike}
            >
              Dar de Alta Nueva Bici
            </button>
          </>
        )}
      </div>

      {/* Contenido Principal (centro) */}
      <div className="w-2/4 px-4">
        {showAppointmentForm ? (
          <AppointmentForm
            bikes={bikes}
            api={api}
            onSubmitSuccess={handleAppointmentFormSuccess}
            onCancel={handleCancelAppointmentForm}
          />
        ) : (
          renderCalendar()
        )}
      </div>

      {/* Listado de Mecánicos y Chat (derecha) */}
      <div className="w-1/4 pl-4">
        {renderMechanicsChat()}
      </div>
    </div>
  );
};

export default ClientDatePage;