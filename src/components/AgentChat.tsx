import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Trash2, AlertCircle, Bot, User } from 'lucide-react';
import { useAgent } from '../hooks/use-agent';

const SUGGESTIONS = [
  'List health facilities in Niger State',
  'What tertiary hospitals are in Borno State?',
  'Which facilities are federal-owned in Lagos?',
  'Show health facilities in Maiduguri',
];

export function AgentChatView() {
  const { messages, isLoading, isInitializing, error, ready, sendMessage, clearMessages } =
    useAgent();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-view flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Ask Agent</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ask questions about facility records, locations, ownership, and service distribution
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Trash2 size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Status banners */}
      {isInitializing && (
        <div className="flex items-center gap-2 px-4 py-3 mb-4 border border-slate-200 bg-slate-50 rounded-lg shrink-0">
          <Loader size={14} className="animate-spin text-slate-500" />
          <p className="text-sm text-slate-600">Connecting to agent…</p>
        </div>
      )}

      {error && !isInitializing && (
        <div className="flex items-start gap-2 px-4 py-3 mb-4 border border-amber-200 bg-amber-50 rounded-lg shrink-0">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700">{error}</p>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        {messages.length === 0 && !isInitializing && (
          <div className="text-center py-12">
            <Bot size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm text-slate-500 mb-1">
              Ask anything about Nigeria's health infrastructure
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Powered by Inflectiv RAG — dataset 7519
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-left px-3 py-2.5 text-xs text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-slate-500" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                    Sources
                  </p>
                  {msg.sources.map((src, i) => (
                    <p key={i} className="text-[11px] text-slate-500 leading-snug mb-1">
                      {i + 1}. {src}
                    </p>
                  ))}
                </div>
              )}

              <p
                className={`text-[10px] mt-1.5 ${
                  msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-slate-500" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader size={14} className="animate-spin text-slate-400" />
                <span className="text-sm text-slate-500">Thinking…</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border border-slate-200 rounded-lg flex items-end gap-2 p-2 bg-white shrink-0">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ready ? 'Ask about healthcare facilities…' : 'Connecting…'}
          disabled={!ready || isLoading}
          rows={1}
          className="flex-1 resize-none px-2 py-1.5 text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none disabled:opacity-50"
          style={{ minHeight: '36px', maxHeight: '120px' }}
        />
        <button
          onClick={handleSend}
          disabled={!ready || isLoading || !input.trim()}
          className="p-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}