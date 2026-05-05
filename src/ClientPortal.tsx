import { useState } from 'react';
import { CheckCircle2, Clock, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { initiateSTKPush } from '../lib/mpesa';

const ClientPortal = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const milestones = [
    { id: 1, title: 'Project Discovery', status: 'complete', date: 'May 1, 2026' },
    { id: 2, title: 'UI/UX Design Phase', status: 'complete', date: 'May 15, 2026' },
    { id: 3, title: 'Development & API Integration', status: 'current', date: 'June 1, 2026' },
    { id: 4, title: 'Final Deployment', status: 'pending', date: 'June 15, 2026' },
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      const phoneNumber = "254740149004";
      const amount = 1;
      const result = await initiateSTKPush(phoneNumber, amount);

      if (result.ResponseCode === "0") {
        alert("STK Push Sent! Check your phone.");
        setIsPaid(true);
      } else {
        alert("Error: " + result.ResponseDescription);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to connect to Safaricom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-grow space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Project: HustleHub Alpha</h2>
            <p className="text-slate-400 text-sm">Status: <span className="text-indigo-400 font-semibold italic">In Development</span></p>
          </div>
          <div className="space-y-6 relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-800" />
            {milestones.map((m) => (
              <div key={m.id} className="flex gap-6 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  m.status === 'complete' ? 'bg-indigo-500' : 
                  m.status === 'current' ? 'border-2 border-indigo-400 animate-pulse' : 'bg-slate-800'
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

        <div className="w-full md:w-80 shrink-0">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <div className="mb-6">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Current Balance</span>
              <div className="text-4xl font-black text-white mt-1">$3,250.00</div>
            </div>
            
            <button 
              onClick={handlePayment}
              disabled={isPaid || loading}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isPaid ? 'bg-emerald-500 text-white' : 'bg-white text-slate-950'
              } ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : isPaid ? 'Payment Received' : 'Pay via M-Pesa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;