"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { Logo } from "@/components/logo";
import axios from "axios";
import { Eye, EyeOff, BookOpen, Sparkles } from "lucide-react";

export default function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inputFields = [
        {
            id: "email",
            Label: "Email",
            type: "text",
            value: email,
            required: true,
            placeholder: "Enter your email",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        },
        {
            id: "password",
            Label: "Password",
            type: "password",
            value: password,
            required: true,
            placeholder: "Enter your password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Updated endpoint
            const response = await axios.post("/api/auth/login",
                {
                    email: email.trim(),
                    password,
                }
            );

            // Direct access to response data (no normalization needed)
            if (!response.data.success) {
                throw new Error(response.data.message || "Login failed");
            }

            const { user } = response.data;
            if (user) {
                localStorage.setItem("email", user.email);
                localStorage.setItem("user", JSON.stringify(user));
            }

            router.push("/admin");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            // Simplified error handling
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

  return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-transparent rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* Main container */}
            <div className="relative w-full max-w-6xl mx-4 md:mx-8 lg:mx-16">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-900/10 overflow-hidden border border-indigo-100 grid grid-cols-1 lg:grid-cols-2">

                {/* Left side - Brand */}
                <div className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center lg:text-left overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 border-2 border-white rounded-full -ml-32 -mb-32"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center lg:items-start gap-6 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <BookOpen className="w-10 h-10 text-indigo-200" />
                        </div>
                        <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        Literature <span className="text-indigo-200">Lover</span>
                        </h1>
                        <p className="text-indigo-100 text-xl lg:text-2xl font-light tracking-wide">
                        Pages Come Alive
                        </p>
                    </div>

                    <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent my-4"></div>

                    <div className="space-y-3">
                        <p className="text-indigo-100/90 text-lg">
                        Discover worlds within words
                        </p>
                        <p className="text-indigo-200/80 text-sm">
                        Your personal literary sanctuary awaits
                        </p>
                    </div>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                    <div className="space-y-1 mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Welcome Back
                        </h2>
                        <p className="text-gray-600 text-lg">
                        Sign in to continue your journey
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {inputFields.map(({ id, Label, type, value, required, placeholder, onChange }) => (
                        <div key={id} className="space-y-2">
                            <label
                            htmlFor={id}
                            className="text-sm font-semibold text-gray-700 tracking-wide"
                            >
                            {Label}
                            </label>
                            <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                            <div className="relative">
                                <input
                                id={id}
                                name={id}
                                type={id === "password" ? (showPassword ? "text" : "password") : type}
                                required={required}
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}
                                className="w-full rounded-xl bg-white text-gray-900 border-2 border-indigo-100 px-4 py-3.5 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 placeholder:text-gray-400"
                                />

                                {id === "password" && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors duration-200 p-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                    <EyeOff size={22} />
                                    ) : (
                                    <Eye size={22} />
                                    )}
                                </button>
                                )}
                            </div>
                            </div>
                        </div>
                        ))}

                        {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                            <div className="flex items-center gap-2 text-red-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium">{error}</span>
                            </div>
                        </div>
                        )}

                        <div className="space-y-4 pt-4">
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={loading}
                            className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base tracking-wide shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Signing in...</span>
                            </div>
                            ) : (
                            "Sign In"
                            )}
                        </Button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}