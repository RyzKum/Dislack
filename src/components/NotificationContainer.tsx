import { useEffect, useState } from "react";
import { useNotifications } from "../core/requests/notification/Notification";
import { useNotificationStore } from "../core/stores/notification/NotificationStore";
import message from "../assets/message.mp3";
import posi from "../assets/posi.wav";
import friend from "../assets/positive-friend.wav";

const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const [removing, setRemoving] = useState<number[]>([]);


// Pour les notifications persistantes (qui ne disparaissent pas automatiquement) : 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      notifications.forEach((notification) => {
        if (!removing.includes(notification.id)) {
          setRemoving((prev) => [...prev, notification.id]);
          setTimeout(() => {
            removeNotification(notification.id);
            setRemoving((prev) => prev.filter((removingId) => removingId !== notification.id));
          }, 500);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications, removing, removeNotification]);

  const playSound = (eventType: string) => {
    let soundUrl = "";
    switch (eventType) {
      case "friend-request-received":
        soundUrl = friend;
        break;
      case "friend-request-accepted":
        soundUrl = posi;
        break;
      case "message-received":
        soundUrl = message;
        break;
      default:
        return;
    }
    const audio = new Audio(soundUrl);
    audio.play();
  };

  useNotifications((eventType, data) => {
    // console.log(`Adding notification: ${eventType}`, data);
    const id = Date.now();
    useNotificationStore.getState().addNotification(eventType, { id, ...data });
    playSound(eventType);
    setTimeout(() => {
      setRemoving((prev) => [...prev, id]);
      setTimeout(() => {
        removeNotification(id);
        setRemoving((prev) => prev.filter((removingId) => removingId !== id));
      }, 500);
    }, 2000);
  });

  // console.log("Rendering NotificationContainer with notifications:", notifications);

  return (
    <div className="fixed top-0 right-0 m-4 space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification mb-1 p-4 rounded-lg text-white shadow-lg transition-transform duration-500 ${
            removing.includes(notification.id) ? "slide-out" : ""
          } bg-blue-500`}
        >
          <div className="font-bold capitalize">
            {notification.eventType.replace(/-/g, ' ')}
          </div>
          <div className="mt-1">
            {notification.eventType === "friend-request-received" && (
              <div>User ID: {notification.data.senderId}</div>
            )}
            {notification.eventType === "friend-request-accepted" && (
              <div>Sender ID: {notification.data.userId}</div>
            )}
            {notification.eventType === "message-received" && (
              <>
                <div>Content: {notification.data.content}</div>
                <div>Receiver ID: {notification.data.receiverId}</div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;