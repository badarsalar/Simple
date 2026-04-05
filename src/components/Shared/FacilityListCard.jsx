import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Crown, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <Link
      to={isPharmacy ? `/pharmacy/${id}` : `/clinic/${id}`}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group block"
    >
      {/* ── Sponsored strip at the very top (no overlap) ── */}
      {isSponsored && (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border-b border-amber-100 relative z-20">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-200/40 rounded text-[9px] font-bold text-amber-700 uppercase tracking-widest border border-amber-200">
            <Crown className="w-3 h-3" /> Sponsored
          </div>
          {tier && tier !== 'Free' && (
            <div className="ml-auto">
              <SubscriptionBadge tier={tier} category={isPharmacy ? 'pharmacy' : 'clinic'} />
            </div>
          )}
        </div>
      )}

      <div className="p-4 sm:p-5 flex gap-4 sm:gap-5">
        {/* Image */}
        <div className="relative shrink-0">
          <img
            src={image || (isPharmacy ? "/images/facilities/pharmacy-placeholder.svg" : "/images/facilities/clinic-placeholder.svg")}
            alt={name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-slate-50"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name + Fav button */}
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-dark group-hover:text-primary transition-colors leading-snug truncate">
                {name}
              </h3>
              <p className="text-xs text-primary font-semibold mt-0.5 truncate">{type}</p>
            </div>
            {onToggleFav && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(id); }}
                className="shrink-0 p-1.5 rounded-xl hover:bg-rose-50 transition-colors"
                aria-label="Toggle favourite"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-300 hover:text-rose-400'}`}
                />
              </button>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 font-medium">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{address || 'Global Medical Center'}</span>
          </div>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              {rating}
              <span className="text-slate-400">({reviews})</span>
            </span>
            <span className="text-slate-200 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px] font-semibold">
              <ShieldCheck className="w-3 h-3 shrink-0" /> PMC Verified
            </span>
          </div>

          {/* Services + CTA */}
          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {services.slice(0, 2).map(s => (
                <span key={s} className="px-2 py-0.5 bg-primary/5 text-primary rounded text-[10px] font-semibold">
                  {s}
                </span>
              ))}
              {services.length > 2 && (
                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-semibold">
                  +{services.length - 2}
                </span>
              )}
            </div>
            <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-[11px] font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FacilityListCard;
