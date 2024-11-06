import Notification from "./Notification";
import { Link } from "react-router-dom";

interface NotificationContainerProps {
  notifications: {
    message: string;
    type: "message" | "friend_request" | "request_accepted";
  }[];
  removeNotification: (index: number) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  removeNotification,
}) => {
  return (
    <div className="fixed top-4 right-4 space-y-4 w-80">
      {notifications
        .slice(-6)
        .reverse()
        .map((notification, index) => (
          <Notification
            key={index}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notifications.length - 1 - index)}
          />
        ))}
      {notifications.length > 6 && (
        <Link
          to="/activity"
          className="block bg-gray-200 text-center text-blue-500 py-2 rounded shadow-lg"
        >
          See all notifications
        </Link>
      )}
    </div>
  );
};

export default NotificationContainer;
