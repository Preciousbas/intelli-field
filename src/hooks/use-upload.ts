import { useState, useCallback, useRef } from 'react';
import type { UploadItem } from '../types';

const STAGES: UploadItem['status'][] = ['pending', 'processing', 'structured', 'tokenized'];

export function useUpload() {
  const [queue, setQueue] = useState<UploadItem[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const addFiles = useCallback(
    (files: { name: string; size: string; fileType: string }[]) => {
      const newItems: UploadItem[] = files.map((f, i) => ({
        id: `upload-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        fileType: f.fileType,
        status: 'pending' as const,
        progress: 0,
      }));

      setQueue((prev) => [...prev, ...newItems]);

      newItems.forEach((item) => {
        let stageIndex = 0;
        const interval = setInterval(() => {
          stageIndex++;
          if (stageIndex >= STAGES.length) {
            clearInterval(interval);
            return;
          }
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: STAGES[stageIndex],
                    progress: (stageIndex / (STAGES.length - 1)) * 100,
                  }
                : q,
            ),
          );
        }, 1500 + Math.random() * 1000);

        intervalsRef.current.push(interval);
      });
    },
    [],
  );

  const addDemoFiles = useCallback(() => {
    addFiles([
      { name: 'cold_chain_sop_v3.pdf', size: '2.4 MB', fileType: 'PDF' },
      { name: 'rural_triage_protocol.pdf', size: '1.8 MB', fileType: 'PDF' },
      { name: 'lagos_delivery_routes.csv', size: '456 KB', fileType: 'CSV' },
      { name: 'sensor_readings_q1.csv', size: '1.2 MB', fileType: 'CSV' },
    ]);
  }, [addFiles]);

  const clearCompleted = useCallback(() => {
    setQueue((prev) => prev.filter((q) => q.status !== 'tokenized'));
  }, []);

  return { queue, addDemoFiles, clearCompleted };
}
