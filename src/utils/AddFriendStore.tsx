import { create } from 'zustand';
import axios from "axios";

interface AddFriendStore {
  hint: string;
  sendRequest: (receiverId: string, currUserId: string) => void;
  setHint: (hint: string) => void;
}

export const useAddFriendStore = create<AddFriendStore>((set) => ({
  hint: '',
  sendRequest: async (receiverId, currUserId) => {
    if (currUserId === receiverId) {
      set({ hint: "You can't add yourself!" });
    } else {
      try {
        const response = await axios.post(`http://localhost:3000/social/friend-request/${currUserId}`, { receiverId }, { withCredentials: true });
        console.log("Send friend request: " + response.status);
        set({ hint: '' });
      } catch (error) {
        set({ hint: "Error occurred during friend request." });
        console.error("Error during friend request", error);
      }
    }
  },
  setHint: (hint) => set({ hint }),
}));

export default useAddFriendStore;