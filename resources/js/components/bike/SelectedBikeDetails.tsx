// resources/js/components/bike/SelectedBikeDetails.tsx

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Bike } from '../../types/bike';
import { Appointment } from '../../types/appointment'; // ⭐ Importa la interfaz Appointment unificada
import { User } from '../../types/user'; // Para ClientType y MechanicType si los usas así

// Si ClientType y MechanicType son simplemente alias para User, puedes eliminarlas y usar User directamente.
// O si tienen propiedades adicionales o un subconjunto diferente, entonces mantenlas.
// Por simplicidad, si no hay propiedades adicionales, puedes usar 'User' directamente.
interface ClientType extends User {}
interface MechanicType extends User {}


interface SelectedBikeDetailsProps {
  bike: Bike | null;
  selectedAppointment?: Appointment | null; // ⭐ Usa la interfaz Appointment unificada
  onDelete: (id: number) => Promise<void>;
  onEdit: (bike: Bike) => void;
}

const SelectedBikeDetails: React.FC<SelectedBikeDetailsProps> = memo(({ bike, selectedAppointment, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const handleShowDeleteAlert = () => {
    setShowCustomAlert(true);
  };

  const handleConfirmDelete = () => {
    if (bike) {
      onDelete(bike.id);
    }
    setShowCustomAlert(false);
  };

  const handleCancelDelete = () => {
    setShowCustomAlert(false);
  };

  const formatState = (state: string | null | undefined): string => {
    if (!state) return 'Sin definir';
    const replacements: { [key: string]: string } = {
      'en reparacion': 'En Reparación',
      'reparada': 'Reparada',
      'no reparada': 'No Reparada',
      'en mantenimiento': 'En Mantenimiento',
      'mantenimiento terminado': 'Mantenimiento Finalizado',
      'mantenimiento no terminado': 'Mantenimiento No Terminado',
      'disponible': 'Disponible',
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'completed': 'Completada',
      'canceled': 'Cancelada',
      'failed': 'Fallida'
    };
    return replacements[state.toLowerCase()] || state;
  };

  const getStateClassName = (state: string | null | undefined): string => {
    if (!state) return 'bg-gray-100 text-gray-800';

    switch (state.toLowerCase()) {
      case 'en reparacion':
      case 'en mantenimiento':
      case 'pending':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'reparada':
      case 'mantenimiento terminado':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'no reparada':
      case 'mantenimiento no terminado':
      case 'canceled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'disponible':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!bike) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300 text-center">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">¡Selecciona tu Máquina!</h3>
        <p className="text-sm text-gray-500">Haz clic en una máquina de tu listado o una cita para ver los detalles.</p>
      </div>
    );
  }

  const isInRepairOrMaintenance = bike.repair_state === 'en reparacion' || bike.maintenance_state === 'en mantenimiento';

  return (
    <div className="space-y-3">
      <h4 className="text-md font-semibold text-gray-800">{bike.brand} {bike.model} ({bike.year})</h4>
      <p className="text-sm text-gray-700"><strong>Tipo:</strong> {bike.type}</p>
      <p className="text-sm text-gray-700"><strong>Descripción:</strong> {bike.description}</p>
      <p className="text-sm text-gray-700"><strong>Matrícula:</strong> {bike.license_plate}</p>

      <p className="text-sm text-gray-700">
        <strong>Estado de la Máquina:</strong>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStateClassName(bike.repair_state || bike.maintenance_state)}`}>
          {formatState(bike.repair_state || bike.maintenance_state || 'disponible')}
        </span>
      </p>

      {selectedAppointment && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-md font-semibold text-gray-800 mb-2">Detalles de la Cita Seleccionada:</h5>
          <p className="text-sm text-gray-700"><strong>Cita:</strong> {selectedAppointment.title}</p>
          <p className="text-sm text-gray-700">
            <strong>Tipo de Servicio:</strong> {selectedAppointment.type === 'reparacion' ? 'Reparación' : 'Mantenimiento'}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Estado de la Cita:</strong>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStateClassName(selectedAppointment.status)}`}>
              {formatState(selectedAppointment.status)}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <strong>Desde:</strong> {moment(selectedAppointment.start_time).format('DD/MM/YYYY HH:mm')}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Hasta:</strong> {moment(selectedAppointment.end_time).format('DD/MM/YYYY HH:mm')}
          </p>
          {/* Asegúrate de que client y mechanic sean compatibles con User si estás usando User para ellos */}
          {selectedAppointment.client && (
            <p className="text-sm text-gray-700">
              <strong>Cliente:</strong> {selectedAppointment.client.name} ({selectedAppointment.client.email})
            </p>
          )}
          {selectedAppointment.mechanic && (
            <p className="text-sm text-gray-700">
              <strong>Mecánico Asignado:</strong> {selectedAppointment.mechanic.name}
            </p>
          )}
        </div>
      )}

      {bike.appointments && bike.appointments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-md font-semibold text-gray-800 mb-2">Historial de Servicios:</h5>
          <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
            {bike.appointments
              .sort((a, b) => moment(b.start_time).valueOf() - moment(a.start_time).valueOf())
              .map((appointment: Appointment) => ( // ⭐ Ahora usa la interfaz Appointment unificada
              <li key={appointment.id} className="text-sm text-gray-600 border-b border-gray-100 pb-1 mb-1 last:border-b-0 last:pb-0 last:mb-0">
                <span className="font-semibold">{appointment.type === 'reparacion' ? 'Reparación' : 'Mantenimiento'}</span> el {moment(appointment.start_time).format('DD/MM/YYYY')} con {appointment.mechanic?.name || 'Mecánico no asignado'}:
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getStateClassName(appointment.status)}`}>
                  {formatState(appointment.status)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isInRepairOrMaintenance && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
            onClick={() => onEdit(bike)}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Editar Máquina
          </button>
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md"
            onClick={handleShowDeleteAlert}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Eliminar Máquina
          </button>
        </div>
      )}

      {showCustomAlert && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Eliminar esta máquina?</h3>
            <p className="text-gray-700 mb-6">Esta acción es irreversible y eliminará todas las citas asociadas. ¿Estás seguro de que quieres eliminar esta máquina?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-gray-300 transition duration-300"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring-red-500 shadow-md transition duration-300"
                onClick={handleConfirmDelete}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default SelectedBikeDetails;