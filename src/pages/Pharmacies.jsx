import React, { useState } from 'react';
import { Search, MapPin, Filter, SlidersHorizontal, Store, Check } from 'lucide-react';
import FacilityListCard from '../components/Shared/FacilityListCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Pagination from '../components/Shared/Pagination';

const Pharmacies = () => {
  const { providers, toggleFavorite, isFavorite } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const staticPharmacies = [
    { id: 1, name: 'Al-Shifa Pharmacy', address: 'F-8 Markaz, Islamabad, Pakistan', rating: '4.9', reviews: '2.1k', openUntil: '11:00 PM', delivery: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400' },
    { id: 2, name: 'MedPlus Pharmacy', address: 'Liberty Market, Lahore, Pakistan', rating: '4.8', reviews: '1.5k', openUntil: '12:00 AM', delivery: true, image: 'https://images.unsplash.com/photo-1631549916768-4119b295f786?q=80&w=400' },
    { id: 3, name: 'City Pharmacy Karachi', address: 'Saddar, Karachi, Pakistan', rating: '4.7', reviews: '950', openUntil: '10:00 PM', delivery: false, image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400' },
    { id: 4, name: 'AJK Medical Store', address: 'Muzaffarabad, AJK, Pakistan', rating: '5.0', reviews: '820', openUntil: '24 Hours', delivery: true, image: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=400' },
    { id: 5, name: 'Peshawar Pharmacy', address: 'Hayatabad, Peshawar, Pakistan', rating: '4.6', reviews: '1.2k', openUntil: '9:00 PM', delivery: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400' },
    { id: 6, name: 'Quetta Health Pharmacy', address: 'Jinnah Town, Quetta, Pakistan', rating: '4.8', reviews: '680', openUntil: '8:00 PM', delivery: false, image: 'https://images.unsplash.com/photo-1631549916768-4119b295f786?q=80&w=400' },
  ];

  const registeredPharmacies = providers
    .filter(p => p.role === 'pharmacy')
    .map(p => ({
      id: p.id,
      name: p.facilityName || p.name,
      address: p.address || 'Location Pending',
      rating: '5.0',
      reviews: '15',
      openUntil: '9:00 PM',
      delivery: true,
      image: p.avatar || '/images/facilities/pharmacy-placeholder.svg'
    }));

  const pharmacies = [...staticPharmacies, ...registeredPharmacies].map(p => ({
    ...p,
    subscription: providers.find(authP => authP.id === p.id)?.subscription || { type: 'Free' },
    distance: (Math.random() * 5 + 0.5).toFixed(1)
  }));

  const filteredPharmacies = pharmacies.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationQuery === '' || p.address.toLowerCase().includes(locationQuery.toLowerCase());
    
    // Functional feature matching
    const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.every(f => {
      if (f === 'Home Delivery') return p.delivery;
      if (f === 'Open 24 Hours') return p.openUntil === '24 Hours';
      return true;
    });

    return matchesSearch && matchesLocation && matchesFeatures;
  });

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedPharmacies.length / itemsPerPage);
  const paginatedPharmacies = sortedPharmacies.slice((page - 1) * itemsPerPage, page * itemsPerPage);
 
  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="bg-dark pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
             <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Find Trusted <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">Pharmacies</span></h1>
             <p className="text-white/60 text-sm font-medium">Locate 24/7 medical stores, check medicine availability, and get healthcare essentials delivered to your door.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-inset transition-all shadow-sm">
              <Store className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pharmacies or stores" 
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
            <h1 className="text-xl font-bold text-dark">Pharmacy & Medicine Stores</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">{filteredPharmacies.length} pharmacies near you</p>
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
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Features
              </h3>
              <div className="space-y-3">
                {['Home Delivery', 'Open 24 Hours', 'Prescription Required', 'Medical Supplies'].map(feature => (
                  <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFeatures.includes(feature) ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}
                      onClick={() => toggleFeature(feature)}
                    >
                      {selectedFeatures.includes(feature) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span 
                      className="text-xs font-medium text-slate-600 group-hover:text-dark"
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            </div>
            
            <div className="lg:hidden mt-6 flex gap-3">
               <button onClick={() => { setSelectedFeatures([]); setPage(1); }} className="flex-1 py-3 bg-white text-dark border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50">Clear</button>
               <button onClick={() => setShowMobileFilters(false)} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">Apply Filters</button>
            </div>
          </div>

          {/* Listings */}
          <div className="flex-1 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            {paginatedPharmacies.length > 0 ? (
              <>
                {paginatedPharmacies.map((pharmacy) => (
                  <FacilityListCard 
                    key={pharmacy.id} 
                    {...pharmacy}
                    type="Pharmacy"
                    services={['Home Delivery', pharmacy.delivery ? '24/7 Support' : 'Pickup Only']}
                    isFav={isFavorite(pharmacy.id, 'pharmacy')}
                    onToggleFav={(id) => toggleFavorite(id, 'pharmacy')}
                    isPharmacy={true}
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
                  <Store className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-1">No pharmacies found</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                  Try adjusting your search terms to find registered medical stores and pharmacies.
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

export default Pharmacies;
