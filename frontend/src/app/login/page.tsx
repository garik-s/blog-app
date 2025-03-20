"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthStore from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface LoginFormInputs {
    username: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();
    const { login } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setError(null); // Reset error message
        setLoading(true);
    
        const success = await login(data.username, data.password);
        
        if (success) {
          router.push("/"); // Redirect to home/dashboard only on success
        } else {
          setError("Invalid username or password.");
        }
    
        setLoading(false);
      };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
                        {...register("password", { required: "Password is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="text-sm mt-4 text-center">
                Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
            </p>
        </div>
    );
}
