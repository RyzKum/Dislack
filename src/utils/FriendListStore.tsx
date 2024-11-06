import { create } from 'zustand';
import axios from "axios";

interface FriendListStore {
  friends: string[];
  fetchFriends: () => void;
}

export const useFriendListStore = create<FriendListStore>((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const response = await axios.get("http://localhost:3000/social/friends");
      set({ friends: response.data });
    } catch (error) {
      console.error("Error fetch friends list");
    }
  },
}));

export default useFriendListStore;
