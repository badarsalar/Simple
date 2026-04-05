import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  MapPin, 
  Globe, 
  LogOut, 
  Save, 
  Lock, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user, updateProfile, addNotification } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    notifications: true
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      addNotification({
        title: 'Settings Updated',
        message: 'Your profile and preferences have been successfully updated.',
        type: 'success'
      });
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-2">
         <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Account <span className="text-primary italic">Settings</span></h1>
         <p className="text-slate-400 font-bold italic text-sm">Manage your profile, security, and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Sidebar Navigation */}
         <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
               {[
                 { id: 'profile', label: 'Profile Information', icon: User },
                 { id: 'security', label: 'Security & Password', icon: Lock },
                 { id: 'notifications', label: 'Notifications', icon: Bell },
                 { id: 'billing', label: 'Billing & Payments', icon: ShieldCheck },
               ].map((item, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${i === 0 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:bg-slate-50 hover:text-dark'}`}>
                     <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase italic tracking-widest">{item.label}</span>
                     </div>
                     <ChevronRight className="w-4 h-4" />
                  </button>
               ))}
            </div>

            <div className="bg-dark p-6 rounded-[2.5rem] text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <h4 className="text-sm font-black italic uppercase italic tracking-tight mb-4 relative z-10">Active Session</h4>
               <div className="flex items-center gap-4 relative z-10">
                  <Smartphone className="w-8 h-8 text-primary shadow-sm" />
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Android App</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lahore, Pakistan • Online</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[4rem] p-10 lg:p-14 border border-slate-100 shadow-xl space-y-12">
               
               {/* Profile Header */}
               <div className="flex items-center gap-8 border-b border-slate-50 pb-12">
                  <div className="w-32 h-32 rounded-[3.5rem] border-8 border-slate-50 relative group cursor-pointer shadow-2xl">
                     <img src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200'} className="w-full h-full object-cover rounded-[2.8rem] transition-transform group-hover:scale-105" alt="" />
                     <div className="absolute inset-0 bg-dark/40 rounded-[2.8rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase italic tracking-widest">Change</div>
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-dark italic uppercase leading-tight tracking-tight">{user?.name || 'Patient User'}</h2>
                     <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Free Tier Member</p>
                  </div>
               </div>

               {/* Profile Form */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Full Name</label>
                     <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm"
                        placeholder="John Doe"
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Email Address</label>
                     <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm"
                        placeholder="john@example.com"
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Phone Number</label>
                     <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm"
                        placeholder="+92 300 1234567"
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Preferred Language</label>
                     <select 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm appearance-none"
                     >
                        <option>English</option>
                        <option>Urdu</option>
                        <option>Arabic</option>
                     </select>
                  </div>
               </div>

               {/* Password Section (Secondary Section) */}
               <div className="pt-12 border-t border-slate-50 space-y-10">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Lock className="w-5 h-5" />
                     </div>
                     <h5 className="font-black italic uppercase tracking-tight text-dark">Security Settings</h5>
                  </div>
                  <div className="space-y-3 max-w-sm">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Current Password</label>
                     <div className="relative">
                        <input 
                           type={showPwd ? "text" : "password"} 
                           className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm"
                           placeholder="••••••••"
                        />
                        <button 
                           onClick={() => setShowPwd(!showPwd)}
                           className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-dark transition-colors"
                        >
                           {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                     </div>
                  </div>
               </div>

               {/* Action Footer */}
               <div className="pt-12 flex justify-end gap-4">
                  <button className="px-10 py-5 bg-white border border-slate-100 text-slate-400 rounded-[2.5rem] text-[10px] font-black uppercase italic tracking-widest hover:text-dark hover:bg-slate-50 transition-all">Discard Changes</button>
                  <button 
                     disabled={isSaving}
                     onClick={handleSave}
                     className={`px-12 py-5 bg-primary text-white rounded-[2.5rem] text-[10px] font-black uppercase italic tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3 overflow-hidden group
                     ${isSaving ? 'opacity-70 scale-95' : ''}`}
                  >
                     {isSaving ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           <span>Updating...</span>
                        </>
                     ) : (
                        <>
                           <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                           <span>Save All Changes</span>
                        </>
                     )}
                  </button>
               </div>
            </div>

            {/* Danger Zone Section */}
            <div className="bg-rose-50/50 rounded-[4rem] p-10 lg:p-14 border border-rose-100/50 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="space-y-2">
                  <h5 className="font-black italic uppercase tracking-tight text-rose-500 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Danger Zone
                  </h5>
                  <p className="text-slate-400 font-bold italic text-sm max-w-sm">Deleting your account will permanently remove all your health records and favorites.</p>
               </div>
               <button className="px-8 py-4 bg-rose-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase italic tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20">Deactivate Account</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Settings;
