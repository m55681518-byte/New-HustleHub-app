import React, { useState } from 'react';
import { CheckCircle2, Clock, CreditCard, ShieldCheck, ExternalLink } from 'lucide-react';

const ClientPortal = () => {
  const [isPaid, setIsPaid] = useState(false);

  // Milestone data - in a real app, this would come from your state/localStorage
  const milestones = [
    { id: 1, title: 'Project Discovery', status: 'complete', date: 'May 1, 2026' },
    { id: 2, title: 'UI/UX Design Phase', status: 'complete', date: 'May 15, 2026' },
    { id: 3, title: 'Development & API Integration', status: 'current', date: 'June 1, 2026' },
    { id: 4, title: 'Final Deployment', status: 'pending', date: 'June 15, 2026' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* LEFT: Project Progress Tracking */}
        <div className="flex-grow space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Project: HustleHub Alpha</h2>
            <p className="text-slate-400 text-sm">Status: <span className="text-indigo-400 font-semibold italic">In Development</span></p>
          </div>

          <div className="space-y-6 relative">
            {/* Visual Timeline Connector */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-800" />
            
            {milestones.map((m) => (
              <div key={m.id} className="flex gap-6 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  m.status === 'complete' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
                  m.status === 'current' ? 'bg-slate-900 border-2 border-indigo-400 animate-pulse' : 'bg-slate-800'
                }`}>
                  {m.status === 'complete' && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${m.status === 'pending' ? 'text-slate-500' : 'text-slate-100'}`}>
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-500">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: High-Conversion Payment Card */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 sticky top-10">
            <div className="mb-6">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Current Balance</span>
              <div className="text-4xl font-black text-white mt-1">$3,250.00</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock size={14} /> Due in 4 days
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-emerald-500" /> Secure Encryption
              </div>
            </div>

            <button 
              onClick={() => setIsPaid(true)}
              disabled={isPaid}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                isPaid ? 'bg-emerald-500 text-white cursor-default' : 'bg-white text-slate-950 hover:bg-slate-200 shadow-lg shadow-white/5'
              }`}
            >
              {isPaid ? 'Payment Received' : <><CreditCard size={18} /> Pay Invoice</>}
            </button>
            
            <p className="text-[10px] text-center text-slate-500 mt-4 px-4 leading-relaxed">
              Payments processed via Stripe. By paying you agree to the <span className="underline cursor-pointer">Terms of Service</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;