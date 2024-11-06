import Sidebar from "./SideBar";
import { useState, useEffect } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useMessageStore } from "./components/uidMessageState";

function Message() {
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState<string[]>([]);
  const { messages, addMessage, setMessages } = useMessageStore();

  useEffect(() => {
    axios
      .get("http://localhost:3000/social/friends")
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.error("Fetching friends not working ", error);
      });
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      const messageId = addMessage(input);
      axios
        .post(`http://localhost:3000/chat/${messageId}/send`, {
          content: input,
        })
        .then((response) => {})
        .catch((error) => {});

      setInput("");
    }
  };
  useEffect(() => {
    const userId = "";
    axios
      .get(`http://localhost:3000/messages/${userId}`)
      .then((response) => {
        const fetchedMessages = new Map<string, string>();
        response.data.forEach((msg: { id: string; content: string }) => {
          fetchedMessages.set(msg.id, msg.content);
        });
        setMessages(fetchedMessages);
      })
      .catch((error) => {
        console.error("Fetching messages failed", error);
      });
  }, [setMessages]);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex">
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto h-screen">
          <h2 className="text-xl font-bold mb-4 sticky top-0 bg-gray-200 p-4">
            Friends
          </h2>

          {friends.map((friend, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded mb-2 shadow flex items-center"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
              {friend}
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 flex flex-col">
          <div className="bg-white p-4 mb-4">
            <h2 className="text-2xl font-bold">Friend</h2>
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            {Array.from(messages.entries()).map(([uid, messages]) => (
              <div key={uid} className="bg-white p-4 rounded shadow mb-2">
                {messages}
              </div>
            ))}
          </div>

          <div className="flex items-center p-2 bg-gray-100 rounded-xl border border-gray-300 shadow-sm m-3">
            <input
              type="text"
              className="flex-1 px-2 py-2 border-none outline-none bg-transparent placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className={`p-4 ml-2 rounded-lg ${
                input ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
              disabled={!input.trim()}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
