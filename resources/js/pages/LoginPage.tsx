import React, { useState, useEffect } from "react";
import api from "../axiosInstance";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { FormFieldProps } from "../types/form";
import FormField from "../components/common/FormField";

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
}

function LoginPage({ setIsAuthenticated, setUserRole }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userString && token) {
      try {
        const user = JSON.parse(userString);
        setIsAuthenticated(true);

        if (user && user.roles && user.roles.length > 0) {
          const roleName = user.roles[0].name;
          setUserRole(roleName);

          if (roleName === "admin") {
            navigate("/admin/users");
          } else if (roleName === "client") {
            navigate("/client");
          } else if (roleName === "mechanic") {
            navigate("/mechanic");
          } else {
            navigate("/");
          }
        } else {
          setUserRole(null);
          navigate("/");
        }
      } catch (e) {
        console.error("Error al parsear la información del usuario desde localStorage", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserRole(null);
        navigate("/login");
      }
    }
  }, [navigate, setIsAuthenticated, setUserRole]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsAuthenticated(true);

      const user = response.data.user;
      if (user && user.roles && user.roles.length > 0) {
        const roleName = user.roles[0].name;
        setUserRole(roleName);

        if (roleName === "admin") {
          navigate("/admin/users");
        } else if (roleName === "client") {
          navigate("/client");
        } else if (roleName === "mechanic") {
          navigate("/mechanic");
        } else {
          navigate("/");
        }
      } else {
        setUserRole(null);
        navigate("/");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data.message || "Credenciales incorrectas. Intenta de nuevo.");
        } else {
          setError("Error en la solicitud. Intenta de nuevo.");
        }
      } else {
        setError("Ocurrió un error inesperado.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <FormField
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              label="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
      {/* Sección del footer eliminada */}
    </div>
  );
}

export default LoginPage;