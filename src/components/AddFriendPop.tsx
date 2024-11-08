import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAddFriendStore from "../core/stores/friend-requests/AddFriendStore";
import { useUserStore } from "../core/stores/user/UserStore";

interface AddFriendPopupProps {
  onClose: () => void;
}

type Input = {
  receiverId: string;
};

const AddFriendPopup: React.FC<AddFriendPopupProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
  } = useForm<Input>();
  const { sendRequest, hint } = useAddFriendStore();
  const currUser = useUserStore((state) => state.user);

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (currUser) {
      sendRequest(data.receiverId, currUser.id);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Add a Friend
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">User ID</label>
            <input
              {...register("receiverId", {
                required: "Receiver ID is required",
              })}
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <p className={`mb-4 ${hint == 'Friend request sent !' ? 'text-green-400' : 'text-red-500'}`}>{hint && <span>{hint}</span>}</p>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendPopup;
