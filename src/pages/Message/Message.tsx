import Sidebar from "../../components/SideBar";
import { useState, useEffect } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../core/stores/user/UserStore";
import { Input } from "../../types/Input";
import useFriendListStore, {
  Friend,
} from "../../core/stores/friends/FriendListStore";
import {
  MessageContent,
  useMessageStore,
} from "../../core/stores/messages/MessageStore";
import { fetchMessages, sendMessage } from "../../core/requests/message/Message";

function Message() {
  const [input, setInput] = useState("");
  const { messages, addMessage, setMessages } = useMessageStore();
  const [currFriend, setCurrFriend] = useState<Friend>();
  const currUser = useUserStore((state) => state.user);
  const { friends, fetchFriends } = useFriendListStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Input>();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const messageId = addMessage({ content: input, emitterId: currUser!.id });
      try {
        await sendMessage(messageId, currFriend!.userId, input); 
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setInput("");
    }
  };

  useEffect(() => {
    if (currFriend) {
      fetchMessages(currFriend.userId) 
        .then((data) => {
          const fetchedMessages = new Map<string, MessageContent>();
          data.forEach((msg) => {
            fetchedMessages.set(msg.id, {
              content: msg.content,
              emitterId: msg.emitterId,
              sendAt: msg.sendAt,
            });
          });
          setMessages(fetchedMessages);
        })
        .catch((error) => {
          console.error("Fetching messages failed", error);
        });
    }
  }, [currFriend, currUser, setMessages]);

  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex border-sm w-1/5">
        <div className="bg-[#633d68] text-white p-4 overflow-y-auto w-full">
          <h2 className="text-xl font-bold mb-4 sticky top-0 p-1">
            Friends List
          </h2>

          {friends.map((friend, index) => (
            <button
              onClick={() => {
                setMessages([]);
                setCurrFriend(friend);
              }}
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
          <h2 className="text-2xl font-bold">
            {currFriend ? currFriend.username : "Friend"}
          </h2>
        </div>

        <div className="flex-1 flex flex-col w-full overflow-y-auto mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`pl-4 py-4 mx-2 min-w-28 w-fit rounded shadow mb-2 flex flex-col
              ${message.emitterId == currUser?.id ? 'bg-blue-300 ml-auto' : 'bg-white mr-auto'}`}>
                {message.content}
                <p className="text-xs/[0px] my-[-2px] mr-2 ml-auto">{message.sendAt?.slice(11, -8)}</p>
              </div>
            ))}
        </div>

        <form
          onSubmit={handleSubmit(handleSendMessage)}
          className="flex items-center p-2 bg-gray-100 rounded-xl border border-gray-300 shadow-sm m-3"
        >
          <input
            {...register("message", { required: true })}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-2 py-2 border-none outline-none bg-transparent placeholder-gray-500"
          />
          <label
            htmlFor="send"
            className={`p-4 ml-2 rounded-lg ${
              input
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-200 text-gray-500 cursor-default"
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
