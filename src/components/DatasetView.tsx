import { Database, FileText, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useDataset } from '../hooks/use-dataset';
import { FACILITIES } from '../data/facilities';
import { uniqueValues } from '../lib/geo';

export function DatasetView() {
  const { dataset, isLoading, error } = useDataset();
  const stateCount = uniqueValues(FACILITIES, 'state').length;
  const categories = uniqueValues(FACILITIES, 'category');
  const types = uniqueValues(FACILITIES, 'type');

  return (
    <div className="animate-view">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Dataset</h1>
        <p className="text-sm text-slate-500 mt-1">
          Knowledge source metadata from Inflectiv
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader size={20} className="animate-spin text-slate-400" />
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 px-4 py-3 mb-6 border border-amber-200 bg-amber-50 rounded-lg">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Could not fetch dataset metadata</p>
            <p className="text-xs text-amber-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Inflectiv metadata */}
        <div className="border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-900">Inflectiv Dataset</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Name</p>
              <p className="text-sm text-slate-700">
                {dataset?.name || 'Nigeria Healthcare Facilities'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">API Name</p>
              <p className="text-sm text-slate-700 font-mono text-[12px] break-all">
                {dataset?.apiName || '—'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Status</p>
              <div className="flex items-center gap-1.5">
                {isLoading ? (
                  <Loader size={12} className="animate-spin text-slate-400" />
                ) : (
                  <CheckCircle size={12} className="text-emerald-500" />
                )}
                <p className="text-sm text-emerald-700">
                  {isLoading ? 'Checking…' : 'Active'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Dataset ID</p>
              <p className="text-sm text-slate-700 font-mono">7519</p>
            </div>
          </div>
        </div>

        {/* Knowledge sources */}
        <div className="border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-900">Knowledge Sources</p>
          </div>

          {dataset?.sources && dataset.sources.length > 0 ? (
            <div className="space-y-3">
              {dataset.sources.map((src) => (
                <div
                  key={src.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="text-sm text-slate-700">{src.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {src.type.toUpperCase()} · {src.chunks.toLocaleString()} chunks
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      src.status === 'processed' || src.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {src.status}
                  </span>
                </div>
              ))}
            </div>
          ) : !isLoading ? (
            <p className="text-sm text-slate-400 py-4 text-center">
              Source metadata unavailable — dataset is still accessible via agent
            </p>
          ) : null}
        </div>

        {/* Local facility index */}
        <div className="border border-slate-200 rounded-lg p-5">
          <p className="text-sm font-medium text-slate-900 mb-1">Local Facility Index</p>
          <p className="text-xs text-slate-500 mb-4">
            Representative subset cached locally for zero-credit geospatial queries.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Facilities</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">
                {FACILITIES.length}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">States</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">{stateCount}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Categories</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">
                {categories.length}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-0.5">Facility Types</p>
              <p className="text-lg font-semibold text-slate-900 tabular-nums">{types.length}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 mb-2">Coverage by category</p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const count = FACILITIES.filter((f) => f.category === cat).length;
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-md text-slate-600"
                  >
                    {cat}{' '}
                    <span className="text-slate-400 font-mono tabular-nums">{count}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}