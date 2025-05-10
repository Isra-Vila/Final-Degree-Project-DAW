import React, { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/common/FormField";
import { motion } from "framer-motion";
import { User } from "../types/user";

interface RegisterPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterPage({ setIsAuthenticated }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const navigate = useNavigate();

  const backgroundImage = "/images/fondo_registro_ciclismo.jpg";

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role: "client",
      });

      const user: User = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      if (user && user.id) {
        navigate(`/client/${user.id}`);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      if (err?.response?.status === 422 && err?.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setGeneralError("Por favor, corrige los errores en el formulario.");
        console.error("Errores de validación:", err.response.data.errors);
      } else {
        setGeneralError("Error al registrarse. Intenta de nuevo más tarde.");
        console.error("Error en el registro:", err);
      }
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

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-[#F62364]"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Regístrate en <span className="text-[#F62364]">Tripasión</span>
          </h2>
          {generalError && (
            <motion.p
              className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-6 border border-red-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            >
              {generalError}
            </motion.p>
          )}
          <form onSubmit={handleRegister} className="space-y-6" noValidate> {/* <-- ¡AÑADIDO AQUÍ! */}
            <FormField
              label="Nombre Completo"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Introduce tu nombre"
              error={errors.name ? errors.name[0] : null}
            />
            <FormField
              label="Correo Electrónico"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
              error={errors.email ? errors.email[0] : null}
            />
            <FormField
              label="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mín. 6 caracteres"
              error={errors.password ? errors.password[0] : null}
            />
            <FormField
              label="Confirmar Contraseña"
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="Repite tu contraseña"
              error={errors.password_confirmation ? errors.password_confirmation[0] : null}
            />
            <motion.button
              type="submit"
              className="w-full bg-[#F62364] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#d81e56] transition-colors duration-300 shadow-md text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Registrarse
            </motion.button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-base">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Inicia Sesión Aquí
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;