import Sidebar from "./SideBar";

function Message() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Simple Message Page</h1>
        <p className="text-gray-700">This is a simple message page.</p>
      </div>
    </div>
  );
}

export default Message;
