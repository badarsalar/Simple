import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Store,
  FileText,
  Video,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardProvider } from '../context/DashboardContext';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    const role = user?.role || 'patient';
    
    const common = [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    ];

    const roleSpecific = {
      patient: [
        { name: 'My Appointments', icon: Calendar, path: '/dashboard/appointments' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Digital Prescriptions', icon: FileText, path: '/dashboard/prescriptions' },
        { name: 'Health Vault', icon: ShieldCheck, path: '/dashboard/vault' },
        { name: 'Order History', icon: Package, path: '/dashboard/orders' },
        { name: 'Favorites', icon: Heart, path: '/dashboard/favorites' },
        { name: 'Account Settings', icon: Settings, path: '/dashboard/settings' },
      ],
      doctor: [
        { name: 'Virtual Clinic', icon: Video, path: '/dashboard/clinic' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Appointments', icon: Calendar, path: '/dashboard/appointments' },
        { name: 'Digital Prescriptions', icon: FileText, path: '/dashboard/prescriptions' },
        { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
        { name: 'Live Studio', icon: Video, path: '/dashboard/studio' },
      ],
      pharmacy: [
        { name: 'Inventory', icon: Stethoscope, path: '/dashboard/inventory' },
        { name: 'Orders', icon: Package, path: '/dashboard/orders' },
        { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
        { name: 'Media Approval', icon: FileText, path: '/dashboard/media' },
      ],
      clinic: [
        { name: 'Staff Management', icon: Users, path: '/dashboard/staff' },
        { name: 'Clinic Analytics', icon: BarChart3, path: '/dashboard/analytics' },
        { name: 'Facility Photos', icon: Stethoscope, path: '/dashboard/media' },
      ],
      admin: [
        { name: 'Registrations', icon: ShieldCheck, path: '/dashboard/approvals' },
        { name: 'Financial Oversight', icon: BarChart3, path: '/dashboard/financials' },
        { name: 'Platform Moderation', icon: Settings, path: '/dashboard/moderation' },
      ]
    };

    return [...common, ...(roleSpecific[role] || roleSpecific.patient)];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-10">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-all">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-dark tracking-tighter uppercase italic group-hover:text-primary transition-colors">Simple<span className="text-primary italic">Care</span></span>
          </NavLink>
        </div>

        <nav className="flex-1 px-6 space-y-1 overflow-y-auto no-scrollbar">
          <div className="mb-6 px-4">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Main Dashboard</p>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black uppercase italic tracking-widest transition-all
                ${isActive 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-dark hover:translate-x-1'
                }
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 mt-auto bg-slate-50/50">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 mb-6 flex items-center gap-3 shadow-sm">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden shrink-0">
                <img src={user?.avatar || '/images/facilities/doctor-placeholder.svg'} className="w-full h-full object-cover" alt="" />
             </div>
             <div className="min-w-0">
                <p className="text-xs font-black text-dark italic truncate uppercase tracking-tight leading-tight">{user?.name || 'Guest User'}</p>
                <p className="text-[9px] font-bold text-slate-400 italic uppercase tracking-widest truncate">{user?.role || 'Patient'}</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 font-black uppercase italic tracking-widest text-sm hover:bg-rose-50 transition-all uppercase"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[110] bg-dark/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`
        lg:hidden fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] shadow-2xl transition-transform duration-500 transform
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
               <NavLink to="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black text-dark tracking-tighter uppercase italic">Simple<span className="text-primary italic">Care</span></span>
               </NavLink>
               <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-xl">
                  <X className="w-5 h-5 text-dark" />
               </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase italic tracking-widest transition-all
                    ${isActive 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-dark'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-8 mt-auto">
               <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 font-black uppercase italic tracking-widest text-xs hover:bg-rose-50 transition-all uppercase"
               >
                  <LogOut className="w-5 h-5" /> Logout
               </button>
            </div>
         </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-[100] h-24 lg:h-28 flex items-center px-6 lg:px-12">
          <div className="flex items-center justify-between w-full h-full">
             <div className="flex items-center gap-6">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-3 bg-slate-50 border border-slate-100 rounded-2xl text-dark"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex relative w-96 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                   <input 
                      type="text" 
                      placeholder="Search appointments, orders, records..." 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-slate-400 tracking-tight"
                   />
                </div>
             </div>

             <div className="flex items-center gap-3 lg:gap-6">
                <button className="relative w-12 h-12 lg:w-14 lg:h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-dark hover:bg-white hover:shadow-xl transition-all group">
                   <Bell className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-all" />
                   <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                </button>
                <div className="h-10 lg:h-12 w-px bg-slate-100"></div>
                <div className="hidden sm:flex items-center gap-4">
                   <div className="text-right">
                      <p className="text-sm font-black text-dark italic leading-tight uppercase tracking-tight">{user?.name || 'Guest User'}</p>
                      <p className="text-[9px] font-bold text-slate-400 italic uppercase tracking-widest leading-none mt-1">{user?.role || 'Patient'}</p>
                   </div>
                   <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary/10 border-2 border-primary/20 rounded-2xl overflow-hidden shadow-lg p-0.5">
                      <img src={user?.avatar || '/images/facilities/doctor-placeholder.svg'} className="w-full h-full object-cover rounded-xl" alt="" />
                   </div>
                </div>
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-32 lg:pb-12">
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
