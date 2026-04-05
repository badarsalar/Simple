import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Crown, Heart } from 'lucide-react';
import SubscriptionBadge from './SubscriptionBadge';

const UnifiedFacilityCard = ({ 
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
  onToggleFav = () => {}
}) => {
  const tier = subscription?.type;
  const isSponsored = tier !== 'Free' || hasActiveAds;

  return (
    <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col text-left h-full">
      {/* Visual Header */}
      <div className="relative mb-6 overflow-hidden rounded-[2rem] block aspect-[16/10]">
        <img 
          src={image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400"} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Sponsored & Subscription Badge */}
        {isSponsored && (
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
            <div className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-1 uppercase tracking-widest rounded-lg border border-amber-200 flex items-center gap-1 shadow-lg">
              <Crown className="w-2.5 h-2.5" /> Sponsored
            </div>
            {tier && tier !== 'Free' && (
              <SubscriptionBadge tier={tier} />
            )}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl text-[8px] font-black text-primary shadow-sm uppercase tracking-widest border border-slate-200">
           {type}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(id); }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-16 p-2 rounded-xl backdrop-blur-md transition-all ${
            isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
        </button>
      </div>
      
      {/* Content Body */}
      <div className="flex-1 space-y-4 mb-6 px-1">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/clinic/${id}`}>
            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors leading-tight italic tracking-tight">{name}</h3>
          </Link>
          <div className="flex items-center gap-1 text-[9px] font-black text-dark bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 shrink-0">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {rating}
          </div>
        </div>
        
        <div className="flex items-start gap-2.5 text-slate-400">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <p className="text-[11px] font-bold leading-relaxed line-clamp-1">{address || 'Global Medical Center'}</p>
        </div>

        {/* Services - Proper Sizing Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {services.slice(0, 3).map(s => (
            <span key={s} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">{s}</span>
          ))}
          {services.length > 3 && <span className="px-2 py-1 text-[8px] font-black text-primary italic lowercase tracking-wider">+{services.length - 3} more</span>}
        </div>
      </div>
      
      {/* Primary Action */}
      <Link to={`/clinic/${id}`} className="w-full py-4 bg-dark text-white rounded-[1.8rem] font-bold text-xs hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn uppercase tracking-widest shadow-xl shadow-dark/5">
        View & Book <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default UnifiedFacilityCard;
