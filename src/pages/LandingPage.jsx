import React, { useState, useEffect, useRef } from 'react';
import { rankProviders } from '../utils/ranking';
import { 
  Search, MapPin, ArrowRight, ShieldCheck, Star, Calendar, ChevronRight, ChevronLeft,
  Activity, Microscope, Baby, Brain, Heart, Stethoscope, Dna, Eye,
  CheckCircle2, Clock, Pill, Zap, Globe, Navigation, Crown, Monitor, Play,
  Video, Users, ThumbsUp, Award, Phone, Verified, BadgeCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { SUBSCRIPTION_PLANS, getPlanByTier } from '../constants/subscriptions';
import UnifiedProviderCard from '../components/Shared/UnifiedProviderCard';
import UnifiedFacilityCard from '../components/Shared/UnifiedFacilityCard';
import DoctorListCard from '../components/Shared/DoctorListCard';

/* ─── Service Category Card ─── */


/* ─── Service Category Card ─── */
const ServiceCard = ({ icon: Icon, title, subtitle, color, link }) => (
  <Link 
    to={link} 
    className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 hover:shadow-md hover:border-primary/20 transition-all group"
  >
    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="text-[13px] sm:text-sm font-bold text-dark group-hover:text-primary transition-colors leading-tight">{title}</h4>
      <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 leading-tight">{subtitle}</p>
    </div>
    <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300 ml-auto shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
  </Link>
);

/* ─── Specialty Pill ─── */
const SpecialtyPill = ({ icon: Icon, title }) => (
  <Link 
    to={`/doctors?specialty=${encodeURIComponent(title)}`} 
    className="flex flex-col items-center gap-2.5 px-4 py-3 group cursor-pointer shrink-0"
  >
    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-105 transition-all border border-primary/10">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <span className="text-[11px] font-semibold text-slate-600 group-hover:text-primary transition-colors whitespace-nowrap">{title}</span>
  </Link>
);

/* ─── Stat Counter ─── */
const StatItem = ({ value, label, icon: Icon }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-xl font-bold text-dark leading-none">{value}</p>
      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─── Main Landing Page ─── */
const LandingPage = () => {
  const { providers, medicines, isFavorite, toggleFavorite } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [isSearchingNearby, setIsSearchingNearby] = useState(false);
  const navigate = useNavigate();
  const specialtyScrollRef = useRef(null);

  const sortedProviders = rankProviders(providers, userCoords);
  const diamondProviders = sortedProviders.filter(p => p.subscription?.type === 'Diamond');
  const userDoctors = sortedProviders.filter(p => p.role === 'doctor');
  const userClinics = sortedProviders.filter(p => p.role === 'clinic');
  const userPharmacies = sortedProviders.filter(p => p.role === 'pharmacy');

  const specialties = [
    { icon: Stethoscope, title: 'General Physician' },
    { icon: Heart, title: 'Cardiologist' },
    { icon: Brain, title: 'Neurologist' },
    { icon: Eye, title: 'Ophthalmologist' },
    { icon: Baby, title: 'Pediatrician' },
    { icon: Activity, title: 'Dermatologist' },
    { icon: Microscope, title: 'Gynecologist' },
    { icon: Dna, title: 'Orthopedic' },
    { icon: Pill, title: 'Psychiatrist' },
    { icon: Stethoscope, title: 'ENT Specialist' },
    { icon: Heart, title: 'Pulmonologist' },
    { icon: Activity, title: 'Urologist' },
  ];

  const handleNearMeSearch = () => {
    setIsSearchingNearby(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLocation('Near Me (GPS)');
          setIsSearchingNearby(false);
        },
        () => { setLocation('Location Denied'); setIsSearchingNearby(false); }
      );
    }
  };

  const scrollSpecialties = (dir) => {
    if (specialtyScrollRef.current) {
      specialtyScrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  // Static top doctors for demo  
  const staticDoctors = [
    { id: 's1', name: 'Dr. Ahmed Khan', specialty: 'Cardiologist', rating: '4.9', reviews: '342', experience: '15', fee: '3,000', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400', address: 'Shalimar Hospital, Lahore, Pakistan' },
    { id: 's2', name: 'Dr. Fatima Bibi', specialty: 'Gynecologist', rating: '4.8', reviews: '289', experience: '12', fee: '2,500', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400', address: 'Pakistan Institute of Medical Sciences, Islamabad' },
    { id: 's3', name: 'Dr. Ayesha Malik', specialty: 'Dermatologist', rating: '4.9', reviews: '512', experience: '8', fee: '2,000', image: 'https://images.unsplash.com/photo-1559839734-2b71f153678e?q=80&w=400', address: 'DHA Medical Center, Karachi, Pakistan' },
    { id: 's4', name: 'Dr. Muhammad Ali', specialty: 'Neurologist', rating: '4.7', reviews: '198', experience: '10', fee: '3,500', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400', address: 'Jinnah Hospital, Lahore, Pakistan' },
  ];

  // Placeholder streams for landing page
  const placeholderStreams = [
    { id: 'placeholder-1', name: 'Dr. Coming Soon', specialization: 'Specialist', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2U3ZTdlYSIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxjaXJjbGUgY3g9IjExNSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0gODUgOTUgUTEwMCAxMTAgMTE1IDk1IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K' },
    { id: 'placeholder-2', name: 'Dr. Scheduled', specialization: 'Specialist', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2U3ZTdlYSIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxjaXJjbGUgY3g9IjExNSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0gODUgOTUgUTEwMCAxMTAgMTE1IDk1IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K' },
    { id: 'placeholder-3', name: 'Dr. Interactive', specialization: 'Specialist', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2U3ZTdlYSIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxjaXJjbGUgY3g9IjExNSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0gODUgOTUgUTEwMCAxMTAgMTE1IDk1IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K' },
    { id: 'placeholder-4', name: 'Dr. Wellness', specialization: 'Specialist', avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2U3ZTdlYSIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxjaXJjbGUgY3g9IjExNSIgY3k9IjY1IiByPSI2IiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0gODUgOTUgUTEwMCAxMTAgMTE1IDk1IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K' },
  ];

  const allDoctors = [
    ...userDoctors.map(d => ({
      id: d.id,
      name: d.name.startsWith('Dr.') ? d.name : `Dr. ${d.name}`,
      specialty: d.specialization || 'General Specialist',
      rating: d.rating || '4.8',
      reviews: '120',
      experience: '5',
      fee: '2,000',
      image: d.avatar,
      subscription: d.subscription,
      hasActiveAds: d.hasActiveAds,
    })),
    ...staticDoctors
  ];

  const staticClinics = [
    { id: 'c1', name: 'Islamabad Medical Complex', facilityName: 'Islamabad Medical Complex', address: 'Blue Area, Islamabad, Pakistan', rating: '4.8', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400' },
    { id: 'c2', name: 'Lahore General Hospital', facilityName: 'Lahore General Hospital', address: 'Gulberg, Lahore, Pakistan', rating: '4.9', reviews: '2.4k', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400' },
    { id: 'c3', name: 'Karachi Health Center', facilityName: 'Karachi Health Center', address: 'Clifton, Karachi, Pakistan', rating: '4.7', reviews: '850', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=400' },
  ];

  const clinics = [
    ...userClinics.map(c => ({
      ...c,
      facilityName: c.facilityName || c.name,
      rating: '4.8',
      reviews: '100+'
    })),
    ...staticClinics
  ];

  const staticPharmacies = [
    { id: 'p1', name: 'HealthFirst Global', facilityName: 'HealthFirst Global', address: 'Manhattan, NY', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400' },
    { id: 'p2', name: 'MediCare Pharmacy', facilityName: 'MediCare Pharmacy', address: 'Brooklyn, NY', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=400' },
    { id: 'p3', name: 'GreenCross Meds', facilityName: 'GreenCross Meds', address: 'Queens, NY', image: 'https://images.unsplash.com/photo-1555633514-abcee6ab92e1?q=80&w=400' },
  ];

  const pharmacies = [
    ...userPharmacies.map(p => ({
      ...p,
      facilityName: p.facilityName || p.name,
    })),
    ...staticPharmacies
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">
      <Navbar />

      {/* ─── HERO SECTION (Oladoc Style) ─── */}
      <section className="pt-20 pb-16 bg-primary relative overflow-hidden rounded-b-[40px]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-2">
                Find & book the <br /> best doctors
              </h1>
              <p className="text-white/80 text-sm font-medium">Over 15,000 verified specialists</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-stretch gap-2 shadow-2xl relative translate-y-8 sm:translate-y-12">
            <div className="flex-[1.5] flex items-center gap-3 px-3 py-3 border-b sm:border-b-0 sm:border-r border-slate-100 hover:bg-slate-50 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none transition-colors cursor-text">
              <Search className="w-5 h-5 text-primary shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, hospitals..." 
                className="w-full text-base font-bold text-dark bg-transparent focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 py-3 hover:bg-slate-50 transition-colors cursor-text border-b sm:border-b-0 border-slate-100 sm:border-r">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or location" 
                className="w-full text-base font-bold text-dark bg-transparent focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
              />
              <button onClick={handleNearMeSearch} className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors shrink-0">
                <Navigation className={`w-4 h-4 ${isSearchingNearby ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <button 
              onClick={() => navigate(`/doctors?q=${searchQuery}&l=${location}`)}
              className="mt-2 sm:mt-0 bg-primary text-white py-4 sm:px-8 rounded-xl text-base font-bold hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg shadow-primary/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ─── QUICK SERVICE LINKS ─── */}
      <section className="pt-20 pb-8 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ServiceCard icon={Calendar} title="In-Clinic Visit" subtitle="Book an appointment" color="bg-primary" link="/doctors" />
            <ServiceCard icon={Video} title="Video Consult" subtitle="Talk to doctor online" color="bg-indigo-500" link="/doctors" />
            <ServiceCard icon={Pill} title="Medicines" subtitle="Order & get delivered" color="bg-emerald-500" link="/medicines" />
            <ServiceCard icon={Activity} title="Lab Tests" subtitle="Book home sampling" color="bg-amber-500" link="/clinics" />
          </div>
        </div>
      </section>

      {/* ─── SPECIALTIES ─── */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark">Consult Best Doctors</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollSpecialties(-1)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollSpecialties(1)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link to="/doctors" className="text-xs font-bold text-primary hover:underline ml-2">View All</Link>
            </div>
          </div>
          <div ref={specialtyScrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2 snap-x snap-mandatory">
            {specialties.map((spec, i) => (
              <div key={i} className="snap-center sm:snap-start shrink-0">
                <SpecialtyPill {...spec} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP DOCTORS (List-style like Oladoc) ─── */}
      <section className="py-8 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-dark">Top Rated Doctors</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Book appointments with verified specialists</p>
            </div>
            <Link to="/doctors" className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
              See All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-3 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
            {allDoctors.slice(0, 6).map(doc => (
              <div key={doc.id} className="w-[85vw] sm:w-auto shrink-0 snap-center sm:snap-none">
                <DoctorListCard 
                  {...doc}
                  address={doc.address}
                  isFav={isFavorite(doc.id, 'doctor')} 
                  onToggleFav={() => toggleFavorite(doc.id, 'doctor')}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/doctors" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-dark rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-all">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DIAMOND LIVE HIGHLIGHTS ─── */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Live</span>
              </div>
              <h2 className="text-lg font-bold text-white">Premium Live Consultations</h2>
            </div>
            <Link to="/streams" className="text-xs font-bold text-primary hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(diamondProviders.length > 0 ? diamondProviders.slice(0, 4) : placeholderStreams.slice(0, 4)).map((p, i) => {
              const isPlaceholder = !p.specialization || (p.id && typeof p.id === 'string' && p.id.startsWith('placeholder'));
              return (
                <Link key={i} to={isPlaceholder ? "#" : `/stream/${p.id || ''}`} className={`group relative aspect-video rounded-xl overflow-hidden ${isPlaceholder ? 'cursor-not-allowed opacity-75' : ''}`}>
                  <img src={p.avatar} className={`w-full h-full object-cover ${!isPlaceholder ? 'group-hover:scale-105' : ''} transition-transform duration-500 brightness-75`} alt={p.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  {!isPlaceholder && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-bold text-white">2.4k</span>
                    </div>
                  )}
                  {isPlaceholder && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-slate-500/80 backdrop-blur-sm rounded-md flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-[9px] font-bold text-white">Coming Soon</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white leading-snug truncate">{p.name}</h4>
                    <p className="text-[10px] text-slate-300 font-medium">{p.specialization || 'Specialist'}</p>
                  </div>
                  {!isPlaceholder && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CLINICS & PHARMACIES ─── */}
      <section className="py-8 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Clinics */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-dark">Top Hospitals & Clinics</h2>
                <Link to="/clinics" className="text-xs font-bold text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-3">
                {clinics.slice(0, 3).map(clinic => (
                  <Link key={clinic.id} to={`/clinic/${clinic.id}`} className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4 hover:shadow-md hover:border-primary/20 transition-all group">
                    <img 
                      src={clinic.avatar || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400'} 
                      alt={clinic.facilityName || clinic.name} 
                      className="w-16 h-16 rounded-lg object-cover border border-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors truncate">{clinic.facilityName || clinic.name}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{clinic.address || 'Medical District'}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.8
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-md">Open Now</span>
                        {(clinic.subscription?.type !== 'Free' || clinic.hasActiveAds) && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold rounded-md flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5" /> Promoted
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {clinics.length === 0 && (
                  <div className="bg-white rounded-xl border border-dashed border-slate-200 p-8 text-center">
                    <p className="text-sm text-slate-400 font-medium">No clinics registered yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pharmacies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-dark">Pharmacy & Medicine Stores</h2>
                <Link to="/pharmacies" className="text-xs font-bold text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-3">
                {pharmacies.slice(0, 3).map(store => (
                  <Link key={store.id} to={`/pharmacy/${store.id}`} className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4 hover:shadow-md hover:border-primary/20 transition-all group">
                    <img 
                      src={store.avatar || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400'} 
                      alt={store.facilityName || store.name} 
                      className="w-16 h-16 rounded-lg object-cover border border-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors truncate">{store.facilityName || store.name}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{store.address || 'Location Pending'}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                          <Pill className="w-3 h-3 text-primary" /> Delivery Available
                        </span>
                        {(store.subscription?.type !== 'Free' || store.hasActiveAds) && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold rounded-md flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5" /> Promoted
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {pharmacies.length === 0 && (
                  <div className="bg-white rounded-xl border border-dashed border-slate-200 p-8 text-center">
                    <p className="text-sm text-slate-400 font-medium">No pharmacies registered yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEDICINE ORDER BANNER ─── */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="relative z-10 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-lg text-primary text-xs font-bold">
                <Globe className="w-3.5 h-3.5" /> Free Delivery on Orders Above Rs. 1000
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Order Medicines<br /><span className="text-primary">Online Safely</span>
              </h3>
              <p className="text-slate-400 text-sm font-medium max-w-md">
                Authentic medicines from verified stores. Upload your prescription and get medicines delivered to your doorstep.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <Link to="/medicines" className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-center">
                Shop Now
              </Link>
              <Link to="/medicines" className="px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors text-center">
                Upload Prescription
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOP MEDICINES ─── */}
      {medicines.length > 0 && (
        <section className="py-8 bg-[#f8f9fc]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-dark">Popular Medicines</h2>
              <Link to="/medicines" className="text-xs font-bold text-primary hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {medicines.slice(0, 6).map((m, i) => (
                <Link key={i} to={`/medicine/${m.id || i}`} className="bg-white rounded-xl border border-slate-100 p-4 text-center hover:shadow-md hover:border-primary/20 transition-all group">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <img src={m.image} alt={m.name} className="w-10 h-10 object-contain" />
                  </div>
                  <h4 className="text-xs font-bold text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">{m.name}</h4>
                  <p className="text-primary font-bold text-sm mt-1.5">Rs. {m.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TRUST SECTION ─── */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-dark">Why Choose SimpleCare?</h2>
            <p className="text-sm text-slate-400 font-medium mt-1">Trusted by millions of patients across the country</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BadgeCheck, title: 'Verified Doctors', desc: 'All doctors are PMC verified with authentic credentials', color: 'bg-primary/5 text-primary' },
              { icon: ShieldCheck, title: 'Secure Platform', desc: 'End-to-end encryption for all your medical data', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Clock, title: '24/7 Access', desc: 'Book appointments anytime, day or night', color: 'bg-indigo-50 text-indigo-600' },
              { icon: ThumbsUp, title: 'Patient Reviews', desc: 'Real reviews from verified patients only', color: 'bg-amber-50 text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 text-center hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-dark mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
