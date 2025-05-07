import React, { memo, useCallback } from 'react';

interface MechanicsChatProps {
  // Puedes definir props si necesitas pasar datos específicos al chat
}

const MechanicsChat: React.FC<MechanicsChatProps> = memo(() => {
  const mechanics = [
    { id: 1, name: 'Mecánico Juan' },
    { id: 2, name: 'Mecánico María' },
  ];

  const handleOpenChat = useCallback((mechanicId: number) => {
    console.log(`Abrir chat con el mecánico ${mechanicId}`);
    // ** Aquí implementarías la lógica para abrir el chat **
  }, []);

  return (
    <div className="w-1/4 pl-4">
      <h3 className="text-lg font-semibold mb-2">Mecánicos con Cita</h3>
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
});

export default MechanicsChat;