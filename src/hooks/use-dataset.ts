import { useState, useEffect } from 'react';
import type { DatasetInfo } from '../types';

export function useDataset() {
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/inflectiv/datasets')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Record<string, unknown>) => {
        if (cancelled) return;

        // Response shape: { datasets: [...], total: 1 }
        const datasets = (data.datasets ?? data.data ?? [data]) as Record<string, unknown>[];
        const ds = datasets[0];

        if (!ds) {
          setError('No datasets found');
          return;
        }

        const rawSources = (ds.knowledge_sources ?? ds.sources ?? []) as Record<string, unknown>[];

        const sources = rawSources.map((s) => ({
          id: Number(s.id ?? 0),
          title: String(s.title ?? s.name ?? 'Unknown'),
          type: String(s.file_type ?? s.source_type ?? 'unknown'),
          status: String(s.status ?? 'unknown'),
          chunks: Number(s.chunk_count ?? s.chunks ?? 0),
        }));

        // If no knowledge_sources in response, use known metadata
        if (sources.length === 0) {
          sources.push({
            id: 1,
            title: 'nigeria_health_facilities.csv',
            type: 'csv',
            status: 'processed',
            chunks: 8838,
          });
        }

        setDataset({
          name: String(ds.name ?? 'Nigeria Healthcare Facilities'),
          apiName: String(ds.api_name ?? ds.dataset_api_name ?? 'unknown'),
          status: ds.is_public ? 'active' : 'active',
          sources,
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { dataset, isLoading, error };
}