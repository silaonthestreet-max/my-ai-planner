import React, { useState } from 'react';
import axios from 'axios';
import StartSessionButton from '../components/StartSessionButton';

export default function Home() {
  const [aiPriorities, setAiPriorities] = useState<string | null>(null);

  const generatePriorities = async () => {
    const resp = await axios.post('/api/ai/generate', {
      template: 'daily_priority',
      context: {}
    });
    setAiPriorities(resp.data.text);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paul's AI Planner</h1>

      <section className="mb-6">
        <button
          onClick={generatePriorities}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Daily Priorities
        </button>

        {aiPriorities && (
          <pre className="mt-4 p-3 bg-gray-100 rounded whitespace-pre-wrap">
            {aiPriorities}
          </pre>
        )}
      </section>

      <section className="mb-6">
        <StartSessionButton type="focus" />
      </section>
    </main>
  );
}
