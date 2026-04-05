import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Video, 
  Clock, 
  Calendar,
  CheckCircle2, 
  Star,
  ChevronRight,
  User,
  ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Consultation & Time, 2: Patient Details, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('online');
  
  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    notes: ''
  });

  const dates = generateDates();

  const selectedDateStr = dates[selectedDate]?.toISOString().split('T')[0];
  const dynamicSlots = ['10:30 AM', '11:15 AM', '02:30 PM', '04:45 PM', '06:30 PM', '09:15 PM'];
  
  const morningSlots = dynamicSlots.filter(s => s.includes('AM'));
  const afternoonSlots = dynamicSlots.filter(s => s.includes('PM') && parseInt(s.split(':')[0]) < 6 && parseInt(s.split(':')[0]) !== 12);
  const eveningSlots = dynamicSlots.filter(s => s.includes('PM') && (parseInt(s.split(':')[0]) >= 6 || parseInt(s.split(':')[0]) === 12));

  const handleNextStep = () => {
    if (step === 1 && selectedSlot) setStep(2);
    else if (step === 2 && patientData.name && patientData.phone) setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />
      
      <div className="pt-20 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* ... (breadcrumb and back button unchanged) ... */}
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/profile/${id}`} className="hover:text-primary">Doctor Profile</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-dark">Book Appointment</span>
        </div>

        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-all mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> {step > 1 ? 'Back to previous step' : 'Back to Profile'}
        </button>

        {/* Multi-step progress tracker */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
          
          {[1, 2, 3].map(item => (
            <div key={item} className={`flex flex-col items-center gap-2 ${step >= item ? 'text-primary' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all bg-white ${step >= item ? 'border-primary text-primary' : 'border-slate-300 text-slate-400'}`}>
                {step > item ? <CheckCircle2 className="w-5 h-5" /> : item}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                {item === 1 ? 'Schedule' : item === 2 ? 'Details' : 'Done'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header Info */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg overflow-hidden border border-slate-200 shrink-0">
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400" alt="Doctor" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
               <h1 className="text-xl sm:text-2xl font-bold text-dark">Dr. Saira Jabeen</h1>
               <p className="text-xs sm:text-sm font-semibold text-primary mt-1 mb-2">Oncologist</p>
               <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" /> 4.9 (1,240 Reviews)
               </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
                
                {/* Consultation Selection */}
                <div>
                  <h3 className="text-sm font-bold text-dark mb-4">Select Consultation Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setIsOnline(true)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${isOnline ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                      <div className={`p-2 rounded-lg ${isOnline ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isOnline ? 'text-primary' : 'text-dark'}`}>Video Consultation</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Online via our secure platform</p>
                        <p className={`text-sm font-bold mt-2 ${isOnline ? 'text-primary' : 'text-dark'}`}>Rs. 2,000</p>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setIsOnline(false)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${!isOnline ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                      <div className={`p-2 rounded-lg ${!isOnline ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${!isOnline ? 'text-primary' : 'text-dark'}`}>In-Clinic Visit</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Visit doctor at the clinic</p>
                        <p className={`text-sm font-bold mt-2 ${!isOnline ? 'text-primary' : 'text-dark'}`}>Rs. 2,500</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <h3 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Select Date
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                    {dates.map((date, idx) => {
                      const isSelected = selectedDate === idx;
                      const month = date.toLocaleString('default', { month: 'short' });
                      const day = date.getDate().toString().padStart(2, '0');
                      const dayName = date.toLocaleString('default', { weekday: 'short' });
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => { setSelectedDate(idx); setSelectedSlot(null); }}
                          className={`snap-start shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all ${
                            isSelected 
                              ? 'bg-primary border-primary text-white shadow-md' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{dayName}</span>
                          <span className="text-lg font-bold">{day}</span>
                          <span className={`text-[10px] font-medium ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                   <h3 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
                     <Clock className="w-4 h-4 text-primary" /> Select Time Slot
                   </h3>
                   
                   <div className="space-y-4">
                     {morningSlots.length > 0 && (
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Morning</p>
                         <div className="flex flex-wrap gap-2">
                           {morningSlots.map((slot, i) => (
                             <button
                               key={`m-${i}`}
                               onClick={() => setSelectedSlot(slot)}
                               className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${selectedSlot === slot ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                             >
                               {slot}
                             </button>
                           ))}
                         </div>
                       </div>
                     )}

                     {afternoonSlots.length > 0 && (
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Afternoon</p>
                         <div className="flex flex-wrap gap-2">
                           {afternoonSlots.map((slot, i) => (
                             <button
                               key={`a-${i}`}
                               onClick={() => setSelectedSlot(slot)}
                               className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${selectedSlot === slot ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                             >
                               {slot}
                             </button>
                           ))}
                         </div>
                       </div>
                     )}

                     {eveningSlots.length > 0 && (
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Evening</p>
                         <div className="flex flex-wrap gap-2">
                           {eveningSlots.map((slot, i) => (
                             <button
                               key={`e-${i}`}
                               onClick={() => setSelectedSlot(slot)}
                               className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${selectedSlot === slot ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                             >
                               {slot}
                             </button>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    disabled={!selectedSlot}
                    onClick={handleNextStep}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${selectedSlot ? 'bg-primary text-white shadow-md hover:bg-primary/90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                 <div>
                   <h3 className="text-lg font-bold text-dark mb-1">Patient Details</h3>
                   <p className="text-sm font-medium text-slate-500">Please provide the details of the patient.</p>
                 </div>

                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2">Patient Full Name *</label>
                      <input 
                        type="text" 
                        value={patientData.name}
                        onChange={e => setPatientData({...patientData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          value={patientData.phone}
                          onChange={e => setPatientData({...patientData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-2">Age</label>
                        <input 
                          type="number" 
                          value={patientData.age}
                          onChange={e => setPatientData({...patientData, age: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                          placeholder="e.g. 35"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2">Gender</label>
                      <div className="flex gap-3">
                        {['Male', 'Female', 'Other'].map(g => (
                          <button 
                            key={g}
                            onClick={() => setPatientData({...patientData, gender: g})}
                            className={`flex-1 py-3 rounded-lg border text-sm font-bold transition-all ${patientData.gender === g ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2">Reason for Visit / Symptoms</label>
                      <textarea 
                        value={patientData.notes}
                        onChange={e => setPatientData({...patientData, notes: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 text-sm font-medium resize-none h-24"
                        placeholder="Briefly describe your symptoms..."
                      ></textarea>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!patientData.name || !patientData.phone}
                    onClick={handleNextStep}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${patientData.name && patientData.phone ? 'bg-primary text-white shadow-md hover:bg-primary/90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    Review Booking
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
               <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-8">
                     
                     <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-dark">Appointment Summary</h3>
                          <p className="text-xs font-medium text-slate-500">Last step before confirmation</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date & Time</p>
                           <p className="text-sm font-bold text-dark">{dates[selectedDate].toDateString()}</p>
                           <p className="text-sm font-semibold text-primary">{selectedSlot}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Consultation Type</p>
                           <div className="flex items-center gap-2 mt-1">
                              {isOnline ? <Video className="w-4 h-4 text-primary" /> : <MapPin className="w-4 h-4 text-emerald-500" />}
                              <p className="text-sm font-bold text-dark">{isOnline ? 'Online Video' : 'In-Clinic'}</p>
                           </div>
                        </div>
                     </div>

                     {/* Payment Selection */}
                     <div className="space-y-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Payment Method</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           <button 
                             onClick={() => setPaymentMethod('online')}
                             className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${paymentMethod === 'online' ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                           >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentMethod === 'online' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                                 <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className={`text-[10px] font-black uppercase italic ${paymentMethod === 'online' ? 'text-primary' : 'text-dark'}`}>Secure Online</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pay Now (10% Off)</p>
                              </div>
                           </button>

                           <button 
                             onClick={() => setPaymentMethod('clinic')}
                             className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${paymentMethod === 'clinic' ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                           >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentMethod === 'clinic' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                                 <Clock className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className={`text-[10px] font-black uppercase italic ${paymentMethod === 'clinic' ? 'text-primary' : 'text-dark'}`}>Pay at Clinic</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pay during visit</p>
                              </div>
                           </button>
                        </div>
                     </div>

                     <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                        <span className="text-sm font-bold text-slate-600 italic">Total Consultation Fee</span>
                        <span className="text-xl font-black text-primary italic">Rs. {isOnline ? '2,000' : '2,500'}</span>
                     </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Edit Details
                    </button>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="px-10 py-3 rounded-xl font-black text-xs uppercase italic tracking-widest bg-dark text-white shadow-xl shadow-dark/20 hover:scale-105 transition-all flex items-center gap-3"
                    >
                      <ShieldCheck className="w-4 h-4" /> Confirm & Pay
                    </button>
                  </div>
               </div>
            )}
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointment;
