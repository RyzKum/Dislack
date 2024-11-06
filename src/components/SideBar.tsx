import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope, FaBell } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import NotificationContainer from "./NotificationContainer";
import { useStore } from '../utils/store';

function Sidebar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<{ message: string, type: 'message' | 'friend_request' | 'request_accepted' }[]>([]);
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error Notification", error);
      });
  }, []);

  /// Test add Notification 
  const addNotification = (message: string, type: 'message' | 'friend_request' | 'request_accepted') => {
    setNotifications([...notifications, { message, type }]);
  };


  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-20 bg-[#4f2652] text-white flex flex-col items-center py-4 space-y-4 relative">
        <nav className="flex-1 space-y-6 mt-4">
          <Link to="/dashboard" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaHome size={24} />
            <span className="mt-1">Home</span>
          </Link>
          <Link to="/message" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaEnvelope size={24} />
            <span className="mt-1">Messages</span>
          </Link>
          <Link to="/activity" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaBell size={24} />
            <span className="mt-1">Activity</span>
          </Link>
        </nav>
        {/* <div className="space-y-2 mt-4">
          <button
            onClick={() => addNotification("New message received!", 'message')}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
          >
            Msg
          </button>
          <button
            onClick={() => addNotification("Friend request received!", 'friend_request')}
            className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700"
          >
            FR
          </button>
          <button
            onClick={() => addNotification("Friend request accepted!", 'request_accepted')}
            className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-700"
          >
            FA
          </button>
        </div> */}
        <button
          onClick={handleLogout}
          className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700"
        >
          <CiLogout size={20} />
        </button>
        <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
      </div>
    </div>
  );
}

export default Sidebar;