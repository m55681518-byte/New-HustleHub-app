import { useState } from 'react';
import { LayoutDashboard, PieChart, Receipt, Target, Globe, Settings } from 'lucide-react';
import InvoiceEngine from './components/InvoiceEngine';
import ClientPortal from './ClientPortal';
import ScopingTool from './components/ScopingTool';

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState('pipeline');

  const navItems = [
    { id: 'pipeline', label: 'Pipeline', icon: <PieChart size={18} /> },
    { id: 'invoices', label: 'Invoicing', icon: <Receipt size={18} /> },
    { id: 'scoping', label: 'Proposals', icon: <Target size={18} /> },
    { id: 'portal', label: 'Client View', icon: <Globe size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans">
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <span className="font-black tracking-tighter text-xl">HUSTLEHUB</span>
        </div>
        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white transition-colors text-sm font-medium">
            <Settings size={18} /> Settings
          </button>
        </div>
      </aside>
      <main className="flex-grow p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <h1 className="text-3xl font-black tracking-tight">
            {navItems.find(n => n.id === activeTab)?.label}
          </h1>
          <p className="text-slate-400 mt-1">Real-time business intelligence for May 2026.</p>
        </div>
        <div className="transition-all duration-300">
          {activeTab === 'pipeline' && <div className="text-white text-xl">Welcome to HustleHub Pipeline</div>}
          {activeTab === 'scoping' && <ScopingTool />}
          {activeTab === 'portal' && <ClientPortal />}
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;