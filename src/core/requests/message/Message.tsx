import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (messageId: string, receiverId: string, content: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/${messageId}/send`,
      { receiverId, content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const fetchMessages = async(userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching messages failed:", error);
    throw error;
  }
};
