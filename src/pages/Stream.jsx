import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Radio, Users, MessageSquare, Heart, Share2, Eye, Mic, MicOff,
  Video, VideoOff, X, Send, ThumbsUp, Gift, Bell, MoreHorizontal,
  ChevronDown, Volume2, VolumeX, Maximize2, Settings, ArrowLeft,
  Shield, Star, Crown, Zap, AlertTriangle, CheckCircle, Clock,
  UserPlus, UserMinus, MessageCircle, Flag, Pin, AtSign, Smile,
  TrendingUp, Activity, BarChart3, Lock, Unlock, Plus, Minimize2,
  Bookmark, Share, Info, AlertCircle, Tv2, ChevronUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

/* ─── Mock stream data ─── */
const MOCK_STREAM = {
  id: 'live-dr-cooper-001',
  hostName: 'Dr. Adam Cooper',
  hostTitle: 'Oncology Specialist | HIPAA Certified',
  hostAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200',
  hostFollowers: '24.8K',
  title: 'Understanding Cancer Prevention — Live Q&A',
  description: 'Join me live as we discuss the latest research in cancer prevention, early detection strategies, and your most pressing questions about oncology. We have two expert guests joining tonight.',
  category: 'Health Education',
  tags: ['Oncology', 'Prevention', 'Q&A', 'Cancer'],
  isLive: true,
  viewerCount: 1284,
  likeCount: 3821,
  commentCount: 312,
  startedAt: '2:30 PM',
  thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600',
  hlsUrl: null,
  guests: [
    { id: 'g1', name: 'Dr. Sarah Lee', role: 'Radiologist', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200', isActive: true, isSpeaking: false },
    { id: 'g2', name: 'Dr. James Patel', role: 'Oncology Research', avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=200', isActive: true, isSpeaking: true },
  ],
  commentsEnabled: true,
  upcomingStreams: [
    { id: 's1', title: 'Live Chemotherapy Q&A', date: 'Apr 10', time: '6:00 PM', registrations: 231 },
    { id: 's2', title: 'Diet & Cancer Prevention', date: 'Apr 15', time: '4:00 PM', registrations: 187 },
  ]
};

const INITIAL_COMMENTS = [
  { id: 1, user: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100', message: 'Thank you Dr. Cooper! What about preventive screenings for people under 40?', time: '2:35 PM', isHost: false, isPinned: true, role: 'Viewer', likes: 24, liked: false },
  { id: 2, user: 'Dr. Adam Cooper', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100', message: 'Great question Maria! Early screenings are crucial. We recommend starting at 35 for high-risk individuals.', time: '2:36 PM', isHost: true, isPinned: false, role: 'Host', likes: 87, liked: false },
  { id: 3, user: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100', message: 'Is the Mediterranean diet really as effective as studies suggest?', time: '2:38 PM', isHost: false, isPinned: false, role: 'Viewer', likes: 12, liked: false },
  { id: 4, user: 'Dr. Sarah Lee', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100', message: 'Absolutely, the antioxidants in Mediterranean foods show a clear correlation in our studies.', time: '2:39 PM', isHost: false, isPinned: false, role: 'Guest', likes: 45, liked: false },
  { id: 5, user: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100', message: 'This stream is incredibly informative! Sharing with my family 🙏', time: '2:41 PM', isHost: false, isPinned: false, role: 'Viewer', likes: 19, liked: false },
  { id: 6, user: 'Ahmed Hassan', avatar: null, message: 'Amazing session! What are the key biomarkers to watch for early detection?', time: '2:43 PM', isHost: false, isPinned: false, role: 'Viewer', likes: 8, liked: false },
];

const LIVE_MESSAGES = [
  { user: 'Ahmed Hassan', message: 'Amazing session, very informative!', avatar: null, role: 'Viewer' },
  { user: 'Lisa Chen', message: 'Can you explain more about immunotherapy?', avatar: null, role: 'Viewer' },
  { user: 'Raj Kumar', message: 'Thank you Dr. Cooper, this is life changing!', avatar: null, role: 'Viewer' },
  { user: 'Emma Wilson', message: 'What supplements do you recommend for cancer prevention?', avatar: null, role: 'Viewer' },
  { user: 'Dr. Sarah Lee', message: 'Great point about vitamin D deficiency links!', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100', role: 'Guest' },
  { user: 'Carlos M.', message: 'Is stress a major factor in cancer development?', avatar: null, role: 'Viewer' },
];

/* ─── Utilities ─── */
const AvatarCircle = ({ src, name, size = 10, ring = false, speaking = false }) => {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`relative shrink-0`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }}>
      <div className={`w-full h-full rounded-full overflow-hidden
        ${ring ? 'ring-2 ring-primary ring-offset-1' : ''}
        ${speaking ? 'ring-2 ring-emerald-400 ring-offset-1' : ''}
      `}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        )}
      </div>
      {speaking && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />}
    </div>
  );
};

const roleConfig = {
  Host: { cls: 'bg-primary text-white font-bold', label: 'Host' },
  Guest: { cls: 'bg-emerald-500 text-white font-bold', label: 'Guest' },
  Moderator: { cls: 'bg-amber-500 text-white font-bold', label: 'Mod' },
  Viewer: { cls: 'bg-slate-100 text-slate-500 font-bold', label: '' },
};

const CommentItem = ({ comment, onLike, onPin, onRemove, isHost }) => {
  const { cls, label } = roleConfig[comment.role] || roleConfig.Viewer;
  return (
    <div className={`group flex gap-2.5 py-2 px-2 rounded-xl hover:bg-slate-50 transition-all ${comment.isPinned ? 'bg-primary/5 border border-primary/10' : ''}`}>
      <AvatarCircle src={comment.avatar} name={comment.user} size={7} ring={comment.isHost} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className={`font-bold text-xs ${comment.isHost ? 'text-primary' : comment.role === 'Guest' ? 'text-emerald-600' : 'text-slate-900'}`}>
            {comment.user}
          </span>
          {label && (
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${cls}`}>{label}</span>
          )}
          {comment.isPinned && <Pin className="w-3 h-3 text-primary" />}
          <span className="text-[10px] text-slate-400 ml-auto">{comment.time}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed break-words">{comment.message}</p>
        <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${comment.liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
          >
            <Heart className={`w-3 h-3 ${comment.liked ? 'fill-current' : ''}`} /> {comment.likes}
          </button>
          <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> Reply
          </button>
          {isHost && (
            <>
              <button onClick={() => onPin(comment.id)} className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                <Pin className="w-3 h-3" /> Pin
              </button>
              <button onClick={() => onRemove(comment.id)} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1">
                <X className="w-3 h-3" /> Remove
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Stream Page ─── */
const Stream = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [stream] = useState(MOCK_STREAM);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [guests, setGuests] = useState(MOCK_STREAM.guests);
  const [commentInput, setCommentInput] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likeCount, setLikeCount] = useState(stream.likeCount);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [guestName, setGuestName] = useState('');
  const [showGuestInvite, setShowGuestInvite] = useState(false);
  const [viewerCount, setViewerCount] = useState(stream.viewerCount);
  const [toast, setToast] = useState(null);
  const [streamDuration, setStreamDuration] = useState(2880); // seconds (48min)
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const chatRef = useRef(null);
  const isLoggedIn = !!user;
  const isHost = user?.role === 'doctor';

  // Viewer count fluctuation
  useEffect(() => {
    const iv = setInterval(() => {
      setViewerCount(v => Math.max(1000, v + Math.floor(Math.random() * 8) - 3));
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Stream duration timer
  useEffect(() => {
    const iv = setInterval(() => setStreamDuration(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [comments]);

  // Simulate live comments
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      const msg = LIVE_MESSAGES[idx % LIVE_MESSAGES.length];
      setComments(prev => [...prev.slice(-50), {
        id: Date.now(),
        ...msg,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isPinned: false,
        likes: 0,
        liked: false,
      }]);
      idx++;
    }, 7000);
    return () => clearInterval(iv);
  }, []);

  // Simulate speaking guest toggle
  useEffect(() => {
    const iv = setInterval(() => {
      setGuests(prev => prev.map(g => ({ ...g, isSpeaking: Math.random() > 0.5 })));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const formatDuration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      : `${m}:${String(sec).padStart(2, '0')}`;
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendComment = () => {
    if (!commentsEnabled) return showToast('Comments are disabled', 'error');
    const name = isLoggedIn ? (user.name || 'User') : (displayName.trim() || 'Anonymous');
    const msg = commentInput.trim();
    if (!msg) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      user: name,
      avatar: user?.avatar || null,
      message: msg,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isHost: false,
      isPinned: false,
      role: isHost ? 'Host' : 'Viewer',
      likes: 0,
      liked: false,
    }]);
    setCommentInput('');
  };

  const handleLike = (id) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked } : c
    ));
  };

  const handlePin = (id) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c));
    showToast('Comment pinned');
  };

  const handleRemoveComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
    showToast('Comment removed');
  };

  const handleRemoveGuest = (guestId) => {
    setGuests(prev => prev.filter(g => g.id !== guestId));
    showToast('Guest removed from stage');
  };

  const handleInviteGuest = () => {
    if (!guestName.trim()) return;
    setGuests(prev => [...prev, { id: `g-${Date.now()}`, name: guestName.trim(), role: 'Invited Guest', avatar: null, isActive: true, isSpeaking: false }]);
    setGuestName('');
    setShowGuestInvite(false);
    showToast(`${guestName} added as guest`);
  };

  const handleLikeStream = () => {
    setLiked(l => !l);
    setLikeCount(l => liked ? l - 1 : l + 1);
  };

  const pinnedComments = comments.filter(c => c.isPinned);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-dark flex flex-col" id="stream-page">
      <Navbar />
      <div className="pt-20" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 backdrop-blur-xl border animate-bounce-in
          ${toast.type === 'error' ? 'bg-rose-50 text-white shadow-lg' : 'bg-white border-slate-100 text-dark shadow-xl'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-white" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
          {toast.msg}
        </div>
      )}

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
          <div className="bg-white border border-slate-100 rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-dark italic">Share this Stream</h3>
              <button onClick={() => setShowShareModal(false)} className="p-1.5 bg-slate-50 rounded-xl text-slate-400 hover:text-dark transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <code className="flex-1 text-xs font-bold text-slate-400 truncate">medicare.live/stream/live-dr-cooper-001</code>
              <button onClick={() => showToast('Link copied!')} className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition-all">Copy</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-screen-2xl mx-auto w-full">

        {/* ── Left: Video + Info ── */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Video Player */}
          <div className="relative bg-black group">
            <div className="aspect-video w-full relative overflow-hidden">
              <img
                src={stream.thumbnailUrl}
                alt={stream.title}
                className="w-full h-full object-cover"
              />

              {/* Center play state overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

              {/* Guest video tiles top-right */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {guests.filter(g => g.isActive).map(guest => (
                  <div
                    key={guest.id}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-xl transition-all
                      ${guest.isSpeaking ? 'border-emerald-400 shadow-emerald-500/40' : 'border-white/20'}`}
                  >
                    {guest.avatar ? (
                      <img src={guest.avatar} alt={guest.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    {guest.isSpeaking && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
                        ))}
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 px-1 text-[8px] font-bold text-white truncate text-center">
                      {guest.name.split(' ')[1] || guest.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Host bottom-left */}
              <div className="absolute bottom-14 sm:bottom-16 left-4 flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg">
                    <img src={stream.hostAvatar} alt={stream.hostName} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm drop-shadow">{stream.hostName}</p>
                  <p className="text-white/50 text-[10px] font-medium drop-shadow">{stream.hostTitle}</p>
                </div>
              </div>

              {/* Controls bottom-right */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="p-2.5 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/80 transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button className="p-2.5 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/80 transition-all">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-black/60 backdrop-blur-sm rounded-xl text-white hover:bg-black/80 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full bg-rose-500 w-1/3 shadow-glow" />
              </div>
            </div>
          </div>

          {/* Stream Info Panel */}
          <div className="bg-white border-b border-slate-100">
            <div className="px-5 py-4">
              {/* Title & Category */}
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-xl text-[10px] font-bold uppercase tracking-tight">{stream.category}</span>
                    {stream.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg text-[9px] font-bold">#{tag}</span>
                    ))}
                    <span className="text-slate-400 text-[10px] ml-auto hidden sm:block font-bold uppercase italic">Started {stream.startedAt}</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-dark italic uppercase leading-tight tracking-tight">{stream.title}</h1>
                </div>
              </div>
 
              {/* Host info + action row */}
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <img src={stream.hostAvatar} alt={stream.hostName} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                  <div>
                    <p className="font-bold text-dark text-sm flex items-center gap-1 uppercase italic tracking-tight">
                      {stream.hostName}
                      <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary" />
                    </p>
                    <p className="text-slate-400 text-[10px] font-black uppercase italic tracking-widest">{stream.hostFollowers} followers</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase italic tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">
                  <Bell className="w-3.5 h-3.5" /> Follow Specialist
                </button>
                <div className="ml-auto flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase italic tracking-widest">
                  <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {likeCount.toLocaleString()} Likes</span>
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-primary" /> {comments.length} Chat</span>
                </div>
              </div>
 
              {/* Description collapsible */}
              <button
                onClick={() => setInfoExpanded(e => !e)}
                className="flex items-center gap-2 mt-4 text-slate-400 text-[10px] font-black uppercase italic tracking-widest hover:text-dark transition-colors"
              >
                {infoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {infoExpanded ? 'Hide Details' : 'Stream Details'}
              </button>

              {infoExpanded && (
                <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-in slide-in-from-top-2 duration-200">
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{stream.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop/Mobile Upcoming */}
          <div className="bg-white flex-1 px-5 py-6 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary" /> Upcoming Sessions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {stream.upcomingStreams.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Radio className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-dark text-xs italic uppercase tracking-tight truncate">{s.title}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase italic mt-0.5">{s.date} · {s.time} · {s.registrations} registered</p>
                  </div>
                  <button className="shrink-0 p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar: Chat ── */}
        <div
          className="w-full lg:w-[360px] xl:w-[400px] bg-white border-l border-slate-100 flex flex-col"
          style={{ height: 'calc(100vh - 80px)', position: 'sticky', top: '80px' }}
        >
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-100 shrink-0">
            {[
              { id: 'chat', label: 'LIVE CHAT', icon: MessageSquare, count: comments.length },
              { id: 'guests', label: 'GUESTS', icon: Users, count: guests.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase italic tracking-widest transition-all relative ${
                  activeTab === tab.id ? 'text-primary bg-primary/5' : 'text-slate-400 hover:text-dark'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                    activeTab === tab.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* ── Chat Tab ── */}
          {activeTab === 'chat' && (
            <>
              {/* Host Controls */}
              {isHost && (
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black text-dark uppercase italic tracking-widest flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary" /> Controls
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setCommentsEnabled(p => !p); showToast(commentsEnabled ? 'Comments disabled' : 'Comments enabled'); }}
                      className={`relative w-8 h-4 rounded-full transition-all ${commentsEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${commentsEnabled ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                    <button
                      onClick={() => setShowGuestInvite(p => !p)}
                      className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Guest Invite Form */}
              {isHost && showGuestInvite && (
                <div className="px-4 py-4 bg-white border-b border-slate-100 space-y-3 shrink-0 shadow-sm animate-in fade-in duration-300">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Invite Professional Guest</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      placeholder="Doctor Name or Hub ID..."
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-dark placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-primary/20"
                      onKeyDown={e => e.key === 'Enter' && handleInviteGuest()}
                    />
                    <button onClick={handleInviteGuest} className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Pinned Comments */}
              {pinnedComments.length > 0 && (
                <div className="px-4 py-2.5 bg-primary/5 border-b border-primary/10 shrink-0">
                  <p className="text-[9px] font-black text-primary flex items-center gap-1 mb-1.5 uppercase italic tracking-widest"><Pin className="w-3 h-3" /> Pinned Question</p>
                  {pinnedComments.map(c => (
                    <div key={c.id} className="text-xs text-dark font-medium leading-relaxed">
                      <span className="text-primary font-bold italic">{c.user}: </span>{c.message}
                    </div>
                  ))}
                </div>
              )}

              {/* Comments Disabled Banner */}
              {!commentsEnabled && (
                <div className="mx-4 my-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 shrink-0 shadow-sm shadow-amber-500/5">
                  <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic">Host has suspended chat</p>
                </div>
              )}

              {/* Comments Scroll Area */}
              <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-hide">
                {comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={handleLike}
                    onPin={handlePin}
                    onRemove={handleRemoveComment}
                    isHost={isHost}
                  />
                ))}
              </div>

              {/* Comment Input Area */}
              <div className="px-4 py-4 border-t border-slate-100 space-y-3 shrink-0 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
                {!isLoggedIn && (
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Set Display Name..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase italic tracking-widest text-dark placeholder-slate-300 focus:outline-none focus:border-primary/20"
                  />
                )}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendComment()}
                      placeholder={commentsEnabled ? 'Share your thoughts...' : 'Chat Suspended'}
                      disabled={!commentsEnabled}
                      className="w-full px-5 py-3.5 pr-12 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-dark placeholder-slate-300 focus:outline-none focus:border-primary/30 disabled:opacity-40 shadow-sm"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Smile className="w-5 h-5 text-slate-300 hover:text-primary transition-colors" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendComment}
                    disabled={!commentsEnabled || !commentInput.trim()}
                    className="p-3.5 bg-primary text-white rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-40 shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Guests Tab ── */}
          {activeTab === 'guests' && (
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-hide">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Members on Stage</h4>
                {guests.length === 0 && (
                  <p className="text-center py-8 text-xs text-slate-300 font-bold uppercase italic">Stage is empty</p>
                )}
                <div className="space-y-3">
                  {guests.map(guest => (
                    <div key={guest.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group shadow-sm">
                      <div className="relative">
                        <AvatarCircle src={guest.avatar} name={guest.name} size={10} speaking={guest.isSpeaking} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-dark text-xs truncate uppercase italic tracking-tight">{guest.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{guest.role}</p>
                      </div>
                      {guest.isSpeaking && (
                         <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-500 rounded-lg border border-emerald-100">
                           <Activity className="w-3 h-3 animate-pulse" />
                           <span className="text-[8px] font-black uppercase tracking-widest">LIVE</span>
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Stream Stats */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Network Health</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { label: 'LISTENERS', value: viewerCount.toLocaleString(), icon: Eye, color: 'text-primary' },
                    { label: 'APPLAUSE', value: likeCount.toLocaleString(), icon: Heart, color: 'text-rose-500' },
                    { label: 'MESSAGE FEED', value: comments.length.toLocaleString(), icon: MessageSquare, color: 'text-emerald-500' },
                    { label: 'ELAPSED', value: formatDuration(streamDuration), icon: Clock, color: 'text-amber-500' },
                  ].map(stat => (
                    <div key={stat.label} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                      </div>
                      <span className="text-xs font-black text-dark uppercase tracking-tight italic">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stream;
