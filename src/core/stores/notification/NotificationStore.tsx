import { create } from "zustand";

interface Notification {
  eventType: string;
  data: any;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (eventType: string, data: any) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (eventType: string, data: any) => {
    console.log(`Adding notification to store: ${eventType}`, data);
    set((state) => ({
      notifications: [...state.notifications, { eventType, data }],
    }));
  },
}));