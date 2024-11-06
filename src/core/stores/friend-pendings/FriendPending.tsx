import { create } from "zustand";
import axios from "axios";

type FriendRequest = {
  id: string;
  senderId: string;
  startedAt: string;
};

interface FriendRequestStore {
  friendRequests: FriendRequest[];
  fetchFriendsRequests: () => void;
  acceptRequest: (id: string) => void;
}

export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  friendRequests: [],
  fetchFriendsRequests: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/social/friend-requests",
        { withCredentials: true }
      );
      set({ friendRequests: response.data });
    } catch (error) {
      console.error("Error fetching friend requests", error);
    }
  },
  acceptRequest: async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/social/friend-request/${id}/accept`,
        undefined,
        { withCredentials: true }
      );
      console.log("Accepted : " + response.status);
      set((state) => ({
        friendRequests: state.friendRequests.filter(
          (request) => request.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  },
}));

export default useFriendRequestStore;
