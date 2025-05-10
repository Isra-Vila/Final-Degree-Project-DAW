import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axiosInstance';
import { Bike } from '../../types/bike';
import { motion, AnimatePresence } from 'framer-motion';

const ClientBikePage: React.FC = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

    useEffect(() => {
        const fetchClientBikes = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all bikes for the client
                const response = await api.get<Bike[]>('/client/bikes');
                setBikes(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'No se pudieron cargar tus bicicletas.');
            } finally {
                setLoading(false);
            }
        };
        fetchClientBikes();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const handleBikeClick = async (bike: Bike) => {
      setLoading(true); // Set loading to true before fetching details
        try {
            // Fetch the bike details with appointments.  Adjust the endpoint as necessary for your API.
            const response = await api.get<Bike>(`/client/bikes/${bike.id}`); //  <- Ajusta esto
            setSelectedBike(response.data);
        } catch (error: any) {
            setError("No se pudieron cargar los detalles de la bicicleta"); //Set error message
            console.error("Error fetching bike details", error);
        } finally {
          setLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedBike(null);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-lg text-gray-600">Cargando tus bicicletas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-red-500">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (bikes.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <p className="mb-4">Aún no tienes ninguna bicicleta registrada.</p>
                    <Link to="/client/build-bike" className="text-blue-500 hover:underline">
                        ¡Registra tu propia bicicleta o ármala por piezas!
                    </Link>
                </div>
            </div>
        );
    }

  if (selectedBike) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#F62364]"
        >
          <button  //REPLACED - Was causing errors
            onClick={handleBackToList}
            className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <line x1="19" x2="5" y1="12" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver a la lista
          </button>
          <h1 className="text-3xl font-bold mb-4">
            {selectedBike.brand} {selectedBike.model}
          </h1>
          <p className="text-gray-700">ID: {selectedBike.id}</p>
          <p className="text-gray-700">Tipo: {selectedBike.type}</p>
          {selectedBike.year && <p className="text-gray-700">Año: {selectedBike.year}</p>}
          {selectedBike.frame && <p className="text-gray-700">Cuadro: {selectedBike.frame}</p>}
          {selectedBike.description && (
            <p className="text-gray-700">Descripción: {selectedBike.description}</p>
          )}
          <h2 className="text-2xl font-semibold mt-4">Detalles de la Bicicleta</h2>
          <p className="text-gray-700">
            Handlebar: {selectedBike.handlebar || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Stem: {selectedBike.stem || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Saddle: {selectedBike.saddle || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Suspension: {selectedBike.suspension || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Pedals: {selectedBike.pedals || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Chain: {selectedBike.chain || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Tyre: {selectedBike.tyre || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Rim: {selectedBike.rim || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Tube: {selectedBike.tube || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Brakes: {selectedBike.brakes || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Estado de Reparación: {selectedBike.repair_state || 'No especificado'}
          </p>
          <p className="text-gray-700">
            Estado de Mantenimiento: {selectedBike.maintenance_state || 'No especificado'}
          </p>

          <h2 className="text-2xl font-semibold mt-4">Citas</h2>
          {selectedBike.appointments && selectedBike.appointments.length > 0 ? (
            <ul>
              {selectedBike.appointments.map((appointment) => (
                <li key={appointment.id} className="mb-2">
                  <p className="text-gray-700">
                    ID: {appointment.id}, Título: {appointment.title}, Inicio:{' '}
                    {appointment.start_time}, Fin: {appointment.end_time}
                  </p>
                  {/* Aquí puedes mostrar más detalles de la cita */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No hay citas para esta bicicleta.</p>
          )}
        </motion.div>
      </div>
    );
  }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mis Bicicletas</h1>
            <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {bikes.map((bike) => (
                  <motion.div
                    key={bike.id}
                    className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#F62364] transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
                    variants={itemVariants}
                    onClick={() => handleBikeClick(bike)}
                  >
                    <h2 className="text-xl font-semibold mb-2">{bike.brand} {bike.model}</h2>
                    <p className="text-gray-700">ID: {bike.id}</p>
                     <p className="text-gray-700">Tipo: {bike.type}</p>
                    {bike.year && <p className="text-gray-700">Año: {bike.year}</p>}
                    {bike.frame && <p className="text-gray-700">Cuadro: {bike.frame}</p>}
                    {/* Agrega aquí un resumen de los detalles de la bicicleta para mostrar en la lista */}
                  </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ClientBikePage;
