import { useForm } from "react-hook-form";
import { useStore } from "../utils/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      console.log(response)
      console.log(response.data)
      const newUser = response.data;

      setUser(newUser);
      navigate("/dashboard");
    } catch (error) {
      setSubmitError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
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
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            {...register("username", { required: "Le username est requis" })}
            type="text"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email invalide",
              },
            })}
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div> */}

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Le mot de passe doit comporter au moins 6 caractères",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {submitError && (
          <p className="text-red-500 text-sm mb-4">{submitError}</p>
        )}

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
