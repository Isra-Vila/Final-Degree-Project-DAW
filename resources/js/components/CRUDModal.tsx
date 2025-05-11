import React from 'react';

interface CRUDModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  onSecondary?: () => void;
  secondaryText?: string;
  modalType: 'create' | 'edit' | 'view' | 'delete' | null;
  className?: string; 
}

const CRUDModal: React.FC<CRUDModalProps> = ({ title, children, onClose, onConfirm, confirmText, onSecondary, secondaryText, modalType, className }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-10 z-50"> 
      <div className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl ${className || ''}`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="overflow-y-auto max-h-[calc(100vh - 150px)]">{children}</div> 
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          {modalType === 'delete' && onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              {confirmText || 'Eliminar'}
            </button>
          )}
          {(modalType === 'create' || modalType === 'edit') && onConfirm && (
            <button
              type="submit"
              onClick={onConfirm}
              className={`px-4 py-2 ${modalType === 'create' ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-md hover:${modalType === 'create' ? 'bg-green-700' : 'bg-blue-700'}`}
            >
              {confirmText || (modalType === 'create' ? 'Crear' : 'Guardar')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRUDModal;