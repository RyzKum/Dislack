import Sidebar from '../components/SideBar';

function Activity () {
  return (
    <div className="flex min-h-screen bg-[#633d68] text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Activity</h1>
      </div>
    </div>
  );
};

export default Activity;