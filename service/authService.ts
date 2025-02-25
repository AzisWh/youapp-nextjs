import axiosInstance from './axiosInstace';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthData {
  email: string;
  username: string;
  password: string;
}

export const loginFunction = async (data: AuthData) => {
  const res = await axiosInstance.post(`${API_URL}/api/login`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

export const register = async (data: AuthData) => {
  const res = await axiosInstance.post(`${API_URL}/api/register`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
