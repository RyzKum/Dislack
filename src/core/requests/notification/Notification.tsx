import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useNotifications = (onNotification: (eventType: string, data: any) => void) => {
  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/notifications`, { withCredentials: true });

    eventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    const handleEvent = (event: MessageEvent, eventType: string) => {
      const data = JSON.parse(event.data);
      onNotification(eventType, data);
    };

    eventSource.addEventListener('friend-request-received', (event) => handleEvent(event, 'friend-request-received'));
    eventSource.addEventListener('friend-request-accepted', (event) => handleEvent(event, 'friend-request-accepted'));
    eventSource.addEventListener('message-received', (event) => handleEvent(event, 'message-received'));

    return () => {
      eventSource.close();
    };
  }, [onNotification]);
};