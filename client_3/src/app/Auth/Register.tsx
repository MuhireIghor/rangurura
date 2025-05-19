"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/auth";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { UserDto } from "../../types/request/user.dto";
import { useAppDispatch } from "../../redux/store";
import AuthLayout from "../../layouts/AuthLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector(({ auth }: { auth: any }) => ({
    isLoading: auth.isLoading,
    error: auth.error,
  }));

  const validatePassword = (password: string) => {
    if (password.length < 12) {
      return "Password must be at least 12 characters long";
    }
    return "";
  };

  const validatePhone = (phone: string) => {
    if (phone.length < 10) {
      return "Phone number must be at least 10 characters long";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name || !email || !password || !confirmPassword || !phone) {
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      return;
    }

    const payload: UserDto = {
      name,
      email,
      password,
      confirmPassword,
      phone,
    };

    dispatch(signupUser(payload));
  };

  const passwordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 12) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength === 0) return "bg-gray";
    if (strength <= 2) return "bg-red";
    if (strength <= 4) return "bg-blue";
    return "bg-saturate-green";
  };

  const strength = passwordStrength(password);

  return (
    <AuthLayout>
      <div>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">
            Create an account
          </h1>
          <p className="text-light-gray">
            Join Rangurura to submit and track complaints
          </p>
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
              htmlFor="name"
              className="block text-sm font-medium text-dark-gray"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-input-border rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-dark-gray"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="w-full px-3 py-2 border border-input-border rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
            {phoneError && <p className="text-sm text-red">{phoneError}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-dark-gray"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`w-full px-3 py-2 border ${
                  passwordError ? "border-red" : "border-input-border"
                } rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Create a password"
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

            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex space-x-1 flex-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${
                          index <= strength
                            ? getPasswordStrengthColor(strength)
                            : "bg-gray"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs ml-2 text-light-gray">
                    {getPasswordStrengthText(strength)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle
                      className={`h-3 w-3 ${password.length >= 8 ? "text-saturate-green" : "text-gray"}`}
                    />
                    <span
                      className={
                        password.length >= 8
                          ? "text-dark-gray"
                          : "text-light-gray"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle
                      className={`h-3 w-3 ${/[A-Z]/.test(password) ? "text-saturate-green" : "text-gray"}`}
                    />
                    <span
                      className={
                        /[A-Z]/.test(password)
                          ? "text-dark-gray"
                          : "text-light-gray"
                      }
                    >
                      Uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle
                      className={`h-3 w-3 ${/[a-z]/.test(password) ? "text-saturate-green" : "text-gray"}`}
                    />
                    <span
                      className={
                        /[a-z]/.test(password)
                          ? "text-dark-gray"
                          : "text-light-gray"
                      }
                    >
                      Lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle
                      className={`h-3 w-3 ${/[0-9]/.test(password) ? "text-saturate-green" : "text-gray"}`}
                    />
                    <span
                      className={
                        /[0-9]/.test(password)
                          ? "text-dark-gray"
                          : "text-light-gray"
                      }
                    >
                      Number
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-dark-gray"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`w-full px-3 py-2 border ${
                  passwordError ? "border-red" : "border-input-border"
                } rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-sm text-red mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 mt-1 text-primary border-gray rounded focus:ring-primary"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-dark-gray"
            >
              I agree to the{" "}
              <Link to="#" className="text-primary hover:text-secondary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-primary hover:text-secondary">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-light-gray">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:text-secondary font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
