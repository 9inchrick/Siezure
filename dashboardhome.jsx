import React from 'react'

export default function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Siezure!</h1>
        <p className="text-gray-600 text-lg">
          Your all-in-one AI-powered video studio. Start by uploading a video or exploring the AI features!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard title="AI Titling" desc="Let AI craft engaging titles and descriptions for your videos." />
        <FeatureCard title="Highlights Detection" desc="Automatically find and save your stream's best moments." />
        <FeatureCard title="Editing Suite" desc="Pro-grade editing tools, right in your browser." />
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">{desc}</p>
      <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold shadow transition">
        Launch
      </button>
    </div>
  )
}
