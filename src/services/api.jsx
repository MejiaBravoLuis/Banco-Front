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