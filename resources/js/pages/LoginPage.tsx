import React, { useState, useEffect } from "react";
import api from "../axiosInstance";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/common/FormField";
import { motion } from "framer-motion";
import { User } from "../types/user";

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
}

function LoginPage({ setIsAuthenticated, setUserRole }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fondo de imagen
  const backgroundImage = "/images/fondo_login_ciclismo.jpg";

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userString && token) {
      try {
        const user: User = JSON.parse(userString);
        setIsAuthenticated(true);

        if (user && user.roles && user.roles.length > 0) {
          const roleName = user.roles[0].name;
          setUserRole(roleName);

          // Redirección basada en rol
          if (roleName === "admin") {
            navigate("/admin/users");
          } else if (roleName === "client") {
            navigate(`/client/${user.id}`);
          } else if (roleName === "mechanic") {
            navigate(`/mechanic/${user.id}`); // Redirige al perfil del mecánico con su ID
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
      const user: User = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);

      if (user && user.roles && user.roles.length > 0) {
        const roleName = user.roles[0].name;
        setUserRole(roleName);

        // Redirección basada en rol
        if (roleName === "admin") {
          navigate("/admin/users");
        } else if (roleName === "client") {
          navigate(`/client/${user.id}`);
        } else if (roleName === "mechanic") {
          navigate(`/mechanic/${user.id}`); // Redirige al perfil del mecánico con su ID
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
          if (err.response.status === 422 && err.response.data.errors) {
            const validationErrors = Object.values(err.response.data.errors).flat();
            setError(validationErrors.join(' '));
          } else {
            setError(err.response.data.message || "Credenciales incorrectas. Intenta de nuevo.");
          }
        } else {
          setError("Error en la solicitud. Intenta de nuevo.");
        }
      } else {
        setError("Ocurrió un error inesperado.");
      }
      console.error("Login error:", err);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <motion.div
        className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-[#F62364]"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Iniciar Sesión en <span className="text-[#F62364]">Tripasión</span></h2>
        {error && (
          <motion.p
            className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-6 border border-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <FormField
            label="Correo Electrónico"
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
          <motion.button
            type="submit"
            className="w-full bg-[#F62364] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#d81e56] transition-colors duration-300 shadow-md text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar Sesión
          </motion.button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-base">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Regístrate Aquí
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
