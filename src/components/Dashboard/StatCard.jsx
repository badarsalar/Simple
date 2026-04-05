import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color = "indigo" }) => {
  const isPositive = trend?.startsWith('+');
  
  const colorMap = {
    primary: 'emerald',
    indigo: 'indigo',
    amber: 'amber',
    rose: 'rose',
    emerald: 'emerald'
  };
  const themeColor = colorMap[color] || 'indigo';
  
  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${themeColor}-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:scale-110 transition-transform duration-700`}></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 bg-${themeColor}-50 rounded-2xl flex items-center justify-center text-${themeColor}-500 group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7" />
        </div>
        {trend && (
           <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {isPositive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} {trend}
           </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-4xl font-black text-dark tracking-tighter italic leading-none">{value}</h3>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
