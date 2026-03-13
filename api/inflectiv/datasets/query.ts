import type { VercelRequest, VercelResponse } from '@vercel/node';
import { hasApiKey, inflectivFetch } from '../../_lib/inflectiv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!hasApiKey()) {
    return res.status(500).json({ error: 'INFLECTIV_API_KEY is not configured' });
  }

  try {
    const data = await inflectivFetch('/ext/datasets/query', {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    return res.status(200).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Dataset query failed';
    console.error('[datasets/query]', message);
    return res.status(500).json({ error: message });
  }
}