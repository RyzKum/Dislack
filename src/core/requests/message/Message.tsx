import axios from "axios";
import { MessageType } from "../../../types/Message";

const API_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (messageId: string, receiverId: string, content: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/${messageId}/send`,
      { receiverId, content },
      { withCredentials: true }
    );
    return response;
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
    const messages = response.data
    messages.forEach((message: MessageType) => {
      message.sentStatus = 'sent'
    });
    return messages;
  } catch (error) {
    console.error("Fetching messages failed:", error);
    throw error;
  }
};
