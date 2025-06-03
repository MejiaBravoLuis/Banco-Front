import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from '../shared/hooks';
import toast from "react-hot-toast";

import iconEmail from '../assets/icons/3.png';
import iconPassword from '../assets/icons/5.png';

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    if (!data.email) {
      toast.error("El email es obligatorio");
      return;
    }
    if (!data.password) {
      toast.error("La contraseña es obligatoria");
      return;
    }

    try {
      // Solo incluye codigoBanco si no está vacío o null
      const loginData = {
        email: data.email,
        username: null,
        password: data.password,
      };

      if (data.codigoBanco && data.codigoBanco.trim() !== "") {
        loginData.codigoBanco = data.codigoBanco;
      }

      await login(loginData);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Correo o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta más tarde. O Tienes que mandar tu codigo de banco.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Iniciar Sesión</h2>

      <div className="container-input">
        <img src={iconEmail} alt="email icon" className="input-icon" />
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email && <p style={{ color: "red" }}>El email es obligatorio</p>}

      <div className="container-input">
        <img src={iconPassword} alt="password icon" className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <p style={{ color: "red" }}>La contraseña es obligatoria</p>
      )}

      <div className="container-input">
        <img src={iconPassword} alt="codigo banco icon" className="input-icon" />
        <input
          type="text"
          placeholder="Código de Banco (opcional)"
          {...register("codigoBanco")}
        />
      </div>

      <a href="resetPassword">¿Olvidaste tu contraseña?</a>
      <a href="https://www.canva.com/design/DAGoT27eSfg/2VEh0hCMro-6RMWpdI6upA/edit?utm_content=DAGoT27eSfg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Manual de Usuario</a>
      <button type="submit" className="button" disabled={isLoading}>
        INICIAR SESIÓN
      </button>
    </form>
  );
};
