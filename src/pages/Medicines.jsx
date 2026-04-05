import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Plus, 
  Star, 
  ChevronDown, 
  SlidersHorizontal,
  Package,
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const MedicineCard = ({ id, name, category, price, rating, reviews, image, onAdd }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-lg transition-all group flex flex-col text-left">
    <Link to={`/medicine/${id}`} className="relative mb-4 overflow-hidden rounded-lg block bg-slate-50 flex items-center justify-center p-4 h-48">
      <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-dark shadow-sm border border-slate-100">
        {category}
      </div>
      <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
        Rx Verified
      </div>
    </Link>

    <div className="flex-1 space-y-2 mb-4">
      <div className="flex justify-between items-start gap-2">
        <Link to={`/medicine/${id}`} className="block group/title flex-1">
          <h3 className="text-sm font-bold text-dark group-hover/title:text-primary transition-colors leading-snug line-clamp-2">{name}</h3>
        </Link>
        <div className="flex items-center gap-1 text-[10px] font-bold text-dark bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 shrink-0">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {rating}
        </div>
      </div>

      <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{category} • {reviews} reviews</p>

      <div className="flex items-baseline gap-2 pt-1">
        <span className="text-lg font-bold text-dark">Rs. {price}</span>
        <span className="text-[10px] font-semibold text-slate-400 line-through">Rs. {(parseFloat(price) * 1.2).toFixed(2)}</span>
        <span className="text-[10px] font-bold text-emerald-600">Save 17%</span>
      </div>
    </div>

    <div className="mt-auto">
      <button
        onClick={() => onAdd({ id, name, category, price, image })}
        className="w-full py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-lg font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
      >
        <Plus className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> Add to Cart
      </button>
    </div>
  </div>
);

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addToCart, cartCount } = useCart();

  const categories = ['All Categories', 'Pain Relief', 'Antibiotics', 'Vitamins & Supplements', 'Skin Care', 'Baby Care', 'First Aid', 'Diabetes Care'];
  
  const medicines = [
    { id: 1, name: 'Panadol Extra 500mg', category: 'Pain Relief', price: '12.50', rating: '4.8', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400' },
    { id: 2, name: 'Amoxicillin 500mg Capsule', category: 'Antibiotics', price: '24.00', rating: '4.9', reviews: '850', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400' },
    { id: 3, name: 'Vitamin C 1000mg Effervescent', category: 'Vitamins & Supplements', price: '15.20', rating: '4.7', reviews: '2.1k', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=400' },
    { id: 4, name: 'Cetaphil Hydrating Cream', category: 'Skin Care', price: '32.00', rating: '5.0', reviews: '430', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400' },
    { id: 5, name: 'Brufen 400mg', category: 'Pain Relief', price: '8.00', rating: '4.6', reviews: '930', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400' },
    { id: 6, name: 'Centrum MultiGummies', category: 'Vitamins & Supplements', price: '45.00', rating: '4.9', reviews: '1.5k', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=400' },
  ];

  const filteredMedicines = medicines.filter(m => 
    (selectedCategory === 'All Categories' || m.category === selectedCategory) &&
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    return 0;
  });

  const paginatedMedicines = sortedMedicines.slice(0, page * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Premium Hero Banner */}
      <div className="bg-dark pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-amber-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 text-center md:text-left">
            <div className="space-y-4 max-w-xl">
               <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Order <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-primary">Medicines Online</span></h1>
               <p className="text-white/60 text-sm font-medium">Get genuine medicines delivered to your doorstep in minutes. Fastest delivery guaranteed.</p>
               <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-white/80">
                 <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Genuine</span>
                 <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-primary" /> Fastest Delivery</span>
               </div>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="px-8 py-4 bg-white text-dark rounded-2xl text-sm font-bold hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-2xl shadow-white/10"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-sm border border-white">
                     {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">View Cart {cartCount > 0 && `(${cartCount})`}</span>
              <span className="sm:hidden">Cart {cartCount > 0 && `(${cartCount})`}</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative max-w-4xl bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
            <input 
              type="text"
              placeholder="Search for medicines, health products, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl focus:ring-2 focus:ring-primary/50 text-dark font-bold text-sm transition-all shadow-sm border-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300" onClick={() => setShowMobileFilters(false)} />
          )}

          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 w-[280px] bg-slate-50 z-[110] p-6 shadow-2xl transition-transform duration-300 lg:relative lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:z-0 lg:translate-x-0 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto lg:overflow-visible flex flex-col`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-200 rounded-full text-slate-500 font-bold">X</button>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
              <h3 className="text-sm font-bold text-dark flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Categories
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowMobileFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${selectedCategory === cat ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-dark'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Promo Upload Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-center shadow-lg lg:mt-0 mt-auto">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Have a Prescription?</h4>
              <p className="text-[10px] text-slate-300 font-medium mb-4">Upload it here and our pharmacist will build your cart.</p>
              <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Upload Now
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-dark">{selectedCategory}</h2>
              <div className="flex items-center gap-3">
                <button 
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-dark"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
                  <span className="text-xs font-medium text-slate-500">Sort By:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold text-dark bg-transparent border-none focus:ring-0 p-0 cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {paginatedMedicines.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} {...medicine} onAdd={addToCart} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="text-base font-bold text-dark mb-1">No products found</h3>
                <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                  We couldn't find any products matching your search. Try different keywords.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
                  className="mt-6 px-6 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {sortedMedicines.length > paginatedMedicines.length && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setPage(prev => prev + 1)}
                  className="px-8 py-2.5 bg-white border border-slate-200 text-dark rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  Load More Products
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

export default Medicines;
