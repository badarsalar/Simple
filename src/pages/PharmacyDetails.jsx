import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Package, 
  Award, 
  CheckCircle2,
  Phone,
  Hospital,
  Store,
  ExternalLink,
  ArrowRight,
  Search,
  ShoppingBag,
  Plus,
  SlidersHorizontal
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSystem from '../components/Shared/ReviewSystem';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

const MedicineCard = ({ id, name, category, price, rating, reviews, image, onAdd }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-lg transition-all group flex flex-col text-left">
    <Link to={`/medicine/${id}`} className="relative mb-4 overflow-hidden rounded-lg block bg-slate-50 flex items-center justify-center p-4 h-32">
      <img src={image} alt={name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-dark shadow-sm border border-slate-100">
        {category}
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
      
      <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{category} • Rx Verified</p>
      
      <div className="flex items-baseline gap-2 pt-1">
        <span className="text-lg font-bold text-dark">Rs. {price}</span>
        <span className="text-[10px] font-semibold text-slate-400 line-through">Rs. {(parseFloat(price) * 1.2).toFixed(2)}</span>
      </div>
    </div>
    
    <div className="mt-auto">
      <button 
        onClick={() => onAdd({ id, name, category, price, image })}
        className="w-full py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-lg font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add to Cart
      </button>
    </div>
  </div>
);

const CategoryBadge = ({ name, onClick, isSelected }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-4 rounded-xl border hover:shadow-md transition-all group flex items-center justify-between cursor-pointer ${
      isSelected ? 'border-primary bg-primary/5' : 'border-slate-200'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors ${
        isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
      }`}>
        <Package className="w-5 h-5" />
      </div>
      <span className={`font-bold text-sm transition-colors ${
        isSelected ? 'text-primary' : 'text-dark group-hover:text-primary'
      }`}>{name}</span>
    </div>
    <ChevronRight className={`w-4 h-4 transition-all ${
      isSelected ? 'text-primary translate-x-1' : 'text-slate-300 group-hover:text-primary group-hover:translate-x-1'
    }`} />
  </div>
);

const PharmacyDetails = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, cartCount } = useCart();

  const pharmacy = {
    id: id || "1",
    name: "HealthFirst Global Pharmacy",
    address: "123 Medical Center Way, Manhattan, NY 10029",
    rating: "4.9",
    reviews: "2,100",
    openUntil: "11:00 PM",
    delivery: true,
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000",
    description: "HealthFirst Global is a licensed pharmacy providing a wide range of prescription and over-the-counter medications. We specialize in cold storage medicines and fast home delivery across Manhattan.",
    license: "NY-PHARM-882910",
    phone: "+1 (212) 555-0155",
    features: ['24/7 Support', 'Cold Storage', 'Consultation', 'Lab Tests'],
    categories: ['All', 'Prescription', 'OTC Meds', 'Vitamins & Supplements', 'Skin Care', 'Baby Care', 'First Aid']
  };

  const medicines = [
    { id: 1, name: 'Panadol Extra 500mg', category: 'Pain Relief', price: '12.50', rating: '4.8', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400' },
    { id: 2, name: 'Amoxicillin 500mg Capsule', category: 'Prescription', price: '24.00', rating: '4.9', reviews: '850', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400' },
    { id: 3, name: 'Vitamin C 1000mg Effervescent', category: 'Vitamins & Supplements', price: '15.20', rating: '4.7', reviews: '2.1k', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=400' },
    { id: 4, name: 'Cetaphil Hydrating Cream', category: 'Skin Care', price: '32.00', rating: '5.0', reviews: '430', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400' },
    { id: 5, name: 'Brufen 400mg', category: 'Pain Relief', price: '8.00', rating: '4.6', reviews: '930', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400' },
    { id: 6, name: 'Centrum MultiGummies', category: 'Vitamins & Supplements', price: '45.00', rating: '4.9', reviews: '1.5k', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=400' },
    { id: 7, name: 'Band-Aid Adhesive Bandages', category: 'First Aid', price: '5.50', rating: '4.8', reviews: '650', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400' },
    { id: 8, name: 'Johnson\'s Baby Lotion', category: 'Baby Care', price: '18.00', rating: '4.9', reviews: '1.1k', image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=400' },
  ];

  const filteredMedicines = medicines.filter(m => 
    (selectedCategory === 'All' || m.category === selectedCategory) &&
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="pt-20 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/pharmacies" className="hover:text-primary">Pharmacies</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark truncate">{pharmacy.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Area */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
               {/* Cover Image/Header */}
               <div className="h-48 sm:h-64 relative bg-slate-100 w-full overflow-hidden">
                 <img src={pharmacy.image} alt={pharmacy.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                   <div>
                     <span className="inline-block px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-2 shadow-sm flex items-center gap-1 w-max">
                       <Award className="w-3 h-3" /> Licensed Pharmacy
                     </span>
                     <h1 className="text-2xl sm:text-3xl font-bold text-white shadow-sm leading-tight">{pharmacy.name}</h1>
                   </div>
                   <div className="hidden sm:flex bg-white/20 backdrop-blur-md rounded-lg p-2 items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <div className="text-white">
                         <p className="text-sm font-bold leading-none">{pharmacy.rating}</p>
                         <p className="text-[9px] font-medium leading-none mt-1">{pharmacy.reviews} Reviews</p>
                      </div>
                   </div>
                 </div>
               </div>

               {/* Quick Info Bar */}
               <div className="bg-white px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-6">
                  <div className="flex items-start gap-2 text-slate-600">
                     <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                     <span className="text-sm font-medium">{pharmacy.address}</span>
                  </div>
                  {pharmacy.delivery && (
                    <div className="flex items-center gap-2 text-emerald-600">
                       <Truck className="w-4 h-4 text-emerald-500" />
                       <span className="text-sm font-bold">Home Delivery Available</span>
                    </div>
                  )}
               </div>

               <div className="p-6">
                  <h3 className="text-base font-bold text-dark mb-3">About the Store</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {pharmacy.description}
                  </p>
               </div>
            </div>

            {/* Search and Cart */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="px-4 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2 shrink-0"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">Cart {cartCount > 0 && `(${cartCount})`}</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-dark flex items-center gap-2">
                   <Store className="w-5 h-5 text-primary" /> Medicine Categories
                 </h3>
                 <div className="text-xs font-medium text-slate-500">
                   {filteredMedicines.length} products
                 </div>
               </div>
               
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {pharmacy.categories.map((cat, i) => (
                    <CategoryBadge 
                      key={i} 
                      name={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      isSelected={selectedCategory === cat}
                    />
                  ))}
               </div>
            </div>

            {/* Medicines Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark">Available Medicines</h3>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">{selectedCategory}</span>
                </div>
              </div>

              {filteredMedicines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedicines.map((medicine) => (
                    <MedicineCard key={medicine.id} {...medicine} onAdd={addToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>
                  <h4 className="text-base font-bold text-dark mb-2">No medicines found</h4>
                  <p className="text-sm text-slate-500 mb-4">Try searching for a different medicine or category.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Features Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-base font-bold text-dark mb-6">Store Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
                  {pharmacy.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
              </div>
            {/* Reviews Section */}
            <ReviewSystem providerId={id} />
          </div>
        </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 shrink-0">
             <div className="bg-white rounded-xl border border-slate-200 shadow-lg sticky top-24 p-6">
                
                <h3 className="text-base font-bold text-dark mb-6">Store Details</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Clock className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Open Status</p>
                         <p className="text-sm font-bold text-emerald-600">Open until {pharmacy.openUntil}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Phone Number</p>
                         <p className="text-sm font-bold text-dark">{pharmacy.phone}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">DEA License</p>
                         <p className="text-sm font-bold text-dark truncate">{pharmacy.license}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View Cart {cartCount > 0 && `(${cartCount})`}
                  </button>
                  <a href={`tel:${pharmacy.phone}`} className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      Call Pharmacy <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-start gap-3">
                   <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                     <Hospital className="w-5 h-5 text-slate-400" />
                   </div>
                   <p className="text-xs text-slate-500 font-medium">Located near NYU Langone Health Medical Center.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PharmacyDetails;
