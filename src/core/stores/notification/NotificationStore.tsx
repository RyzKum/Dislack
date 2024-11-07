import { create } from "zustand";

interface Notification {
  id: number;
  eventType: string;
  data: any;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (eventType: string, data: any) => void;
  removeNotification: (id: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (eventType: string, data: any) => {
    const id = Date.now();
    set((state) => {
      const newNotifications = [{ id, eventType, data }, ...state.notifications];
      if (newNotifications.length > 5) {
        newNotifications.pop();
      }
      return { notifications: newNotifications };
    });
  },
  removeNotification: (id: number) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },
}));