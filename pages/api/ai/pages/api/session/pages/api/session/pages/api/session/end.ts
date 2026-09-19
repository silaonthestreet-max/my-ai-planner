import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId, notes = '' } = req.body;

  const { data, error } = await supabase
    .from('sessions')
    .update({ end_ts: new Date().toISOString(), notes })
    .eq('id', sessionId)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ ended: true, session: data });
}
