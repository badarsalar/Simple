import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  Stethoscope, 
  Building, 
  Store,
  AlertCircle,
  Loader2,
  Phone
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Mock simulation
    await new Promise(r => setTimeout(r, 1200));

    const userData = {
      name: role === 'doctor' ? 'Dr. Sarah Johnson' : 'Alex J. Cooper',
      email: formData.email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000'
    };

    login(userData);
    navigate('/');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-dark">Welcome Back</h3>
        <p className="text-sm font-medium text-slate-500">Login to your healthcare account</p>
      </div>

      {/* Role Switcher */}
      <div className="flex p-1.5 bg-slate-100 rounded-xl max-w-sm mx-auto">
        {[
          { id: 'patient', label: 'Patient' },
          { id: 'doctor', label: 'Doctor' },
          { id: 'clinic', label: 'Clinic' },
          { id: 'pharmacy', label: 'Pharmacy' }
        ].map(r => (
          <button 
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${role === r.id ? 'bg-white text-dark shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors gap-2 text-sm font-bold text-dark">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> Google
          </button>
          <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors gap-2 text-sm font-bold text-dark">
            <Phone className="w-4 h-4 text-primary" /> SMS Code
          </button>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs font-semibold text-slate-400">
            <span className="bg-white px-4">Or continue with email</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
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
              {errors.email && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />}
            </div>
            {errors.email && <p className="text-xs font-semibold text-rose-500 mt-1.5">{errors.email}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
               <label className="block text-xs font-bold text-slate-600">Password</label>
               <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
            </div>
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
          </div>

          <button 
            disabled={loading}
            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 mt-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-sm font-medium text-slate-500">
        Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
