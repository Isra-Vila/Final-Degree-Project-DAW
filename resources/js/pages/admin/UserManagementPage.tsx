import React from 'react';
import useCRUD from '../../hooks/useCRUD';
import DataTable from '../../components/DataTable';
import UserForm from '../../components/forms/UserForm'; 
import { User } from '../../types/user';


const UserManagementPage: React.FC = () => {
  const {
    data: users,
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
  } = useCRUD<User>({ apiEndpoint: '/admin/users' });

  const userColumns = [
    { header: 'ID', render: (user: User) => user.id },
    { header: 'Nombre', render: (user: User) => user.name },
    { header: 'Correo Electrónico', render: (user: User) => user.email },
    { header: 'Roles', render: (user: User) => user.roles.map((role) => role.name).join(', ') },
  ];

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openCreateModal}
      >
        Crear Usuario
      </button>

      <DataTable
        data={users}
        columns={userColumns}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
            {modal.type === 'create' && (
              <>
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
                <form onSubmit={handleCreate}>
                  <UserForm formData={formData} onFormChange={handleFormChange} isEditMode={false} formError={formError} />
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Crear
                    </button>
                  </div>
                </form>
              </>
            )}

            {modal.type === 'edit' && modal.data && (
              <>
                <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                <form onSubmit={(e) => handleUpdate(e, modal.data.id)}>
                  <UserForm formData={formData} onFormChange={handleFormChange} isEditMode={true} formError={formError} />
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </>
            )}

            {modal.type === 'view' && modal.data && (
              <>
                <h2 className="text-xl font-bold mb-4">Detalles del Usuario</h2>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {modal.data.id}</p>
                  <p><strong>Nombre:</strong> {modal.data.name}</p>
                  <p><strong>Correo Electrónico:</strong> {modal.data.email}</p>
                  <p><strong>Roles:</strong> {modal.data.roles.map((role: any) => role.name).join(', ')}</p>
                  <p><strong>Creado en:</strong> {new Date(modal.data.created_at).toLocaleString()}</p>
                  <p><strong>Última actualización:</strong> {new Date(modal.data.updated_at).toLocaleString()}</p>
                </div>
                <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                  Cerrar
                </button>
              </>
            )}

            {modal.type === 'delete' && modal.data !== undefined && ( 
              <>
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p>&iquest;Est&aacute;s seguro de que deseas eliminar a este usuario?</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(modal.data)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;