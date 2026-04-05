import React, { useState } from 'react';
import { Star, MessageSquare, User, Send, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { Link } from 'react-router-dom';

const ReviewSystem = ({ providerId }) => {
  const { user } = useAuth();
  const { reviews, addReview } = useDashboard();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const providerReviews = reviews.filter(r => r.providerId === providerId || r.providerId === String(providerId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    
    const newReview = {
      providerId,
      userName: user?.name || "Anonymous Patient",
      userAvatar: user?.avatar || `https://i.pravatar.cc/150?u=${user?.id || 'anon'}`,
      rating,
      comment
    };

    setTimeout(() => {
      addReview(newReview);
      setComment('');
      setRating(5);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="space-y-10 py-10 border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-dark italic uppercase tracking-tight flex items-center gap-3">
            Patient <span className="text-primary italic">Reviews</span>
            <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black tracking-widest text-slate-400">
              {providerReviews.length} TOTAL
            </div>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 italic">Verified feedback from the community</p>
        </div>

        {/* Aggregate Stars */}
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="text-right">
              <p className="text-xs font-black text-dark italic leading-none">Overall Score</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Based on {providerReviews.length} ratings</p>
           </div>
           <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Review List */}
        <div className="lg:col-span-7 space-y-6">
          {providerReviews.length > 0 ? (
            providerReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <img src={review.userAvatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-50 shadow-sm" alt="" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-dark italic uppercase tracking-tight">{review.userName}</h4>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-100'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic group-hover:text-dark transition-colors">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-slate-200">
                  <MessageSquare className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-sm font-black text-dark uppercase tracking-widest italic">No reviews yet</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Be the first to share your experience</p>
               </div>
            </div>
          )}
        </div>

        {/* Right: Submission Form */}
        <div className="lg:col-span-5">
           <div className="bg-dark rounded-[3rem] p-8 sm:p-10 text-white shadow-2xl sticky top-28">
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">Write a <span className="text-primary italic">Review</span></h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Share your experience with others</p>
                  </div>

                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">1. Rate your visit</p>
                     <div className="flex items-center gap-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setRating(s)}
                            className="group transition-all active:scale-90"
                          >
                            <Star 
                              className={`w-8 h-8 transition-all ${s <= rating ? 'text-primary fill-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'text-white/10 hover:text-white/20'}`} 
                            />
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">2. Your Feedback</p>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what you liked or how they can improve..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white/10 transition-all outline-none min-h-[150px] placeholder:text-white/20 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !comment.trim()}
                    className={`w-full py-5 rounded-[2.5rem] font-black text-xs uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${isSubmitting || !comment.trim() ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-white hover:text-dark'}`}
                  >
                    {isSubmitting ? 'Posting...' : <>Post Review <Send className="w-4 h-4" /></>}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-8">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-primary">
                      <LogIn className="w-10 h-10" />
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-xl font-black italic uppercase tracking-tight">Review <span className="text-primary italic">Locked</span></h3>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed italic">
                        Please login to your account to share your experience with this provider. 
                        Your verified feedback helps our community.
                      </p>
                   </div>
                   <Link 
                     to="/login"
                     className="w-full py-5 bg-white text-dark rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase italic tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20"
                   >
                      Sign In to Review <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem;
