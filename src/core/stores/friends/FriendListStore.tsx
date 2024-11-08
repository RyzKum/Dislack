import { create } from 'zustand';
import axios from "axios";
import { Friend } from '../../../types/Friend';

interface FriendListStore {
  friends: Friend[];
  fetchFriends: () => void;
}

export const useFriendListStore = create<FriendListStore>((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const response = await axios.get('http://localhost:3000/social/friends', { withCredentials: true })
      set({ friends: response.data });
    } catch (error) {
      console.error("Error fetching friends list", error);
    }
  },
}));

export default useFriendListStore;