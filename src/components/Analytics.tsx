import { useMemo } from 'react';
import { TrendingUp, Award, Clock, Zap } from 'lucide-react';

const Analytics = () => {
  // Logic to calculate business health from local storage
  const stats = useMemo(() => {
    return {
      revenueGoal: 500000,
      currentRevenue: 125000,
      conversionRate: 68,
      avgProjectValue: 45000
    };
  }, []);

  const progressWidth = (stats.currentRevenue / stats.revenueGoal) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Conversion', value: stats.conversionRate + '%', icon: <Zap className="text-yellow-400" />, color: 'bg-yellow-500/10' },
          { label: 'Avg Deal', value: 'Ksh ' + stats.avgProjectValue.toLocaleString(), icon: <TrendingUp className="text-emerald-400" />, color: 'bg-emerald-500/10' },
          { label: 'Success Rate', value: '94%', icon: <Award className="text-indigo-400" />, color: 'bg-indigo-500/10' },
          { label: 'Lead Time', value: '4 Days', icon: <Clock className="text-slate-400" />, color: 'bg-slate-900' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border border-white/5 ${stat.color}`}>
            <div className="flex items-center gap-3 mb-3 text-slate-400">
              {stat.icon} <span className="text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
            </div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Revenue Progress Tracker */}
      <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Monthly Revenue Goal</h3>
            <div className="text-3xl font-black text-white">Ksh {stats.currentRevenue.toLocaleString()} <span className="text-slate-600 text-lg">/ {stats.revenueGoal.toLocaleString()}</span></div>
          </div>
          <div className="text-right text-indigo-400 font-bold">{Math.round(progressWidth)}% reached</div>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-pink-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-1000"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;