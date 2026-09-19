import type { NextApiRequest, NextApiResponse } from 'next';
import { callOpenAi } from '../../../lib/ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { task = 'Unnamed task' } = req.body;

  const prompt = `
User is 45 minutes into a 90-minute session on ${task}.
Provide a 60-second refocus script and one quick tactic to remove the biggest distraction.
`;

  try {
    const aiText = await callOpenAi(prompt);
    res.json({ refocus: aiText });
  } catch (err) {
    res.status(500).json({ error: 'AI error' });
  }
}
