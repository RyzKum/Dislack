import React from 'react';

interface AddFriendPopupProps {
    onClose: () => void;
}

const AddFriendPopup: React.FC<AddFriendPopupProps> = ({ onClose }) => {
    return (
        <div className ="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">Add a Friend</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">User ID</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800" />
                </div>
                <div className="flex justify-between">
                    <button onClick={onClose} className="bg-gray-300 text-black p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">Cancel</button>
                    <button className="bg-blue-500 text-white p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">Add Friend</button>
                </div>
            </div>
        </div>
    );
};

export default AddFriendPopup;