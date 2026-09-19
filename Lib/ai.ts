import axios from 'axios';

export async function callOpenAi(prompt: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Missing OPENAI_API_KEY');

  const resp = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400
    },
    {
      headers: { Authorization: `Bearer ${key}` }
    }
  );

  return resp.data.choices?.[0]?.message?.content ?? '';
}
