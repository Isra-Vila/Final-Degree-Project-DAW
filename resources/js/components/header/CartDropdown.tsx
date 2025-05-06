import React from 'react';

interface CartDropdownProps {
  showCartDropdown: boolean;
  cartDropdownRef: React.RefObject<HTMLDivElement | null>; // ✅ Permitir null
  hasCartItems: boolean;
}

export default function CartDropdown({ showCartDropdown, cartDropdownRef, hasCartItems }: CartDropdownProps) {
  if (!showCartDropdown || !hasCartItems) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800"
      ref={cartDropdownRef}
    >
      <div className="px-4 py-2">No hay elementos en la cesta.</div>
      {/* Puedes añadir aquí la lista de elementos de la cesta y un botón para ir al carrito */}
    </div>
  );
}