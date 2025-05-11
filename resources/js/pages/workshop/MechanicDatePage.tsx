// resources/js/pages/workshop/MechanicDatePage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import api from '../../axiosInstance';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BikeList from '../../components/bike/BikeList';
import SelectedBikeDetails from '../../components/bike/SelectedBikeDetails';
import { Bike } from '../../types/bike';
import { Appointment } from '../../types/appointment'; 

const localizer = momentLocalizer(moment);

interface EventType {
  title: string;
  start: Date;
  end: Date;
  resource?: Appointment; 
}

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'confirm' | 'alert';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel, type = 'confirm' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-blue-800">
            {type === 'confirm' ? 'Confirmar Acción' : 'Información'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {type === 'confirm' && (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Confirmar
              </button>
            </>
          )}
          {type === 'alert' && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-200 hover:bg-blue-300 text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Entendido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MechanicDatePage: React.FC = () => {
  const [assignedBikes, setAssignedBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [loadingBikes, setLoadingBikes] = useState<boolean>(true);
  const [errorBikes, setErrorBikes] = useState<string | null>(null);
  const [assignedAppointments, setAssignedAppointments] = useState<EventType[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null); 
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => () => {});

  const displayAlert = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 5000);
  }, []);

  const closeAlert = useCallback(() => {
    setShowAlert(false);
    setAlertMessage('');
  }, []);

  const confirmAction = useCallback((message: string, action: () => void) => {
    setConfirmationMessage(message);
    setConfirmationAction(() => action);
    setShowConfirmationModal(true);
  }, []);

  const handleConfirmModalClose = useCallback(() => {
    setShowConfirmationModal(false);
    setConfirmationMessage('');
    setConfirmationAction(() => () => {});
  }, []);

  const fetchAssignedBikesAndAppointments = useCallback(async () => {
    try {
      setLoadingBikes(true);
      setLoadingAppointments(true);

      const appointmentsResponse = await api.get<Appointment[]>('/mechanic/assigned-appointments'); 
      const appointments = appointmentsResponse.data;

      const formattedEvents: EventType[] = appointments.map((appt: Appointment) => ({ 
        title: appt.title,
        start: new Date(appt.start_time),
        end: new Date(appt.end_time),
        resource: appt,
      }));
      setAssignedAppointments(formattedEvents);
      setErrorAppointments(null);

      const bikeIds = Array.from(new Set(appointments.map(appt => appt.bike_id)));

      if (bikeIds.length > 0) {
        const bikesResponse = await api.get<Bike[]>('/mechanic/assigned-bikes');
        setAssignedBikes(bikesResponse.data);
        setErrorBikes(null);
      } else {
        setAssignedBikes([]);
      }

    } catch (error) {
      console.error("Error fetching data for mechanic:", error);
      setErrorBikes("Hubo un error al cargar las bicicletas o citas asignadas.");
      setErrorAppointments("Hubo un error al cargar las citas asignadas.");
      displayAlert('Error al cargar datos: ' + (error as any).message, 'error');
    } finally {
      setLoadingBikes(false);
      setLoadingAppointments(false);
    }
  }, [displayAlert]);

  useEffect(() => {
    fetchAssignedBikesAndAppointments();
  }, [fetchAssignedBikesAndAppointments]);

  const handleSelectBike = useCallback((bike: Bike, appointment?: Appointment | null) => { 
    setSelectedBike(bike);
    if (!appointment) {
        setSelectedAppointment(null);
    } else {
        setSelectedAppointment(appointment);
    }
  }, []);

  const handleSelectAppointment = useCallback((event: EventType) => {
    const appointment = event.resource;
    setSelectedAppointment(appointment || null);

    if (appointment?.bike_id) {
      const bike = assignedBikes.find(b => b.id === appointment.bike_id);
      if (bike) {
        handleSelectBike(bike, appointment);
      } else {
        console.warn(`Bicicleta con ID ${appointment.bike_id} no encontrada en la lista de bicis asignadas.`);
        setSelectedBike(null);
      }
    } else {
      setSelectedBike(null);
    }
  }, [assignedBikes, handleSelectBike]);

  const handleConfirmAppointment = useCallback(async () => {
    if (!selectedAppointment) return;
    confirmAction(`¿Estás seguro de que quieres confirmar la cita "${selectedAppointment.title}"?`, async () => {
      try {
        await api.put(`/appointments/${selectedAppointment.id}`, { status: 'confirmed' });
        await fetchAssignedBikesAndAppointments();
        setSelectedAppointment(null);
        setSelectedBike(null);
        displayAlert('¡Cita confirmada y estado de la máquina actualizado!', 'success');
      } catch (error: any) {
        console.error("Error al confirmar la cita:", error);
        const errorMessage = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : (error.response?.data?.message || 'Error desconocido. Inténtalo de nuevo.');
        displayAlert(`Error al confirmar la cita: ${errorMessage}`, 'error');
      } finally {
        handleConfirmModalClose();
      }
    });
  }, [selectedAppointment, fetchAssignedBikesAndAppointments, displayAlert, confirmAction, handleConfirmModalClose]);

  const handleCancelAppointment = useCallback(async () => {
    if (!selectedAppointment) return;
    confirmAction(`¿Estás seguro de que quieres cancelar la cita "${selectedAppointment.title}"?`, async () => {
      try {
        await api.put(`/appointments/${selectedAppointment.id}`, { status: 'canceled' });
        await fetchAssignedBikesAndAppointments();
        setSelectedAppointment(null);
        setSelectedBike(null);
        displayAlert('¡Cita cancelada con éxito!', 'success');
      } catch (error: any) {
        console.error("Error al cancelar la cita:", error);
        const errorMessage = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : (error.response?.data?.message || 'Error desconocido. Inténtalo de nuevo.');
        displayAlert(`Error al cancelar la cita: ${errorMessage}`, 'error');
      } finally {
        handleConfirmModalClose();
      }
    });
  }, [selectedAppointment, fetchAssignedBikesAndAppointments, displayAlert, confirmAction, handleConfirmModalClose]);

  const handleCompleteService = useCallback(async () => {
    if (!selectedAppointment) return;
    confirmAction(`¿Estás seguro de que quieres marcar el servicio de "${selectedAppointment.title}" como completado?`, async () => {
      try {
        await api.put(`/appointments/${selectedAppointment.id}`, { status: 'completed' });
        await fetchAssignedBikesAndAppointments();
        setSelectedAppointment(null);
        setSelectedBike(null);
        displayAlert('¡Servicio marcado como completado y estado de la máquina actualizado!', 'success');
      } catch (error: any) {
        console.error("Error al completar el servicio:", error);
        const errorMessage = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : (error.response?.data?.message || 'Error desconocido. Inténtalo de nuevo.');
        displayAlert(`Error al completar el servicio: ${errorMessage}`, 'error');
      } finally {
        handleConfirmModalClose();
      }
    });
  }, [selectedAppointment, fetchAssignedBikesAndAppointments, displayAlert, confirmAction, handleConfirmModalClose]);

  const handleFailService = useCallback(async () => {
    if (!selectedAppointment) return;
    confirmAction(`¿Estás seguro de que quieres marcar el servicio de "${selectedAppointment.title}" como no completado?`, async () => {
      try {
        await api.put(`/appointments/${selectedAppointment.id}`, { status: 'failed' });
        await fetchAssignedBikesAndAppointments();
        setSelectedAppointment(null);
        setSelectedBike(null);
        displayAlert('¡Servicio marcado como no completado y estado de la máquina actualizado!', 'success');
      } catch (error: any) {
        console.error("Error al marcar el servicio como no completado:", error);
        const errorMessage = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : (error.response?.data?.message || 'Error desconocido. Inténtalo de nuevo.');
        displayAlert(`Error al marcar el servicio como no completado: ${errorMessage}`, 'error');
      } finally {
        handleConfirmModalClose();
      }
    });
  }, [selectedAppointment, fetchAssignedBikesAndAppointments, displayAlert, confirmAction, handleConfirmModalClose]);


  const renderCalendar = useCallback(() => {
    if (loadingAppointments) {
      return <div className="text-lg italic text-gray-700">Cargando citas asignadas...</div>;
    }
    if (errorAppointments) {
      return <div className="text-red-600 font-bold">Error al cargar las citas asignadas: {errorAppointments}</div>;
    }
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 h-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-800"><svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Tus Citas</h3>
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={assignedAppointments}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectAppointment}
            date={calendarDate}
            onNavigate={(newDate) => setCalendarDate(newDate)}
            views={['month']}
            eventPropGetter={(event) => {
              let className = 'rbc-event-custom';
              if (event.resource?.status === 'confirmed') {
                className += ' rbc-event-confirmed';
              } else if (event.resource?.status === 'pending') {
                className += ' rbc-event-pending';
              } else if (event.resource?.status === 'completed') {
                className += ' rbc-event-completed';
              } else if (event.resource?.status === 'failed' || event.resource?.status === 'canceled') {
                className += ' rbc-event-failed';
              }
              return { className };
            }}
          />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          {selectedAppointment ? (
            <>
              {selectedAppointment.status === 'pending' && (
                <>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 shadow-md transition duration-300"
                    onClick={handleConfirmAppointment}
                  >
                    <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Confirmar Cita
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 shadow-md transition duration-300"
                    onClick={handleCancelAppointment}
                  >
                    <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Cancelar Cita
                  </button>
                </>
              )}
              {selectedAppointment.status === 'confirmed' && (
                <>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition duration-300"
                    onClick={handleCompleteService}
                  >
                    <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Servicio Completado
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md transition duration-300"
                    onClick={handleFailService}
                  >
                    <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Servicio No Completado
                  </button>
                </>
              )}
              {selectedAppointment.status !== 'pending' && selectedAppointment.status !== 'confirmed' && (
                  <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-inner border-l-4 border-gray-400 text-gray-700">
                    <svg className="w-6 h-6 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="font-medium italic">
                      Esta cita ha sido{' '}
                      <span className="font-semibold text-gray-800">
                        {selectedAppointment.status === 'completed' ? 'finalizada' :
                         selectedAppointment.status === 'canceled' ? 'cancelada' :
                         selectedAppointment.status === 'failed' ? 'marcada como no completada' :
                         selectedAppointment.status}
                      </span>
                      . No hay más acciones disponibles para esta cita.
                    </p>
                  </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg shadow-inner border-l-4 border-blue-400 text-blue-700">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <p className="font-medium italic">
                Selecciona una cita en el calendario para ver las acciones disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }, [loadingAppointments, errorAppointments, assignedAppointments, handleSelectAppointment, selectedAppointment, handleConfirmAppointment, handleCancelAppointment, handleCompleteService, handleFailService, calendarDate]);


  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex gap-10">
        <div className="w-1/4">
          {loadingBikes ? (
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600 text-lg italic text-gray-700">Cargando bicicletas asignadas...</div>
          ) : errorBikes ? (
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600 text-red-600 font-bold">{errorBikes}</div>
          ) : (
            <BikeList
              bikes={assignedBikes}
              selectedBikeId={selectedBike?.id ?? null}
              onSelectBike={handleSelectBike}
              onAddBike={() => {
                displayAlert("Funcionalidad para dar de alta máquinas no disponible para mecánicos desde esta vista.", "info");
              }}
              hideAddBikeButton={true}
              customBorderColor="border-blue-600"
            />
          )}
        </div>

        <div className="w-2/4 px-4">
          {renderCalendar()}
        </div>

        <div className="w-1/4 pl-4 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600">
            <h3 className="text-sm font-semibold mb-2 text-gray-700"><svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0-6l-3 3m7 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Detalles de la Máquina</h3>
            <SelectedBikeDetails
              bike={selectedBike}
              selectedAppointment={selectedAppointment} 
              onDelete={async (id) => {
                displayAlert("No puedes eliminar máquinas desde esta vista.", "info");
              }}
              onEdit={async (bike) => {
                displayAlert("No puedes editar máquinas desde esta vista.", "info");
              }}
              hideActionsForMechanic={true}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-600 text-center">
            <h3 className="text-sm font-semibold mb-4 text-gray-700"><svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10v-3m0 0l-3-3m3 3l3-3M3 7h18M9 10h5m-5 0v5m5 0v5"></path></svg> Charla con Boxes</h3>
            <p className="text-lg text-gray-500 italic">
              Esta funcionalidad está en desarrollo. <br /> ¡Pronto podrás chatear con tus clientes!
            </p>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className={`rounded-lg shadow-xl p-6 w-full max-w-md border-l-4
            ${alertType === 'success' ? 'bg-green-100 border-green-500 text-green-800' : ''}
            ${alertType === 'error' ? 'bg-red-100 border-red-500 text-red-800' : ''}
            ${alertType === 'info' ? 'bg-blue-100 border-blue-500 text-blue-800' : ''}
          `}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">
                {alertType === 'success' && '¡Éxito!'}
                {alertType === 'error' && '¡Error!'}
                {alertType === 'info' && 'Información'}
              </h3>
              <button
                onClick={closeAlert}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <p className="text-sm mb-6">{alertMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={closeAlert}
                className={`px-4 py-2 rounded-md text-sm font-medium
                  ${alertType === 'success' ? 'bg-green-200 hover:bg-green-300 text-green-800' : ''}
                  ${alertType === 'error' ? 'bg-red-200 hover:bg-red-300 text-red-800' : ''}
                  ${alertType === 'info' ? 'bg-blue-200 hover:bg-blue-300 text-blue-800' : ''}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                `}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          message={confirmationMessage}
          onConfirm={() => confirmationAction()}
          onCancel={handleConfirmModalClose}
        />
      )}
    </div>
  );
};

export default MechanicDatePage;