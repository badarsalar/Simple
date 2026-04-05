import React from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Video,
  ChevronRight,
  User,
  ShieldCheck,
  Activity,
  Award
} from 'lucide-react';

const AppointmentRow = ({ 
  id, 
  name, 
  subtext, 
  date, 
  time, 
  status, 
  image, 
  type, 
  onCancel, 
  onReschedule, 
  onChat, 
  onJoin, 
  onConfirm,
  isDoctor = false 
}) => {
  const isOnline = type === 'Online' || type === 'Video';
  const isPending = status === 'Pending';
  const isBooked = status === 'Booked' || status === 'Confirmed';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[2.5rem] border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all group relative overflow-hidden">
      <div className="relative shrink-0">
        <img src={image} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-slate-50 group-hover:border-primary/20 transition-all" alt={name} />
        {isOnline && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
             <Video className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left min-w-0">
        <div className="flex items-center justify-center sm:justify-start gap-2">
           <h4 className="font-black text-dark group-hover:text-primary transition-colors italic leading-none">{name}</h4>
           {isBooked && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center justify-center sm:justify-start gap-2">
           {subtext} <span className="w-1 h-1 bg-slate-200 rounded-full"></span> {type}
        </p>
      </div>

      <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 sm:px-6 border-y sm:border-y-0 sm:border-x border-slate-50 py-4 sm:py-0">
         <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-sm ${
           isBooked ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 
           isPending ? 'bg-amber-50 text-amber-500 border border-amber-100' : 
           'bg-slate-50 text-slate-400 border border-slate-100'
         }`}>
           {status}
         </span>
         <div className="flex items-center gap-2 text-[10px] font-black text-dark uppercase tracking-widest italic">
            <Clock className="w-3.5 h-3.5 text-primary" /> {date} <span className="opacity-20 text-[12px]">•</span> {time}
         </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
         {onConfirm && isPending && (
           <button onClick={onConfirm} className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20" title="Confirm"><CheckCircle2 className="w-5 h-5" /></button>
         )}
         {onJoin && isOnline && isBooked && (
           <button onClick={onJoin} className="bg-primary text-white p-3 rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2 px-6 ml-2 group/btn">
              <span className="text-[9px] font-black uppercase tracking-widest">Connect</span>
              <Activity className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
           </button>
         )}
         {onChat && (
           <button onClick={onChat} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary hover:bg-white border border-transparent hover:border-slate-100 transition-all" title="Secure Message"><MessageSquare className="w-5 h-5" /></button>
         )}
         {onReschedule && (
           <button onClick={onReschedule} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-500 hover:bg-white border border-transparent hover:border-slate-100 transition-all" title="Reschedule"><Calendar className="w-5 h-5" /></button>
         )}
         {onCancel && (
           <button onClick={onCancel} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-white border border-transparent hover:border-slate-100 transition-all" title="Cancel Consultation"><Trash2 className="w-5 h-5" /></button>
         )}
         {!onCancel && (
           <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-primary transition-all">
              <ChevronRight className="w-5 h-5" />
           </button>
         )}
      </div>
    </div>
  );
};

export default AppointmentRow;
