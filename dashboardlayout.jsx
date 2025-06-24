import React from 'react'
import { NavLink, Routes, Route, Outlet } from "react-router-dom"
import DashboardHome from './DashboardHome'
import DashboardVideos from './DashboardVideos'
import DashboardAI from './DashboardAI'
import DashboardAccount from './DashboardAccount'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="h-20 flex items-center justify-center border-b">
          <span className="text-2xl font-bold text-indigo-700">Siezure</span>
        </div>
        <nav className="flex-1 py-6">
          <NavLink to="/dashboard" end className={({isActive}) => navClass(isActive)}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/videos" className={({isActive}) => navClass(isActive)}>
            Videos
          </NavLink>
          <NavLink to="/dashboard/ai" className={({isActive}) => navClass(isActive)}>
            AI Assistant
          </NavLink>
          <NavLink to="/dashboard/account" className={({isActive}) => navClass(isActive)}>
            Account
          </NavLink>
        </nav>
        <div className="p-4 border-t">
          <button className="text-sm text-gray-500 hover:text-red-600 font-semibold">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="videos" element={<DashboardVideos />} />
          <Route path="ai" element={<DashboardAI />} />
          <Route path="account" element={<DashboardAccount />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  )
}

function navClass(isActive) {
  return [
    "block px-6 py-3 rounded-lg font-medium text-lg",
    isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
  ].join(" ")
}
