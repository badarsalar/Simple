import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  User,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  Lock,
  Mail,
  ChevronRight,
  Building,
  Info,
  Calendar,
  CreditCard as CardIcon
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, cartTotal, cartCount, checkout } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    altPhone: '',
    street: '',
    houseNum: '',
    area: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    // Basic formatting for card number
    if (name === 'number') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'expiry') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').substring(0, 5);
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').substring(0, 4);
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 150;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.phone || !formData.street || !formData.city) {
        alert('Please fill in all required shipping fields');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        alert('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      if (checkout()) {
        setOrderPlaced(true);
      }
      setIsProcessing(false);
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-20 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <Package className="w-10 h-10 text-slate-200" />
              </div>
              <h1 className="text-3xl font-black text-dark italic uppercase tracking-tighter mb-4">
                Nothing to <span className="text-slate-300 tracking-tighter italic">Checkout</span>
              </h1>
              <p className="text-slate-400 font-bold italic mb-10 max-w-sm mx-auto uppercase tracking-widest text-xs">
                Your basket is currently empty.
              </p>
              <Link
                to="/pharmacies"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-dark transition-all shadow-xl shadow-primary/20"
              >
                Browse Medicines <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
              <div className="p-10 md:p-16 text-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-dark italic uppercase tracking-tighter mb-4">
                  Order <span className="text-emerald-500 tracking-tighter italic">Confirmed</span>
                </h1>
                <p className="text-slate-500 font-bold italic uppercase tracking-widest text-sm mb-12">
                  Transaction #SC{Math.random().toString(36).substr(2, 8).toUpperCase()} • Success
                </p>

                <div className="grid md:grid-cols-2 gap-10 text-left mb-16">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-3">Delivery Summary</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest px-0">Recipient</p>
                        <p className="font-bold text-dark">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Address</p>
                        <p className="font-bold text-dark leading-tight">{formData.houseNum}, {formData.street}</p>
                        <p className="font-bold text-dark uppercase">{formData.area}, {formData.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-3">Order Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount Paid</span>
                        <span className="font-black text-dark italic">Rs. {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimated Arrival</span>
                        <span className="font-black text-emerald-500 italic uppercase">2-3 Hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</span>
                        <span className="font-black text-primary italic uppercase tracking-widest text-[10px] bg-primary/10 px-2 py-0.5 rounded">Processing</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/orders"
                    className="group px-10 py-5 bg-dark text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-primary transition-all shadow-xl shadow-dark/20 flex items-center justify-center gap-3"
                  >
                    Track Shipment <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                  <Link
                    to="/"
                    className="px-10 py-5 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                  >
                    Return Home <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Pharmacy Order • 100% Quality Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Steps */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-dark italic uppercase tracking-tighter">
                  Checkout <span className="text-primary tracking-tighter italic">Process</span>
                </h1>
              </div>
              <p className="text-slate-500 font-medium ml-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" />
                Secure 256-bit SSL Encrypted Transaction
              </p>
            </div>

            {/* Stepper UI */}
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentStep === 1 ? 'bg-dark text-white shadow-lg shadow-dark/20' : 'text-slate-400'
              }`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border text-[10px] font-black ${
                  currentStep === 1 ? 'border-white/30' : 'border-slate-200'
                }`}>1</div>
                <span className="text-[10px] font-black uppercase tracking-widest italic">Shipping</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-200" />
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentStep === 2 ? 'bg-dark text-white shadow-lg shadow-dark/20' : 'text-slate-400'
              }`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border text-[10px] font-black ${
                  currentStep === 2 ? 'border-white/30' : 'border-slate-200'
                }`}>2</div>
                <span className="text-[10px] font-black uppercase tracking-widest italic">Payment</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
            {/* Left Column - Delivery & Payment */}
            <div className="lg:col-span-8 space-y-8">
              {currentStep === 1 ? (
                <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-dark italic uppercase tracking-tighter flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-primary" />
                      Shipping <span className="text-primary tracking-tighter italic">Information</span>
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">Step 1 of 2</span>
                  </div>

                  <div className="space-y-8">
                    {/* Contact Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Primary Contact</h4>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                              placeholder="e.g. John Doe"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Phone Number *</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                              placeholder="+92 3XX XXXXXXX"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Secondary Info</h4>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Alt. Phone (Optional)</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input
                              type="tel"
                              name="altPhone"
                              value={formData.altPhone}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                              placeholder="Secondary number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-6 pt-4 border-t border-slate-50">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Delivery Address</h4>
                      
                      <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-8">
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Street Address *</label>
                          <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                            placeholder="Street name / Number"
                            required
                          />
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">House / Apt #</label>
                          <input
                            type="text"
                            name="houseNum"
                            value={formData.houseNum}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                            placeholder="Flat 4B"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Area / Landmark *</label>
                          <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                            placeholder="e.g. Near Market"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">City *</label>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic appearance-none"
                            required
                          >
                            <option value="">Select City</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Zip Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                            placeholder="54000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Delivery Instructions (Optional)</label>
                        <textarea
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic resize-none"
                          placeholder="Gate code, landmark, etc."
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full py-5 bg-dark text-white rounded-2xl font-black text-lg shadow-2xl shadow-dark/20 hover:bg-primary transition-all flex items-center justify-center gap-3 italic uppercase tracking-tighter"
                    >
                      Continue to Payment <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-dark italic uppercase tracking-tighter flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-primary" />
                      Payment <span className="text-primary tracking-tighter italic">Method</span>
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">Step 2 of 2</span>
                  </div>

                  <div className="space-y-10">
                    {/* Method Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center gap-4 p-6 border-2 rounded-[2rem] transition-all text-left ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-dark uppercase tracking-tighter text-sm italic">Online Card</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visa / Mastercard</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex items-center gap-4 p-6 border-2 rounded-[2rem] transition-all text-left ${
                          paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'bg-dark text-white' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-dark uppercase tracking-tighter text-sm italic">Cash on Delivery</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pay at doorstep</p>
                        </div>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        {/* Interactive Card Mockup */}
                        <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] bg-gradient-to-br from-dark to-slate-800 rounded-[2rem] p-8 text-white shadow-2xl shadow-dark/30 overflow-hidden group">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -ml-24 -mb-24" />
                          
                          <div className="relative h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full opacity-20 bg-[radial-gradient(circle,black_50%,transparent_50%)] bg-[length:4px_4px]" />
                              </div>
                              <CardIcon className="w-10 h-10 text-white/50" />
                            </div>

                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Card Number</p>
                              <p className="text-2xl font-black tracking-[0.15em] italic font-mono min-h-[1.5rem]">
                                {cardData.number || '•••• •••• •••• ••••'}
                              </p>
                            </div>

                            <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Card Holder</p>
                                <p className="text-sm font-black uppercase tracking-widest italic truncate max-w-[180px]">
                                  {cardData.name || 'Your Name'}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Expires</p>
                                <p className="text-sm font-black italic tracking-widest">{cardData.expiry || 'MM/YY'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Inputs */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Card Number *</label>
                            <input
                              type="text"
                              name="number"
                              value={cardData.number}
                              onChange={handleCardChange}
                              className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic font-mono"
                              placeholder="0000 0000 0000 0000"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Cardholder Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={cardData.name}
                              onChange={handleCardChange}
                              className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic uppercase"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">Expiry Date *</label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input
                                type="text"
                                name="expiry"
                                value={cardData.expiry}
                                onChange={handleCardChange}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-dark uppercase tracking-widest mb-2 ml-1">CVV *</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input
                                type="password"
                                name="cvv"
                                value={cardData.cvv}
                                onChange={handleCardChange}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-sm italic"
                                placeholder="***"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 border-dashed animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                            <Info className="w-5 h-5 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-black text-dark uppercase tracking-tighter italic text-sm">Cash on Delivery Information</p>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              Please keep the exact amount ready of <span className="font-bold text-dark font-mono">Rs. {total.toFixed(2)}</span>. 
                              Our delivery partner will verify the order before handing over the medicines.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-5 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-dark transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-5 bg-dark text-white rounded-2xl font-black text-lg shadow-2xl shadow-dark/20 hover:bg-primary transition-all flex items-center justify-center gap-3 italic uppercase tracking-tighter disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-6 h-6" />
                            Confirm Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 pb-4">
                  <h3 className="text-2xl font-black text-dark italic uppercase tracking-tighter mb-8">
                    Your <span className="text-primary tracking-tighter italic">Basket</span>
                  </h3>

                  {/* Cart Items Preview */}
                  <div className="space-y-5 mb-8">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 p-1 shrink-0 group-hover:scale-105 transition-transform">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-dark text-xs truncate uppercase tracking-tighter italic line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-black text-dark italic text-sm shrink-0">
                          Rs. {(parseFloat(item.price) * item.quantity).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-6 border-t-2 border-dashed border-slate-50 mb-8">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-black uppercase tracking-widest">Subtotal</span>
                      <span className="font-black text-dark italic">Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-black uppercase tracking-widest">Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-500 font-black italic uppercase tracking-widest text-[10px]">FREE</span>
                      ) : (
                        <span className="font-black text-dark italic">Rs. {deliveryFee.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-black uppercase tracking-widest">Estimated GST</span>
                      <span className="font-black text-dark italic">Rs. {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Total Checkout</span>
                    <div className="text-4xl font-black text-dark italic tracking-tighter mt-1">
                      Rs. <span className="text-primary">{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 mb-6 border border-slate-100">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-black text-dark uppercase tracking-widest italic">Fast Track Delivery</p>
                      <p className="text-[10px] font-bold text-slate-500">Arriving in <span className="text-dark underline decoration-primary/30 decoration-2">2-3 Hours</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500 p-6 flex flex-col items-center gap-2 border-t border-emerald-600">
                  <div className="flex items-center gap-2 text-white">
                    <ShieldCheck className="w-4 h-4 opacity-80" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Full Quality Control Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;