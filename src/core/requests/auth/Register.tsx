import axios from "axios";
import { RegisterData } from "../../../types/RegisterData";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de l'inscription. Veuillez réessayer.");
    console.error(error)
  }
};
