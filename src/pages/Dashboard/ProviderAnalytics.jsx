import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Activity, 
  CreditCard, 
  Download, 
  Filter, 
  Calendar,
  Zap,
  Target,
  MousePointer2,
  PieChart,
  BarChart,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProviderAnalytics = () => {
  const { user } = useAuth();

  const metrics = [
    { label: 'Total Revenue', value: '$12,840.50', trend: '+14.2%', icon: CreditCard, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Patient Visits', value: '1,420', trend: '+8.4%', icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: 'Profile CTR', value: '4.8%', trend: '+2.1%', icon: MousePointer2, color: 'text-primary bg-primary/10' },
    { label: 'Ad Performance', value: 'High', trend: 'Stable', icon: Target, color: 'text-amber-500 bg-amber-50' },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Advanced <span className="text-primary italic border-b-4 border-primary/20">Analytics</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Tracking your clinical growth, revenue trends, and advertisement performance.</p>
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 text-dark rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-sm hover:shadow-xl transition-all">
               <Calendar className="w-4 h-4 text-primary" /> Dec 2026 <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-3 px-6 py-4 bg-dark text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-dark/20 hover:scale-105 transition-all">
               <Download className="w-4 h-4" /> Export Report
            </button>
         </div>
      </div>

      {/* Global Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${metric.color}`}>
                   <metric.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${metric.trend.includes('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                   {metric.trend.includes('+') && <ArrowUpRight className="w-3 h-3" />} {metric.trend}
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{metric.label}</p>
                <p className="text-2xl font-black text-dark italic leading-none">{metric.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
         {/* Main Revenue Chart Area */}
         <div className="lg:col-span-2 bg-white rounded-[4rem] p-10 border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="flex items-center justify-between mb-12">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-dark italic uppercase leading-none">Clinical <span className="text-primary italic">Revenue</span></h3>
                  <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest leading-none">Fiscal progression tracking last 30 days</p>
               </div>
               <div className="flex gap-2">
                  <button className="p-3 bg-primary/10 text-primary rounded-xl"><BarChart className="w-5 h-5" /></button>
                  <button className="p-3 bg-slate-50 text-slate-300 rounded-xl"><PieChart className="w-5 h-5" /></button>
               </div>
            </div>
            
            {/* Chart Visual Placeholder */}
            <div className="h-80 flex items-end justify-between gap-1 relative z-10 px-4">
               {[40, 70, 45, 90, 65, 80, 55, 100, 70, 85, 60, 75].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                     <div 
                        className="w-full bg-slate-50 rounded-t-xl group-hover:bg-primary transition-all duration-500 shadow-sm relative overflow-hidden" 
                        style={{ height: `${h}%` }}
                     >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-dark text-white px-3 py-1.5 rounded-lg text-[8px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 shadow-xl">
                        ${h * 12}
                     </div>
                  </div>
               ))}
               <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-5">
                  <div className="border-t border-dark w-full mt-0"></div>
                  <div className="border-t border-dark w-full"></div>
                  <div className="border-t border-dark w-full"></div>
                  <div className="border-t border-dark w-full"></div>
               </div>
            </div>
            <div className="mt-8 flex justify-between px-4 text-[9px] font-black text-slate-300 uppercase italic tracking-widest border-t border-slate-50 pt-6">
               <span>Week 1</span>
               <span>Week 2</span>
               <span>Week 3</span>
               <span>Week 4</span>
            </div>
         </div>

         {/* Right Sidebar: Conversion & Ad Tracking */}
         <div className="flex flex-col gap-8 lg:gap-12">
            <div className="bg-dark rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden h-full group">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
               <div className="space-y-10 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                        <Zap className="w-6 h-6 animate-pulse" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Promotion</p>
                        <h4 className="text-xl font-black text-white italic mt-1 uppercase">Ad Manager</h4>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest leading-none">Listing CTR</span>
                           <span className="text-xs font-black text-primary italic">4.8%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div className="h-full w-[48%] bg-primary rounded-full shadow-lg shadow-primary/20"></div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest leading-none">Conversion</span>
                           <span className="text-xs font-black text-emerald-400 italic">12.5%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div className="h-full w-[65%] bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"></div>
                        </div>
                     </div>
                  </div>

                  <button className="w-full py-5 bg-primary text-white rounded-3xl font-black text-xs uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                     <Target className="w-4 h-4" /> Configure Campaigns
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-dark italic uppercase leading-none">Growth <span className="text-primary italic">Forecast</span></h4>
               </div>
               <p className="text-[10px] font-bold text-slate-400 italic leading-relaxed uppercase pr-10">Based on current CTR and conversion cycles, the facility is projected to grow 18% in the next quarter.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
