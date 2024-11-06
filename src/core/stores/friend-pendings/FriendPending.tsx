import { create } from "zustand";
import axios from "axios";
import { FriendRequest } from "../../../types/FriendRequest";
import { acceptFriendRequest, fetchFriendRequests } from "../../requests/friend/Friend";
interface FriendRequestStore {
  friendRequests: FriendRequest[];
  fetchFriendsRequests: () => void;
  acceptRequest: (id: string) => void;
}

export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  friendRequests: [],
  fetchFriendsRequests: async () => {
    try {
      const requests = await fetchFriendRequests();
      set({ friendRequests: requests });
    } catch (error) {
      console.error("Error fetching friend requests", error);
    }
  },
  acceptRequest: async (id) => {
    try {
      await acceptFriendRequest(id);
      set((state) => ({
        friendRequests: state.friendRequests.filter(
          (request) => request.id !== id
        ),
      }));
      console.log("Request accepted.");
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  },
}));

export default useFriendRequestStore;
