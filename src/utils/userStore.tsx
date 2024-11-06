import { create } from 'zustand';

interface User {
  id: string,
  username: string,
}

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));