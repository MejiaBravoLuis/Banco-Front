import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerRequest } from "../../services"; // llamada API registro

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async ({ name, email, password, username }) => {
    setIsLoading(true);

    try {
      const userData = { name, email, password, username };

      const response = await registerRequest(userData);

      if (!response.data || !response.data.userDetails) {
        throw new Error("Error al obtener datos del usuario.");
      }

      toast.success("Usuario registrado correctamente (pendiente activación)");
      navigate("/"); // ruta a login o home
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        "Ocurrió un error al registrar, intenta de nuevo"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
