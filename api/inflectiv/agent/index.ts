import type { VercelRequest, VercelResponse } from '@vercel/node';
import { hasApiKey, resolveAgentId } from '../../lib/inflectiv.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!hasApiKey()) {
    return res.status(500).json({ error: 'INFLECTIV_API_KEY is not configured' });
  }

  try {
    const agentId = await resolveAgentId();
    return res.status(200).json({ agentId, ready: !!agentId });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to resolve agent';
    console.error('[agent]', message);
    return res.status(500).json({ error: message });
  }
}