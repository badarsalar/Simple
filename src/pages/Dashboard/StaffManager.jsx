import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Calendar, 
  Clock, 
  BarChart3, 
  ShieldCheck, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ArrowUpRight, 
  Stethoscope,
  X,
  UserPlus,
  Mail,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StaffManager = () => {
  const { providers } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  
  const clinicDoctors = providers.filter(p => p.role === 'doctor' && (p.id < 4 || p.id === 101)); // Mocking clinic association

  const dutySchedules = [
    { day: 'Mon', hours: '09:00 AM - 05:00 PM', status: 'Active' },
    { day: 'Tue', hours: '09:00 AM - 05:00 PM', status: 'Active' },
    { day: 'Wed', hours: '09:00 AM - 05:00 PM', status: 'Active' },
    { day: 'Thu', hours: 'Emergency Only', status: 'On-Call' },
    { day: 'Fri', hours: '09:00 AM - 05:00 PM', status: 'Active' },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Staff <span className="text-primary italic border-b-4 border-primary/20">Management</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Register clinic doctors and manage their individual duty periods.</p>
         </div>
         <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
         >
            <UserPlus className="w-4 h-4" /> Register New Doctor
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 items-start">
         {/* Doctor List */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-dark italic uppercase leading-none border-l-4 border-primary pl-4">Clinical Team</h3>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{clinicDoctors.length} doctors registered</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {clinicDoctors.map((doc) => (
                  <div key={doc.id} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all"></div>
                     
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-16 h-16 rounded-[2.2rem] border-4 border-primary/20 p-0.5 shrink-0 overflow-hidden shadow-xl ring-4 ring-white">
                           <img src={doc.avatar || "https://i.pravatar.cc/150?u=doctor"} className="w-full h-full object-cover rounded-[1.8rem]" alt="" />
                        </div>
                        <div className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase italic ${doc.subscription?.type === 'Diamond' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'}`}>
                           {doc.subscription?.type || 'Standard'}
                        </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        <div className="space-y-1">
                           <h4 className="text-lg font-black text-dark italic uppercase leading-none truncate">Dr. {doc.name}</h4>
                           <p className="text-[10px] font-bold text-primary uppercase tracking-widest italic">{doc.specialization}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Revenue</p>
                              <p className="text-sm font-black text-dark italic leading-none">$1,240</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Visits</p>
                              <p className="text-sm font-black text-dark italic leading-none">84</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 flex gap-3 relative z-10">
                        <button className="flex-1 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[9px] font-black uppercase italic tracking-widest text-dark hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                           <Calendar className="w-3.5 h-3.5" /> Schedule
                        </button>
                        <button className="flex-1 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-[9px] font-black uppercase italic tracking-widest text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                           <Edit3 className="w-3.5 h-3.5" /> Profile
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Individual Duty Schedule Sidebar */}
         <div className="xl:col-span-1 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-dark italic uppercase leading-none border-l-4 border-emerald-500 pl-4">Duty Manager</h3>
            </div>
            
            <div className="bg-dark rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <Clock className="w-6 h-6 text-primary animate-pulse" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Weekly Cycles</p>
                        <h4 className="text-xl font-black text-white italic mt-1 uppercase">OPD Slots</h4>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {dutySchedules.map((day, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group/item">
                           <div>
                              <p className="text-[10px] font-black text-primary uppercase italic tracking-widest">{day.day}</p>
                              <p className="text-xs font-bold text-white/70 italic mt-1">{day.hours}</p>
                           </div>
                           <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg ${day.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                              {day.status}
                           </span>
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-5 bg-primary text-white rounded-3xl font-black text-xs uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                     <ShieldCheck className="w-4 h-4" /> Save Duty Cycles
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
               <div className="relative z-10 space-y-4 text-center">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mx-auto shadow-sm">
                     <BarChart3 className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-black text-dark italic uppercase tracking-tight">Staff Analytics</h4>
                  <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest leading-relaxed">Track facility usage, revenue per doctor, and conversion rates.</p>
                  <button className="text-[10px] font-black text-primary uppercase italic tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto">Open Reports <ArrowUpRight className="w-3 h-3" /></button>
               </div>
            </div>
         </div>
      </div>

      {/* Register Doctor Modal */}
      {showAdd && (
         <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-dark/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
               <button 
                  onClick={() => setShowAdd(false)}
                  className="absolute top-10 right-10 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all z-10"
               >
                  <X className="w-5 h-5" />
               </button>

               <div className="p-14 space-y-12">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black italic text-dark uppercase tracking-tight leading-none">Register <span className="text-primary italic border-b-4 border-primary/20">Staff</span></h3>
                     <p className="text-slate-400 font-bold italic text-sm">Create a new professional profile for your facility.</p>
                  </div>

                  <form className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Full Name</label>
                           <div className="relative">
                              <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input type="text" placeholder="Dr. Sarah Johnson" className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Specialization</label>
                           <div className="relative">
                              <Award className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input type="text" placeholder="e.g. Cardiologist" className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Work Email</label>
                        <div className="relative">
                           <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input type="email" placeholder="sarah.j@clinic.com" className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                        </div>
                     </div>

                     <div className="bg-primary/5 p-8 rounded-[3rem] border border-primary/10 flex items-center gap-6">
                        <Info className="w-10 h-10 text-primary shrink-0 opacity-40 px-2" />
                        <p className="text-[9px] font-bold text-primary uppercase italic tracking-widest leading-relaxed">Verification link will be sent to the doctor. They will need to approve the association to join your clinical facility.</p>
                     </div>

                     <div className="flex gap-4 pt-4">
                        <button className="flex-1 py-5 bg-primary text-white rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all">Send Association Invite</button>
                        <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-5 bg-slate-50 border border-slate-100 text-dark rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default StaffManager;
