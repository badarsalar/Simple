import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Crown, Info, Check, X } from 'lucide-react';
import { getPlanByTier } from '../../constants/subscriptions';

const SubscriptionBadge = ({ tier, showDetails = true, category = 'doctor' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const plan = getPlanByTier(tier);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right - 288 + window.scrollX // 288 is the w-72 width (72 * 4)
      });
    }
  }, [isOpen]);

  if (tier === 'Free' || !tier) return null;

  const badgeColors = {
    Diamond: 'bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100',
    Platinum: 'bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100',
    Gold: 'bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100',
  };

  const icons = {
    Diamond: '💎',
    Platinum: '⭐',
    Gold: '👑',
  };

  const categoryAdvice = {
    doctor: "Booking here ensures priority access to top-rated specialists. Professional consultation helps in accurate diagnosis and timely treatment, preventing complications.",
    clinic: "Verified clinics offer standardized care and advanced diagnostics. Booking an appointment reduces wait times and ensures you get the right facility for your needs.",
    pharmacy: "Trusted pharmacies guarantee authentic medicines. Pre-ordering or booking ensures availability and direct professional guidance on dosage and safety."
  };

  const DetailsModal = () => (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
      <div 
        className="absolute w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100 z-[9999] p-5 animate-in fade-in zoom-in-95 duration-200"
        style={{ top: coords.top + 12, left: Math.max(10, coords.left) }}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${badgeColors[tier]}`}>
              {icons[tier]}
            </div>
            <div>
              <h4 className="text-sm font-bold text-dark">{tier} Provider</h4>
              <p className="text-[10px] text-slate-400 font-medium">{plan.label} Status</p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100/50 shadow-inner">
            <h5 className="text-[11px] font-bold text-dark mb-2 flex items-center gap-2 uppercase tracking-wider">
              <Check className="w-3.5 h-3.5 text-primary" /> Professional Recommendation
            </h5>
            <p className="text-[11px] leading-relaxed text-slate-600 font-medium italic">
              "{categoryAdvice[category] || categoryAdvice.doctor}"
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-50 text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
          SimpleCare Premium Network
        </div>
      </div>
    </>
  );

  return (
    <div className="relative inline-block">
      <button 
        ref={buttonRef}
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold transition-all shadow-sm ${badgeColors[tier] || badgeColors.Gold} ${isOpen ? 'ring-2 ring-offset-1 ring-primary' : ''}`}
      >
        <span>{icons[tier] || '✨'}</span>
        <span className="uppercase tracking-wider">{tier} {plan.label && `(${plan.label})`}</span>
        {showDetails && <Info className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      {showDetails && isOpen && ReactDOM.createPortal(<DetailsModal />, document.body)}
    </div>
  );
};

export default SubscriptionBadge;
