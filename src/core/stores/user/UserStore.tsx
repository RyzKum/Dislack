import { create } from "zustand";
import { User } from "../../../types/User";


interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
