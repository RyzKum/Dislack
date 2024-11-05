import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './dashboard';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-grow flex">
        <div className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Ready to Login?</h2>
          <p className="mb-4">Access your account by clicking the button below.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-500 p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            Login
          </button>
        </div>
        <div className="flex-1 bg-gradient-to-r from-gray-800 to-black flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-semibold mb-4">New Here?</h2>
          <p className="mb-4">Create an account by clicking the button below.</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-gray-800 p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;