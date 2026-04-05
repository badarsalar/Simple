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
  ChevronRight,
  Plus,
  Trash2,
  Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { user, updateProfile, addNotification } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    notifications: true,
    marketing: false,
    securityEmails: true
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addNotification({
          title: 'File Too Large',
          message: 'Please select an image smaller than 2MB.',
          type: 'warning'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
        addNotification({
          title: 'Avatar Updated',
          message: 'Your profile picture has been changed.',
          type: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    updateProfile({ avatar: null });
    addNotification({
      title: 'Avatar Removed',
      message: 'Your profile picture has been reset to default.',
      type: 'info'
    });
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'security':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Lock className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-dark italic uppercase leading-none">Security <span className="text-primary italic">Settings</span></h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage your password and authentication.</p>
               </div>
            </div>

            <div className="space-y-8 max-w-md">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Current Password</label>
                  <div className="relative">
                     <input type={showPwd ? "text" : "password"} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm" placeholder="••••••••" />
                     <button onClick={() => setShowPwd(!showPwd)} className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-dark">{showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">New Password</label>
                  <input type="password" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Confirm New Password</label>
                  <input type="password" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
               </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex items-start gap-4">
               <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
               <div>
                  <h4 className="text-sm font-black italic uppercase text-amber-900 mb-1">Two-Factor Authentication</h4>
                  <p className="text-xs font-bold text-amber-700/70 leading-relaxed mb-4">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                  <button className="px-6 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase italic tracking-widest">Enable 2FA</button>
               </div>
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Bell className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-dark italic uppercase leading-none">Notification <span className="text-primary italic">Preferences</span></h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Control how you receive alerts and updates.</p>
               </div>
            </div>

            <div className="space-y-4">
               {[
                 { id: 'notifications', label: 'Push Notifications', desc: 'Receive real-time alerts for appointments and messages.' },
                 { id: 'securityEmails', label: 'Security Emails', desc: 'Get notified about login attempts and password changes.' },
                 { id: 'marketing', label: 'Marketing & Offers', desc: 'Receive weekly health tips and platform discounts.' }
               ].map((pref) => (
                 <div key={pref.id} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] group hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5">
                    <div className="space-y-1">
                       <h4 className="text-sm font-black italic uppercase text-dark">{pref.label}</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{pref.desc}</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, [pref.id]: !formData[pref.id]})}
                      className={`w-14 h-8 rounded-full relative transition-all duration-300 ${formData[pref.id] ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-slate-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${formData[pref.id] ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>
               ))}
            </div>
          </motion.div>
        );
      case 'billing':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-dark italic uppercase leading-none">Billing & <span className="text-primary italic">Payments</span></h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage your payment methods and history.</p>
               </div>
            </div>

            <div className="bg-dark p-10 rounded-[3rem] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Primary Payment Method</p>
                     <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md">
                        <span className="text-[8px] font-bold tracking-widest">VISA</span>
                     </div>
                  </div>
                  <h4 className="text-2xl font-black italic tracking-widest">•••• •••• •••• 4242</h4>
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Card Holder</p>
                        <p className="text-xs font-black uppercase italic">{user?.name || 'Patient User'}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Expires</p>
                        <p className="text-xs font-black uppercase italic">12/28</p>
                     </div>
                  </div>
               </div>
            </div>

            <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-[10px] font-black uppercase italic tracking-widest text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3">
               <Plus className="w-4 h-4" /> Add New Payment Method
            </button>

            <div className="space-y-4">
               <h4 className="text-sm font-black italic uppercase text-dark px-4">Recent Transactions</h4>
               {[1, 2].map((i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                       </div>
                       <div>
                          <p className="text-sm font-black italic uppercase text-dark">Consultation Fee</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Apr 0{i}, 2026 • ID: #RT-982{i}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-dark">Rs. 1,500.00</p>
                       <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest italic">Paid</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
             {/* Profile Header */}
             <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-slate-50 pb-12">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[3.5rem] border-8 border-slate-50 relative overflow-hidden shadow-2xl">
                    <img src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200'} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                    <label className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer group/label">
                        <Camera className="w-6 h-6 mb-1 group-hover/label:scale-110 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest italic">Upload New</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                  </div>
                  {user?.avatar && (
                    <button 
                      onClick={handleDeleteAvatar}
                      className="absolute -top-2 -right-2 p-2 bg-white text-rose-500 rounded-full shadow-lg border border-rose-50 hover:bg-rose-500 hover:text-white transition-all scale-0 group-hover:scale-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left">
                   <h2 className="text-2xl font-black text-dark italic uppercase leading-tight tracking-tight">{user?.name || 'Patient User'}</h2>
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic">Free Tier Member • Since 2024</p>
                </div>
             </div>

             {/* Profile Form */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Full Name</label>
                   <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Email Address</label>
                   <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" placeholder="john@example.com" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Phone Number</label>
                   <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" placeholder="+92 300 1234567" />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Preferred Language</label>
                   <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-black italic text-dark focus:ring-4 focus:ring-primary/10 transition-all shadow-sm appearance-none">
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Arabic</option>
                   </select>
                </div>
             </div>
          </motion.div>
        );
    }
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
               ].map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:bg-slate-50 hover:text-dark'}`}
                  >
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
               <h4 className="text-sm font-black italic uppercase tracking-tight mb-4 relative z-10">Active Session</h4>
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
               
               <AnimatePresence mode="wait">
                  {renderContent()}
               </AnimatePresence>

               {/* Action Footer */}
               <div className="pt-12 flex justify-end gap-4 border-t border-slate-50">
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
