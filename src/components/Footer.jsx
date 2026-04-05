import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Twitter, Facebook, Instagram, ShieldCheck, BadgeCheck, Clock, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Trust badges row */}
      <div className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BadgeCheck, title: 'Verified Doctors', desc: 'PMC verified & authentic' },
              { icon: ShieldCheck, title: 'Secure Platform', desc: 'SSL encrypted checkout' },
              { icon: Clock, title: 'Customer Support', desc: '7 days a week' },
              { icon: Star, title: '300,000+ Reviews', desc: 'Verified patient reviews' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-dark">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-base font-bold text-dark tracking-tight">simple<span className="text-primary">care</span></span>
            </Link>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4 max-w-xs">
              Book appointments with the best Doctors and Specialists. Avail lab tests, order medicines, and video consultations.
            </p>
            <div className="flex gap-2">
              {[Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-primary/10 transition-colors group">
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">For Patients</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Find Doctors', path: '/doctors' },
                { name: 'Hospitals', path: '/clinics' },
                { name: 'Pharmacies', path: '/pharmacies' },
                { name: 'Order Medicines', path: '/medicines' },
                { name: 'Video Consult', path: '/doctors' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs text-slate-500 font-medium hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">For Doctors</h4>
            <ul className="space-y-2.5">
              {['Join as Doctor', 'Doctor Login', 'Premium Plans', 'Ads & Promotion', 'Live Streaming'].map(name => (
                <li key={name}>
                  <Link to="/signup" className="text-xs text-slate-500 font-medium hover:text-primary transition-colors">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Privacy Policy', 'Terms of Use', 'Refund Policy', 'Contact Us'].map(name => (
                <li key={name}>
                  <a href="#" className="text-xs text-slate-500 font-medium hover:text-primary transition-colors">{name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-dark font-bold">042-111-SIMPLE</p>
                  <p className="text-[10px] text-slate-400 font-medium">Mon - Sun, 9am - 11pm</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-slate-500 font-medium">help@simplecare.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-slate-500 font-medium leading-relaxed">123 Medical Center Way,<br />Suite 400, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slate-400 font-medium">© 2026 SimpleCare. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[11px] text-slate-400 font-medium hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] text-slate-400 font-medium hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="text-[11px] text-slate-400 font-medium hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
