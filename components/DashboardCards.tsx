import React from 'react';

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Daily Priorities</h2>
        <p className="text-gray-600">Generate your AI-powered priorities for today.</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Focus Sessions</h2>
        <p className="text-gray-600">Start a 90-minute deep work session.</p>
      </div>
    </div>
  );
}
