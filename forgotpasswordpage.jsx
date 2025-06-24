import React from 'react'
import { Link } from "react-router-dom"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-400">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Forgot Password?</h2>
        <form>
          <label className="block mb-6">
            <span className="text-gray-700 dark:text-gray-200">Email</span>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50" />
          </label>
          <button type="submit" className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold transition mb-3">
            Reset Password
          </button>
          <div className="text-sm text-center">
            <Link className="text-cyan-600 hover:underline" to="/login">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
