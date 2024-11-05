import { useForm } from "react-hook-form";
import { useStore } from "./store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const onSubmit = (data: { email: string; password: string }) => {
    if (user && user.email === data.email && user.password === data.password) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Login to Your Account
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
