import React from 'react'

export default function DashboardAccount() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="bg-white rounded-xl shadow p-8">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Username</label>
          <input className="w-full border rounded-md px-3 py-2" value="johndoe" disabled />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input className="w-full border rounded-md px-3 py-2" value="johndoe@email.com" disabled />
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold shadow transition">
          Edit Profile (coming soon)
        </button>
      </div>
    </div>
  )
}
