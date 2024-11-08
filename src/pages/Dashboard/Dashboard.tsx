import Sidebar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { FaUserCircle, FaEllipsisH, FaEnvelope } from "react-icons/fa";
import AddFriendPopup from "../../components/AddFriendPop";
import useFriendStore from "../../core/stores/friends/FriendListStore";
import useFriendRequestStore from "../../core/stores/friend-pendings/FriendPending";
import { useUserStore } from "../../core/stores/user/UserStore";

function Dashboard() {
  const { friends, fetchFriends } = useFriendStore();
  const { friendRequests, fetchFriendsRequests, acceptRequest } =
    useFriendRequestStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const currUser = useUserStore((state) => state.user);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleAcceptRequest = async (requestId: string) => {
    await acceptRequest(requestId);
    fetchFriends();
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendsRequests();

    const interval = setInterval(() => {
      fetchFriends();
      fetchFriendsRequests();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchFriends, fetchFriendsRequests]);

  return (
    <div className="flex min-h-screen bg-[#633d68] text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome to the Dashboard, {currUser?.username} 🖖 !{" "}
        </h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-[#4a2c4a] p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Friends List</h2>
              <button
                onClick={togglePopup}
                className="bg-[#7a527a] p-2 rounded-full text-white font-bold"
              >
                Add Friend
              </button>
            </div>
            <ul>
              {friends.map((friend, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2 p-2 bg-[#5a3c5a] rounded-lg"
                >
                  <div className="flex items-center">
                    <FaUserCircle className="mr-2 text-2xl" />
                    {friend.username}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-[#7a527a] p-2 rounded-full text-white font-bold">
                      <FaEnvelope className="text-xl" />
                    </button>
                    <button className="bg-[#7a527a] p-2 rounded-full text-white font-bold">
                      <FaEllipsisH className="text-xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/4 bg-[#4a2c4a] p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Activity</h2>
            <ul>
              {friendRequests.map((request, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 p-2 bg-[#5a3c5a] rounded-lg"
                >
                  <div className="flex items-center w-3/5">
                    <p className="truncate">Request: {request.senderId}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="bg-[#7a527a] p-2 rounded-full text-white font-bold"
                    >
                      Accept
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isPopupVisible && <AddFriendPopup onClose={togglePopup} />}
    </div>
  );
}

export default Dashboard;
