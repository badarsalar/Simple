import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, LogOut, Search, MapPin, Pill, Activity, ShoppingBag, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, getGlobalSearchItems, notifications, markNotificationRead, clearNotifications } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (searchQuery.length > 1) {
      const allItems = getGlobalSearchItems();
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setIsSearchOpen(true);
    } else {
      setSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleLogout = () => { logout(); navigate('/'); setIsProfileOpen(false); };

  const navLinks = [
    { name: 'Doctors', path: '/doctors' },
    { name: 'Clinics', path: '/clinics' },
    { name: 'Pharmacies', path: '/pharmacies' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Streams', path: '/streams' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 shadow-sm">
      {/* Top utility bar */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" /> Helpline: 042-111-SIMPLE
            </a>
          </div>
          <div className="flex items-center gap-4">
            {!user && (
              <>
                <Link to="/signup" className="text-[11px] font-semibold text-primary hover:underline">Join as Doctor</Link>
                <span className="text-slate-200">|</span>
              </>
            )}
            <span className="text-[11px] font-medium text-slate-400">Download App</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-dark tracking-tight hidden sm:block">simple<span className="text-primary">care</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary bg-primary/5' 
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {user ? (
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[60]">
                    <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                      <h4 className="text-sm font-bold text-dark">Notifications</h4>
                      <button onClick={clearNotifications} className="text-[10px] font-bold text-primary hover:underline">Clear All</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-slate-50">
                          {notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                            >
                              <div className="flex justify-between items-start mb-0.5">
                                <span className={`text-[9px] font-bold uppercase tracking-wider ${n.type === 'success' ? 'text-emerald-500' : n.type === 'warning' ? 'text-amber-500' : 'text-primary'}`}>
                                  {n.type}
                                </span>
                                <span className="text-[9px] text-slate-400 font-medium">{n.time}</span>
                              </div>
                              <p className="text-xs font-bold text-dark mb-0.5">{n.title}</p>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{n.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-slate-300">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="text-xs font-medium">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover border border-slate-100" />
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-slate-50">
                      <p className="text-xs font-bold text-dark truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium capitalize">{user.role}</p>
                    </div>
                    <div className="h-px bg-slate-50 my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors hidden sm:block">Login</Link>
              <Link to="/signup" className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <button 
            className="lg:hidden p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-bold text-dark">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-dark rounded-lg hover:bg-slate-50">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            {[{ name: 'Home', path: '/' }, ...navLinks].map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`block px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {!user && (
            <div className="mt-8 space-y-2">
              <Link to="/login" className="block w-full py-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="block w-full py-3 text-center text-sm font-bold text-white bg-primary rounded-xl shadow-sm" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
