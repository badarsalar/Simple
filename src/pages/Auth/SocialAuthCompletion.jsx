import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Stethoscope, 
  Building, 
  Store, 
  MapPin, 
  Target, 
  Briefcase, 
  Phone,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SocialAuthCompletion = () => {
  const { signup } = useAuth();
  const [role, setRole] = useState('doctor');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isShake, setIsShake] = useState(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock validation
    const newErrors = {};
    const form = e.target;
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      if (!input.value) newErrors[input.name] = 'Required field';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      triggerShake();
      return;
    }

    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    const userData = {
      name: role === 'doctor' ? 'Dr. Sarah Johnson' : 'Alex J. Cooper',
      email: 'social.user@example.com',
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000'
    };

    signup(userData);
    navigate('/');
  };

  return (
    <div className={`space-y-8 animate-in fade-in duration-500 ${isShake ? 'animate-shake' : ''}`}>
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[2.5rem] mb-4">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-black text-dark italic tracking-tight italic">Verify Professional Identity</h3>
        <p className="text-slate-500 font-bold italic text-xs uppercase tracking-widest leading-relaxed">
          One final step to secure your <span className="text-primary">{role}</span> credentials.
        </p>
      </div>

      {/* Role Selector (Compact) */}
      <div className="flex bg-slate-50 p-2 rounded-3xl border border-slate-100 gap-1">
        {['doctor', 'clinic', 'pharmacy', 'patient'].map(r => (
          <button 
            key={r}
            onClick={() => { setRole(r); setErrors({}); }}
            className={`flex-1 py-3 px-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${role === r ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {r}
          </button>
        ))}
      </div>

      <form className="space-y-5" onSubmit={handleComplete}>
        <div className="grid gap-5">
           {role === 'doctor' && (
             <>
               <div className="space-y-1">
                 <div className="relative group">
                   <ShieldCheck className={`absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors ${errors.license ? 'text-rose-500' : ''}`} />
                   <input 
                      name="license"
                      type="text" 
                      placeholder="Medical License Number" 
                      className={`w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-2 focus:ring-0 font-medium italic transition-all ${errors.license ? 'border-rose-100 bg-rose-50/20' : 'border-transparent focus:border-primary/20'}`}
                      required
                   />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <Target className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="specialization" placeholder="Primary Specialization" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="number" name="exp" placeholder="Experience (Years)" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
             </>
           )}

           {role === 'clinic' && (
             <>
               <div className="space-y-1">
                 <div className="relative group">
                   <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="name" placeholder="Facility Official Name" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="reg" placeholder="Registration License" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="address" placeholder="Physical Hub Address" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
             </>
           )}

           {role === 'pharmacy' && (
             <>
               <div className="space-y-1">
                 <div className="relative group">
                   <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="name" placeholder="Pharmacy Store Identity" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="text" name="license" placeholder="Store License ID" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
             </>
           )}

           {role === 'patient' && (
             <>
               <div className="space-y-1">
                 <div className="relative group">
                   <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="tel" name="phone" placeholder="Contact Network ID" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic" required />
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="relative group">
                   <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                   <input type="date" name="dob" className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-[2rem] border-none focus:ring-0 font-medium italic text-slate-400" required />
                 </div>
               </div>
             </>
           )}
        </div>

        <button 
          disabled={loading}
          className="w-full bg-primary text-white py-5 rounded-[2.5rem] font-black text-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 mt-4 leading-none disabled:opacity-70 group"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>Secure Identity <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </form>

      <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        All Data Encrypted with <span className="text-emerald-500 italic">SHA-256 Protocol</span>
      </p>
    </div>
  );
};

export default SocialAuthCompletion;
