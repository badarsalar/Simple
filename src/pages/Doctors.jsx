import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import DoctorListCard from '../components/Shared/DoctorListCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Pagination from '../components/Shared/Pagination';

const Doctors = () => {
  const { providers, toggleFavorite, isFavorite } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSpecialty = queryParams.get('specialty') || '';
  const initialSearch = queryParams.get('q') || '';
  const initialLocation = queryParams.get('l') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [selectedSpecialties, setSelectedSpecialties] = useState(initialSpecialty ? [initialSpecialty] : []);
  const [selectedGender, setSelectedGender] = useState('');
  const [maxFee, setMaxFee] = useState(5000);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 12;

  const specialtiesList = [
    'General Physician', 'Cardiologist', 'Neurologist', 'Dermatologist', 
    'Gynecologist', 'Pediatrician', 'Orthopedic', 'Psychiatrist'
  ];

  const staticDoctors = [
    { id: 1, name: "Dr. Adam Cooper", specialty: "Oncologist", rating: "5.0", reviews: "124", experience: "15", fee: "3500", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400", gender: "male" },
    { id: 2, name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: "4.9", reviews: "89", experience: "12", fee: "2500", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400", gender: "female" },
    { id: 3, name: "Dr. Lucas Grey", specialty: "Neurologist", rating: "5.0", reviews: "56", experience: "10", fee: "4000", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400", gender: "male" },
    { id: 4, name: "Dr. Emma Wilson", specialty: "Dermatologist", rating: "4.8", reviews: "210", experience: "8", fee: "2000", image: "https://images.unsplash.com/photo-1559839734-2b71f153678e?q=80&w=400", gender: "female" },
  ];

  const registeredDoctors = providers
    .filter(p => p.role === 'doctor')
    .map(p => ({
      id: p.id,
      name: p.name.startsWith('Dr.') ? p.name : `Dr. ${p.name}`,
      specialty: p.specialization || 'General Physician',
      rating: p.rating || '4.8',
      reviews: '12',
      experience: p.experience || '5',
      fee: p.consultationFee || '2000',
      image: p.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400',
      gender: p.gender || 'male'
    }));

  const doctors = [...staticDoctors, ...registeredDoctors].map(doc => ({
    ...doc,
    subscription: providers.find(p => p.id === doc.id)?.subscription || { type: 'Free' },
  }));

  const filteredDoctors = doctors.filter(doc => {
    return (
      (selectedSpecialties.length === 0 || selectedSpecialties.includes(doc.specialty)) &&
      (selectedGender === '' || doc.gender === selectedGender) &&
      (doc.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (parseInt(doc.fee.replace(/,/g, '')) <= maxFee)
    );
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'relevance') {
      const tierWeights = { 'Diamond': 30, 'Platinum': 20, 'Gold': 10, 'Free': 0 };
      const scoreA = (tierWeights[a.subscription?.type] || 0) + parseFloat(a.rating || 0);
      const scoreB = (tierWeights[b.subscription?.type] || 0) + parseFloat(b.rating || 0);
      return scoreB - scoreA;
    }
    if (sortBy === 'price-low') return parseInt(a.fee.replace(/,/g, '')) - parseInt(b.fee.replace(/,/g, ''));
    if (sortBy === 'price-high') return parseInt(b.fee.replace(/,/g, '')) - parseInt(a.fee.replace(/,/g, ''));
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    return 0;
  });

  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);
  const paginatedDoctors = sortedDoctors.slice((page - 1) * itemsPerPage, page * itemsPerPage);
 
  const toggleSpecialty = (spec) => {
    if (spec === '') {
      setSelectedSpecialties([]);
      return;
    }
    setSelectedSpecialties(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="bg-dark pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-rose-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Find & Book the <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Best Doctors</span></h1>
            <p className="text-white/60 text-sm font-medium">Connect with top-rated specialists, book online or in-clinic appointments, and get the care you deserve.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all shadow-sm">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, specialties..." 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-dark placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="City or location" 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-dark placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button className="md:w-32 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-dark">
              {selectedSpecialties.length === 1 ? `Best ${selectedSpecialties[0]}s` : 'Best Doctors'} 
              {locationQuery ? ` in ${locationQuery}` : ' near you'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">{filteredDoctors.length} doctors available</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-dark"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-slate-500">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="text-xs font-bold text-dark bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rating</option>
                <option value="price-low">Fee: Low to High</option>
                <option value="price-high">Fee: High to Low</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300" onClick={() => setShowMobileFilters(false)} />
          )}

          {/* Left Sidebar Filters */}
          <div className={`fixed inset-y-0 left-0 w-[280px] bg-slate-50 z-[110] p-6 shadow-2xl transition-transform duration-300 lg:relative lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:z-0 lg:translate-x-0 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto lg:overflow-visible`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-200 rounded-full text-slate-500"><Check className="w-4 h-4" /></button>
            </div>
            <div className="space-y-6">
            {/* Specialty Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold text-dark flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Specialty
              </h3>
              <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar">
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => toggleSpecialty('')}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSpecialties.length === 0 ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                    {selectedSpecialties.length === 0 && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs font-medium text-slate-600 group-hover:text-dark">All Specialties</span>
                </div>
                {specialtiesList.map(spec => (
                  <div 
                    key={spec} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleSpecialty(spec)}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSpecialties.includes(spec) ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                      {selectedSpecialties.includes(spec) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs font-medium text-slate-600 group-hover:text-dark">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold text-dark flex items-center gap-2 mb-4">
                Gender
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setSelectedGender(''); setPage(1); }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${selectedGender === '' ? 'bg-primary/5 border-primary text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  Any
                </button>
                <button 
                  onClick={() => { setSelectedGender('male'); setPage(1); }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${selectedGender === 'male' ? 'bg-primary/5 border-primary text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => { setSelectedGender('female'); setPage(1); }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${selectedGender === 'female' ? 'bg-primary/5 border-primary text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-dark">Max Fee</h3>
                <span className="text-xs font-bold text-primary">Rs. {maxFee}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="500"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-2">
                <span>Rs. 500</span>
                <span>Rs. 5000+</span>
              </div>
            </div>
            </div>
            
            {/* Action buttons for mobile */}
             <div className="lg:hidden mt-6 flex gap-3">
                <button onClick={() => { setSelectedSpecialties([]); setSelectedGender(''); setMaxFee(5000); setPage(1); }} className="flex-1 py-3 bg-white text-dark border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50">Clear</button>
                <button onClick={() => setShowMobileFilters(false)} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">Apply Filters</button>
             </div>
          </div>

          {/* Right Column: Listings */}
          <div className="flex-1 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            {paginatedDoctors.length > 0 ? (
              <>
                {paginatedDoctors.map((doc) => (
                  <DoctorListCard 
                    key={doc.id}
                    {...doc}
                    isFav={isFavorite(doc.id, 'doctor')} 
                    onToggleFav={(e) => {
                      e.preventDefault();
                      toggleFavorite(doc.id, 'doctor');
                    }}
                  />
                ))}

                {/* Pagination */}
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-1">No doctors found</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialties([]);
                    setSelectedGender('');
                    setMaxFee(5000);
                    setPage(1);
                  }}
                  className="mt-6 px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Doctors;
