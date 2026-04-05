import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  MoreVertical, 
  X, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ArrowRight,
  User,
  ShieldCheck,
  RefreshCw,
  Slash
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';

const Appointments = () => {
  const { addNotification } = useAuth();
  const { appointments, cancelAppointment } = useDashboard();
  const [filter, setFilter] = useState('upcoming');
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });

  const { rescheduleAppointment } = useDashboard();

  const handleCancel = (id) => {
    cancelAppointment(id);
    addNotification({
      title: 'Appointment Cancelled',
      message: 'Your appointment has been successfully cancelled. Refund processed (if applicable).',
      type: 'warning'
    });
    setShowCancelConfirm(null);
  };

  const handleRescheduleInit = (app) => {
    setShowRescheduleModal(app);
    setRescheduleData({ date: app.date, time: app.time });
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleData.date || !rescheduleData.time) return;

    rescheduleAppointment(showRescheduleModal.id, rescheduleData.date, rescheduleData.time);
    addNotification({
      title: 'Appointment Changed',
      message: `Your visit with ${showRescheduleModal.doctor} has been moved to ${rescheduleData.date} at ${rescheduleData.time}.`,
      type: 'success'
    });
    setShowRescheduleModal(null);
  };

  const handleJoin = (id) => {
    setIsConnecting(id);
    setTimeout(() => {
      setIsConnecting(null);
      addNotification({
        title: 'Virtual Clinic Redirect',
        message: 'Connecting to secure healthcare bridge...',
        type: 'success'
      });
    }, 2000);
  };

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'upcoming') return app.status === 'confirmed' || app.status === 'pending';
    if (filter === 'completed') return app.status === 'completed';
    if (filter === 'cancelled') return app.status === 'cancelled';
    return true;
  });

  return (
    <div className="p-6 lg:p-12 space-y-12">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">My <span className="text-primary italic">Appointments</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Manage your healthcare schedule with ease.</p>
         </div>
         <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-sm">
            {['upcoming', 'completed', 'cancelled'].map(f => (
               <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-dark'}`}
               >
                  {f}
               </button>
            ))}
         </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-1 gap-6">
         <AnimatePresence mode='popLayout'>
           {filteredAppointments.length > 0 ? (
             filteredAppointments.map((app) => (
                <motion.div 
                  key={app.id}
                  layout
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="bg-white rounded-[3.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/5 transition-all"></div>
                   
                   <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto">
                      <div className="w-20 h-20 rounded-[2rem] border-4 border-slate-50 p-1 shrink-0 overflow-hidden shadow-xl group-hover:border-primary/20 transition-all">
                         <img src={app.image} className="w-full h-full object-cover rounded-[1.5rem]" alt="" />
                      </div>
                      <div className="min-w-0">
                         <h4 className="text-xl font-black text-dark italic uppercase leading-tight tracking-tight">{app.doctor}</h4>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic">{app.specialty}</p>
                         <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                               <Calendar className="w-3 h-3" /> {app.date}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                               <Clock className="w-3 h-3" /> {app.time}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                               {app.type === 'Video' ? <Video className="w-3 h-3 text-primary" /> : <MapPin className="w-3 h-3 text-emerald-500" />}
                               {app.type} Consultation
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                      <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase italic tracking-[0.2em] ${
                         app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         app.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                         app.status === 'cancelled' ? 'bg-rose-50 text-rose-500 border border-rose-100' :
                         'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                         {app.status}
                      </div>
                      
                      <div className="flex gap-2 w-full lg:w-auto">
                         {app.status === 'confirmed' && (
                            <button 
                              onClick={() => handleJoin(app.id)}
                              disabled={isConnecting === app.id}
                              className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2 min-w-[100px]"
                            >
                               {isConnecting === app.id ? (
                                 <RefreshCw className="w-3 h-3 animate-spin" />
                               ) : (
                                 <Video className="w-3 h-3" />
                               )}
                               {isConnecting === app.id ? 'Linking' : 'Join'}
                            </button>
                         )}
                         {app.status !== 'completed' && app.status !== 'cancelled' && (
                            <>
                               <button 
                                  onClick={() => handleRescheduleInit(app)}
                                  className="flex-1 px-6 py-3 bg-slate-50 border border-slate-100 text-dark rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                               >
                                  <RefreshCw className="w-3 h-3" /> Reschedule
                               </button>
                               <button 
                                  onClick={() => setShowCancelConfirm(app.id)}
                                  className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                               >
                                  <X className="w-4 h-4" />
                               </button>
                            </>
                         )}
                      </div>
                   </div>
                </motion.div>
             ))
           ) : (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[3.5rem] p-20 text-center border-2 border-dashed border-slate-100"
              >
                <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-xl font-black text-slate-400 italic uppercase">No {filter} appointments found</h3>
                <p className="text-slate-400 font-bold italic mt-2">Time to book your next checkup.</p>
             </motion.div>
           )}
         </AnimatePresence>
      </motion.div>

      {/* Cancel Confirmation Modal */}
      {/* Reschedule Modal */}
      <AnimatePresence>
        {showRescheduleModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-md"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-white w-full max-w-md rounded-[3rem] p-12 text-center shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowRescheduleModal(null)}
                  className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all"
                >
                   <X className="w-6 h-6" />
                </button>

                <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-6">
                   <Clock className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black text-dark italic uppercase leading-none mb-3">Reschedule <span className="text-primary italic">Visit</span></h3>
                <p className="text-slate-500 font-bold italic text-xs mb-10 leading-relaxed uppercase tracking-widest">{showRescheduleModal.doctor}</p>
                
                <form onSubmit={handleRescheduleSubmit} className="space-y-6">
                   <div className="space-y-2 text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">New Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-dark focus:ring-4 focus:ring-primary/10 transition-all"
                        value={rescheduleData.date}
                        onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2 text-left">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Preferred Time</label>
                      <select 
                        required
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-dark focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                        value={rescheduleData.time}
                        onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})}
                      >
                         <option value="09:00 AM">09:00 AM</option>
                         <option value="10:30 AM">10:30 AM</option>
                         <option value="12:00 PM">12:00 PM</option>
                         <option value="02:15 PM">02:15 PM</option>
                         <option value="04:45 PM">04:45 PM</option>
                      </select>
                   </div>

                   <button 
                      type="submit"
                      className="w-full py-5 bg-dark text-white rounded-[2rem] text-[10px] font-black uppercase italic tracking-widest shadow-2xl shadow-dark/20 hover:bg-primary transition-all flex items-center justify-center gap-3"
                   >
                      Update Schedule <ArrowRight className="w-4 h-4" />
                   </button>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-md"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-white w-full max-w-sm rounded-[3rem] p-10 text-center shadow-2xl relative"
              >
                <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto mb-6">
                   <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-dark italic uppercase leading-none mb-3">Cancel <span className="text-rose-500 italic">Booking?</span></h3>
                <p className="text-slate-500 font-bold italic text-sm mb-10 leading-relaxed">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
                <div className="space-y-3">
                   <button 
                      onClick={() => handleCancel(showCancelConfirm)}
                      className="w-full py-4 bg-rose-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 transition-all"
                   >
                      Confirm Cancellation
                   </button>
                   <button 
                      onClick={() => setShowCancelConfirm(null)}
                      className="w-full py-4 bg-slate-50 text-dark rounded-[1.5rem] text-[10px] font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all"
                   >
                      No, Go Back
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Appointments;
