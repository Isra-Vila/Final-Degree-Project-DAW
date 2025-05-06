import React, { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FormFieldProps } from "../types/form"; // Importa la interfaz
import FormField from "../components/common/FormField"; // Importa el componente

interface ValidationErrorData {
  errors: {
    [key: string]: string[];
  };
  message: string;
}

interface RegisterPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterPage({ setIsAuthenticated }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      const user = response.data.user;
      if (user && user.roles && user.roles.length > 0) {
        const roleNames = user.roles.map((role: any) => role.name);
        if (roleNames.includes("admin")) {
          navigate("/workshop");
        } else if (roleNames.includes("client")) {
          navigate("/client");
        } else if (roleNames.includes("mechanic")) {
          navigate("/mechanic");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err: any) {
      if (err?.response?.status === 422 && err?.response?.data?.errors) {
        setError("Error de validación. Por favor, revisa los campos.");
        console.error("Errores de validación:", err.response.data.errors);
      } else {
        setError("Error al registrarse. Intenta de nuevo más tarde.");
        console.error("Error en el registro:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registro de cliente</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <FormField
            label="Nombre"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <FormField
            label="Confirmar Contraseña"
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya estás registrado?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;