import React from 'react';

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  onView?: (item: T) => void;
}

const DataTable = <T extends { id: number }>({ data, columns, onEdit, onDelete, onView }: DataTableProps<T>) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header} className="py-2 px-4 border-b">{column.header}</th>
          ))}
          <th className="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={`${item.id}-${column.header}`} className="py-2 px-4 border-b">{column.render(item)}</td>
            ))}
            <td className="py-2 px-4 border-b">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => onEdit(item)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => onDelete(item.id)}
              >
                Eliminar
              </button>
              {onView && (
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => onView(item)}
                >
                  Consultar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;