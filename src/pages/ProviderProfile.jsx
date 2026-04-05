import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  Info,
  Calendar,
  Video,
  Building,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers, isFavorite, toggleFavorite } = useAuth();
  
  const registeredDoctor = providers.find(p => p.id === parseInt(id) || p.id === id);

  const doctorsData = {
    "1": { name: "Dr. Adam Cooper", specialty: "Oncologist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400", gender: 'male' },
    "2": { name: "Dr. Sarah Johnson", specialty: "Cardiologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400", gender: 'female' },
  };

  const doctor = registeredDoctor ? {
    id: registeredDoctor.id,
    name: registeredDoctor.name.startsWith('Dr.') ? registeredDoctor.name : `Dr. ${registeredDoctor.name}`,
    specialty: registeredDoctor.specialization || 'General Physician',
    image: registeredDoctor.avatar || (doctorsData["1"].image),
    fee: registeredDoctor.consultationFee || '2000',
    experience: registeredDoctor.experience || '5',
    rating: registeredDoctor.rating || '4.8',
    reviews: '124'
  } : {
    id: id,
    name: doctorsData[id]?.name || "Dr. Adam Cooper",
    specialty: doctorsData[id]?.specialty || "General Physician",
    image: doctorsData[id]?.image || doctorsData["1"].image,
    fee: '2000',
    experience: '12',
    rating: '4.9',
    reviews: '342'
  };

  const availability = [
    { day: 'Today', date: '14 Dec', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
    { day: 'Tomorrow', date: '15 Dec', slots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'] },
    { day: 'Mon', date: '16 Dec', slots: ['09:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'] },
  ];

  const handleBooking = () => {
    if (!selectedSlot) return;
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-20 lg:pb-0">
      <Navbar />

      <div className="pt-20 pb-12 max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/doctors" className="hover:text-primary">Doctors</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark">{doctor.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column: Doctor Details */}
          <div className="flex-1 space-y-6">
            
            {/* Header Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row gap-6">
              <div className="relative shrink-0">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover border border-slate-100"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full border-2 border-white p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-dark">{doctor.name}</h1>
                    <p className="text-sm font-semibold text-primary mt-1">{doctor.specialty}</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-bold text-dark">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {doctor.rating}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">{doctor.reviews} Reviews</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-slate-100 pt-6">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Experience</p>
                    <p className="text-sm font-bold text-dark">{doctor.experience} Years</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Patients</p>
                    <p className="text-sm font-bold text-dark">15k+</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Wait Time</p>
                    <p className="text-sm font-bold text-dark">Under 15 Min</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">PMC Verified</p>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-base font-bold text-dark mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> About Doctor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {doctor.name} is a highly accomplished {doctor.specialty} with over {doctor.experience} years of clinical experience. Specializing in diagnosing and treating complex medical conditions, providing compassionate and personalized care. Currently practicing at top-tier healthcare facilities and actively involved in advancing medical research.
              </p>
            </div>

            {/* Education & Experience */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
               <h3 className="text-base font-bold text-dark mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Qualifications & Experience
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-dark mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" /> Education
                  </h4>
                  <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-2 before:w-[1px] before:bg-slate-200 pl-6">
                    <li className="relative before:absolute before:top-2 before:-left-[1.05rem] before:w-2 before:h-2 before:bg-primary before:rounded-full">
                       <p className="text-sm font-bold text-dark">MBBS, FCPS ({doctor.specialty})</p>
                       <p className="text-xs text-slate-500 mt-0.5">Aga Khan University - 2010</p>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-sm font-bold text-dark mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" /> Practicing Clinics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-dark">City Central Clinic</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">123 Health Avenue, Medical District</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-dark flex items-center gap-1 justify-end">
                          Rs. {doctor.fee}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1">Fee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: CTA */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-dark rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group lg:sticky lg:top-28">
               <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-all duration-700">
                  <Calendar className="w-32 h-32" />
               </div>
               <div className="relative z-10 space-y-8">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic">Consultation starts at</p>
                     <p className="text-4xl font-black italic tracking-tighter">Rs. {doctor.fee}</p>
                  </div>
                  
                  <div className="space-y-4">
                     <h3 className="text-xl font-black italic uppercase tracking-tight leading-none">Instant <span className="text-primary italic">Booking</span></h3>
                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed italic">Directly schedule your visit via our simplified one-click system. No payment required.</p>
                  </div>

                  <Link 
                    to={`/book/${id}`}
                    className="w-full py-5 bg-primary text-white rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase italic tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-white hover:text-dark transition-all active:scale-95"
                  >
                     Book Appointment <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-3 text-white/30 justify-center">
                     <ShieldCheck className="w-4 h-4" />
                     <p className="text-[9px] font-black uppercase tracking-widest italic">PMC Verified Profile</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Button for Mobile replaced regular bottom nav */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[100]">
        <Link 
          to={`/book/${id}`}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center"
        >
          <Calendar className="w-6 h-6" />
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderProfile;
