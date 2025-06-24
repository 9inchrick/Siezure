import React from 'react'
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Welcome Back</h2>
        <form>
          <label className="block mb-3">
            <span className="text-gray-700 dark:text-gray-200">Email</span>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 dark:text-gray-200">Password</span>
            <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition mb-3">
            Sign In
          </button>
          <div className="flex justify-between text-sm">
            <Link className="text-indigo-600 hover:underline" to="/forgot-password">Forgot password?</Link>
            <Link className="text-indigo-600 hover:underline" to="/register">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
