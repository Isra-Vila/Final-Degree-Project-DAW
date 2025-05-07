import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from '../../components/forms/AppointmentForm';
const BikeForm = lazy(() => import('../../components/forms/BikeForm'));
import BikeList from '../../components/bike/BikeList';
import SelectedBikeDetails from '../../components/bike/SelectedBikeDetails';
import MechanicsChat from '../../components/MechanicsChat';
import { Bike } from '../../types/bike';
import { User } from '../../types/user';

const localizer = momentLocalizer(moment);

interface EventType {
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

const ClientDatePage: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [myEventsList, setMyEventsList] = useState<EventType[]>([]);
  const [loadingBikes, setLoadingBikes] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showBikeForm, setShowBikeForm] = useState(false);
  const [errorBikes, setErrorBikes] = useState<string | null>(null);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);
  const [newBikeData, setNewBikeData] = useState<Partial<Bike>>({});
  const [bikeFormError, setBikeFormError] = useState<string | null>(null);
  const [bikeToEdit, setBikeToEdit] = useState<Bike | null>(null);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoadingBikes(true);
      const bikesResponse = await api.get<Bike[]>('/client/bikes');
      setBikes(bikesResponse.data);
      setErrorBikes(null);

      setLoadingAppointments(true);
      const appointmentsResponse = await api.get<any[]>('/client/appointments');
      const formattedEvents: EventType[] = appointmentsResponse.data.map((appt: any) => ({
        title: appt.title,
        start: new Date(appt.start_time),
        end: new Date(appt.end_time),
        resource: appt,
      }));
      setMyEventsList(formattedEvents);
      setErrorAppointments(null);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setErrorBikes("¡Problema al cargar tus máquinas!");
      setErrorAppointments("¡No pudimos traer tus planes!");
    } finally {
      setLoadingBikes(false);
      setLoadingAppointments(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectBike = (bike: Bike) => setSelectedBike(bike);
  const handleAddBikeClick = () => {
    setBikeToEdit(null); // Reset edit mode
    setNewBikeData({});
    setShowBikeForm(true);
    setShowAppointmentForm(false);
  };
  const handleAddAppointmentClick = () => {
    setShowAppointmentForm(true);
    setShowBikeForm(false);
    setSelectedBike(null);
  };
  const handleAppointmentFormSuccess = () => {
    setShowAppointmentForm(false);
    fetchData();
    setSelectedBike(null);
  };
  const handleCancelAppointmentForm = () => setShowAppointmentForm(false);
  const handleCancelBikeForm = () => {
    setShowBikeForm(false);
    setBikeToEdit(null);
    setNewBikeData({});
    setBikeFormError(null);
  };

  const handleNewBikeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBikeData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateBike = async () => {
    if (!newBikeData.brand || !newBikeData.model) {
      setBikeFormError("Por favor, introduce la marca y el modelo de la bicicleta.");
      return;
    }
    try {
      const bikeDataToSend = { ...newBikeData, owner_id: 1 };
      const isEditing = bikeToEdit?.id;
      const apiUrl = isEditing ? `/client/bikes/${bikeToEdit.id}` : '/client/bikes';
      const method = isEditing ? api.put : api.post;

      const response = await method<Bike>(apiUrl, bikeDataToSend);

      setShowBikeForm(false);
      setNewBikeData({});
      setBikeToEdit(null);
      setBikeFormError(null);
      fetchData();
    } catch (error: any) {
      console.error(`Error ${bikeToEdit ? 'editando' : 'creando'} bicicleta:`, error);
      setBikeFormError(error.response?.data?.message || `¡No se pudo ${bikeToEdit ? 'editar' : 'crear'} la bicicleta!`);
    }
  };

  const handleDeleteBike = async (bikeId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta bicicleta? Esta acción es irreversible.');
    if (confirmDelete) {
      try {
        await api.delete(`/client/bikes/${bikeId}`);
        setBikes(bikes.filter(bike => bike.id !== bikeId));
        setSelectedBike(null);
      } catch (error) {
        console.error("Error al borrar bici:", error);
        alert("¡No se pudo eliminar esa máquina!");
      }
    }
  };

  const handleEditBikeClick = (bike: Bike) => {
    setBikeToEdit(bike);
    setNewBikeData(bike);
    setShowBikeForm(true);
    setShowAppointmentForm(false);
  };

  const renderCalendar = () => {
    if (loadingAppointments) return <div className="text-lg italic text-gray-700">Cargando el calendario de ruta...</div>;
    if (errorAppointments) return <div className="text-red-600 font-bold">{errorAppointments}</div>;
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#F62364]">
        <h3 className="text-xl font-semibold mb-4 text-gray-800"><svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Próximas Revisiones</h3>
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            eventPropGetter={() => ({ className: 'rbc-event-custom' })}
            onSelectEvent={(event) => console.log('Cita seleccionada:', event.resource)}
          />
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-[#F62364] hover:bg-[#D91E5B] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F62364] shadow-md transition duration-300"
            onClick={handleAddAppointmentClick}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            ¡Nueva Puesta a Punto!
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex gap-10">
        {/* Listado de Bicicletas (izquierda) */}
        {!showAppointmentForm && !showBikeForm && (
          <div className="w-1/4">
            <BikeList
              bikes={bikes}
              selectedBikeId={selectedBike?.id ?? null}
              onSelectBike={handleSelectBike}
              onAddBike={handleAddBikeClick}
            />
          </div>
        )}

        {/* Formulario de Alta/Edición de Bicicleta (Centrado) */}
        {showBikeForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#F62364] w-2/4 mx-auto">
            <Suspense fallback={<div className="text-gray-700 italic">Cargando el formulario de bicicleta...</div>}>
              <BikeForm
                formData={newBikeData}
                onFormChange={handleNewBikeFormChange}
                isEditMode={!!bikeToEdit}
                formError={bikeFormError}
                onCancel={handleCancelBikeForm}
                onCreateBike={handleCreateBike}
                hideClientMechanicIds={true}
              />
            </Suspense>
          </div>
        )}

        {/* Contenido Principal (centro) */}
        {!showBikeForm && (
          <div className={`${showAppointmentForm ? 'w-2/4 mx-auto' : 'w-2/4'} px-4`}>
            {showAppointmentForm ? (
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#F62364]">
                <h2 className="text-xl font-semibold mb-6 text-gray-800"><svg className="w-6 h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Solicitar Puesta a Punto</h2>
                <Suspense fallback={<div className="text-gray-700 italic">Alistando el formulario...</div>}>
                  <AppointmentForm
                    bikes={bikes}
                    api={api}
                    onSubmitSuccess={handleAppointmentFormSuccess}
                    onCancel={handleCancelAppointmentForm}
                  />
                </Suspense>
              </div>
            ) : (
              renderCalendar()
            )}
          </div>
        )}

        {/* Detalles de la Bicicleta Seleccionada (derecha superior) y Chat (derecha inferior) */}
        {!showAppointmentForm && !showBikeForm && selectedBike && (
          <div className="w-1/4 pl-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#F62364]">
              <h3 className="text-sm font-semibold mb-2 text-gray-700"><svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0-6l-3 3m7 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Detalles de la Máquina</h3>
              <SelectedBikeDetails bike={selectedBike} onDelete={handleDeleteBike} onEdit={handleEditBikeClick} />
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#F62364]">
              <h3 className="text-sm font-semibold mb-2 text-gray-700"><svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10v-3m0 0l-3-3m3 3l3-3M3 7h18M9 10h5m-5 0v5m5 0v5"></path></svg> Charla con Boxes</h3>
              <MechanicsChat />
            </div>
          </div>
        )}
        {!showAppointmentForm && !showBikeForm && !selectedBike && (
          <div className="w-1/4 pl-4 flex flex-col gap-6">
            <SelectedBikeDetails bike={null} onDelete={handleDeleteBike} onEdit={() => {}} />
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#F62364]">
              <h3 className="text-sm font-semibold mb-2 text-gray-700"><svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10v-3m0 0l-3-3m3 3l3-3M3 7h18M9 10h5m-5 0v5m5 0v5"></path></svg> Charla con Boxes</h3>
              <MechanicsChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDatePage;