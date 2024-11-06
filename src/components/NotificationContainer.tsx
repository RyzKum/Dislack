import { useNotifications } from "../core/requests/notification/Notification";
import { useNotificationStore } from "../core/stores/notification/NotificationStore";

const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  useNotifications((eventType, data) => {
    // console.log(`Adding notification: ${eventType}`, data);
    useNotificationStore.getState().addNotification(eventType, data);
  });

  // console.log("Rendering NotificationContainer with notifications:", notifications);

  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-blue-500 text-white shadow-lg rounded-lg max-w-xs">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="mb-1">
            <strong>{notification.eventType}:</strong> {JSON.stringify(notification.data)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationContainer;