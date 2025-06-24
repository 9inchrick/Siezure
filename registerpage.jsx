import React from 'react'
import { Link } from "react-router-dom"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-700">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Create Account</h2>
        <form>
          <label className="block mb-3">
            <span className="text-gray-700 dark:text-gray-200">Username</span>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50" />
          </label>
          <label className="block mb-3">
            <span className="text-gray-700 dark:text-gray-200">Email</span>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50" />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 dark:text-gray-200">Password</span>
            <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50" />
          </label>
          <button type="submit" className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition mb-3">
            Create Account
          </button>
          <div className="text-sm text-center">
            Already have an account? <Link className="text-purple-600 hover:underline" to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
