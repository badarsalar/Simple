import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Crown, Heart, ShieldCheck } from 'lucide-react';
import SubscriptionBadge from './SubscriptionBadge';

const FacilityListCard = ({ 
  id, 
  name, 
  type, 
  address, 
  rating = "5.0", 
  reviews = "0", 
  image, 
  services = [],
  subscription = { type: 'Free' },
  hasActiveAds = false,
  isFav = false,
  onToggleFav = () => {},
  isPharmacy = false
}) => {
  const tier = subscription?.type;
  const isSponsored = tier !== 'Free' || hasActiveAds;

  return (
    <Link to={isPharmacy ? `/pharmacy/${id}` : `/clinic/${id}`} className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 hover:shadow-lg hover:border-primary/20 transition-all group relative overflow-hidden">
      {isSponsored && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 z-30" />
      )}
      
      {/* Sponsored Badge Overlay */}
      {isSponsored && (
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 rounded-lg text-[8px] font-black text-amber-700 uppercase tracking-widest border border-amber-100 shadow-sm transition-transform group-hover:scale-105">
            <Crown className="w-2.5 h-2.5" /> Sponsored
          </div>
          {tier && tier !== 'Free' && (
            <SubscriptionBadge tier={tier} category={isPharmacy ? 'pharmacy' : 'clinic'} />
          )}
        </div>
      )}
      
      {/* Image Area */}
      <div className="relative shrink-0 w-full sm:w-48 h-40 sm:h-32 rounded-xl overflow-hidden group-hover:shadow-md transition-all">
        <img 
          src={image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400"} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-bold text-dark shadow-sm">
           {type}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(id); }}
          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition-all ${
            isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-black/30 text-white hover:bg-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors leading-snug">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <p className="text-xs font-medium text-slate-500 truncate">{address || 'Global Medical Center'}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-dark bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {rating} <span className="text-slate-400 font-medium font-normal">({reviews})</span>
          </div>
        </div>

        {/* Services Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {services.slice(0, 3).map(s => (
            <span key={s} className="px-2.5 py-1 bg-primary/5 text-primary rounded-md text-[10px] font-semibold">{s}</span>
          ))}
          {services.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-md text-[10px] font-semibold">+{services.length - 3}</span>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <ShieldCheck className="w-4 h-4" /> PMC Verified Facility
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-xl text-xs font-bold hover:bg-primary transition-colors shadow-sm group-hover:bg-primary">
            View Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FacilityListCard;
