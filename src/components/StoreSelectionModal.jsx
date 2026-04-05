import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Navigation, 
  CheckCircle2, 
  X,
  Store,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const MOCK_STORES = [
  { id: 1, name: 'Clinicare Pharmacy - Main Blvd', address: '12-B, Commercial Area, Lahore', rating: 4.8, distance: '0.8 km', open: true },
  { id: 2, name: 'Servaid Pharmacy - Model Town', address: 'Block C, Model Town, Lahore', rating: 4.9, distance: '1.2 km', open: true },
  { id: 3, name: 'Fazal Din & Sons - Johar Town', address: 'G-1 Market, Johar Town, Lahore', rating: 4.7, distance: '2.5 km', open: true },
  { id: 4, name: 'LifeCare Pharmacy - DHA Ph 5', address: 'Civic Center, DHA Phase 5, Lahore', rating: 4.8, distance: '4.1 km', open: true },
];

const StoreSelectionModal = ({ isOpen, onClose, onForward, recordName }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredStores = MOCK_STORES.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleForward = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => {
        onForward(selectedStore);
        setIsSuccess(false);
        setSelectedStore(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 bg-dark/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-dark italic uppercase leading-tight tracking-tight">Forward <span className="text-primary italic">Prescription</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{recordName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by store name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300"
            />
          </div>

          {/* Store List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Nearby Medical Stores</span>
              <span className="text-[10px] font-bold text-primary italic underline underline-offset-4 cursor-pointer hover:text-primary-dark">View on Map</span>
            </div>
            
            {filteredStores.map(store => (
              <button 
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`w-full p-6 rounded-[2rem] border-2 transition-all text-left flex items-center gap-6 group scale-in-center
                  ${selectedStore?.id === store.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110
                  ${selectedStore?.id === store.id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <Store className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-black text-dark italic uppercase tracking-tight truncate">{store.name}</h4>
                    <span className="flex items-center gap-1 text-[10px] font-black text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" /> {store.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {store.address}
                    </p>
                    <p className="text-[10px] font-black text-primary uppercase italic tracking-widest shrink-0">
                      {store.distance}
                    </p>
                  </div>
                </div>
                {selectedStore?.id === store.id && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 shrink-0">
          {isSuccess ? (
            <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-emerald-600 italic uppercase">Sent Successfully!</p>
            </div>
          ) : (
            <button 
              onClick={handleForward}
              disabled={!selectedStore || isSending}
              className={`w-full py-5 rounded-[2rem] text-xs font-black uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl overflow-hidden relative group
                ${selectedStore && !isSending ? 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Manual Forward to Store</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSelectionModal;
