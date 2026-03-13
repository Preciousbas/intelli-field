import type { VercelRequest, VercelResponse } from '@vercel/node';
import { hasApiKey, inflectivFetch } from '../lib/inflectiv.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!hasApiKey()) {
    return res.status(500).json({ error: 'INFLECTIV_API_KEY is not configured' });
  }

  try {
    const data = await inflectivFetch('/ext/datasets');
    return res.status(200).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch datasets';
    console.error('[datasets]', message);
    return res.status(500).json({ error: message });
  }
}