import axios from "axios";

const API_URL = process.env.API_URL;

interface FormData {
  username: string;
  password: string;
}

export const registerUser = async (data: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de l'inscription. Veuillez réessayer.");
  }
};
