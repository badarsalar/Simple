import React, { useState } from 'react';
import { X, MapPin, ChevronRight, Search, Clock, Truck, ShieldCheck, Star } from 'lucide-react';

const pharmacies = [
  { id: 1, name: 'HealthFirst Pharmacy', location: '742 Park Ave, New York', distance: '0.8 km', rating: 4.8, type: 'Open 24/7', delivery: true, pickup: '15 mins' },
  { id: 2, name: 'CVS Special Care', location: '150 Greenwich St, NY', distance: '1.2 km', rating: 4.5, type: 'Closes 9 PM', delivery: true, pickup: '20 mins' },
  { id: 3, name: 'Rite Aid Express', location: '56 Pearl St, Brooklyn', distance: '2.5 km', rating: 4.2, type: 'Open Now', delivery: false, pickup: '10 mins' },
  { id: 4, name: 'SimpleCare Drugs', location: 'Downtown Medical Plaza', distance: '0.3 km', rating: 4.9, type: 'Open 24/7', delivery: true, pickup: '5 mins' },
  { id: 5, name: 'Main Street Pharmacy', location: 'Flatbush Ave, Brooklyn', distance: '3.1 km', rating: 4.0, type: 'Closes 10 PM', delivery: true, pickup: '30 mins' }
];

const PharmacySelectionModal = ({ show, onClose, onSelect, rxId, isImage = false }) => {
  const [search, setSearch] = useState('');
  
  if (!show) return null;

  const filtered = pharmacies.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-dark/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 relative border border-white/20">
        
        {/* Header decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-dark hover:bg-slate-100 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10 space-y-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-dark italic uppercase leading-tight tracking-tighter">
              Verify <span className="text-primary italic">Medical Store</span>
            </h3>
            <p className="text-slate-400 font-bold italic text-xs mt-1.5 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Transmission for {rxId || 'Prescription'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search store name or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-dark italic placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/20 outline-none transition-all shadow-inner"
            />
          </div>

          {/* List Container */}
          <div className="max-height-[50vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filtered.map(phi => (
              <button
                key={phi.id}
                onClick={() => onSelect(phi.name)}
                className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-dark italic group-hover:text-primary transition-colors text-sm truncate uppercase tracking-tighter">{phi.name}</h4>
                    <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 italic">
                      <Star className="w-3 h-3 fill-current" /> {phi.rating}
                    </span>
                  </div>
                  
                  <p className="text-[10px] font-bold text-slate-400 italic truncate mt-0.5 block">{phi.location}</p>
                  
                  <div className="flex items-center gap-4 mt-2.5">
                    <div className="flex items-center gap-1 text-[9px] font-black italic uppercase text-emerald-500">
                      <Clock className="w-2.5 h-2.5" /> Ready in {phi.pickup}
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] font-black italic uppercase ${phi.delivery ? 'text-primary' : 'text-slate-300'}`}>
                      <Truck className="w-2.5 h-2.5" /> {phi.delivery ? 'Home Delivery' : 'Pickup Only'}
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
            
            {filtered.length === 0 && (
              <div className="text-center py-10 opacity-50 space-y-3">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-bold italic text-slate-400">No medical stores found matching your search.</p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <p className="text-[10px] text-center font-bold text-slate-300 italic uppercase tracking-widest leading-relaxed">
              Your prescription will be forwarded instantly. <br/> Secure HIPAA-compliant transmission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacySelectionModal;
