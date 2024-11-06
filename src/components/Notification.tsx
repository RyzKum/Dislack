import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Notif from "../assets/posi.wav";
import Message from "../assets/message.mp3";
import Friend from "../assets/positive-friend.wav";

interface NotificationProps {
  message: string;
  type: 'message' | 'friend_request' | 'request_accepted';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    let audioSrc = '';
    switch (type) {
      case 'message':
        audioSrc = Message;
        break;
      case 'friend_request':
        audioSrc = Notif;
        break;
      case 'request_accepted':
        audioSrc = Friend;
        break;
      default:
        audioSrc = '';
        break;
    }
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [type]);

  return (
    <div className="notification relative bg-blue-500 text-white p-4 rounded shadow-lg transform transition-transform duration-300 ease-in-out">
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1 text-white shadow-lg"
      >
        <FaTimes />
      </button>
      {message}
    </div>
  );
};

export default Notification;