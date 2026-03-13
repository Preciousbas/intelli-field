async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/inflectiv${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const text = await res.text();

  if (!res.ok) {
    try {
      const body = JSON.parse(text) as Record<string, string>;
      throw new Error(body.error || `API ${res.status}`);
    } catch {
      throw new Error(text || `API ${res.status}`);
    }
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
  }
}

export function listDatasets() {
  return request<Record<string, unknown>>('/datasets');
}

export function queryDataset(query: string, topK = 5) {
  return request<Record<string, unknown>>('/datasets/query', {
    method: 'POST',
    body: JSON.stringify({ query, top_k: topK }),
  });
}

export function getAgentStatus() {
  return request<{ agentId: string | null; ready: boolean }>('/agent');
}

export function chatWithAgent(message: string) {
  return request<Record<string, unknown>>('/agent/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}