"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { LoginDto } from "../../types/request/user.dto";
import { loginUser } from "../../redux/slices/auth";
import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector(({ auth }: { auth: any }) => ({
    isLoading: auth.isLoading,
    error: auth.error,
  }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    const payload: LoginDto = { email, password };
    dispatch(loginUser(payload));
  };

  return (
    <AuthLayout>
      <div>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Welcome back</h1>
          <p className="text-light-gray">Sign in to your account to continue</p>
        </div>

        {/* {error && (
        <div className="mb-6 p-4 bg-red/10 border border-red rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red">{error}</p>
          </div>
        </div>
      )} */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark-gray"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-3 py-2 border border-input-border rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark-gray"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-secondary"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 border border-input-border rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary border-gray rounded focus:ring-primary"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-dark-gray"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-light-gray">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-primary hover:text-secondary font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
