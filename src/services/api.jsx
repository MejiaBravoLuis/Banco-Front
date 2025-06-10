import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/BancoPenguin/v1/',
  timeout: 5000
});

apiClient.interceptors.request.use(
  (config) => {
    const useUserDetails = localStorage.getItem('user');

    if (useUserDetails) {
      const token = JSON.parse(useUserDetails).token;
      config.headers['x-token'] = token; 
    }

    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export const login = async (data) => {
  try {
    return await apiClient.post('auth/login', data);
  } catch (e) {
    return { error: true, e };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('auth/register', data);
  } catch (e) {
    return { error: true, e };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('user/me');
    return response.data;
  } catch (e) {
    console.error("Error al obtener el perfil del usuario:", e);
    return { error: true, e };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('user/');
    return { data: response.data, error: false };
  } catch (e) {
    console.error("Error al obtener los usuarios:", e);
    return { data: null, error: true, e };
  }
};

export const forgotPassword = async (email) => {
  try {
    return await apiClient.post("user/forgot-password", { email });
  } catch (e) {
    return { error: true, e };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    return await apiClient.post(`user/reset-password/${token}`, { password: newPassword });
  } catch (e) {
    return { error: true, e };
  }
};

export const getPendingUsers = async () => {
  try {
    const response = await apiClient.get('user/pending');
    return { data: response.data.users, error: false };
  } catch (e) {
    console.error("Error al obtener usuarios pendientes:", e);
    return { data: null, error: true, e };
  }
};

export const deleteUserByAdmin = async (id) => {
  console.log(id)
  try {
    const response = await apiClient.delete(`user/${id}`);
    return { data: response.data, error: false };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return {
      data: null,
      error: true,
      msg: error.response?.data?.msg || "Error al eliminar usuario",
    };
  }
};

export const acceptUser = async (userId) => {
  try {
    const response = await apiClient.put(`user/aceptar/${userId}`);
    return { data: response.data, error: false };
  } catch (e) {
    console.error("Error al aceptar usuario:", e);
    return { data: null, error: true, e };
  }
};
export const getMyAccounts = async () => {
  try {
    const response = await apiClient.get("account/mias");
    return response.data.cuentas || []; 
  } catch (e) {
    console.error("Error al obtener las cuentas:", e);
    return [];
  }
};


export const createDeposit = async (fromAccount, toAccount, amount, description = "") => {
  try {
    const response = await apiClient.post('movement/crear', {
      fromAccount,
      toAccount,
      amount,
      description
    });
    return response.data;
  } catch (e) {
    console.error("Error al crear el depósito:", e);
    throw e;
  }
};

export const getMyMovements = async () => {
  try {
    const response = await apiClient.get('movement/mios');
    return response.data || [];
  } catch (e) {
    console.error("Error al obtener movimientos del usuario:", e);
    return [];
  }
};

export const getAllActiveMovements = async () => {
  try {
    const response = await apiClient.get('movement/activos');
    return response.data;
  } catch (e) {
    console.error("Error al obtener movimientos activos:", e);
    return [];
  }
};

export const getAllCanceledMovements = async () => {
  try {
    const response = await apiClient.get('movement/cancelados');
    return response.data;
  } catch (e) {
    console.error("Error al obtener movimientos cancelados:", e);
    return [];
  }
};
export const cancelMovement = async (id) => {
  try {
    const response = await apiClient.put(`movement/cancelar/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error al cancelar el movimiento:", e);
    throw e;
  }
};

export const updateProfile = async (data) => {
  try{
    return await apiClient.put("/user/me", data); 
  }catch (e) {
    return { error: true, e };
  }
};
