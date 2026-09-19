import React from 'react';
import axios from 'axios';

export default function StartSessionButton({ type }: { type: string }) {
  const start = async () => {
    const r = await axios.post('/api/session/start', {
      type,
      task: 'Work on project',
      userId: 'demo'
    });

    alert('Session started!\n\nAI says:\n\n' + r.data.aiStart);
  };

  return (
    <button
      onClick={start}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Start {type} session
    </button>
  );
}
