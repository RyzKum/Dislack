import { useForm } from "react-hook-form";
import { useStore } from "./store";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    
  const { register, handleSubmit } = useForm<{
    pseudo: string;
    email: string;
    password: string;
  }>();
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = (data: {
    pseudo: string;
    email: string;
    password: string;
  }) => {
    const newUser = {
      id: Date.now(),
      ...data,
    };
    setUser(newUser);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg text-black w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Pseudo</label>
          <input
            {...register("pseudo")}
            type="text"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
