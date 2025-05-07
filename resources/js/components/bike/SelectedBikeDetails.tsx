import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Bike } from '../../types/bike'; // Asegúrate de que la ruta sea correcta

interface SelectedBikeDetailsProps {
  bike: Bike | null;
  onDelete: (id: number) => Promise<void>;
  onEdit: (bike: Bike) => void;
}

const SelectedBikeDetails: React.FC<SelectedBikeDetailsProps> = memo(({ bike, onDelete, onEdit }) => {
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

  if (!bike) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300 text-center">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">¡Selecciona tu Bicicleta!</h3>
        <p className="text-sm text-gray-500">Haz clic en una bicicleta de tu garaje para ver los detalles y opciones.</p>
      </div>
    );
  }

  const isInRepairOrMaintenance = bike.repair_state === 'en reparacion' || bike.maintenance_state === 'en mantenimiento';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative"> {/* Añadimos relative para posicionar la alerta */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Detalles de tu Bicicleta</h3>
      <h4 className="text-lg font-semibold mb-2 text-gray-700">{bike.brand} - {bike.model}</h4>
      {bike.repair_state && (
        <p className="mb-2"><span className="font-semibold text-gray-700">Estado de Reparación:</span> <span className={`${bike.repair_state === 'en reparacion' ? 'text-red-500' : 'text-green-500'}`}>{bike.repair_state}</span></p>
      )}
      {bike.maintenance_state && (
        <p className="mb-2"><span className="font-semibold text-gray-700">Estado de Mantenimiento:</span> <span className={`${bike.maintenance_state === 'en mantenimiento' ? 'text-yellow-500' : 'text-green-500'}`}>{bike.maintenance_state}</span></p>
      )}

      <h4 className="font-semibold mt-4 text-gray-700">Historial de Citas:</h4>
      <ul className="mt-2 space-y-1">
        {bike.appointments && bike.appointments.length > 0 ? (
          bike.appointments.map((appointment: any) => (
            <li key={appointment.id} className="text-sm text-gray-600">
              <span className="font-semibold">{appointment.type === 'reparacion' ? 'Reparación' : 'Mantenimiento'}</span> - {moment(appointment.start_time).format('YYYY-MM-DD HH:mm')} a {moment(appointment.end_time).format('HH:mm')} con {appointment.mechanic?.name || 'Mecánico no asignado'} (<span className={`${appointment.status === 'pendiente' ? 'text-yellow-500' : appointment.status === 'completada' ? 'text-green-500' : 'text-gray-500'}`}>{appointment.status}</span>)
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">No hay historial de citas para esta bicicleta.</li>
        )}
      </ul>

      {!isInRepairOrMaintenance && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
            onClick={() => onEdit(bike)}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Editar
          </button>
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md"
            onClick={handleShowDeleteAlert}
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Eliminar
          </button>
        </div>
      )}

      {/* Alerta personalizada */}
      {showCustomAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Eliminar esta bicicleta?</h3>
            <p className="text-gray-700 mb-6">Esta acción es irreversible. ¿Estás seguro de que quieres eliminar esta máquina?</p>
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