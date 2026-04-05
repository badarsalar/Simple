import React from 'react';
import { Home, Stethoscope, Calendar, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const currentPath = location.pathname;

  // Hide on auth pages
  if (currentPath.startsWith('/login') || currentPath.startsWith('/signup')) {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, badge: cartCount },
    { name: 'Orders', path: '/orders', icon: Calendar },
    { name: 'Live', path: '/streams', icon: User }, // Replaced Explore with Streams
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-[90] pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? 'translate-y-[-2px]' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center border border-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
