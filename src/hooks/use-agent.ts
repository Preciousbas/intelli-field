import { useState, useCallback, useEffect, useRef } from 'react';
import * as api from '../lib/inflectiv';
import type { QueryMessage } from '../types';

export function useAgent() {
  const [messages, setMessages] = useState<QueryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const initRef = useRef(false);

  // Check agent readiness on mount
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    api
      .getAgentStatus()
      .then((status) => {
        setReady(status.ready);
        if (!status.ready) setError('Agent not yet initialized — check server logs');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to reach server proxy');
      })
      .finally(() => setIsInitializing(false));
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!ready || isLoading) return;
      setError(null);

      const userMsg: QueryMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await api.chatWithAgent(content);

        // Normalize — try common response keys
        const text =
          typeof res.response === 'string'
            ? res.response
            : typeof res.message === 'string'
              ? res.message
              : typeof res.answer === 'string'
                ? res.answer
                : typeof res.content === 'string'
                  ? res.content
                  : JSON.stringify(res, null, 2);

        const rawSources = (res.sources ?? res.references ?? res.chunks ?? []) as Record<
          string,
          unknown
        >[];
        const sources = rawSources
          .slice(0, 5)
          .map((s) => {
            const t =
              typeof s.content === 'string'
                ? s.content
                : typeof s.text === 'string'
                  ? s.text
                  : '';
            return t.length > 150 ? t.slice(0, 150) + '…' : t;
          })
          .filter(Boolean);

        const assistantMsg: QueryMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: text,
          sources: sources.length > 0 ? sources : undefined,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Query failed';
        setError(errMsg);
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'assistant',
            content: `Error: ${errMsg}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [ready, isLoading],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, isInitializing, error, ready, sendMessage, clearMessages };
}