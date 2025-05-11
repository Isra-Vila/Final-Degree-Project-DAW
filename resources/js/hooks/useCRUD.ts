import { useState, useEffect, useCallback } from 'react';
import axios from '../axiosInstance'; 

interface UseCRUDProps<T> {
  apiEndpoint: string;
  itemsPerPage?: number;
}

interface UseCRUDResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  modal: { type: 'create' | 'edit' | 'view' | 'delete' | null; data?: any } | null;
  formData: any;
  formError: string | null;
  currentPage: number;
  totalPages: number;
  setModal: React.Dispatch<React.SetStateAction<{ type: 'create' | 'edit' | 'view' | 'delete' | null; data?: any } | null>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setFormError: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: () => Promise<void>;
  openCreateModal: () => void;
  openEditModal: (item: T) => void;
  openViewModal: (item: T) => void;
  openDeleteModal: (id: number) => void;
  handleCloseModal: () => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; 
  handleCreate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>, id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handlePageChange: (page: number) => void;
}

const useCRUD = <T extends { id: number }>({ apiEndpoint, itemsPerPage = 10 }: UseCRUDProps<T>): UseCRUDResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ type: 'create' | 'edit' | 'view' | 'delete' | null; data?: any } | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiEndpoint}?page=${currentPage}&per_page=${itemsPerPage}`);
    
      setData(response.data.data || []);
      setTotalPages(response.data.last_page || 0); 
      setError(null);
    } catch (err: any) {
      setError("Hubo un error al cargar los datos.");
      
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateModal = useCallback(() => {
    setFormData({}); 
    setModal({ type: 'create' });
    setFormError(null);
  }, []);

  const openEditModal = useCallback((item: T) => {
    setFormData(item); 
    setModal({ type: 'edit', data: item });
    setFormError(null);
  }, []);

  const openViewModal = useCallback((item: T) => {
    setModal({ type: 'view', data: item });
  }, []);

  const openDeleteModal = useCallback((id: number) => {
    setModal({ type: 'delete', data: id });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(null);
    setFormData({});
    setFormError(null);
  }, []);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleCreate = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    try {
      await axios.post(apiEndpoint, formData);
      fetchData();
      handleCloseModal();
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        setFormError(errorMessages);
      } else {
        setFormError("Hubo un error al crear el elemento.");
      }
    }
  }, [apiEndpoint, formData, fetchData, handleCloseModal]);

  const handleUpdate = useCallback(async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setFormError(null);
    try {
      await axios.patch(`${apiEndpoint}/${id}`, formData);
      fetchData();
      handleCloseModal();
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        setFormError(errorMessages);
      } else {
        setFormError("Hubo un error al actualizar el elemento.");
      }
    }
  }, [apiEndpoint, formData, fetchData, handleCloseModal]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
      fetchData();
      handleCloseModal();
    } catch (err: any) {
      setError("Hubo un error al eliminar el elemento.");
      console.error(`useCRUD - Error al eliminar elemento de ${apiEndpoint} con ID ${id}:`, err);
      handleCloseModal();
    }
  }, [apiEndpoint, fetchData, handleCloseModal]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    loading,
    error,
    modal,
    formData,
    formError,
    currentPage,
    totalPages,
    setModal,
    setFormData,
    setFormError,
    setCurrentPage,
    fetchData,
    openCreateModal,
    openEditModal,
    openViewModal,
    openDeleteModal,
    handleCloseModal,
    handleFormChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    handlePageChange,
  };
};

export default useCRUD;