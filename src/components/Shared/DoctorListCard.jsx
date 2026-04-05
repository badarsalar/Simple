import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Video, Crown, CheckCircle2, Heart, Verified, MapPin } from 'lucide-react';
import SubscriptionBadge from './SubscriptionBadge';

const DoctorListCard = ({
  id,
  name,
  specialty,
  rating,
  reviews,
  experience,
  fee,
  image,
  subscription,
  hasActiveAds,
  isFav,
  onToggleFav,
  address,
}) => {
  const isSponsored = subscription?.type !== 'Free' || hasActiveAds;
  const tier = subscription?.type;

  return (
    <Link
      to={`/profile/${id}`}
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
              <SubscriptionBadge tier={tier} category="doctor" />
            </div>
          )}
        </div>
      )}

      <div className="p-4 sm:p-5 flex gap-4 sm:gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={image || '/images/facilities/doctor-placeholder.svg'}
            alt={name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-slate-50"
          />
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
              <p className="text-xs text-primary font-semibold mt-0.5 truncate">{specialty}</p>
            </div>
            {onToggleFav && (
              <button
                onClick={onToggleFav}
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
            <span className="truncate">{address || 'Address not available'}</span>
          </div>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              {experience || '5'} Yrs Exp
            </span>
            <span className="text-slate-200 hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              {rating || '4.8'}
              <span className="text-slate-400">({reviews || '120'})</span>
            </span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px] font-semibold">
              <Verified className="w-3 h-3 shrink-0" /> PMC Verified
            </span>
          </div>

          {/* Fee + CTA */}
          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-dark">Rs. {fee || '2,000'}</span>
              <span className="text-[10px] text-slate-400 font-medium">/ visit</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-lg text-[11px] font-bold hover:bg-primary/10 transition-colors"
              >
                <Video className="w-3 h-3" />
                Video
              </button>
              <Link
                to={`/book/${id}`}
                className="px-4 py-1.5 bg-primary text-white rounded-lg text-[11px] font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
              >
                Book Appt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorListCard;
