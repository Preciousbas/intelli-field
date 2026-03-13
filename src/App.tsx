import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { View } from './types';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/Dashboard';
import { FacilityFinderView } from './components/FacilityFinder';
import { AgentChatView } from './components/AgentChat';
// import { DatasetView } from './components/DatasetView';
import { DocsView } from './components/DocsView';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} />;
      case 'finder':
        return <FacilityFinderView />;
      case 'agent':
        return <AgentChatView />;
      // case 'dataset':
      //   return <DatasetView />;
      case 'docs':
        return <DocsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 h-12 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1 text-slate-600 hover:text-slate-900"
        >
          <Menu size={18} />
        </button>
        <span className="text-sm font-semibold text-slate-900">Field Ops Hub</span>
        <div className="w-6" />
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="lg:hidden absolute top-3 right-3 z-10">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>
        <Sidebar current={currentView} onNavigate={handleNavigate} />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pt-12 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;