import { useForm } from "react-hook-form";
import { useUserStore } from "../../core/stores/user/UserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { getUserData, loginUser } from "../../core/requests/auth/Login";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const res = await loginUser(data);
      if (res.status === 201) {
        const user = await getUserData();
        setUser(user.data);
        navigate("/dashboard");
      } else {
        setLoginError("Identifiants invalides, veuillez réessayer.");
      }
    } catch (error) {
      setLoginError("Identifiants invalides, veuillez réessayer.");
      console.error(error);
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
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            {...register("username", { required: "Le username est requis" })}
            type="username"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis",
            })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mb-4">{loginError}</p>
        )}

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
