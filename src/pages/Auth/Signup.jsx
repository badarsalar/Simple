import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Stethoscope, 
  Store, 
  ShieldCheck, 
  Phone,
  Calendar,
  ChevronLeft,
  Briefcase,
  MapPin,
  Building,
  Target,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    roleSpecific: {}
  });
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
  
  const navigate = useNavigate();

  useEffect(() => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length > 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (field, value, isRoleSpecific = false) => {
    if (isRoleSpecific) {
      setFormData(prev => ({
        ...prev,
        roleSpecific: { ...prev.roleSpecific, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (passwordStrength < 2) newErrors.password = 'Password too weak';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setStep(3);
    }
  };

  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API
    await new Promise(r => setTimeout(r, 1500));

    const userData = {
      name: (role === 'clinic' || role === 'pharmacy') ? formData.roleSpecific.facilityName || formData.email.split('@')[0] : formData.email.split('@')[0],
      email: formData.email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000',
      ...formData.roleSpecific
    };

    signup(userData);
    navigate('/');
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-rose-500';
    if (passwordStrength === 2) return 'bg-amber-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-2 relative">
         {step > 1 && (
           <button 
             onClick={() => setStep(step - 1)}
             className="absolute left-0 top-1 text-slate-500 hover:text-primary transition-colors p-1"
           >
             <ChevronLeft className="w-5 h-5" />
           </button>
         )}
         <h3 className="text-2xl font-bold text-dark">
           {step === 1 && 'Create an Account'}
           {step === 2 && 'Setup Credentials'}
           {step === 3 && 'Complete Profile'}
         </h3>
         <p className="text-sm font-medium text-slate-500">
           {step === 1 && 'Select how you want to use the platform'}
           {step === 2 && 'Enter your email and password'}
           {step === 3 && 'Provide your required information'}
         </p>
         
         {/* Step Progress */}
         <div className="flex justify-center gap-2 mt-4">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-primary' : 'w-4 bg-slate-200'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-primary' : 'w-4 bg-slate-200'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-primary' : 'w-4 bg-slate-200'}`}></div>
         </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {[
            { id: 'patient', label: 'Patient', icon: User, desc: 'Book appointments' },
            { id: 'doctor', label: 'Doctor', icon: Stethoscope, desc: 'Consult patients' },
            { id: 'clinic', label: 'Clinic', icon: Building, desc: 'Manage facility' },
            { id: 'pharmacy', label: 'Pharmacy', icon: Store, desc: 'Sell medicines' }
          ].map(r => (
            <button 
              key={r.id}
              onClick={() => { setRole(r.id); setStep(2); }}
              className={`p-4 rounded-xl border text-left transition-all ${role === r.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-slate-200 hover:border-primary/40'}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${role === r.id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'}`}>
                <r.icon className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm ${role === r.id ? 'text-primary' : 'text-dark'}`}>{r.label}</h4>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{r.desc}</p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 pt-2">
           {/* Social Options */}
           <div className="grid grid-cols-2 gap-3">
             <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors gap-2 text-sm font-bold text-dark">
               <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> Google
             </button>
             <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors gap-2 text-sm font-bold text-dark">
               <img src="https://www.svgrepo.com/show/330007/apple.svg" className="w-4 h-4 invert" alt="Apple" /> Apple
             </button>
           </div>

           <div className="relative py-2">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
             <div className="relative flex justify-center text-xs font-semibold text-slate-400">
               <span className="bg-white px-4">Or sign up with email</span>
             </div>
           </div>

           <form className="space-y-4" onSubmit={handleStep2Submit}>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? 'border-rose-200 bg-rose-50/50' : 'border-slate-200'}`} 
                  />
                </div>
                {errors.email && <p className="text-xs font-semibold text-rose-500 mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Create Password</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? 'text-rose-500' : 'text-slate-400'}`} />
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-lg text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.password ? 'border-rose-200 bg-rose-50/50' : 'border-slate-200'}`} 
                  />
                </div>
                {errors.password && <p className="text-xs font-semibold text-rose-500 mt-1.5">{errors.password}</p>}
                
                {/* Password Strength */}
                {formData.password.length > 0 && (
                  <div className="mt-2 flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= i ? getStrengthColor() : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                )}
              </div>

              <button className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors mt-2 shadow-sm flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
           </form>
        </div>
      )}

      {step === 3 && (
        <form className="space-y-4 pt-2" onSubmit={handleFinalSignup}>
           {role === 'patient' && (
             <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number</label>
                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="tel" placeholder="+1 234 567 890" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium" required /></div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Date of Birth</label>
                  <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="date" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium text-slate-600" required /></div>
                </div>
             </div>
           )}

           {role === 'doctor' && (
             <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Medical License ID</label><div className="relative"><ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="e.g. PMC-12345" onChange={(e) => handleInputChange('license', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Specialization</label><div className="relative"><Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="e.g. Cardiologist" onChange={(e) => handleInputChange('specialization', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Years of Experience</label><div className="relative"><Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="number" placeholder="e.g. 5" onChange={(e) => handleInputChange('experience', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
             </div>
           )}

           {role === 'clinic' && (
             <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Clinic Name</label><div className="relative"><Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="e.g. City Dental Care" onChange={(e) => handleInputChange('facilityName', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Registration Number</label><div className="relative"><ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Facility License" onChange={(e) => handleInputChange('license', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Complete Address</label><div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Full location address" onChange={(e) => handleInputChange('address', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
             </div>
           )}

           {role === 'pharmacy' && (
             <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Pharmacy Name</label><div className="relative"><Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="e.g. HealthFirst Pharmacy" onChange={(e) => handleInputChange('facilityName', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Drug License</label><div className="relative"><ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Pharmacy License ID" onChange={(e) => handleInputChange('license', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">Store Location</label><div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Full address" onChange={(e) => handleInputChange('address', e.target.value, true)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20" required /></div></div>
             </div>
           )}

           <button 
             disabled={loading}
             className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm mt-4 disabled:opacity-70"
           >
             {loading ? (
               <Loader2 className="w-5 h-5 animate-spin" />
             ) : (
               <>Create Account</>
             )}
           </button>
        </form>
      )}

      <p className="text-center text-sm font-medium text-slate-500 pt-2 border-t border-slate-100">
        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
