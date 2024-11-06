import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  return await axios.post(`${API_URL}/auth/login`, data, {
    withCredentials: true,
  });
};

export const getUserData = async () => {
  return await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
};
