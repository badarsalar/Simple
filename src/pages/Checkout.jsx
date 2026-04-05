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
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, cartTotal, cartCount, checkout } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    instructions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 150;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required fields');
      return;
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
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-slate-300" />
            </div>
            <h1 className="text-2xl font-black text-slate-400 italic uppercase tracking-tighter mb-4">
              No items to <span className="text-slate-300 tracking-tighter italic">checkout</span>
            </h1>
            <p className="text-slate-500 font-medium mb-8">Your cart is empty. Add some medicines first.</p>
            <Link
              to="/pharmacies"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              Browse Medicines
            </Link>
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
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h1 className="text-3xl font-black text-dark italic uppercase tracking-tighter mb-4">
                Order <span className="text-emerald-500 tracking-tighter italic">Confirmed</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg mb-8">
                Your order has been placed successfully! You'll receive a confirmation SMS shortly.
              </p>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm mb-8">
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-bold text-dark mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Order ID:</span>
                        <span className="font-bold text-dark">#SC{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Amount:</span>
                        <span className="font-bold text-primary">Rs. {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Items:</span>
                        <span className="font-bold text-dark">{cartCount}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-4">Delivery Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Estimated Time:</span>
                        <span className="font-bold text-dark">2-3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span className="font-bold text-emerald-600">Processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/orders"
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Track Order
                </Link>
                <Link
                  to="/"
                  className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Continue Shopping
                </Link>
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

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-semibold">Back to Cart</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-dark italic uppercase tracking-tighter">
                  Secure <span className="text-primary tracking-tighter italic">Checkout</span>
                </h1>
                <p className="text-slate-400 font-bold italic text-sm mt-1">
                  Complete your order • Rs. {total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Delivery & Payment */}
            <div className="space-y-8">
              {/* Delivery Information */}
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-dark italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  Delivery <span className="text-primary tracking-tighter italic">Details</span>
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+92 XXX XXXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Delivery Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Enter your complete delivery address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    >
                      <option value="">Select your city</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                      <option value="Sargodha">Sargodha</option>
                      <option value="Jhang">Jhang</option>
                      <option value="Sheikhupura">Sheikhupura</option>
                      <option value="Gujrat">Gujrat</option>
                      <option value="Jhelum">Jhelum</option>
                      <option value="Sahiwal">Sahiwal</option>
                      <option value="Wah Cantonment">Wah Cantonment</option>
                      <option value="Kasur">Kasur</option>
                      <option value="Okara">Okara</option>
                      <option value="Chiniot">Chiniot</option>
                      <option value="Kamoke">Kamoke</option>
                      <option value="Hafizabad">Hafizabad</option>
                      <option value="Sadiqabad">Sadiqabad</option>
                      <option value="Burewala">Burewala</option>
                      <option value="Khanewal">Khanewal</option>
                      <option value="Muridke">Muridke</option>
                      <option value="Pakpattan">Pakpattan</option>
                      <option value="Gojra">Gojra</option>
                      <option value="Bahawalnagar">Bahawalnagar</option>
                      <option value="Abbottabad">Abbottabad</option>
                      <option value="Mardan">Mardan</option>
                      <option value="Mingora">Mingora</option>
                      <option value="Kohat">Kohat</option>
                      <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                      <option value="Turbat">Turbat</option>
                      <option value="Khuzdar">Khuzdar</option>
                      <option value="Chaman">Chaman</option>
                      <option value="Hub">Hub</option>
                      <option value="Jacobabad">Jacobabad</option>
                      <option value="Shikarpur">Shikarpur</option>
                      <option value="Larkana">Larkana</option>
                      <option value="Nawabshah">Nawabshah</option>
                      <option value="Naushahro Feroze">Naushahro Feroze</option>
                      <option value="Morro">Morro</option>
                      <option value="Khairpur">Khairpur</option>
                      <option value="Dadu">Dadu</option>
                      <option value="Mehar">Mehar</option>
                      <option value="Umerkot">Umerkot</option>
                      <option value="Tharparkar">Tharparkar</option>
                      <option value="Badin">Badin</option>
                      <option value="Thatta">Thatta</option>
                      <option value="Sujawal">Sujawal</option>
                      <option value="Jamshoro">Jamshoro</option>
                      <option value="Matiari">Matiari</option>
                      <option value="Tando Allahyar">Tando Allahyar</option>
                      <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Mirpur Khas">Mirpur Khas</option>
                      <option value="Sanghar">Sanghar</option>
                      <option value="Shahdadkot">Shahdadkot</option>
                      <option value="Kambar">Kambar</option>
                      <option value="Qambar Shahdadkot">Qambar Shahdadkot</option>
                      <option value="Nasirabad">Nasirabad</option>
                      <option value="Jaffarabad">Jaffarabad</option>
                      <option value="Jhal Magsi">Jhal Magsi</option>
                      <option value="Kachhi">Kachhi</option>
                      <option value="Sohbatpur">Sohbatpur</option>
                      <option value="Kalat">Kalat</option>
                      <option value="Mastung">Mastung</option>
                      <option value="Kharan">Kharan</option>
                      <option value="Washuk">Washuk</option>
                      <option value="Lehri">Lehri</option>
                      <option value="Sibi">Sibi</option>
                      <option value="Kohlu">Kohlu</option>
                      <option value="Dera Bugti">Dera Bugti</option>
                      <option value="Harnai">Harnai</option>
                      <option value="Ziarat">Ziarat</option>
                      <option value="Barkhan">Barkhan</option>
                      <option value="Musakhel">Musakhel</option>
                      <option value="Loralai">Loralai</option>
                      <option value="Duki">Duki</option>
                      <option value="Zhob">Zhob</option>
                      <option value="Sherani">Sherani</option>
                      <option value="Pishin">Pishin</option>
                      <option value="Qila Abdullah">Qila Abdullah</option>
                      <option value="Qila Saifullah">Qila Saifullah</option>
                      <option value="Chagai">Chagai</option>
                      <option value="Nushki">Nushki</option>
                      <option value="Gwadar">Gwadar</option>
                      <option value="Kech">Kech</option>
                      <option value="Panigur">Panigur</option>
                      <option value="Panjgur">Panjgur</option>
                      <option value="Awaran">Awaran</option>
                      <option value="Lasbela">Lasbela</option>
                      <option value="Kharan">Kharan</option>
                      <option value="Washuk">Washuk</option>
                      <option value="Lehri">Lehri</option>
                      <option value="Sibi">Sibi</option>
                      <option value="Kohlu">Kohlu</option>
                      <option value="Dera Bugti">Dera Bugti</option>
                      <option value="Harnai">Harnai</option>
                      <option value="Ziarat">Ziarat</option>
                      <option value="Barkhan">Barkhan</option>
                      <option value="Musakhel">Musakhel</option>
                      <option value="Loralai">Loralai</option>
                      <option value="Duki">Duki</option>
                      <option value="Zhob">Zhob</option>
                      <option value="Sherani">Sherani</option>
                      <option value="Pishin">Pishin</option>
                      <option value="Qila Abdullah">Qila Abdullah</option>
                      <option value="Qila Saifullah">Qila Saifullah</option>
                      <option value="Chagai">Chagai</option>
                      <option value="Nushki">Nushki</option>
                      <option value="Gwadar">Gwadar</option>
                      <option value="Kech">Kech</option>
                      <option value="Panigur">Panigur</option>
                      <option value="Panjgur">Panjgur</option>
                      <option value="Awaran">Awaran</option>
                      <option value="Lasbela">Lasbela</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Delivery Instructions (Optional)</label>
                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-dark italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Payment <span className="text-primary tracking-tighter italic">Method</span>
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <label className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <CreditCard className="w-6 h-6 text-slate-400" />
                        <div>
                          <div className="font-bold text-dark">Credit/Debit Card</div>
                          <div className="text-sm text-slate-500">Visa, Mastercard, UnionPay</div>
                        </div>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <Package className="w-6 h-6 text-slate-400" />
                        <div>
                          <div className="font-bold text-dark">Cash on Delivery</div>
                          <div className="text-sm text-slate-500">Pay when you receive your order</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-8">
              {/* Order Summary */}
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-24">
                <h3 className="text-xl font-black text-dark italic uppercase tracking-tighter mb-6">
                  Order <span className="text-primary tracking-tighter italic">Summary</span>
                </h3>

                {/* Cart Items Preview */}
                <div className="space-y-4 mb-6">
                  {cart.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-dark text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-500">{item.category} • Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-primary text-sm">
                        Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <p className="text-sm text-slate-500 text-center">
                      +{cart.length - 3} more items
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Subtotal ({cartCount} items)</span>
                    <span className="font-bold text-dark">Rs. {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 font-medium">Delivery Fee</span>
                    </div>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span className="font-bold text-dark">Rs. {deliveryFee.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Tax (5%)</span>
                    <span className="font-bold text-dark">Rs. {tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-dark">Total</span>
                    <span className="text-3xl font-black text-primary">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-bold text-dark text-sm">Estimated Delivery</div>
                      <div className="text-slate-600 text-xs">2-3 hours • Free delivery over Rs. 500</div>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-dark/20 hover:bg-primary hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Place Order • Rs. {total.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">100% Secure Checkout</span>
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