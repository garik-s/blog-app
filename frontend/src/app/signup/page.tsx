"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface SignupFormInputs {
  username: string;
  password: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      await axios.post(`${API_URL}/auth/signup`, data);
      router.push("/login");
    } catch (err) {
      setError("Username already exists");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Sign Up
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  );
}
