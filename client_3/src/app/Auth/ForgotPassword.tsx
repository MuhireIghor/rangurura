"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { forgotPassword } from "services/authService"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      return
    }

    setLoading(true)
    setError("")

    try {
      await forgotPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-black mb-2">Forgot Password</h1>
        <p className="text-light-gray">Enter your email address and we'll send you a link to reset your password</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red/10 border border-red rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red">{error}</p>
          </div>
        </div>
      )}

      {success ? (
        <div className="mb-6 p-4 bg-saturate-green/10 border border-saturate-green rounded-md flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-saturate-green shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-dark-gray">
              Password reset link has been sent to your email address. Please check your inbox and follow the
              instructions to reset your password.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-dark-gray">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-input-border rounded-md bg-input-fill focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link to="/login" className="text-primary hover:text-secondary font-medium inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
