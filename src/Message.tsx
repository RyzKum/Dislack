import Sidebar from "./SideBar";
import { useState } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";

function Message() {
  const [messages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex">

        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto h-screen"> 
          {Array.from({ length: 15 }, (_, i) => ( // a supp après avec le vrai data 
            <div
              key={i}
              className="bg-white p-4 rounded mb-2 shadow flex items-center"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
              Friend
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 flex flex-col">

          <div className="bg-white p-4 mb-4">
            <h2 className="text-2xl font-bold">Friend</h2>
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className="bg-white p-4 rounded shadow mb-2">
                {message}
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
                className={`p-4 ml-2 rounded-lg ${
                input ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
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
