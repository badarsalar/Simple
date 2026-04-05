import React, { useState } from 'react';
import { 
  AlertCircle, 
  Send, 
  Image as ImageIcon, 
  Trash2, 
  CheckCircle, 
  ArrowLeft,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BugReport = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'UI/UX Issue',
    priority: 'Low',
    description: '',
    files: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would go to an API
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 lg:p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
         <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
            <CheckCircle className="w-12 h-12" />
         </div>
         <div className="space-y-3">
            <h2 className="text-3xl font-black italic text-dark uppercase tracking-tight">Report <span className="text-emerald-500 italic">Submitted</span></h2>
            <p className="text-slate-400 font-bold italic text-sm max-w-sm mx-auto">Thank you for your feedback! Our technical team will investigate and improve the platform status.</p>
         </div>
         <button 
            onClick={() => setSubmitted(false)}
            className="px-10 py-5 bg-dark text-white rounded-3xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-dark/20 hover:scale-105 transition-all"
         >
            Report Another Issue
         </button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-2">
         <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Technical <span className="text-primary italic">Support</span></h1>
         </div>
         <p className="text-slate-400 font-bold italic text-sm">Facing issues? Report technical bugs or platform glitches directly to the Admin.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Issue Category</label>
               <select 
                  className="w-full px-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
               >
                  <option>UI/UX Issue</option>
                  <option>Payment/Finance</option>
                  <option>Appointment/Booking</option>
                  <option>Live Streaming Bug</option>
                  <option>Data/Profile Error</option>
               </select>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Impact Intensity</label>
               <div className="flex gap-4">
                  {['Low', 'Medium', 'High'].map(p => (
                     <button
                        type="button"
                        key={p}
                        onClick={() => setFormData({...formData, priority: p})}
                        className={`flex-1 py-5 rounded-[2rem] text-[10px] font-black uppercase italic tracking-widest border transition-all ${
                           formData.priority === p 
                           ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-lg shadow-rose-500/10' 
                           : 'bg-white border-slate-100 text-slate-400 hover:text-dark hover:bg-slate-50'
                        }`}
                     >
                        {p}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Incident Description</label>
            <textarea 
               required
               placeholder="Please describe exactly what happened and how to replicate it..."
               rows="6"
               className="w-full px-8 py-8 bg-white border border-slate-100 rounded-[3rem] text-sm font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all shadow-sm resize-none italic placeholder:text-slate-300"
               value={formData.description}
               onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
         </div>

         <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Visual Evidence (Optional)</label>
            <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-12 flex flex-col items-center gap-6 hover:border-primary/20 hover:bg-slate-50/50 transition-all cursor-pointer group">
               <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white">
                  <ImageIcon className="w-6 h-6" />
               </div>
               <div className="text-center">
                  <p className="text-sm font-black text-dark italic uppercase">Upload Screenshot</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Attachments help our team resolve issues 3x faster.</p>
               </div>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row gap-6 pt-10">
            <button className="flex-1 py-5 bg-primary text-white rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
               <Send className="w-5 h-5" /> Submit Status Report
            </button>
            <Link to="/dashboard" className="flex-1 py-5 bg-white border border-slate-100 text-dark rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-4">
               <ArrowLeft className="w-5 h-5" /> Back to Dashboard
            </Link>
         </div>

         {/* Trust Note */}
         <div className="flex items-center gap-4 p-8 bg-black/5 rounded-[3rem] text-slate-500">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-[10px] font-bold italic leading-relaxed uppercase pr-10">We prioritize technical reports based on severity. Critical payment or streaming bugs are typically investigated within 12-24 hours.</p>
         </div>
      </form>
    </div>
  );
};

export default BugReport;
