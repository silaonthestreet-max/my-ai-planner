import type { NextApiRequest, NextApiResponse } from 'next';
import { callOpenAi } from '../../../lib/ai';

const templates: Record<string, (context: any) => string> = {
  daily_priority: (ctx) => `
User: Paul. Goals: walk 30 min/day; 2x90min focus sessions/day; 8 lessons/month.
Context: ${ctx.summary || 'no recent data'}
Task: Provide 3 priorities for today. For the top priority, break into 3 steps with time estimates.
Tone: concise, actionable.
`,
  start_session: (ctx) => `
Start a 90-minute session on: ${ctx.task}
Define success in one sentence and list 3 micro-tasks with minutes.
Tone: concise, motivating.
`,
  refocus: (ctx) => `
User is 45 minutes into a session on ${ctx.task}. Provide a 60-second refocus script and one quick tactic to remove the biggest distraction.
`,
  evening_reflection: (ctx) => `
User activities: ${ctx.activities}
Summarize wins, suggest one improvement, and set tomorrow's top task with a 3-step plan.
`
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { template, context } = req.body;
  const prompt = templates[template]?.(context || {}) ?? 'Hello';

  try {
    const aiText = await callOpenAi(prompt);
    res.status(200).json({ text: aiText });
  } catch (err) {
    res.status(500).json({ error: 'AI error' });
  }
}
