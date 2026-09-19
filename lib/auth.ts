import { supabase } from './supabaseClient';

export async function getUserFromReq(req: any) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;

  return data.user || null;
}
