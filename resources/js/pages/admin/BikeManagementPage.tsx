import React, { FormEvent, useCallback } from 'react';
import useCRUD from '../../hooks/useCRUD';
import DataTable from '../../components/DataTable';
import CRUDModal from '../../components/CRUDModal';
import BikeForm from '../../components/forms/BikeForm';
import { Bike } from '../../types/bike';

const BikeManagementPage: React.FC = () => {
  const {
    data: bikes,
    loading,
    error,
    modal,
    formData,
    formError,
    handleCloseModal,
    handleFormChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    openCreateModal,
    openEditModal,
    openViewModal,
    openDeleteModal,
    currentPage,
    totalPages,
    handlePageChange,
  } = useCRUD<Bike>({ apiEndpoint: '/admin/bikes' });

  const bikeColumns = [
    { header: 'ID', render: (bike: Bike) => bike.id },
    { header: 'Marca', render: (bike: Bike) => bike.brand },
    { header: 'Modelo', render: (bike: Bike) => bike.model },
    { header: 'Año', render: (bike: Bike) => bike.year || 'N/A' },
    { header: 'Propietario', render: (bike: Bike) => bike.owner?.name || 'N/A' },
    { header: 'Mecánico', render: (bike: Bike) => bike.mechanic?.name || 'N/A' },
    { header: 'Estado Reparación', render: (bike: Bike) => bike.repair_state || 'N/A' },
    { header: 'Estado Mantenimiento', render: (bike: Bike) => bike.maintenance_state || 'N/A' },
  ];

  const handleCreateWrapper = useCallback(() => {
    const form = document.querySelector('#createBikeForm');
    if (form) {
      (form as HTMLFormElement).dispatchEvent(new Event('submit'));
    }
  }, [handleCreate]);

  const handleUpdateWrapper = useCallback(() => {
    const form = document.querySelector('#editBikeForm');
    if (form) {
      (form as HTMLFormElement).dispatchEvent(new Event('submit'));
    }
  }, [handleUpdate, modal?.data?.id]);

  if (loading) {
    return <div>Cargando bicicletas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Bicicletas</h1>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openCreateModal}
      >
        Crear Bicicleta
      </button>

      <DataTable
        data={bikes}
        columns={bikeColumns}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onView={openViewModal}
      />

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          >
            Siguiente
          </button>
        </div>
      )}

      {modal && (
        <CRUDModal
          title={
            modal.type === 'create'
              ? 'Crear Bicicleta'
              : modal.type === 'edit'
              ? 'Editar Bicicleta'
              : modal.type === 'view'
              ? 'Detalles de la Bicicleta'
              : 'Eliminar Bicicleta'
          }
          onClose={handleCloseModal}
          modalType={modal.type}
          onConfirm={
            modal.type === 'create'
              ? handleCreateWrapper
              : modal.type === 'edit'
              ? handleUpdateWrapper
              : modal.type === 'delete'
              ? () => handleDelete(modal.data)
              : undefined
          }
          confirmText={
            modal.type === 'create'
              ? 'Crear'
              : modal.type === 'edit'
              ? 'Guardar'
              : modal.type === 'delete'
              ? 'Eliminar'
              : undefined
          }
        >
          {modal.type === 'create' && (
            <form id="createBikeForm" onSubmit={handleCreate}>
              <BikeForm formData={formData} onFormChange={handleFormChange} isEditMode={false} formError={formError} />
            </form>
          )}
          {modal.type === 'edit' && modal.data && (
            <form id="editBikeForm" onSubmit={(e) => handleUpdate(e, modal.data.id)}>
              <BikeForm formData={formData} onFormChange={handleFormChange} isEditMode={true} formError={formError} />
            </form>
          )}
          {modal.type === 'view' && modal.data && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {modal.data.id}</p>
              <p><strong>Marca:</strong> {modal.data.brand}</p>
              <p><strong>Modelo:</strong> {modal.data.model}</p>
              <p><strong>Año:</strong> {modal.data.year || 'N/A'}</p>
              <p><strong>Propietario:</strong> {modal.data.owner?.name || 'N/A'}</p>
              <p><strong>Mecánico:</strong> {modal.data.mechanic?.name || 'N/A'}</p>
              <p><strong>Estado Reparación:</strong> {modal.data.repair_state || 'N/A'}</p>
              <p><strong>Estado Mantenimiento:</strong> {modal.data.maintenance_state || 'N/A'}</p>
              <p>
                <strong>Creado en:</strong> {modal.data.created_at ? new Date(modal.data.created_at).toLocaleString() : 'N/A'}
              </p>
              <p>
                <strong>Última actualización:</strong> {modal.data.updated_at ? new Date(modal.data.updated_at).toLocaleString() : 'N/A'}
              </p>
            </div>
          )}
          {modal.type === 'delete' && modal.data !== undefined && (
            <p>&iquest;Est&aacute;s seguro de que deseas eliminar esta bicicleta?</p>
          )}
          {formError && modal.type !== 'view' && <p className="text-red-600 mt-4">{formError}</p>}
        </CRUDModal>
      )}
    </div>
  );
};

export default BikeManagementPage;