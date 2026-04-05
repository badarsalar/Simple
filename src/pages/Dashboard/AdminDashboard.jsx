import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  MessageSquare, 
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  MoreVertical,
  Flag,
  DollarSign,
  Lock,
  ChevronRight,
  Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { platformStats, pendingRegistrations, pendingMedia, transactions } = useAuth();
  const [activeQueue, setActiveQueue] = useState('registrations');

  const stats = [
    { label: 'Platform Revenue', value: '$240K', icon: CreditCard, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Total Commissions', value: '$24K', icon: BarChart3, color: 'text-primary bg-primary/10' },
    { label: 'Active Providers', value: '1,240', icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: 'Pending Approvals', value: '18', icon: Clock, color: 'text-amber-500 bg-amber-50' },
  ];

  const mockRegistrations = [
    { id: 'REG-101', name: 'Dr. Ahmed Khan', role: 'Doctor', date: '2 mins ago', info: 'Oncology Specialist • MBBs' },
    { id: 'REG-102', name: 'City Central Pharmacy', role: 'Pharmacy', date: '1 hour ago', info: 'Licensed • Blue Area Store' },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2 text-left">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Super <span className="text-primary italic border-b-4 border-primary/20">Admin</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Overseeing the platform integrity, monetization, and clinical compliance.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase italic tracking-widest border border-rose-100">
               <Lock className="w-3 h-3" /> Secure Access
            </div>
         </div>
      </div>

      {/* Global Oversight Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                   <ArrowUpRight className="w-3 h-3" /> 5%
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-dark italic">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 items-start">
         {/* Moderation Queues */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl">
                  {['registrations', 'media', 'reviews'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setActiveQueue(tab)}
                        className={`px-6 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase italic tracking-widest transition-all ${activeQueue === tab ? 'bg-white text-primary shadow-sm shadow-primary/5 border border-primary/5' : 'text-slate-400 hover:text-dark'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
               <div className="relative flex-1 md:max-w-xs group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input type="text" placeholder="Search queue..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
               </div>
            </div>

            <div className="space-y-4">
               {mockRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-center gap-6">
                     <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform shrink-0">
                        <Users className="w-8 h-8" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                           <h4 className="text-sm font-black text-dark italic uppercase truncate">{reg.name}</h4>
                           <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-[8px] font-black uppercase italic">{reg.role}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest mt-1">{reg.info}</p>
                        <p className="text-[9px] font-black text-slate-300 uppercase italic mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {reg.date}</p>
                     </div>
                     <div className="flex gap-2">
                        <button className="px-6 py-3 bg-emerald-50 text-emerald-500 rounded-xl text-[9px] font-black uppercase italic tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm">Approve</button>
                        <button className="px-6 py-3 bg-rose-50 text-rose-500 rounded-xl text-[9px] font-black uppercase italic tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm">Reject</button>
                     </div>
                  </div>
               ))}

               <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[3rem] text-[10px] font-black text-slate-300 uppercase italic tracking-widest hover:border-primary/20 hover:text-dark transition-all">View Full Queue History</button>
            </div>
         </div>

         {/* Financial Oversight Sidebar */}
         <div className="xl:col-span-1 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-dark italic leading-none uppercase border-l-4 border-emerald-500 pl-4">Financials</h3>
            </div>
            
            <div className="bg-[#12141d] rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
               
               <div className="space-y-10 relative z-10">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-primary uppercase italic tracking-widest">Platform Commission</p>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter">$2,845.00</h4>
                     </div>
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-emerald-500">
                        <DollarSign className="w-6 h-6 animate-bounce" />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest">
                        <span className="text-slate-500">Fee Standard</span>
                        <span className="text-primary">10% Global Rate</span>
                     </div>
                     <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-bold text-slate-400 italic">Booking Tx #8812</span>
                           <span className="text-[9px] font-black text-emerald-400">+$4.50</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-bold text-slate-400 italic">Diamond Renewal #21</span>
                           <span className="text-[9px] font-black text-emerald-400">+$25.00</span>
                        </div>
                     </div>
                  </div>

                  <button className="w-full py-5 bg-white text-dark rounded-3xl font-black text-xs uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                     <BarChart3 className="w-4 h-4" /> Comprehensive Audit
                  </button>
               </div>
            </div>

            {/* Compliance Monitor */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-dark italic uppercase">Compliance Logs</h4>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <Flag className="w-4 h-4 text-rose-500" />
                     <p className="text-[10px] font-black text-dark uppercase italic tracking-tight">Stream #21 Flagged (Inappropriate)</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <AlertCircle className="w-4 h-4 text-amber-500" />
                     <p className="text-[10px] font-black text-dark uppercase italic tracking-tight">Bug: UI Clipping in Mobile Cart</p>
                  </div>
               </div>
               <button className="w-full mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-primary uppercase italic tracking-widest hover:underline">Monitor Live Streams <Play className="w-3 h-3 fill-primary" /></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
