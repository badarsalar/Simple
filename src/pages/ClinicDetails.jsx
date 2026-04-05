import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DoctorListCard from '../components/Shared/DoctorListCard';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Heart,
  Stethoscope,
  Microscope,
  Baby,
  Brain,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building,
  Mail,
  Award,
  Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DepartmentCard = ({ name, icon: Icon, doctors }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-all group flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors">{name}</h4>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{doctors} Specialists</p>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
  </div>
);

const ClinicDetails = () => {
  const { id } = useParams();
  const { providers } = useAuth();

  const registeredClinic = providers.find(p => p.id === parseInt(id) || p.id === id);

  const staticClinic = {
    id: id || "1",
    name: "City Dental Care & Diagnostics",
    address: "456 Broadway, Manhattan, NY 10013, United States",
    rating: "4.9",
    reviews: "1,240",
    type: "Multi-Specialty Clinic",
    image: "https://images.unsplash.com/photo-1629909608132-2d159bd4498a?q=80&w=1000",
    phone: "+1 (212) 555-0198",
    email: "contact@citydental.com",
    hours: "09:00 AM - 09:00 PM (Mon-Sat)",
    description: "City Dental Care provides comprehensive dental and diagnostic services. We use state-of-the-art technology to ensure precisely targeted treatments and a comfortable patient experience. Our team of highly qualified professionals is dedicated to offering personalized care tailored to the individual needs of each patient.",
    departments: [
      { name: 'Cardiology', icon: Heart, doctors: 12 },
      { name: 'Pediatrics', icon: Baby, doctors: 8 },
      { name: 'Mental Health', icon: Brain, doctors: 5 },
      { name: 'General Medicine', icon: Stethoscope, doctors: 15 },
      { name: 'Diagnostics', icon: Microscope, doctors: 10 }
    ],
    facilities: ['Parking', 'Pharmacy', 'Lab', 'Cafeteria', 'Emergency Room', 'Wheelchair Access'],
    accreditations: ['JCI Accredited Facility', 'ISO 9001 Certified', 'National Health Excellence Award'],
    insurance: ['Blue Cross', 'Aetna', 'Medicare', 'Cigna'],
    mapUrl: "https://maps.google.com"
  };

  const clinic = registeredClinic ? {
    ...staticClinic,
    id: registeredClinic.id,
    name: registeredClinic.facilityName || registeredClinic.name,
    address: registeredClinic.address || staticClinic.address,
    image: registeredClinic.avatar || staticClinic.image,
    type: registeredClinic.specialization || staticClinic.type,
    phone: registeredClinic.phone || staticClinic.phone,
    description: registeredClinic.bio || staticClinic.description
  } : staticClinic;

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      <div className="pt-20 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/clinics" className="hover:text-primary">Clinics & Hospitals</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark truncate">{clinic.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Details */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Cover Image/Header */}
              <div className="h-48 sm:h-64 relative bg-slate-100 w-full overflow-hidden">
                <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-2 shadow-sm">
                      {clinic.type}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white shadow-sm leading-tight">{clinic.name}</h1>
                  </div>
                  <div className="hidden sm:flex bg-white/20 backdrop-blur-md rounded-lg p-2 items-center gap-2">
                     <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                     <div className="text-white">
                        <p className="text-sm font-bold leading-none">{clinic.rating}</p>
                        <p className="text-[9px] font-medium leading-none mt-1">{clinic.reviews} Reviews</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="bg-white px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-6">
                 <div className="flex items-start gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{clinic.address}</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">PMC Verified Medical Facility</span>
                 </div>
              </div>

              {/* About Section */}
              <div className="p-6">
                <h3 className="text-base font-bold text-dark mb-3">About the Facility</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {clinic.description}
                </p>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-dark flex items-center gap-2">
                   <Building className="w-5 h-5 text-primary" /> Medical Departments
                 </h3>
                 <Link to="/doctors" className="text-xs font-bold text-primary hover:underline">View All Doctors</Link>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-4">
                  {clinic.departments.map((dept, i) => (
                    <DepartmentCard key={i} {...dept} />
                  ))}
               </div>
            </div>

            {/* Facilities & Amenities */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-base font-bold text-dark mb-6">Facilities & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
                  {clinic.facilities.map(f => (
                    <div key={f} className="flex items-center gap-2 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Accreditations & Insurance */}
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-base font-bold text-dark mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Accreditations
                  </h3>
                  <div className="space-y-3">
                     {clinic.accreditations.map(acc => (
                       <div key={acc} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-600">{acc}</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-base font-bold text-dark mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Insurance Accepted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                     {clinic.insurance.map(ins => (
                       <span key={ins} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-500">
                          {ins}
                       </span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Clinic Doctors */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-dark">Doctors at {clinic.name}</h3>
                 <Link to="/doctors" className="text-sm font-bold text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                 <DoctorListCard 
                    id="s1"
                    name="Dr. Sarah Johnson"
                    specialty="Cardiologist"
                    experience="15"
                    rating="4.9"
                    reviews="342"
                    fee="3,000"
                    image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400"
                 />
                 <DoctorListCard 
                    id="s2"
                    name="Dr. Adam Cooper"
                    specialty="Oncologist"
                    experience="12"
                    rating="4.8"
                    reviews="289"
                    fee="2,500"
                    image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"
                 />
                 <DoctorListCard 
                    id="s3"
                    name="Dr. Emma Wilson"
                    specialty="Dermatologist"
                    experience="8"
                    rating="4.9"
                    reviews="512"
                    fee="2,000"
                    image="https://images.unsplash.com/photo-1559839734-2b71f153678e?q=80&w=400"
                 />
              </div>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 shrink-0">
             <div className="bg-white rounded-xl border border-slate-200 shadow-lg sticky top-24 p-6">
                
                <h3 className="text-base font-bold text-dark mb-6">Contact & Booking</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Clock className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Opening Hours</p>
                         <p className="text-sm font-bold text-dark">{clinic.hours}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Phone Number</p>
                         <p className="text-sm font-bold text-dark">{clinic.phone}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <Mail className="w-5 h-5 text-primary shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email Us</p>
                         <p className="text-sm font-bold text-dark truncate">{clinic.email}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      Book Appointment <ArrowRight className="w-4 h-4" />
                  </button>
                  <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      Get Directions <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClinicDetails;
