import React from 'react';
import { 
  Calendar, 
  Package, 
  Activity, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Stethoscope,
  Heart,
  Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const VitalTrend = ({ color, points, delay = 0 }) => (
  <svg className="w-full h-12 opacity-60 shrink-0" viewBox="0 0 100 30" preserveAspectRatio="none">
    <motion.path
      d={points}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
    />
  </svg>
);

const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, vaultRecords, orders } = useDashboard();

  const stats = [
    { 
      label: 'Upcoming Appointments', 
      value: appointments.filter(a => a.status === 'confirmed').length, 
      icon: Calendar, 
      color: 'text-primary bg-primary/10' 
    },
    { 
      label: 'Active Orders', 
      value: orders.length, 
      icon: Package, 
      color: 'text-amber-500 bg-amber-50' 
    },
    { 
      label: 'Health Records', 
      value: vaultRecords.length, 
      icon: ShieldCheck, 
      color: 'text-emerald-500 bg-emerald-50' 
    },
    { 
      label: 'Heart Rate', 
      value: '72 bpm', 
      icon: Heart, 
      color: 'text-rose-500 bg-rose-50', 
      trend: 'M0 20 Q10 5, 20 25 T40 10 60 25 80 5 100 20' 
    },
  ];

  const nextApp = appointments[0] || null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-10 space-y-10"
    >
      <div className="space-y-2">
         <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none"
          >
            Dashboard <span className="text-primary italic">Overview</span>
          </motion.h1>
         <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 font-bold italic text-sm"
          >
            Welcome back, {user?.name || 'Patient'}. Here’s your current health activity.
          </motion.p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
             <div className="flex justify-between items-start mb-3 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:rotate-6 ${stat.color} shadow-sm`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                {stat.trend && (
                  <div className="flex-1 px-3">
                    <VitalTrend color="currentColor" points={stat.trend} delay={i * 0.2} />
                  </div>
                )}
             </div>
             <div className="relative z-10">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 group-hover:text-dark transition-colors">{stat.label}</p>
                <p className="text-xl font-black text-dark italic tracking-tight">{stat.value}</p>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Upcoming Appointment */}
        <motion.section variants={itemVariants} className="space-y-5">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-dark italic uppercase leading-none border-l-4 border-primary pl-4 tracking-tight">Next Appointment</h3>
              <Link to="/dashboard/appointments" className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4">View All <ChevronRight className="w-3 h-3" /></Link>
           </div>
           
           {nextApp ? (
             <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-md relative overflow-hidden group hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 -skew-x-12 translate-x-1/4 -translate-y-1/2 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
                
                <div className="flex items-center gap-5 relative z-10">
                   <div className="w-16 h-16 rounded-2xl border-2 border-primary/10 p-1 shrink-0 overflow-hidden shadow-sm">
                      <img src={nextApp.image} className="w-full h-full object-cover rounded-xl" alt="" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-base font-black text-dark italic leading-none uppercase truncate">{nextApp.doctor}</h4>
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1.5 italic">{nextApp.specialty}</p>
                      <div className="flex items-center gap-3 mt-2.5">
                         <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase italic tracking-wider">
                            <Clock className="w-3 h-3" /> {nextApp.date} <span className="text-primary">•</span> {nextApp.time}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-6 flex items-center gap-3 relative z-10">
                   <Link to="/dashboard/appointments" className="flex-1 px-4 py-3.5 bg-dark text-white rounded-xl text-[9px] font-black uppercase italic tracking-widest shadow-xl shadow-dark/10 hover:bg-primary transition-all flex items-center justify-center gap-2.5 text-center">
                      <Video className="w-3.5 h-3.5" /> Start Video
                   </Link>
                   <Link to="/dashboard/appointments" className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-100 text-dark rounded-xl text-[9px] font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2.5 text-center">
                      <Calendar className="w-3.5 h-3.5" /> Reschedule
                   </Link>
                </div>
             </div>
           ) : (
             <div className="bg-slate-50/50 rounded-[2.5rem] p-10 text-center border-2 border-dashed border-slate-200">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-[10px] font-black text-slate-400 italic uppercase">No upcoming appointments</p>
                <Link to="/doctors" className="text-primary text-[9px] font-black uppercase italic mt-3 block underline">Book Now</Link>
             </div>
           )}
        </motion.section>

        {/* Recent Order Tracking */}
        <motion.section variants={itemVariants} className="space-y-5">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-dark italic uppercase leading-none border-l-4 border-amber-500 pl-4 tracking-tight">Delivery Status</h3>
              <Link to="/dashboard/orders" className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4">Order History <ChevronRight className="w-3 h-3" /></Link>
           </div>
           
           {orders[0] ? (
             <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div>
                      <span className="text-[8px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 italic">{orders[0].id}</span>
                      <h4 className="text-xl font-black italic mt-3 flex items-center gap-3 uppercase tracking-tight">Order <span className="text-primary italic">{orders[0].status}</span></h4>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Value</p>
                      <p className="text-lg font-black text-white italic tracking-tighter mt-0.5">${orders[0].total}</p>
                   </div>
                </div>

                <div className="space-y-5 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Shipping Content</p>
                         <p className="text-[10px] font-bold text-white/70 italic mt-0.5 truncate">{orders[0].items.join(' + ')}</p>
                      </div>
                   </div>

                   <div className="relative pt-2">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: orders[0].status === 'Shipped' ? '65%' : '100%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-primary shadow-[0_0_10px_rgba(0,210,142,0.5)]"
                          />
                      </div>
                      <div className="mt-3 flex justify-between text-[8px] font-black uppercase italic tracking-widest">
                         <span className="text-primary">Dispatched</span>
                         <span className={orders[0].status === 'Delivered' ? 'text-primary' : 'text-slate-500'}>Out for Delivery</span>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-slate-50/50 rounded-[2.5rem] p-10 text-center border-2 border-dashed border-slate-200">
                <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-[10px] font-black text-slate-400 italic uppercase">No active orders</p>
             </div>
           )}
        </motion.section>
      </div>

      {/* Health Trends Section */}
      <motion.section variants={itemVariants} className="space-y-8">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-dark italic uppercase leading-none border-l-4 border-emerald-500 pl-4">Health Trends</h3>
            <div className="flex gap-2">
               {['Week', 'Month', 'Year'].map(t => (
                  <button key={t} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${t === 'Month' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-100 text-slate-400 hover:text-dark'}`}>{t}</button>
               ))}
            </div>
         </div>
         <div className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                  <motion.path 
                    d="M0 150Q50 100 100 120T200 80 300 140 400 60" 
                    stroke="#00D28E" 
                    strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
               </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <Activity className="w-6 h-6 text-emerald-500" />
                     <p className="text-sm font-black text-dark italic uppercase tracking-tight">Vitals Summary</p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Blood Pressure</span>
                        <span className="text-sm font-black text-dark italic">120/80</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Blood Sugar</span>
                        <span className="text-sm font-black text-dark italic">98 mg/dL</span>
                     </div>
                  </div>
               </div>
               
               <div className="md:col-span-2 flex flex-col justify-center">
                  <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100/50">
                     <div className="flex items-center gap-4 mb-4">
                        <TrendingUp className="w-10 h-10 text-emerald-500 p-2 bg-white rounded-xl shadow-sm" />
                        <div>
                           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Analysis</p>
                           <h5 className="text-sm font-black text-dark italic mt-1 uppercase">Positive Trend Detected</h5>
                        </div>
                     </div>
                     <p className="text-slate-500 font-bold italic text-sm leading-relaxed max-w-lg">Your overall activity level has increased by {user?.role === 'patient' ? '12%' : '8%'} this month. Keep up the consistent sleep schedule for better recovery metrics.</p>
                  </div>
               </div>
            </div>
         </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        variants={itemVariants}
        className="bg-slate-900 rounded-[3.5rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl"
      >
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left space-y-4">
               <h3 className="text-3xl font-black italic uppercase leading-tight tracking-tight">Need Medical <span className="text-primary italic border-b-4 border-primary/20">Assistance?</span></h3>
               <p className="text-slate-400 font-bold italic max-w-md mx-auto lg:mx-0 leading-relaxed">Instantly book an appointment with a specialist or order medicines directly from your digital vault.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <Link to="/doctors" className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all text-center flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5" /> Book Appointment
               </Link>
               <Link to="/dashboard/vault" className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-xs uppercase italic tracking-widest hover:bg-white/20 transition-all text-center flex items-center justify-center gap-3 border border-white/10">
                  <ShieldCheck className="w-5 h-5" /> Health Vault
               </Link>
            </div>
         </div>
      </motion.section>
    </motion.div>
  );
};

export default PatientDashboard;
