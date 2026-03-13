import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

interface ProxyConfig {
  apiKey: string;
  baseUrl: string;
}

let API_KEY = '';
let BASE_URL = '';
let agentId: string | null = null;
let agentInitPromise: Promise<void> | null = null;

// ── Cache (10-min TTL) ──────────────────────────────────────────

const cache = new Map<string, { data: unknown; time: number }>();
const TTL = 10 * 60 * 1000;

function cached(key: string): unknown | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, time: Date.now() });
}

// ── Inflectiv HTTP ──────────────────────────────────────────────

async function inflectivFetch<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const method = init?.method || 'GET';
  console.log(`[proxy] → ${method} ${url}`);

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': API_KEY,
        ...((init?.headers as Record<string, string>) || {}),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'network error';
    throw new Error(`Cannot reach Inflectiv: ${msg}`);
  }

  // Handle redirects manually (preserve X-API-Key)
  if ([301, 302, 307, 308].includes(res.status)) {
    const location = res.headers.get('location');
    if (location) {
      const redirectUrl = location.startsWith('http') ? location : `${BASE_URL}${location}`;
      console.log(`[proxy] ← ${res.status} redirect → ${redirectUrl}`);
      res = await fetch(redirectUrl, {
        ...init,
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-API-Key': API_KEY,
          ...((init?.headers as Record<string, string>) || {}),
        },
      });
    }
  }

  const bodyText = await res.text();
  const isHtml =
    bodyText.trimStart().startsWith('<!') ||
    bodyText.trimStart().startsWith('<html') ||
    bodyText.includes('<!DOCTYPE');

  console.log(`[proxy] ← ${res.status} | ${bodyText.length}b`);

  if (isHtml) {
    throw new Error(`Inflectiv ${res.status}: HTML response for ${method} ${path}`);
  }

  if (!res.ok) {
    throw new Error(`Inflectiv ${res.status}: ${bodyText.slice(0, 300)}`);
  }

  try {
    return JSON.parse(bodyText) as T;
  } catch {
    throw new Error(`Invalid JSON: ${bodyText.slice(0, 200)}`);
  }
}

// ── Agent bootstrap ─────────────────────────────────────────────

async function initAgent(): Promise<void> {
  // Check env for stored agent ID first
  const stored = process.env.FIELDOPS_AGENT_ID;
  if (stored) {
    agentId = stored;
    console.log(`[proxy] ✓ Using stored agent: ${agentId}`);
    return;
  }

  // List existing agents (free)
  try {
    console.log('[proxy] Listing agents…');
    const raw = await inflectivFetch<unknown>('/ext/agents');
    console.log('[proxy] Agents response:', JSON.stringify(raw).slice(0, 500));

    const obj = raw as Record<string, unknown>;
    const list = Array.isArray(raw)
      ? raw
      : Array.isArray(obj?.agents)
        ? (obj.agents as unknown[])
        : Array.isArray(obj?.results)
          ? (obj.results as unknown[])
          : Array.isArray(obj?.data)
            ? (obj.data as unknown[])
            : null;

    if (list && list.length > 0) {
      const first = list[0] as Record<string, unknown>;
      const id = String(first.id ?? first.agent_id ?? '');
      if (id && id !== 'undefined' && id !== '') {
        agentId = id;
        console.log(`[proxy] ✓ Reusing agent: ${agentId}`);
        return;
      }
    }
    console.log('[proxy] No existing agents found');
  } catch (err) {
    console.warn('[proxy] List agents failed:', err instanceof Error ? err.message : err);
  }

  // Create new agent (5 credits)
  try {
    console.log('[proxy] Creating agent (5 credits)…');
    const agent = await inflectivFetch<Record<string, unknown>>('/ext/agents', {
      method: 'POST',
      body: JSON.stringify({ name: 'Field Ops Hub' }),
    });
    console.log('[proxy] Create response:', JSON.stringify(agent).slice(0, 500));

    const id = String(
      agent.id ??
        agent.agent_id ??
        (agent.data as Record<string, unknown>)?.id ??
        (agent.data as Record<string, unknown>)?.agent_id ??
        '',
    );

    if (id && id !== 'undefined' && id !== '') {
      agentId = id;
      console.log(`[proxy] ✓ Agent created: ${agentId}`);
      console.log(`[proxy]   → Add FIELDOPS_AGENT_ID=${agentId} to .env`);
    } else {
      console.error('[proxy] ✗ No agent ID in response');
    }
  } catch (err) {
    console.error('[proxy] ✗ Create failed:', err instanceof Error ? err.message : err);
  }
}

// ── Helpers ─────────────────────────────────────────────────────

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

// ── Vite Plugin ─────────────────────────────────────────────────

export function inflectivProxy(config: ProxyConfig): Plugin {
  return {
    name: 'inflectiv-proxy',

    configureServer(server: ViteDevServer) {
      API_KEY = config.apiKey;
      BASE_URL = config.baseUrl;

      if (!API_KEY) {
        console.warn('[proxy] ⚠ No API key set');
      } else {
        console.log(`[proxy] Key: ${API_KEY.slice(0, 12)}…`);
        console.log(`[proxy] Base: ${BASE_URL}`);
        console.log(`[proxy] Auth: X-API-Key header`);
        agentInitPromise = initAgent();
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/inflectiv')) return next();
        if (!API_KEY) return sendJson(res, 503, { error: 'API key not configured' });

        const route = url.replace('/api/inflectiv', '');

        try {
          // ── GET /datasets ─────────────────────────────────
          if (route === '/datasets' && req.method === 'GET') {
            const hit = cached('datasets');
            if (hit) return sendJson(res, 200, hit);

            const data = await inflectivFetch('/ext/datasets');
            setCache('datasets', data);
            return sendJson(res, 200, data);
          }

          // ── POST /datasets/query ──────────────────────────
          if (route === '/datasets/query' && req.method === 'POST') {
            const body = await readBody(req);
            const cacheKey = `dsq:${body}`;
            const hit = cached(cacheKey);
            if (hit) return sendJson(res, 200, hit);

            const data = await inflectivFetch('/ext/datasets/query', {
              method: 'POST',
              body,
            });
            setCache(cacheKey, data);
            return sendJson(res, 200, data);
          }

          // ── GET /agent ────────────────────────────────────
          if (route === '/agent' && req.method === 'GET') {
            if (agentInitPromise) await agentInitPromise;
            return sendJson(res, 200, { agentId, ready: !!agentId });
          }

          // ── POST /agent/chat ──────────────────────────────
          if (route === '/agent/chat' && req.method === 'POST') {
            if (agentInitPromise) await agentInitPromise;
            if (!agentId) {
              return sendJson(res, 503, { error: 'Agent not initialized — check server logs' });
            }

            const body = await readBody(req);
            const cacheKey = `chat:${body}`;
            const hit = cached(cacheKey);
            if (hit) return sendJson(res, 200, hit);

            const data = await inflectivFetch(`/ext/agents/${agentId}/chat`, {
              method: 'POST',
              body,
            });
            setCache(cacheKey, data);
            return sendJson(res, 200, data);
          }

          return sendJson(res, 404, { error: `Unknown route: ${route}` });
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Proxy error';
          console.error(`[proxy] ERROR ${req.method} ${route}:`, msg);
          return sendJson(res, 502, { error: msg });
        }
      });
    },
  };
}