import Sidebar from "../components/SideBar";
import { useState, useEffect } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../utils/userStore";
import useFriendStore from "../utils/FriendListStore"
import axios from "axios";

type Input = {
  message: string
}

type FriendRequest = {
  id: string,
  senderId: string,
  startedAt: string
}

function Message() {
  const [messages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [currFriend, setCurrFriend] = useState<Friend>();
  const currUser = useUserStore((state) => state.user);
  const {friends, fetchFriends} = useFriendStore();

  const [hint, setHint] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);
  
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex border-sm w-1/5">

        <div className="bg-[#633d68] text-white p-4 overflow-y-auto w-full">
          <h2 className="text-xl font-bold mb-4 sticky top-0 p-1">Friends List</h2>

          {friends.map((friend, index) => (
            <button
              onClick={() => {setCurrFriend(friend)}}
              key={index}
              className="bg-white w-full p-4 rounded mb-2 shadow flex items-center text-black hover:bg-gray-400 active:bg-gray-500"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
              {friend.username}
            </button>
          ))}
        </div>
      </div>
        
      <div className="flex-1 bg-gray-100 flex flex-col">
        <div className="bg-white p-4 mb-4">
          <h2 className="text-2xl font-bold">{currFriend ? currFriend.username : 'Friend'}</h2>
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-white p-4 rounded shadow mb-2">
              {message}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(() => {console.log("send")})} className="flex items-center p-2 bg-gray-100 rounded-xl border border-gray-300 shadow-sm m-3">
          <input
            {...register("message", { required: true })}
            type="text"
            className="flex-1 px-2 py-2 border-none outline-none bg-transparent placeholder-gray-500"
          />
          <label
            htmlFor="send"
            className={`p-4 ml-2 rounded-lg ${
              input ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-200 text-gray-500 cursor-default"
            }`}
          >
            <FaPaperPlane size={16} />
          </label>
          <input type="submit" name="send" id="send" className="hidden"></input>
        </form>
      </div>
    </div>
  );
}

export default Message;
