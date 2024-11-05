import { Link, useNavigate } from 'react-router-dom';
import { useStore } from './store';
import { FaHome, FaEnvelope, FaBell } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';

function Sidebar() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-20 bg-purple-800 text-white flex flex-col items-center py-4 space-y-4">
        <nav className="flex-1 space-y-6 mt-4">
          <Link to="/dashboard" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaHome size={24} />
            <span className="mt-1">Home</span>
          </Link>
          <Link to="/message" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaEnvelope size={24} />
            <span className="mt-1">Messages</span>
          </Link>
          <Link to="/notification" className="flex flex-col items-center text-sm hover:text-gray-300">
            <FaBell size={24} />
            <span className="mt-1">Activity</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700"
        >
          <CiLogout size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;