import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { callOpenAi } from '../../../lib/ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type = 'focus', task = 'Unnamed task', userId = 'demo' } = req.body;

  const { data, error } = await supabase
    .from('sessions')
    .insert([{ user_id: userId, type, task, start_ts: new Date().toISOString() }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const prompt = `Start a 90-minute session on: ${task}. Define success in one sentence and list 3 micro-tasks.`;
  const aiText = await callOpenAi(prompt);

  await supabase
    .from('ai_responses')
    .insert([{ user_id: userId, session_id: data.id, response_text: aiText }]);

  res.json({ sessionId: data.id, aiStart: aiText });
}
