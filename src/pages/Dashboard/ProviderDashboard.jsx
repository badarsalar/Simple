import React from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ProviderDashboard = ({ role }) => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Revenue', value: '$8,450', icon: CreditCard, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Monthly Visits', value: '1,240', icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: 'Profile Views', value: '4,821', icon: BarChart3, color: 'text-primary bg-primary/10' },
    { label: 'Active Plan', value: user?.subscription?.type || 'Platinum', icon: ShieldCheck, color: 'text-amber-500 bg-amber-50' },
  ];

  const renderRoleSpecificActions = () => {
    switch (role) {
      case 'doctor':
        return (
          <Link to="/dashboard/clinic" className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
             <Plus className="w-4 h-4" /> Start Virtual Clinic
          </Link>
        );
      case 'pharmacy':
        return (
          <Link to="/dashboard/inventory" className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
             <Plus className="w-4 h-4" /> Add New Medicine
          </Link>
        );
      case 'clinic':
        return (
          <Link to="/dashboard/staff" className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
             <Plus className="w-4 h-4" /> Register Doctor
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">{role} <span className="text-primary italic">Console</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Managing {user?.facilityName || user?.name}'s performance and clinical activity.</p>
         </div>
         <div className="flex items-center gap-3">
            {renderRoleSpecificActions()}
         </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 duration-300">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                   <ArrowUpRight className="w-3 h-3" /> 12%
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-dark italic">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Main Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
         {/* Revenue Graph Placeholder */}
         <div className="lg:col-span-2 bg-white rounded-[4rem] p-10 border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="flex items-center justify-between mb-10">
               <div className="space-y-1">
                  <h3 className="text-xl font-black text-dark italic uppercase leading-none">Revenue <span className="text-primary italic">Growth</span></h3>
                  <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest">Performance trend last 30 days</p>
               </div>
               <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <BarChart3 className="w-5 h-5 text-dark" />
               </div>
            </div>
            <div className="h-64 flex flex-col justify-center items-center text-center space-y-4">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-dashed border-slate-200">
                  <Activity className="w-8 h-8 text-slate-300 animate-pulse" />
               </div>
               <p className="text-sm font-black text-slate-300 italic uppercase">Advanced Analytics Tracking...</p>
            </div>
         </div>

         {/* Subscription Status Card */}
         <div className="bg-dark rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="space-y-8 relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-xl border border-primary/30">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase italic tracking-widest">{user?.subscription?.type || 'Platinum'} Member</span>
               </div>
               
               <h3 className="text-3xl font-black italic uppercase leading-tight tracking-tight">Boost Your <span className="text-primary italic border-b-4 border-primary/20">Ranking</span></h3>
               <p className="text-slate-400 font-bold italic leading-relaxed">Upgrade to Diamond Plan to unlock advanced ads manager, higher search priority, and multi-guest live streaming.</p>
               
               <button className="w-full py-5 bg-white text-dark rounded-3xl font-black text-xs uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Manage Subscription</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
