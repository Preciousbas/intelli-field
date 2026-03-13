import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  // Database,
  // Code2,
  Radio,
} from 'lucide-react';
import type { View } from '../types';

const NAV_ITEMS: {
  id: View;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'finder', label: 'Find Facilities', icon: MapPin },
  { id: 'agent', label: 'Ask Agent', icon: MessageSquare },
 // { id: 'dataset', label: 'Dataset', icon: Database },
  //{ id: 'docs', label: 'API Reference', icon: Code2 },
];

interface SidebarProps {
  current: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 h-screen border-r border-slate-200 flex flex-col bg-white shrink-0">
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
            <Radio size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-none">Field Ops Hub</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Powered by Inflectiv</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors ${
                  current === id
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">
          Dataset
        </p>
        <p className="text-[11px] text-slate-500 font-mono leading-relaxed">ID 7519</p>
        <p className="text-[10px] text-slate-400 mt-1">Inflectiv · RAG-indexed</p>
      </div> */}
    </aside>
  );
}