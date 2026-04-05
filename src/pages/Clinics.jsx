import React, { useState } from 'react';
import { Search, MapPin, Filter, Building2, SlidersHorizontal, Check } from 'lucide-react';
import FacilityListCard from '../components/Shared/FacilityListCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Pagination from '../components/Shared/Pagination';

const Clinics = () => {
  const { providers, toggleFavorite, isFavorite } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const staticClinics = [
    { id: 1, name: 'City Dental Care', address: '456 Broadway, Manhattan, NY', rating: '4.9', reviews: '1.2k', type: 'Dental Clinic', image: 'https://images.unsplash.com/photo-1629909608132-2d159bd4498a?q=80&w=400', services: ['Cleaning', 'Implants', 'X-Ray'] },
    { id: 2, name: 'Grace Hills Medical', address: '789 Park Ave, Brooklyn, NY', rating: '4.8', reviews: '850', type: 'General Hospital', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400', services: ['Emergency', 'Surgery', 'Diagnostics'] },
    { id: 3, name: 'Sunset Eye Clinic', address: '12 5th Ave, Queens, NY', rating: '5.0', reviews: '430', type: 'Specialized Clinic', image: 'https://images.unsplash.com/photo-1586773860418-d3b9a8ec8172?q=80&w=400', services: ['Eye Exam', 'Lasik', 'Optical'] },
    { id: 4, name: 'North West Ortho', address: '88 Union Square, NY', rating: '4.7', reviews: '620', type: 'Rehab Center', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400', services: ['Physio', 'Fracture', 'Sports'] },
  ];

  const registeredClinics = providers
    .filter(p => p.role === 'clinic')
    .map(p => ({
      id: p.id,
      name: p.facilityName || p.name,
      address: p.address || 'Location Pending',
      rating: '5.0',
      reviews: '12',
      type: 'Medical Facility',
      image: p.avatar || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400',
      services: ['General Care', 'Consultation']
    }));

  const clinics = [...staticClinics, ...registeredClinics].map(c => ({
    ...c,
    subscription: providers.find(p => p.id === c.id)?.subscription || { type: 'Free' },
    distance: (Math.random() * 8 + 1).toFixed(1)
  }));

  const filteredClinics = clinics.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationQuery === '' || c.address.toLowerCase().includes(locationQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(c.type);
    const matchesServices = selectedServices.length === 0 || 
                           selectedServices.every(s => c.services.includes(s));
    
    return matchesSearch && matchesLocation && matchesType && matchesServices;
  });

  const sortedClinics = [...filteredClinics].sort((a, b) => {
    if (sortBy === 'relevance') {
      const tierWeights = { 'Diamond': 30, 'Platinum': 20, 'Gold': 10, 'Free': 0 };
      const scoreA = (tierWeights[a.subscription?.type] || 0) + parseFloat(a.rating || 0);
      const scoreB = (tierWeights[b.subscription?.type] || 0) + parseFloat(b.rating || 0);
      return scoreB - scoreA;
    }
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedClinics.length / itemsPerPage);
  const paginatedClinics = sortedClinics.slice((page - 1) * itemsPerPage, page * itemsPerPage);
 
  const toggleFilter = (item, list, setList) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="bg-dark pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
             <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Find Top <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Hospitals & Clinics</span></h1>
             <p className="text-white/60 text-sm font-medium">Discover verified medical centers, explore specialties, and book appointments at top-rated facilities near you.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all shadow-sm">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clinics, hospitals, or specialties" 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-dark placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="City, area or zip code" 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-dark placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button className="md:w-32 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-dark">Top Hospitals & Clinics</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">{filteredClinics.length} medical centers found</p>
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
                <option value="distance">Distance</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300" onClick={() => setShowMobileFilters(false)} />
          )}

          {/* Filters Sidebar */}
          <div className={`fixed inset-y-0 left-0 w-[280px] bg-slate-50 z-[110] p-6 shadow-2xl transition-transform duration-300 lg:relative lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:z-0 lg:translate-x-0 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto lg:overflow-visible`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-200 rounded-full text-slate-500 font-bold">X</button>
            </div>
            <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold text-dark flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Facility Type
              </h3>
              <div className="space-y-3">
                {['General Hospital', 'Dental Clinic', 'Eye Clinic', 'Specialized Clinic', 'Rehab Center'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}
                      onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    >
                      {selectedTypes.includes(type) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span 
                      className="text-xs font-medium text-slate-600 group-hover:text-dark"
                      onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    >
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold text-dark mb-4">Services Available</h3>
              <div className="space-y-3">
                {['Emergency', 'Surgery', 'Diagnostics', 'Cleaning', 'Implants', 'X-Ray', 'Eye Exam', 'Lasik', 'Optical', 'Physio', 'Fracture', 'Sports'].slice(0, 8).map(service => (
                  <label key={service} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedServices.includes(service) ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}
                      onClick={() => toggleFilter(service, selectedServices, setSelectedServices)}
                    >
                      {selectedServices.includes(service) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span 
                      className="text-xs font-medium text-slate-600 group-hover:text-dark"
                      onClick={() => toggleFilter(service, selectedServices, setSelectedServices)}
                    >
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            </div>
            
            <div className="lg:hidden mt-6 flex gap-3">
               <button onClick={() => { setSelectedTypes([]); setSelectedServices([]); setPage(1); }} className="flex-1 py-3 bg-white text-dark border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50">Clear</button>
               <button onClick={() => setShowMobileFilters(false)} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">Apply Filters</button>
            </div>
          </div>

          {/* Listings */}
          <div className="flex-1 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            {paginatedClinics.length > 0 ? (
              <>
                {paginatedClinics.map((clinic) => (
                  <FacilityListCard 
                    key={clinic.id} 
                    {...clinic}
                    isFav={isFavorite(clinic.id, 'clinic')}
                    onToggleFav={(id) => toggleFavorite(id, 'clinic')}
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
                  <Building2 className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-1">No clinics found</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                  Try adjusting your search terms to find medical facilities.
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Search
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

export default Clinics;
