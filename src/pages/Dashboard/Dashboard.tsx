import Sidebar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { FaUserCircle, FaEllipsisH, FaEnvelope } from "react-icons/fa";
import AddFriendPopup from "../../components/AddFriendPop";
import useFriendStore from "../../core/stores/friends/FriendListStore";
import useFriendRequestStore from "../../utils/FriendPending";

function Dashboard() {
  const { friends, fetchFriends } = useFriendStore();
  const { friendRequests, fetchFriendsRequests, acceptRequest } =
    useFriendRequestStore();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendsRequests();
  }, [fetchFriends, fetchFriendsRequests]);

  return (
    <div className="flex min-h-screen bg-[#633d68] text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome to the Dashboard, User 🖖 !{" "}
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
            {friendRequests.map((request, index) => (
              <li key={index} className="flex item-center">
                <div className="flex items-center">
                  <FaUserCircle className="mr-2 text-2xl" />
                  Request : {request.senderId}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      acceptRequest(request.id);
                    }}
                    className="bg-[#7a527a] p-2 rounded-full text-white font-bold"
                  >
                    Accept
                  </button>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
      {isPopupVisible && <AddFriendPopup onClose={togglePopup} />}
    </div>
  );
}

export default Dashboard;
