import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useNotifications = (onNotification: (eventType: string, data: unknown) => void) => {
  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/notifications`, { withCredentials: true });

    const handleEvent = (event: MessageEvent, eventType: string) => {
      const data = JSON.parse(event.data);
      let filteredData;
      switch (eventType) {
        case 'friend-request-received':
          filteredData = { senderId: data.senderId };
          break;
        case 'friend-request-accepted':
          filteredData = { userId: data.userId };
          break;
        case 'message-received':
          filteredData = { content: data.content, receiverId: data.receiverId };
          break;
        default:
          filteredData = data;
      }
      onNotification(eventType, filteredData);
    };
    eventSource.addEventListener('friend-request-received', (event) => handleEvent(event, 'friend-request-received'));
    eventSource.addEventListener('friend-request-accepted', (event) => handleEvent(event, 'friend-request-accepted'));
    eventSource.addEventListener('message-received', (event) => handleEvent(event, 'message-received'));

    return () => {
      eventSource.close();
    };
  }, [onNotification]);
};