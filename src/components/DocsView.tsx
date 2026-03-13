import { useState } from 'react';
import { Copy, Check, Server, MapPin, MessageSquare, Database } from 'lucide-react';

function CodeBlock({ title, code }: { title?: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
          <span className="text-[11px] font-medium text-slate-500">{title}</span>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="px-4 py-3 text-[12px] leading-relaxed text-slate-700 font-mono overflow-x-auto bg-slate-50/50">
        {code}
      </pre>
    </div>
  );
}

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/inflectiv/datasets',
    desc: 'Returns dataset metadata — name, sources, chunk counts, status.',
    upstream: 'GET /api/v1/ext/datasets/',
    cost: 'Free',
    icon: Database,
    example: `curl http://localhost:5173/api/inflectiv/datasets`,
    response: `{
  "name": "Nigeria Healthcare Facilities",
  "dataset_api_name": "preciousbassey638_untitled-dataset_a70217",
  "is_active": true,
  "knowledge_sources": [
    { "id": 1, "title": "facilities.csv", "chunk_count": 8838, "status": "processed" }
  ]
}`,
  },
  {
    method: 'POST',
    path: '/api/inflectiv/datasets/query',
    desc: 'Semantic search over 8,838 vectorized chunks. Returns scored matches.',
    upstream: 'POST /api/v1/ext/datasets/query',
    cost: '1 credit',
    icon: Database,
    example: `curl -X POST http://localhost:5173/api/inflectiv/datasets/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "tertiary hospitals in Borno", "top_k": 5}'`,
    response: `{
  "results": [
    { "content": "University of Maiduguri Teaching Hospital...", "score": 0.92 },
    { "content": "State Specialist Hospital Maiduguri...", "score": 0.87 }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/inflectiv/agent',
    desc: 'Returns agent initialization status and ID.',
    upstream: 'GET /api/v1/ext/agents/',
    cost: 'Free',
    icon: MessageSquare,
    example: `curl http://localhost:5173/api/inflectiv/agent`,
    response: `{ "agentId": "42", "ready": true }`,
  },
  {
    method: 'POST',
    path: '/api/inflectiv/agent/chat',
    desc: 'Send a message to the RAG agent. It retrieves relevant chunks and reasons over them.',
    upstream: 'POST /api/v1/ext/agents/{id}/chat',
    cost: '1 credit',
    icon: MessageSquare,
    example: `curl -X POST http://localhost:5173/api/inflectiv/agent/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What emergency care options exist in rural Borno?"}'`,
    response: `{
  "response": "In rural Borno State, healthcare access is limited...",
  "sources": [
    { "content": "University of Maiduguri Teaching Hospital...", "score": 0.91 }
  ]
}`,
  },
];

export function DocsView() {
  return (
    <div className="animate-view">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">API Reference</h1>
        <p className="text-sm text-slate-500 mt-1">
          Proxy endpoints, architecture, and data model
        </p>
      </div>

      {/* Architecture */}
      <div className="border border-slate-200 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Server size={16} className="text-slate-400" />
          <p className="text-sm font-medium text-slate-900">Architecture</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 flex-wrap">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
            Browser
          </span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
            Vite Proxy
          </span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
            Inflectiv API
          </span>
        </div>
        <ul className="text-xs text-slate-500 space-y-1.5">
          <li>• API key stays server-side — never sent to browser</li>
          <li>• Agent created once on startup (5 credits), reused for all sessions</li>
          <li>• 10-minute cache on identical queries — no duplicate credit spend</li>
          <li>• Facility Finder runs entirely local — zero API calls</li>
        </ul>
      </div>

      {/* Facility Finder (local) */}
      <div className="border border-slate-200 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-slate-400" />
          <p className="text-sm font-medium text-slate-900">Facility Finder (local)</p>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          No API call. Uses Haversine distance on a local index of {' '}
          facilities with real GPS coordinates. Filterable by state, category, and distance radius.
        </p>
        <CodeBlock
          title="Haversine formula"
          code={`distance = R × 2 × atan2(√a, √(1−a))
where a = sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlng/2)
R = 6,371 km (Earth's radius)`}
        />
      </div>

      {/* API Endpoints */}
      <div className="space-y-4">
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          Proxy Endpoints
        </p>

        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="border border-slate-200 rounded-lg p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                    ep.method === 'GET'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-slate-800">{ep.path}</code>
              </div>
              <span className="text-[11px] text-slate-400">{ep.cost}</span>
            </div>

            <p className="text-xs text-slate-500 mb-3">{ep.desc}</p>

            <p className="text-[10px] text-slate-400 mb-2">
              Upstream: <code className="text-slate-500">{ep.upstream}</code>
            </p>

            <div className="space-y-2">
              <CodeBlock title="Request" code={ep.example} />
              <CodeBlock title="Response (shape)" code={ep.response} />
            </div>
          </div>
        ))}
      </div>

      {/* Data model */}
      <div className="border border-slate-200 rounded-lg p-5 mt-6">
        <p className="text-sm font-medium text-slate-900 mb-3">Facility Data Model (local index)</p>
        <CodeBlock
          title="TypeScript"
          code={`interface Facility {
  name: string;       // "Lagos University Teaching Hospital (LUTH)"
  lat: number;        // 6.5175
  lng: number;        // 3.3462
  state: string;      // "Lagos"
  lga: string;        // "Eti-Osa"
  type: string;       // "Teaching Hospital"
  category: string;   // "Tertiary" | "Secondary" | "Primary"
  ownership: string;  // "Federal" | "State" | "LGA" | "Private"
}`}
        />
      </div>
    </div>
  );
}