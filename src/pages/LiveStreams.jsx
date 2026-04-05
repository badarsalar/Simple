import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlayCircle, 
  Eye, 
  MessageSquare, 
  Star, 
  Search, 
  Filter, 
  Radio, 
  TrendingUp, 
  Heart, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const StreamCard = ({ stream }) => {
  const navigate = useNavigate();
  return (
  <div 
    onClick={() => navigate(`/stream/${stream.id}`)}
    className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-primary/30 transition-all cursor-pointer shadow-xl hover:-translate-y-2 duration-500"
  >
    <div className="aspect-video relative overflow-hidden">
      <img 
        src={stream.avatar || "https://images.unsplash.com/photo-1559839734-2b71f1e3c77e?q=80&w=800"} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        alt={stream.name} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Live Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="bg-rose-600 text-white text-[9px] font-black uppercase italic tracking-widest px-3 py-1.5 rounded-lg shadow-lg shadow-rose-600/20 flex items-center gap-2 animate-pulse">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div> LIVE
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[9px] font-black uppercase italic tracking-widest flex items-center gap-2 border border-white/10">
           <Eye className="w-3.5 h-3.5 text-primary" /> 1.2k
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
          <PlayCircle className="w-8 h-8 ml-1" />
        </div>
      </div>
    </div>

    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-slate-100 overflow-hidden shrink-0">
          <img src={stream.avatar} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-dark font-black italic text-sm truncate uppercase tracking-tight group-hover:text-primary transition-colors">{stream.name}</h3>
          <p className="text-[10px] font-bold text-slate-500 italic truncate uppercase tracking-widest">{stream.specialization || 'Clinical Specialist'}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[8px] font-black uppercase italic text-slate-400">Surgery</span>
        <span className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-lg text-[8px] font-black uppercase italic text-primary">Masterclass</span>
      </div>
    </div>
  </div>
)};

const LiveStreams = () => {
  const navigate = useNavigate();
  const { providers } = useAuth();
  
  // Highlighting specific live sessions for the "Discovery" feel
  const liveProviders = providers.filter(p => (p.role === 'doctor' || p.role === 'clinic'));
  const featuredStream = liveProviders[0];

  const categories = [
    { label: 'Surgery', count: '12 Live' },
    { label: 'Mental Health', count: '8 Live' },
    { label: 'Cardiology', count: '5 Live' },
    { label: 'Wellness', count: '19 Live' },
    { label: 'Q&A Sessions', count: '7 Live' },
    { label: 'Dermatology', count: '4 Live' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-dark font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <div className="pt-24 pb-8" />

      <main className="p-6 lg:p-12 max-w-[1600px] mx-auto space-y-20">
        {/* Featured Hero Section */}
        {featuredStream && (
          <section className="relative rounded-[4rem] overflow-hidden group shadow-2xl border border-white/5">
             <div className="aspect-[21/9] lg:aspect-[25/9] relative">
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt="Featured" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 lg:p-20 flex flex-col justify-center max-w-3xl space-y-8">
                   <div className="flex items-center gap-3">
                      <span className="px-5 py-2 bg-rose-600 rounded-xl text-[10px] font-black uppercase italic animate-pulse shadow-xl shadow-rose-600/30">Live Spotlight</span>
                      <span className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-xl text-[10px] font-black uppercase italic border border-white/10">1.8k Active Listeners</span>
                   </div>
                   
                   <div className="space-y-4">
                      <h1 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        Neurology <span className="text-primary italic">Deep Dive</span>
                      </h1>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="w-12 h-12 rounded-2xl border-2 border-primary/40 p-0.5">
                           <img src={featuredStream.avatar} className="w-full h-full object-cover rounded-xl" alt="" />
                        </div>
                        <div>
                          <p className="text-xl font-black italic text-white/90">Dr. {featuredStream.name}</p>
                          <p className="text-primary font-black uppercase italic tracking-widest text-[10px]">{featuredStream.specialization || 'Clinical Expert'}</p>
                        </div>
                      </div>
                   </div>

                   <p className="text-slate-400 font-bold italic text-sm lg:text-base leading-relaxed max-w-xl">
                      Join the most intensive surgical walkthrough of 2026. Real-time patient cases, procedural mastery, and interactive clinical Q&A.
                   </p>

                   <div className="flex items-center gap-4 pt-4">
                      <button 
                        onClick={() => navigate(`/stream/${featuredStream.id}`)}
                        className="px-10 py-5 bg-primary text-white rounded-3xl text-sm font-black uppercase italic tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-3"
                      >
                         <PlayCircle className="w-6 h-6" /> Join Live
                      </button>
                      <button className="px-8 py-5 bg-white/5 backdrop-blur-md text-white rounded-3xl text-sm font-black uppercase italic tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 border border-white/10">
                         <Star className="w-5 h-5 text-amber-500" /> Remind Me
                      </button>
                   </div>
                </div>
             </div>
          </section>
        )}

        {/* Categories Bar */}
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
           {categories.map(cat => (
             <button key={cat.label} className="px-8 py-6 bg-white rounded-[2.5rem] border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all group shrink-0 shadow-sm">
               <span className="block font-black italic text-sm uppercase tracking-tight text-dark group-hover:text-primary transition-colors">{cat.label}</span>
               <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{cat.count}</span>
             </button>
           ))}
        </div>
 
        {/* Live Wall Grid */}
        <section className="space-y-10">
           <div className="flex items-center justify-between border-b border-slate-200 pb-8">
              <div className="space-y-1">
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter text-dark">Live <span className="text-primary italic">Sessions</span></h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Real-Time Medical Intelligence</p>
              </div>
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                 <button className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase italic rounded-xl">Recommended</button>
                 <button className="px-6 py-2 text-[10px] font-black uppercase italic text-slate-400">Viewers (High)</button>
              </div>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {liveProviders.map(stream => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
              {/* Dummy sessions to fill the wall if needed */}
              {[1, 2, 3, 4].map(i => (
                <div key={`dummy-${i}`} className="opacity-40 animate-pulse bg-white rounded-[2.5rem] aspect-video border border-dashed border-slate-200 flex items-center justify-center">
                   <p className="text-[10px] font-black uppercase italic tracking-widest text-slate-300">Upcoming Session {i}</p>
                </div>
              ))}
           </div>
        </section>
 
        {/* Following Section */}
        <section className="flex flex-col lg:flex-row gap-12 bg-white p-12 lg:p-20 rounded-[4rem] border border-slate-100 relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50"></div>
           <div className="lg:max-w-md space-y-8 relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] text-dark">Never Miss a <span className="text-primary italic">Session</span></h2>
              <p className="text-slate-500 font-bold italic leading-relaxed">Follow your preferred specialists to receive instant push alerts before surgeries and live medical breakthroughs.</p>
              <button className="px-8 py-5 bg-dark text-white rounded-3xl text-[10px] font-black uppercase italic tracking-widest hover:bg-primary transition-all shadow-2xl">Manage Notifications</button>
           </div>
           
           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {liveProviders.slice(0, 4).map((p, i) => (
                <div key={i} className="p-6 bg-[#f8f9fc] rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200">
                         <img src={p.avatar} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                         <h4 className="text-dark font-black italic text-xs uppercase tracking-tight">DR. {p.name}</h4>
                         <p className="text-[10px] font-bold text-slate-400 italic mt-0.5">{p.specialization}</p>
                      </div>
                   </div>
                   <button className="text-primary hover:scale-110 transition-transform">
                      <Heart className="w-5 h-5 fill-primary" />
                   </button>
                </div>
              ))}
           </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
};

export default LiveStreams;
