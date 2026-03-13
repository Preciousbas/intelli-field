import type { VercelRequest, VercelResponse } from '@vercel/node';
import { hasApiKey, inflectivFetch, resolveAgentId } from '../../lib/inflectiv.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!hasApiKey()) {
    return res.status(500).json({ error: 'INFLECTIV_API_KEY is not configured' });
  }

  try {
    const agentId = await resolveAgentId();

    if (!agentId) {
      return res.status(500).json({ error: 'No agent available' });
    }

    console.log('[agent/chat] agentId:', agentId);
    console.log('[agent/chat] body:', req.body);

    const data = await inflectivFetch(`/ext/agents/${agentId}/chat`, {
      method: 'POST',
      body: JSON.stringify(req.body),
    });

    console.log('[agent/chat] response:', data);

    return res.status(200).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Agent chat failed';
    console.error('[agent/chat]', message);
    return res.status(500).json({ error: message });
  }
}