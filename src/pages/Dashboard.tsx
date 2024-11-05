import Sidebar from '../components/SideBar';

function Dashboard() {

  return (
    <div className="flex min-h-screen">
            <Sidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to the Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;