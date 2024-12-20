import Sidebar from "../../components/SideBar";
import { useState, useEffect } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../core/stores/user/UserStore";
import { Input } from "../../types/Input";
import useFriendListStore from "../../core/stores/friends/FriendListStore";
import { useMessageStore } from "../../core/stores/messages/MessageStore";
import { fetchMessages, sendMessage } from "../../core/requests/message/Message";
import { Friend } from "../../types/Friend";
import { AxiosError } from "axios";
import { FormatLink } from "../../utils/FormatLink";


function Message() {
  const [input, setInput] = useState<string>("");
  const { messages, addMessage, setMessages } = useMessageStore();
  const [currFriend, setCurrFriend] = useState<Friend | undefined>();
  const currUser = useUserStore((state) => state.user);
  const { friends, fetchFriends } = useFriendListStore();
  const { register, handleSubmit } = useForm<Input>();

  useEffect(() => {
    fetchFriends();
    if(friends && currFriend == undefined) {
      setMessages([]);
      setCurrFriend(friends[0]);
    }
  }, [currFriend, fetchFriends, friends, setMessages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setInput("");
      const messageId = addMessage(input, currUser!.id);
      try {
        const msgIndex = messages.findIndex((msg) => msg.id == messageId)

        await sendMessage(messageId, currFriend!.userId, input).then(
          res => {
            if(res.status == 201) {
              messages[msgIndex].sentStatus = 'sent'
              updateMessages();
            } else {
              messages[msgIndex].sentStatus = 'error'
            }
          }
        ).catch(() =>
          messages[msgIndex].sentStatus = 'error'
        ); 
      } catch (error) {
        console.log("Error sending message : " + (error as AxiosError).code);
      }
    }
  };

  const resendMessage = async (messageId: string, content: string) => {
    try {
      const msgIndex = messages.findIndex((msg) => msg.id == messageId)
      messages[msgIndex].sentStatus = 'loading'
      await sendMessage(messageId, currFriend!.userId, content).then(
        res => {
          if(res.status == 201) {
            messages[msgIndex].sentStatus = 'sent'
            updateMessages();
          } else {
            messages[msgIndex].sentStatus = 'error'
          }
        }
      ).catch(() =>
        messages[msgIndex].sentStatus = 'error'
      ); 
    } catch (error) {
      console.log("Error resending message : " + (error as AxiosError).code);
    }
  }

  function updateMessages() {
    if (currFriend) {
      fetchMessages(currFriend.userId)
        .then((res) => {
          setMessages(res)
        })
        .catch((error) => {
          console.error("Fetching messages failed", error);
        });
    }
  }

  useEffect(() => {
    if (currFriend) {
      fetchMessages(currFriend.userId)
        .then((res) => {
          setMessages(res)
        })
        .catch((error) => {
          console.error("Fetching messages failed", error);
        });
    }
  }, [currFriend, currUser, messages, setMessages]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex border-sm w-1/5">
        <div className="bg-[#633d68] text-white p-4 overflow-y-auto w-full">
          <h2 className="text-xl font-bold mb-4 sticky top-0 p-1">
            Friends List
          </h2>
          {friends.map((friend, index) => (
            <button
              onClick={() => {
                if(currFriend != friend) {
                  setMessages([]);
                }
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

      <div className="flex-1 bg-gray-100 flex flex-col h-screen">
        <div className="bg-white p-4">
          <h2 className="text-2xl font-bold">
            {currFriend ? currFriend.username : "Friend"}
          </h2>
        </div>

        <div className="flex flex-1 flex-col-reverse w-full py-4 overflow-y-scroll">
            {messages[0] != null ? messages.map((message) => (
              <>
              <div key={message.id} className={`px-4 py-4 mx-2 min-w-28 max-w-96 w-fit rounded shadow mb-2 flex flex-col text-wrap
              ${message.emitterId == currUser?.id ? 'ml-auto' : 'mr-auto'}
              ${message.sentStatus == 'sent' ? message.emitterId == currUser?.id ? 'bg-blue-300' : 'bg-white' :
              message.sentStatus == 'error' ? 'bg-red-300' : 'bg-gray-400'}`}>
                <div>{FormatLink(message.content)}</div>
                {message.sentStatus == 'error' ? 
                <button onClick={() => {resendMessage(message.id, message.content)}} className="text-xs/[0px] mt-1 mr-4 text-gray-700 rounded-sm ml-auto p-2 bg-red-400 hover:bg-red-500 active:bg-red-400">Resend ?</button> :
                <p className="text-xs/[0px] mt-2 text-gray-700 ml-auto">
                  {message.sentStatus == 'sent' && message.sendAt != '' ? message.sendAt.slice(11, -8) :
                  message.sentStatus == 'loading' ? 'Loading' : ''}
                </p>}
              </div>
              </>
            )) : <></>}
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
