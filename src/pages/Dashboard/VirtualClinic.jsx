import React, { useState } from 'react';
import { 
  Video, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Circle, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Info,
  ChevronRight,
  Stethoscope,
  X,
  Phone,
  Mic,
  Camera,
  Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VirtualClinic = () => {
  const { user } = useAuth();
  const [activeSession, setActiveSession] = useState(null);

  const consultations = [
    { id: 1, patient: 'Sarah Johnson', type: 'Video Consultation', time: '10:00 AM (Now)', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 2, patient: 'Michael Chen', type: 'Follow-up Chat', time: '11:30 AM', status: 'Scheduled', avatar: 'https://i.pravatar.cc/150?u=michael' },
    { id: 3, patient: 'Ayesha Malik', type: 'Clinical Review', time: '02:00 PM', status: 'Scheduled', avatar: 'https://i.pravatar.cc/150?u=ayesha' },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Virtual <span className="text-primary italic border-b-4 border-primary/20">Clinic</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Managing your real-time consultations and patient engagement.</p>
         </div>
         <div className="flex items-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-500 rounded-xl text-[10px] font-black uppercase italic tracking-widest border border-emerald-100">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Open for Clinic
            </div>
            <button className="px-5 py-2 text-[10px] font-black uppercase italic tracking-widest text-slate-400 hover:text-dark transition-all">Go Offline</button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 items-start">
         {/* Live Session Control / List */}
         <div className="xl:col-span-1 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-dark italic leading-none uppercase">Queue</h3>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{consultations.length} total today</span>
            </div>
            
            <div className="space-y-4">
               {consultations.map((session) => (
                  <div 
                     key={session.id}
                     onClick={() => setActiveSession(session)}
                     className={`bg-white p-6 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden ${activeSession?.id === session.id ? 'border-primary ring-4 ring-primary/5 shadow-xl' : 'border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/20'}`}
                  >
                     <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl p-0.5 border-2 shrink-0 ${session.status === 'Active' ? 'border-primary shadow-lg shadow-primary/10' : 'border-slate-100'}`}>
                           <img src={session.avatar} className="w-full h-full object-cover rounded-[1rem]" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-dark italic uppercase truncate">{session.patient}</h4>
                              {session.status === 'Active' && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
                           </div>
                           <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-wider">{session.type}</p>
                           <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 text-slate-300" />
                              <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-tight">{session.time}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="bg-dark rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
               <div className="space-y-6 relative z-10">
                  <h3 className="text-2xl font-black italic uppercase leading-none">Schedule <span className="text-primary italic">Gap</span></h3>
                  <p className="text-slate-400 font-bold italic text-[10px] uppercase tracking-widest leading-relaxed pr-12">You have a 15-minute gap between your 11:30 and 11:45 appointments.</p>
                  <button className="flex items-center gap-3 text-[10px] font-black text-primary uppercase italic tracking-widest hover:underline">Update Duty Schedule <ChevronRight className="w-3 h-3" /></button>
               </div>
            </div>
         </div>

         {/* Virtual Consultation Interface */}
         <div className="xl:col-span-2">
            {!activeSession ? (
               <div className="bg-white rounded-[4rem] border border-slate-100 shadow-xl min-h-[600px] flex flex-col items-center justify-center p-12 text-center space-y-8 group">
                  <div className="w-32 h-32 bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] flex items-center justify-center text-slate-200 group-hover:border-primary/20 group-hover:text-primary transition-all duration-700">
                     <Video className="w-12 h-12" />
                  </div>
                  <div className="space-y-3">
                     <h2 className="text-3xl font-black italic text-dark uppercase tracking-tight">Ready for <span className="text-primary italic">Action</span></h2>
                     <p className="text-slate-400 font-bold italic text-sm max-w-sm mx-auto leading-relaxed">Select a patient from the queue to start a video consultation or integrated chat session.</p>
                  </div>
                  <button className="px-10 py-5 bg-primary text-white rounded-3xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
                     <Play className="w-4 h-4 fill-white" /> Open Consultation Interface
                  </button>
               </div>
            ) : (
               <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl min-h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                  {/* Interface Header */}
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20 p-0.5">
                           <img src={activeSession.avatar} className="w-full h-full object-cover rounded-[1rem]" alt="" />
                        </div>
                        <div>
                           <h3 className="text-xl font-black italic text-dark uppercase tracking-tight leading-none">{activeSession.patient}</h3>
                           <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest mt-1">Status: Active Consultation</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button className="p-4 bg-emerald-50 text-emerald-500 rounded-[1.5rem] hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                           <Camera className="w-5 h-5" />
                        </button>
                        <button className="p-4 bg-primary/10 text-primary rounded-[1.5rem] hover:bg-primary hover:text-white transition-all shadow-sm">
                           <Mic className="w-5 h-5" />
                        </button>
                        <button 
                           onClick={() => setActiveSession(null)}
                           className="p-4 bg-rose-50 text-rose-500 rounded-[1.5rem] hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        >
                           <Phone className="w-5 h-5 rotate-[135deg]" />
                        </button>
                     </div>
                  </div>

                  {/* Feed / Chat Area */}
                  <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50/30">
                     <div className="lg:col-span-2 space-y-6">
                        <div className="aspect-video bg-dark rounded-[3.5rem] relative overflow-hidden shadow-2xl group">
                           <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between text-white">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase italic tracking-widest text-primary">Patient Feed</p>
                                 <h4 className="text-2xl font-black italic uppercase tracking-tighter">{activeSession.patient}</h4>
                              </div>
                              <span className="px-4 py-2 bg-emerald-500 rounded-xl text-[9px] font-black uppercase italic tracking-widest animate-pulse">09:42 LIVE</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-xl transition-all">
                              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                 <Stethoscope className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Vitals</p>
                                 <p className="text-sm font-black text-dark italic mt-1 uppercase">120/80 BP</p>
                              </div>
                           </div>
                           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-xl transition-all">
                              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                 <Activity className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Heart Rate</p>
                                 <p className="text-sm font-black text-dark italic mt-1 uppercase">72 BPM</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-col space-y-6">
                        <div className="flex-1 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl p-8 flex flex-col justify-between group overflow-hidden">
                           <div className="space-y-1 mb-8">
                              <h5 className="text-sm font-black text-dark italic uppercase border-b-2 border-primary/20 pb-2 inline-block">Consultation Chat</h5>
                              <div className="mt-8 space-y-4">
                                 <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-sm text-[10px] font-bold text-slate-500 italic max-w-[85%] pr-8">
                                    Hello Doctor, I've been feeling a bit dizzy today.
                                 </div>
                                 <div className="bg-primary/5 p-4 rounded-2xl rounded-tr-sm text-[10px] font-bold text-primary italic max-w-[85%] ml-auto text-right">
                                    Understood, let's check your recent metrics.
                                 </div>
                              </div>
                           </div>
                           <div className="relative">
                              <input 
                                 type="text" 
                                 placeholder="Send secure message..." 
                                 className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400 italic"
                              />
                              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                                 <Send className="w-3 h-3" />
                              </button>
                           </div>
                        </div>

                        <button className="w-full py-5 bg-dark text-white rounded-3xl text-[10px] font-black uppercase italic tracking-widest hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-3">
                           <FileText className="w-4 h-4" /> Issue Prescription
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

const Send = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.11 13.6501L13.69 10.0601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default VirtualClinic;
