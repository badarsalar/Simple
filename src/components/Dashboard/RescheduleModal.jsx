import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const RescheduleModal = ({ show, onClose, onConfirm, appointmentId, doctorName = "Practitioner" }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (!show) return null;

  const handleSubmit = () => {
    if (newDate && newTime) {
      onConfirm(appointmentId, newDate, newTime);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-8 sm:p-12 text-center space-y-8 shadow-2xl scale-in-center relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>

        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all border border-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto border-2 border-indigo-100 shadow-xl shadow-indigo-500/10 mb-2 group">
          <Calendar className="w-10 h-10 text-indigo-500 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-dark tracking-tight leading-none italic uppercase">Update <span className="text-indigo-500">Timeline.</span></h3>
          <p className="text-slate-400 font-bold italic text-xs sm:text-sm">Modify the consultation schedule for Dr. {doctorName}.</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="date" 
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50/50 rounded-[1.5rem] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 italic font-black text-dark transition-all"
              required
            />
          </div>
          <div className="relative group">
            <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="time" 
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50/50 rounded-[1.5rem] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 italic font-black text-dark transition-all"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest text-left leading-relaxed">
            Rescheduling will send a secure notification to both parties for digital validation.
          </p>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!newDate || !newTime}
          className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl leading-none italic ${
            newDate && newTime 
              ? 'bg-dark text-white hover:bg-indigo-600 shadow-dark/20' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Confirm Update <ShieldCheck className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RescheduleModal;
