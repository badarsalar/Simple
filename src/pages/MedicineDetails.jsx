import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Activity,
  Beaker,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MedicineDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // In a real app, this would be fetched based on ID
  const medicine = {
    id: id || "1",
    name: "Panadol Extra 500mg",
    category: "Pain Relief",
    price: "12.50",
    rating: "4.8",
    reviews: "1,240",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400",
    composition: "Paracetamol 500mg, Caffeine 65mg",
    packSize: "20 Tablets",
    manufacturer: "GSK Consumer Healthcare",
    description: "Panadol Extra with Optizorb Formulation provides fast and effective relief from pain including headache, migraine, sore throat, and muscle aches. It is also gentle on the stomach. Specifically formulated to provide 37% stronger pain relief than standard paracetamol.",
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    sideEffects: ["Nausea", "Dizziness", "Allergic reactions (rare)"],
    warnings: "Do not take with other paracetamol-containing products. Avoid alcohol while taking this medicine. Keep out of reach of children.",
    inStock: true,
    requiresPrescription: false
  };

  const handleAddToCart = () => {
    addToCart({ ...medicine, quantity });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      <div className="pt-20 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/medicines" className="hover:text-primary">Pharmacy</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark truncate">{medicine.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden h-[400px]">
               <img 
                 src={medicine.image} 
                 alt={medicine.name} 
                 className="w-full h-full object-contain mix-blend-multiply"
               />
               {!medicine.inStock && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                   <div className="bg-dark text-white px-6 py-2 rounded-lg font-bold">Out of Stock</div>
                 </div>
               )}
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-white rounded-lg border border-slate-200 p-2 cursor-pointer hover:border-primary transition-all flex items-center justify-center">
                    <img src={medicine.image} className="w-full h-full object-contain mix-blend-multiply" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
              
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-[10px] font-bold uppercase tracking-wider">{medicine.category}</span>
                  <span className="text-xs font-semibold text-slate-500">By {medicine.manufacturer}</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-dark leading-tight">{medicine.name}</h1>
                
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-dark text-xs">{medicine.rating}</span>
                      <span className="text-slate-500 font-semibold text-[10px]">({medicine.reviews} reviews)</span>
                   </div>
                   <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                     <ShieldCheck className="w-4 h-4" /> 100% Genuine Quality
                   </div>
                </div>
              </div>

              {/* Pricing & Add to Cart */}
              <div className="space-y-6 border-b border-slate-100 pb-6">
                 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">Rs. {medicine.price}</span>
                        <span className="text-sm font-semibold text-slate-400 line-through">Rs. {(parseFloat(medicine.price) * 1.3).toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-500 mt-1">Inclusive of all taxes</p>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                          <button 
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-slate-500 hover:text-primary shadow-sm transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold text-dark w-4 text-center">{quantity}</span>
                          <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-slate-500 hover:text-primary shadow-sm transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      disabled={!medicine.inStock}
                      onClick={handleAddToCart}
                      className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${medicine.inStock ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                      <ShoppingBag className="w-4 h-4" /> {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    {medicine.requiresPrescription && (
                      <button className="flex-1 py-3.5 bg-slate-50 border border-slate-200 text-dark rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4 text-primary" /> Upload Prescription
                      </button>
                    )}
                 </div>
              </div>

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-4 py-2">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                   <Beaker className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Composition</p>
                     <p className="text-sm font-bold text-dark">{medicine.composition}</p>
                   </div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                   <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pack Size</p>
                     <p className="text-sm font-bold text-dark">{medicine.packSize}</p>
                   </div>
                 </div>
              </div>

            </div>

            {/* Product Information Tabs section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 mt-6 space-y-8 shadow-sm">
               
               <div className="space-y-3">
                 <h3 className="text-lg font-bold text-dark">Product Information</h3>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">{medicine.description}</p>
               </div>

               <div className="space-y-3 border-t border-slate-100 pt-6">
                 <h3 className="text-base font-bold text-dark">Usage Directions</h3>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">{medicine.usage}</p>
               </div>

               <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-rose-700 mb-1">Safety Warnings & Precautions</h4>
                    <p className="text-xs text-rose-600 font-medium leading-relaxed">{medicine.warnings}</p>
                  </div>
               </div>

               {/* Delivery Info */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-4 border border-slate-100 rounded-lg">
                    <Truck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-dark">Express Delivery</h5>
                      <p className="text-[10px] font-semibold text-slate-500">Delivered within 2 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-slate-100 rounded-lg">
                    <RotateCcw className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-dark">Return Policy</h5>
                      <p className="text-[10px] font-semibold text-slate-500">7 Days return applicable</p>
                    </div>
                  </div>
               </div>
               
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MedicineDetails;
