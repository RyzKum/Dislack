import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope, FaRegClipboard } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useUserStore } from "../core/stores/user/UserStore";
import NotificationContainer from "./NotificationContainer";

function Sidebar() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const currUser = useUserStore((state) => state.user);
  const [hint, setHint] = useState("Copy friend code :");

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem('user', '');
    navigate("/login");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currUser!.id);
    setHint("Copied !");
    setTimeout(() => {
      setHint("Copy friend code :");
    }, 3000);
  };

  useEffect(() => {
    if(currUser == null) {
      const localUser = localStorage.getItem('user');
      if(localUser == '' || localUser == null) {
        navigate("/login");
      } else {
        setUser(JSON.parse(localUser!));
      }
    }
  }, [currUser, navigate, setUser]);

  return (
    <div className="flex min-h-screen">
      <div className="w-20 bg-[#4f2652] text-white flex flex-col items-center py-4 space-y-4 relative">
        <nav className="flex-1 space-y-6 mt-4">
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-sm hover:text-gray-300"
          >
            <FaHome size={24} />
            <span className="mt-1">Home</span>
          </Link>
          <Link
            to="/message"
            className="flex flex-col items-center text-sm hover:text-gray-300"
          >
            <FaEnvelope size={24} />
            <span className="mt-1">Messages</span>
          </Link>
        </nav>
        <div className="flex flex-col justify-center items-center mb-2">
          {/* <p className="text-xs mb-6 px-1 text-wrap text-center">
            Currently logged in as: {currUser?.username}
          </p> */}
          <p className="text-xs mb-1 px-1 text-wrap text-center">{hint}</p>
          <button
            onClick={copyCode}
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 active:bg-purple-400"
          >
            <FaRegClipboard size={20} />
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700"
        >
          <CiLogout size={20} />
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Sidebar;