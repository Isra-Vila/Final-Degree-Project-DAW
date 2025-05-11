import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // URL correcta de la API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Interceptor para añadir el token a las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;