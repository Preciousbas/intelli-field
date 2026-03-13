const BASE_URL =
  process.env.INFLECTIV_BASE_URL || 'https://app.inflectiv.ai/api/platform';

const API_KEY = process.env.INFLECTIV_API_KEY || '';
const STORED_AGENT_ID = process.env.FIELDOPS_AGENT_ID || '';

export async function inflectivFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-Key': API_KEY,
      ...(init?.headers || {}),
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Inflectiv ${res.status}: ${text}`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON from Inflectiv: ${text.slice(0, 200)}`);
  }
}

export async function resolveAgentId(): Promise<string> {
  if (STORED_AGENT_ID) return STORED_AGENT_ID;

  const raw = await inflectivFetch<unknown>('/ext/agents');
  const obj = raw as Record<string, unknown>;

  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(obj?.agents)
      ? (obj.agents as Record<string, unknown>[])
      : Array.isArray(obj?.results)
        ? (obj.results as Record<string, unknown>[])
        : Array.isArray(obj?.data)
          ? (obj.data as Record<string, unknown>[])
          : [];

  if (list.length > 0) {
    return String(list[0].id ?? list[0].agent_id ?? '');
  }

  const created = await inflectivFetch<Record<string, unknown>>('/ext/agents', {
    method: 'POST',
    body: JSON.stringify({ name: 'Field Ops Hub' }),
  });

  return String(
    created.id ??
      created.agent_id ??
      (created.data as Record<string, unknown> | undefined)?.id ??
      '',
  );
}

export function hasApiKey() {
  return !!API_KEY;
}