import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign, Crown } from 'lucide-react';
import SubscriptionBadge from './SubscriptionBadge';

const UnifiedProviderCard = ({ 
  id, 
  name, 
  specialty, 
  rating = "5.0", 
  reviews = "0", 
  experience = "1", 
  fee = "50", 
  image, 
  subscription = { type: 'Free' },
  hasActiveAds = false,
  isFav = false,
  onToggleFav = () => {}
}) => {
  const tier = subscription?.type;
  const isSponsored = tier !== 'Free' || hasActiveAds;

  return (
    <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden h-full flex flex-col">
      {/* Sponsored & Subscription Badge */}
      {isSponsored && (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
          <div className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-1 uppercase tracking-widest rounded-lg border border-amber-200 flex items-center gap-1">
            <Crown className="w-2.5 h-2.5" /> Sponsored
          </div>
          {tier && tier !== 'Free' && (
            <SubscriptionBadge tier={tier} />
          )}
        </div>
      )}

      {/* Favorite Button */}
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(id); }}
        className={`absolute top-4 left-4 p-2.5 rounded-xl transition-all z-10 ${isFav ? 'bg-primary/10 text-primary shadow-sm' : 'bg-slate-50 text-slate-300 hover:text-primary'}`}
      >
        <Star className={`w-4 h-4 ${isFav ? 'fill-primary' : ''}`} />
      </button>

      <Link to={`/profile/${id}`} className="block flex-1 flex flex-col pt-4">
         {/* Profile Visuals */}
         <div className="flex flex-col items-center text-center gap-4 flex-1">
            <div className="relative">
              <img 
                src={image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"} 
                className="w-24 h-24 rounded-[2rem] object-cover border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform" 
                alt={name} 
              />
              {tier === 'Diamond' && (
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-lg border border-slate-50">
                  <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px]">💎</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="min-w-0 space-y-1">
               <h4 className="font-bold text-dark italic leading-none group-hover:text-primary transition-colors text-lg tracking-tight">{name}</h4>
               <p className="text-[10px] text-primary font-black uppercase tracking-widest italic">{specialty}</p>
               
               {/* Metrics - Proper Sizing */}
               <div className="flex items-center justify-center gap-4 pt-3">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 italic">
                     <Clock className="w-3 h-3" /> {experience} Yrs
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 italic">
                     <DollarSign className="w-3 h-3" /> ${fee}
                  </div>
               </div>
            </div>
         </div>

         {/* Footer Info */}
         <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5 pt-1">
               <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
               <span className="text-[10px] font-black text-dark">{rating}</span>
               <span className="text-slate-200 mx-1 text-[8px]">|</span>
               <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verified Care</span>
            </div>
            <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">Available</span>
         </div>
      </Link>
    </div>
  );
};

export default UnifiedProviderCard;
