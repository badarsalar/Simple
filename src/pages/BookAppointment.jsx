import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  CheckCircle2, 
  Star,
  ChevronRight,
  ShieldCheck,
  Video,
  MapPin,
  Stethoscope,
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDashboard } from '../context/DashboardContext';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAppointment } = useDashboard();
  
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [consultType, setConsultType] = useState('Video');
  const [isBooking, setIsBooking] = useState(false);

  // Mock Data - In real app, fetch based on ID
  const doctor = {
    id: id,
    name: "Dr. Saira Jabeen",
    specialty: "Oncologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
    rating: "4.9",
    reviews: "1,240",
    fee: "2,000",
    availability: "Mon, Wed, Fri",
    timing: "09:00 AM - 05:00 PM"
  };

  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

  const slots = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '05:00 PM'];

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    setIsBooking(true);
    
    // Direct Booking Logic
    const newAppt = {
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: dates[selectedDate].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: selectedSlot,
      type: consultType,
      image: doctor.image
    };

    setTimeout(() => {
      addAppointment(newAppt);
      navigate('/dashboard/appointments');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] selection:bg-primary/10">
      <Navbar />
      
      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Info & Selection */}
          <div className="flex-1 space-y-6 w-full">
            <Link to={`/profile/${id}`} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Profile
            </Link>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-10 shadow-sm">
               <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                  <img src={doctor.image} className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] object-cover shadow-xl border-4 border-slate-50" alt="" />
                  <div className="space-y-4">
                     <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-dark italic uppercase tracking-tight leading-none">{doctor.name}</h1>
                        <p className="text-sm font-bold text-primary italic mt-2">{doctor.specialty}</p>
                     </div>
                     <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                           <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                           <span className="text-[10px] font-black text-dark tracking-tight">{doctor.rating}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{doctor.reviews} Reviews</span>
                     </div>
                  </div>
               </div>

               <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <Calendar className="w-12 h-12 text-dark" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Doctor Availability</p>
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-dark italic">{doctor.availability}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">{doctor.timing}</p>
                     </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <Clock className="w-12 h-12 text-dark" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Wait Time</p>
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-dark italic">Average 15-20 Min</p>
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Verified Real-time</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Selection Area */}
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-10 shadow-sm space-y-10">
               <div>
                  <h3 className="text-sm font-black text-dark uppercase tracking-widest italic mb-6 flex items-center gap-3">
                     <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Calendar className="w-4 h-4" />
                     </div>
                     1. Select Appointment Date
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
                     {dates.map((date, idx) => (
                        <button
                           key={idx}
                           onClick={() => setSelectedDate(idx)}
                           className={`snap-start shrink-0 w-20 py-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-2 ${selectedDate === idx ? 'bg-dark border-dark text-white shadow-xl scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                        >
                           <span className="text-[9px] font-black uppercase italic tracking-tighter">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                           <span className="text-xl font-black italic leading-none">{date.getDate()}</span>
                           <span className="text-[9px] font-black uppercase italic tracking-tighter">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-black text-dark uppercase tracking-widest italic mb-6 flex items-center gap-3">
                     <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Clock className="w-4 h-4" />
                     </div>
                     2. Choose Available Time
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {slots.map((slot, idx) => (
                        <button
                           key={idx}
                           onClick={() => setSelectedSlot(slot)}
                           className={`py-4 rounded-2xl border-2 transition-all text-xs font-black uppercase italic ${selectedSlot === slot ? 'bg-primary/10 border-primary text-primary shadow-inner' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'}`}
                        >
                           {slot}
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-black text-dark uppercase tracking-widest italic mb-6 flex items-center gap-3">
                     <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Stethoscope className="w-4 h-4" />
                     </div>
                     3. Consultation Mode
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <button 
                        onClick={() => setConsultType('Video')}
                        className={`p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-4 ${consultType === 'Video' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                     >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${consultType === 'Video' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                           <Video className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-dark uppercase tracking-widest italic">Video Consult</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Secure Virtual Visit</p>
                        </div>
                     </button>
                     <button 
                        onClick={() => setConsultType('In-Clinic')}
                        className={`p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-4 ${consultType === 'In-Clinic' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                     >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${consultType === 'In-Clinic' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-dark uppercase tracking-widest italic">In-Person</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Clinic Appointment</p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Summary & Action */}
          <div className="lg:w-96 w-full shrink-0 lg:sticky lg:top-28">
             <div className="bg-dark rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform">
                   <ShieldCheck className="w-24 h-24" />
                </div>
                
                <h3 className="text-xl font-black italic uppercase tracking-tight mb-8">Booking <span className="text-primary italic">Summary</span></h3>
                
                <div className="space-y-8 relative z-10">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                         <span>Date</span>
                         <span className="text-white text-right">{dates[selectedDate].toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                         <span>Time Slot</span>
                         <span className="text-white text-right">{selectedSlot || '--:--'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                         <span>Consultation</span>
                         <span className="text-white text-right">{consultType} Visit</span>
                      </div>
                   </div>

                   <div className="h-px bg-white/10 w-full"></div>

                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Total Fee</p>
                         <p className="text-2xl font-black italic tracking-tighter leading-none">Rs. {doctor.fee}</p>
                      </div>
                      <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1 italic">Direct Pay at Clinic</p>
                   </div>

                   <button 
                      disabled={!selectedSlot || isBooking}
                      onClick={handleConfirmBooking}
                      className={`w-full py-5 rounded-[2.5rem] font-black text-xs uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${!selectedSlot || isBooking ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-primary text-white hover:bg-white hover:text-dark hover:shadow-2xl shadow-primary/40'}`}
                   >
                      {isBooking ? (
                        <>Processing...</>
                      ) : (
                        <>Confirm & Book Now <ChevronRight className="w-4 h-4" /></>
                      )}
                   </button>

                   <div className="flex items-center gap-3 justify-center text-white/30">
                      <ShieldCheck className="w-4 h-4" />
                      <p className="text-[9px] font-bold uppercase tracking-widest italic">Secured HIPAA Compliant Booking</p>
                   </div>
                </div>
             </div>

             <div className="mt-6 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center gap-4 bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                   <Info className="w-6 h-6" />
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed italic">
                   Note: Appointment is directly placed. No online payment required. Pay at the clinic during your visit.
                </p>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointment;
