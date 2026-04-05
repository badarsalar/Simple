import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CategoryBadge = ({ name }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all group flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
        <Package className="w-5 h-5" />
      </div>
      <span className="font-bold text-dark text-sm group-hover:text-primary transition-colors">{name}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
  </div>
);

const PharmacyDetails = () => {
  const { id } = useParams();

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
    categories: ['Prescription', 'OTC Meds', 'Vitamins', 'Skin Care', 'Baby Care', 'First Aid']
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

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

            {/* Categories */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-dark flex items-center gap-2">
                   <Store className="w-5 h-5 text-primary" /> Inventory Categories
                 </h3>
                 <Link to="/medicines" className="text-xs font-bold text-primary hover:underline">View Meds Catalog</Link>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-4">
                  {pharmacy.categories.map((cat, i) => (
                    <CategoryBadge key={i} name={cat} />
                  ))}
               </div>
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
                  <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      Order Online <ArrowRight className="w-4 h-4" />
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
