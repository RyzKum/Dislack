import { create } from 'zustand';

interface User {
  id: string,
  username: string,
}

interface StoreState {
  users: User[];
  user: User | null;
  addUser: (user: User) => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  users: [],
  user: null,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setUser: (user) => set({ user }),
}));