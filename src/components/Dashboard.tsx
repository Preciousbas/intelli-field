import { ArrowRight, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import { useDataset } from '../hooks/use-dataset';
import { FACILITIES } from '../data/facilities';
import type { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export function DashboardView({ onNavigate }: DashboardProps) {
  const { isLoading, error } = useDataset();

  return (
    <div className="animate-view">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Nigeria Health Facilities Intelligence Hub
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="border border-slate-200 rounded-lg px-4 py-4">
          <p className="text-xs text-slate-500 mb-1">Facilities Indexed</p>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">
            {FACILITIES.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">Local geospatial index</p>
        </div>

        <div className="border border-slate-200 rounded-lg px-4 py-4">
          <p className="text-xs text-slate-500 mb-1">States Covered</p>
          <p className="text-2xl font-semibold text-slate-900 tabular-nums">36 + FCT</p>
          <p className="text-[11px] text-slate-400 mt-1.5">Across Nigeria</p>
        </div>

        <div className="border border-slate-200 rounded-lg px-4 py-4">
          <p className="text-xs text-slate-500 mb-1">Dataset Status</p>
          <p className="text-2xl font-semibold text-slate-900">
            {isLoading ? '—' : error ? '○ Offline' : '● Live'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">Inflectiv-connected</p>
        </div>
      </div>

      {/* API warning */}
      {error && (
        <div className="flex items-start gap-2 px-4 py-3 mb-6 border border-amber-200 bg-amber-50 rounded-lg">
          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Agent queries unavailable</p>
            <p className="text-xs text-amber-600 mt-0.5">
              {error}. Facility Finder still works normally.
            </p>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => onNavigate('finder')}
          className="text-left border border-slate-200 rounded-lg px-4 py-4 hover:bg-slate-50 transition-colors group"
        >
          <MapPin size={18} className="text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-900">Find Facilities</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Nearest hospitals by GPS location
          </p>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-700">
            Open <ArrowRight size={12} />
          </p>
        </button>

        <button
          onClick={() => onNavigate('agent')}
          className="text-left border border-slate-200 rounded-lg px-4 py-4 hover:bg-slate-50 transition-colors group"
        >
          <MessageSquare size={18} className="text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-900">Ask Agent</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Questions about healthcare facilities
          </p>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-700">
            Open <ArrowRight size={12} />
          </p>
        </button>
      </div>

      {/* How it works */}
      <div className="border border-slate-200 rounded-lg p-4">
        <p className="text-sm font-medium text-slate-900 mb-3">How this app works</p>
        <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <p>
            <span className="font-medium text-slate-700">Find Facilities</span> shows you the nearest hospitals and clinics from your location. Works entirely locally, no internet required.
          </p>
          <p>
            <span className="font-medium text-slate-700">Ask Agent</span> answers questions about healthcare facilities anywhere in Nigeria.
          </p>
          <p>
            All data comes from the official national health facility registry.
          </p>
        </div>
      </div>
    </div>
  );
}