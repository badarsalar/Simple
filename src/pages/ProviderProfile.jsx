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
  
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [consultationType, setConsultationType] = useState('video');
  const [showConfirmation, setShowConfirmation] = useState(false);

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
                       <p className="text-xs text-slate-500 mt-0.5 mt-0.5">Aga Khan University - 2010</p>
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

          {/* Right Column: Booking Widget */}
          <div className="lg:w-96 shrink-0" id="booking-widget">
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg lg:sticky lg:top-24">
              
              {/* Widget Header */}
              <div className="p-6 border-b border-slate-100 text-center bg-slate-50 rounded-t-xl">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Consultation Fee</p>
                <h2 className="text-3xl font-bold text-primary">Rs. {doctor.fee}</h2>
              </div>

              {/* Booking Body */}
              <div className="p-6">
                
                {/* Consultation Type */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setConsultationType('video')}
                      className={`flex-1 py-3 px-2 rounded-lg border flex flex-col items-center gap-2 transition-all ${consultationType === 'video' ? 'bg-primary/5 border-primary text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Video className="w-5 h-5" />
                      <span className="text-xs font-bold">Video Consult</span>
                    </button>
                    <button 
                      onClick={() => setConsultationType('clinic')}
                      className={`flex-1 py-3 px-2 rounded-lg border flex flex-col items-center gap-2 transition-all ${consultationType === 'clinic' ? 'bg-primary/5 border-primary text-primary' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      <Building className="w-5 h-5" />
                      <span className="text-xs font-bold">In-Clinic</span>
                    </button>
                  </div>
                </div>

                {/* Day Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-dark flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Select Day
                    </h3>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {availability.map((day, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedDate(idx); setSelectedSlot(null); }}
                        className={`flex-1 shrink-0 py-2.5 px-3 rounded-lg border text-center transition-all ${selectedDate === idx ? 'bg-dark text-white border-dark transform scale-105' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        <p className="text-xs font-semibold">{day.day}</p>
                        <p className={`text-[10px] font-bold ${selectedDate === idx ? 'text-white/80' : 'text-slate-400'}`}>{day.date}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slot Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-dark flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary" /> Select Time
                  </h3>
                  {availability[selectedDate].slots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availability[selectedDate].slots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-lg border text-xs font-bold transition-all ${selectedSlot === slot ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-slate-500 text-center py-4">No slots available for this day.</p>
                  )}
                </div>

                {/* Action */}
                <button
                  disabled={!selectedSlot}
                  onClick={handleBooking}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${selectedSlot ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] font-semibold text-slate-400 mt-3">Book now, pay later at clinic (Cash/Card)</p>

              </div>
            </div>
          </div>

        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-dark mb-2">Booking Confirmed!</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Your appointment with {doctor.name} has been placed.</p>
              
              <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100 mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-slate-500">Date & Time</span>
                  <span className="text-xs font-bold text-dark">{availability[selectedDate].date}, {selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-slate-500">Type</span>
                  <span className="text-xs font-bold text-dark capitalize">{consultationType} Installment</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 mt-2 pt-2">
                  <span className="text-xs font-bold text-slate-500">Total Fee</span>
                  <span className="text-sm font-bold text-primary">Rs. {doctor.fee}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/orders')}
                  className="w-full py-3 bg-dark text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                  View My Orders
                </button>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex items-center justify-between z-[90] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Consultation Fee</p>
          <p className="text-xl font-bold text-primary">Rs. {doctor.fee}</p>
        </div>
        <button 
          onClick={() => document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-transform active:scale-95"
        >
          Book Appointment
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderProfile;
