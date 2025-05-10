import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ClientWorkshopPageProps {
  user: any; // Prop para la información del usuario
}

const ClientWorkshopPage: React.FC<ClientWorkshopPageProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleRequestAppointment = () => {
    navigate('/workshop/client/dates'); // ⭐ ¡Ruta corregida aquí!
  };

  const handleCreateBike = () => {
    navigate('/workshop/client/build-bike'); // ⭐ ¡Ruta corregida aquí!
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">¡Bienvenido al Taller, {user?.name || 'Cliente'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-blue-500 text-white rounded-lg shadow-lg p-6 cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          onClick={handleRequestAppointment}
        >
          <h2 className="text-xl font-semibold mb-2">Pedir Cita para tu Bici</h2>
          <p>Agenda una cita con nuestros mecánicos expertos.</p>
        </div>
        <div
          className="bg-green-500 text-white rounded-lg shadow-lg p-6 cursor-pointer hover:bg-green-600 transition-colors duration-300"
          onClick={handleCreateBike}
        >
          <h2 className="text-xl font-semibold mb-2">Crea tu Propia Bici</h2>
          <p>Diseña y configura tu bicicleta ideal pieza por pieza.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientWorkshopPage;