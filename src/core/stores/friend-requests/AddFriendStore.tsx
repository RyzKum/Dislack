import { create } from 'zustand';
import axios, { AxiosError } from "axios";
import { sendFriendRequest } from '../../requests/friend/Friend';

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
        await sendFriendRequest(currUserId, receiverId).then(
          status => {
            console.log("Send friend request: " + status);
            if(status == 201) {
              set({ hint: 'Friend request sent !' });
            } else {
              set({ hint: 'Error occurred during friend request. ERR_' + status });
            }
          }
        );
      } catch (error) {
        set({ hint: "Error occurred during friend request: " + (error as AxiosError).code});
        console.error("Error during friend request", error);
      }
    }
  },
  setHint: (hint) => set({ hint }),
}));

export default useAddFriendStore;