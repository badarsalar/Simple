import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, Activity, Heart, ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-xl w-full relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-white p-12 text-center space-y-10 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -skew-x-12 translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/30 rotate-3">
              <Heart className="text-white w-10 h-10 fill-white/20" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-dark tracking-tight">Simple <span className="text-primary italic">Auth</span></h2>
              <p className="text-slate-400 font-bold text-sm mt-2 italic">Your universal healthcare gateway</p>
            </div>
          </div>

          <div className="relative">
            <Outlet />
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">HIPAA Secured</span>
             </div>
             <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">GDPR Ready</span>
             </div>
          </div>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-slate-300 uppercase tracking-[0.3em]">© 2026 Simple Healthcare Inc.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
