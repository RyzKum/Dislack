import { create } from 'zustand';

interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
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