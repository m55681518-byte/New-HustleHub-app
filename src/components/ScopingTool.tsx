import { useState, useMemo } from 'react';
import { Target, Zap, Shield, ChevronRight, Copy, Check } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

const SERVICES: Service[] = [
  { id: '1', name: 'UI/UX Design System', basePrice: 1500, description: 'Complete design language & high-fidelity prototypes.' },
  { id: '2', name: 'Frontend Architecture', basePrice: 3000, description: 'React/Vite setup with optimized performance.' },
  { id: '3', name: 'API Integration', basePrice: 1200, description: 'Seamless connection to third-party services.' },
  { id: '4', name: 'Maintenance & SEO', basePrice: 800, description: 'Ongoing support and search optimization.' },
];

const ScopingTool = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const total = useMemo(() => 
    SERVICES.filter(s => selected.includes(s.id)).reduce((acc, curr) => acc + curr.basePrice, 0)
  , [selected]);

  const toggleService = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Target className="text-indigo-400" /> Rapid Proposal Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                selected.includes(service.id) ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-sm font-bold uppercase tracking-widest ${selected.includes(service.id) ? 'text-indigo-300' : 'text-slate-500'}`}>{service.name}</span>
                <Zap size={16} className={selected.includes(service.id) ? 'text-indigo-400' : 'text-slate-700'} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{service.description}</p>
              <div className="text-lg font-black">${service.basePrice.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col h-fit sticky top-8">
        <div className="mb-8">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Estimated Investment</div>
          <div className="text-5xl font-black text-white">${total.toLocaleString()}</div>
        </div>
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-xs text-emerald-400 font-bold uppercase tracking-tighter"><Shield size={14} /> Fixed Price Guarantee</div>
        </div>
        <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 mb-4">
          {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Link</>}
        </button>
        <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"><ChevronRight size={18} /> Generate PDF</button>
      </div>
    </div>
  );
};

export default ScopingTool;