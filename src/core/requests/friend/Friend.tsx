import axios from "axios";
import { FriendRequest } from "../../../types/FriendRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await axios.get(`${API_URL}/social/friend-requests`, {
    withCredentials: true,
  });
  return response.data;
};

export const acceptFriendRequest = async (id: string): Promise<void> => {
  await axios.post(`${API_URL}/social/friend-request/${id}/accept`, undefined, {
    withCredentials: true,
  });
};

export const sendFriendRequest = async (currUserId: string, receiverId: string): Promise<number> => {
  const response = await axios.post(
    `${API_URL}/social/friend-request/${currUserId}`,
    { receiverId },
    { withCredentials: true }
  );
  return response.status;
};