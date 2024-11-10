import { create } from 'zustand';
import axios from "axios";
import { Friend } from '../../../types/Friend';

interface FriendListStore {
  friends: Friend[];
  fetchFriends: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useFriendListStore = create<FriendListStore>((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const response = await axios.get(`${API_URL}/social/friends`, { withCredentials: true })
      set({ friends: response.data });
    } catch (error) {
      console.error("Error fetching friends list", error);
    }
  },
}));

export default useFriendListStore;