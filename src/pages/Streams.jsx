import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Radio, Eye, Heart, Clock, Search, Filter, Users, Star,
  Play, Bell, ArrowRight, CheckCircle, Zap, TrendingUp,
  Shield, Award, ChevronRight, Flame, Mic, Video, Globe
} from 'lucide-react';

/* ─── Data ─── */
const LIVE_STREAMS = [
  {
    id: 'live-dr-cooper-001',
    host: 'Dr. Adam Cooper',
    specialty: 'Oncology Specialist',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800',
    title: 'Understanding Cancer Prevention — Live Q&A',
    category: 'Health Education',
    viewers: 1284,
    likes: 3821,
    isLive: true,
    startedAt: '2:30 PM',
    duration: '48 min',
    verified: true,
    guests: 2,
    tag: 'Trending',
  },
  {
    id: 'live-dr-lee-002',
    host: 'Dr. Sarah Lee',
    specialty: 'Radiologist',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800',
    title: 'Advanced Imaging Techniques in Modern Radiology',
    category: 'Medical Workshop',
    viewers: 632,
    likes: 1240,
    isLive: true,
    startedAt: '3:00 PM',
    duration: '18 min',
    verified: true,
    guests: 1,
    tag: null,
  },
  {
    id: 'live-dr-patel-003',
    host: 'Dr. James Patel',
    specialty: 'Research Oncologist',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800',
    title: 'Immunotherapy Breakthroughs: 2026 Research Update',
    category: 'Medical Research',
    viewers: 893,
    likes: 2100,
    isLive: true,
    startedAt: '1:45 PM',
    duration: '1h 2min',
    verified: false,
    guests: 0,
    tag: 'New',
  },
];

const UPCOMING_STREAMS = [
  {
    id: 'sched-001',
    host: 'Dr. Maya Kapoor',
    specialty: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800',
    title: 'Heart Health After 40: What You Need to Know',
    category: 'Cardiology',
    date: 'Apr 10',
    time: '5:00 PM',
    registrations: 431,
    verified: true,
  },
  {
    id: 'sched-002',
    host: 'Dr. Zhang Wei',
    specialty: 'Neurologist',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800',
    title: 'Managing Chronic Migraines: Patient Q&A',
    category: 'Neurology',
    date: 'Apr 12',
    time: '7:00 PM',
    registrations: 218,
    verified: true,
  },
  {
    id: 'sched-003',
    host: 'Dr. Aisha Okafor',
    specialty: 'Dermatologist',
    avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=800',
    title: 'Skin Cancer Awareness & Prevention Live',
    category: 'Dermatology',
    date: 'Apr 14',
    time: '4:30 PM',
    registrations: 352,
    verified: false,
  },
];

const CATEGORIES = ['All', 'Health Education', 'Medical Workshop', 'Cardiology', 'Neurology', 'Dermatology', 'Medical Research', 'Q&A Session'];

const STATS = [
  { label: 'Streams Today', value: '24', icon: Radio, color: 'text-rose-500 bg-rose-50' },
  { label: 'Viewers Online', value: '12.4K', icon: Eye, color: 'text-blue-500 bg-blue-50' },
  { label: 'Verified Doctors', value: '380+', icon: Shield, color: 'text-emerald-500 bg-emerald-50' },
  { label: 'Topics Covered', value: '48', icon: Award, color: 'text-amber-500 bg-amber-50' },
];

/* ─── Sub Components ─── */
const LivePulse = () => (
  <span className="relative flex items-center gap-1.5">
    <span className="absolute inline-flex h-2 w-2 rounded-full bg-rose-400 opacity-75 animate-ping" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
    <span className="text-rose-500 text-[10px] font-bold uppercase tracking-wider">Live</span>
  </span>
);

const ViewerCount = ({ count, className = '' }) => (
  <span className={`flex items-center gap-1 text-[10px] font-bold ${className}`}>
    <Eye className="w-3 h-3" />
    {count?.toLocaleString()}
  </span>
);

