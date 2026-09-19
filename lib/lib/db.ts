import { supabase } from './supabaseClient';

export async function createSession(userId: string, type: string, task: string) {
  const { data, error } = await supabase
    .from('sessions')
    .insert([{ user_id: userId, type, task, start_ts: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function endSession(sessionId: string, notes: string) {
  const { data, error } = await supabase
    .from('sessions')
    .update({ end_ts: new Date().toISOString(), notes })
    .eq('id', sessionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function saveAiResponse(userId: string, sessionId: string, text: string) {
  const { data, error } = await supabase
    .from('ai_responses')
    .insert([{ user_id: userId, session_id: sessionId, response_text: text }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