const FeaturedStreamCard = ({ stream }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/stream/${stream.id}`}
      className="group relative block rounded-3xl overflow-hidden shadow-2xl bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[16/8]">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-rose-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg shadow-rose-500/40">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
            {stream.tag && (
              <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow ${stream.tag === 'Trending' ? 'bg-amber-400 text-amber-900' : 'bg-primary text-white'}`}>
                {stream.tag === 'Trending' ? <Flame className="w-3 h-3 inline mr-1" /> : null}
                {stream.tag}
              </div>
            )}
          </div>
          <ViewerCount count={stream.viewers} className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full" />
        </div>

        {/* Guest bubbles */}
        {stream.guests > 0 && (
          <div className="absolute top-16 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Users className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-bold text-white/70">{stream.guests} guests</span>
          </div>
        )}

        {/* Play button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl">
            <Play className="w-9 h-9 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-2.5 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-lg text-[9px] font-bold mb-3">
            {stream.category}
          </span>
          <h3 className="text-xl font-bold text-white leading-snug mb-3">{stream.title}</h3>
          <div className="flex items-center gap-3">
            <img src={stream.avatar} alt={stream.host} className="w-8 h-8 rounded-xl border-2 border-white/30 object-cover" />
            <div>
              <p className="text-white font-bold text-sm flex items-center gap-1">
                {stream.host}
                {stream.verified && <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary" />}
              </p>
              <p className="text-white/50 text-[10px] font-medium">{stream.specialty} · Started {stream.startedAt}</p>
            </div>
            <div className="ml-auto flex items-center gap-3 text-white/60 text-xs font-bold">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400" /> {stream.likes.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {stream.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const LiveStreamCard = ({ stream }) => (
  <Link to={`/stream/${stream.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="relative aspect-video overflow-hidden bg-slate-900">
      <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-rose-500 text-white px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-lg shadow-rose-500/40">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
        {stream.tag && (
          <div className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${stream.tag === 'Trending' ? 'bg-amber-400 text-amber-900' : 'bg-primary text-white'}`}>
            {stream.tag}
          </div>
        )}
      </div>

      <ViewerCount count={stream.viewers} className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <img src={stream.avatar} alt={stream.host} className="w-7 h-7 rounded-lg border-2 border-white/30 object-cover" />
          <div>
            <p className="text-white font-bold text-xs flex items-center gap-1">
              {stream.host}
              {stream.verified && <CheckCircle className="w-3 h-3 text-primary fill-primary" />}
            </p>
            <p className="text-white/50 text-[9px] font-medium">{stream.specialty}</p>
          </div>
        </div>
        <span className="text-white/60 text-[9px] font-medium bg-black/40 px-2 py-0.5 rounded-lg">{stream.duration}</span>
      </div>
    </div>

    <div className="p-4 space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-lg text-[9px] font-bold">{stream.category}</span>
        {stream.guests > 0 && (
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-bold flex items-center gap-1">
            <Users className="w-2.5 h-2.5" /> {stream.guests} guests
          </span>
        )}
      </div>
      <h3 className="font-bold text-dark text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{stream.title}</h3>
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
        <span className="flex items-center gap-1 text-rose-500"><Heart className="w-3 h-3" />{stream.likes.toLocaleString()}</span>
        <span className="text-slate-300">Started {stream.startedAt}</span>
      </div>
    </div>
  </Link>
);

const UpcomingStreamCard = ({ stream }) => {
  const [notified, setNotified] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden">
      <div className="relative aspect-[16/6] overflow-hidden bg-slate-900">
        <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-slate-800/80 backdrop-blur-sm text-white rounded-xl text-[9px] font-bold flex items-center gap-1.5">
            <Clock className="w-2.5 h-2.5 text-amber-400" />
            {stream.date} • {stream.time}
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center gap-4">
        <img src={stream.avatar} alt={stream.host} className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-100" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-bold">{stream.category}</span>
          </div>
          <h3 className="font-bold text-dark text-sm leading-snug truncate">{stream.title}</h3>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
            {stream.host}
            {stream.verified && <CheckCircle className="w-3 h-3 text-primary fill-primary" />}
            · {stream.specialty}
          </p>
          <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 font-bold">
            <Bell className="w-2.5 h-2.5 text-amber-500" /> {stream.registrations.toLocaleString()} registered
          </div>
        </div>
        <button
          onClick={() => setNotified(n => !n)}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            notified ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
          }`}
        >
          <Bell className="w-3 h-3" />
          {notified ? 'Notified' : 'Notify'}
        </button>
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const Streams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalViewers, setTotalViewers] = useState(LIVE_STREAMS.reduce((a, s) => a + s.viewers, 0));

  // Simulate live viewer fluctuation
  useEffect(() => {
    const iv = setInterval(() => {
      setTotalViewers(v => v + Math.floor(Math.random() * 10) - 4);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const featuredStream = LIVE_STREAMS[0];

  const filteredLive = LIVE_STREAMS.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-slate-950 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-rose-500/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/15 border border-rose-500/20 rounded-full">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">{LIVE_STREAMS.length} streams live right now</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Healthcare <span className="text-primary">Live</span> Streams
              </h1>
              <p className="text-white/50 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
                Watch verified doctors and specialists live. Ask questions, learn from experts, and get real-time health education — free for everyone.
              </p>

              <div className="relative max-w-md w-full mx-auto lg:mx-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search streams, doctors, topics..."
                  className="w-full pl-11 pr-5 py-4 bg-white/8 border border-white/10 rounded-2xl text-white placeholder-white/25 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white/12 transition-all"
                />
              </div>

              {/* Live stats row */}
              <div className="flex items-center gap-6 flex-wrap justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  <span className="text-white/50 text-sm font-medium">{totalViewers.toLocaleString()} watching now</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-white/50 text-sm font-medium">Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white/50 text-sm font-medium">HIPAA Compliant</span>
                </div>
              </div>
            </div>

            {/* Right: Stats grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {STATS.map(stat => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-2xl p-5 text-center hover:bg-white/8 transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 py-3.5 overflow-x-auto no-scrollbar items-center">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* ── Featured Stream ── */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-dark">Featured Stream</h2>
            </div>
            <FeaturedStreamCard stream={featuredStream} />
          </section>
        )}

        {/* ── Live Now ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LivePulse />
              <h2 className="text-2xl font-bold text-dark">Live Now</h2>
              <span className="px-2.5 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-xl">
                {filteredLive.length} streams
              </span>
            </div>
          </div>

          {filteredLive.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLive.map(stream => (
                <LiveStreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4 bg-white rounded-3xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                <Radio className="w-8 h-8 text-slate-400" />
              </div>
              <p className="font-bold text-dark">No live streams match your search</p>
              <p className="text-sm text-slate-400">Try a different category or check back soon</p>
              <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all">
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* ── Upcoming ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-dark">Upcoming Streams</h2>
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-xl">
                {UPCOMING_STREAMS.length} scheduled
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {UPCOMING_STREAMS.map(stream => (
              <UpcomingStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative bg-slate-950 rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-rose-500/10" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-bold">For Healthcare Providers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Start Your Own<br />Live Stream
              </h2>
              <p className="text-white/50 font-medium max-w-md leading-relaxed">
                Reach thousands of patients and educate your community. Live streaming is available for all verified healthcare providers on Diamond tier.
              </p>
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                {['HIPAA Secure', 'Multi-Guest Support', 'Live Analytics', 'HD Quality'].map(f => (
                  <span key={f} className="flex items-center gap-1.5 text-xs font-bold text-white/60">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/signup" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-primary/30 text-center">
                Get Started Free
              </Link>
              <Link to="/streams" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2 justify-center">
                Go to Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Streams;
