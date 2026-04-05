import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  Heart,
  Package,
  Truck,
  Clock,
  ArrowLeft,
  MapPin,
  Tag,
  ChevronRight,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, cartCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    if (newQuantity > 99) return; // Max quantity limit
    updateQuantity(id, newQuantity);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'HEALTHY20') {
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code');
    }
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return 0;
    // Remove "Rs." and any other non-numeric chars except decimal point
    const cleaned = price.replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const subtotal = cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 150; // Free delivery over Rs. 500
  const tax = subtotal * 0.05; // 5% tax
  const discount = promoApplied ? subtotal * 0.2 : 0; // 20% discount
  const total = subtotal + deliveryFee + tax - discount;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Header & Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <Link to="/pharmacies" className="hover:text-primary transition-colors">Pharmacies</Link>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="text-dark italic">Cart</span>
              </nav>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h1 className="text-2xl md:text-3xl font-black text-dark italic uppercase tracking-tighter">
                  Your <span className="text-primary tracking-tighter italic">Basket</span>
                </h1>
                <span className="hidden md:block w-px h-6 bg-slate-200 mx-2" />
                <p className="hidden md:block text-slate-400 font-bold italic text-sm">
                  {cart.length} items
                </p>
              </div>
            </div>
            
            <Link
              to="/pharmacies"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Continue Shopping
            </Link>
          </div>

          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <div className="col-span-6 italic">Product Details</div>
                    <div className="col-span-3 text-center italic">Quantity</div>
                    <div className="col-span-3 text-right italic">Subtotal</div>
                  </div>

                  <div className="divide-y divide-slate-50">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="p-4 md:p-5 hover:bg-slate-50/30 transition-colors group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="col-span-1 md:col-span-6">
                            <div className="flex gap-4">
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-100 p-1 group-hover:scale-105 transition-transform">
                                <div className="w-full h-full bg-slate-50 rounded-lg overflow-hidden relative">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0 py-0.5">
                                <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-0.5">{item.category}</p>
                                <h3 className="font-bold text-dark text-base leading-tight mb-1 group-hover:text-primary transition-colors truncate">
                                  {item.name}
                                </h3>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-[9px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-colors bg-rose-50 px-2 py-1 rounded"
                                  >
                                    <Trash2 className="w-3 h-3 inline-block mr-1" />
                                    Remove
                                  </button>
                                  <p className="text-[10px] font-medium text-slate-400">
                                    Delivery in 2-3 hrs
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-1 md:col-span-3">
                            <div className="flex justify-center flex-col items-center">
                              <div className="flex items-center gap-1 bg-white border border-slate-100 p-0.5 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-primary/5 transition-colors rounded-md"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-base font-black text-dark w-8 text-center italic">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-primary/5 transition-colors rounded-md"
                                  disabled={item.quantity >= 99}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-widest italic">Rs. {parseFloat(item.price).toFixed(0)} / unit</span>
                            </div>
                          </div>

                          {/* Item Subtotal */}
                          <div className="col-span-1 md:col-span-3 text-right">
                            <div className="text-lg md:text-xl font-black text-dark italic">
                              Rs. <span className="text-primary">{(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
                            </div>
                            {item.quantity > 1 && (
                              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-50 px-1.5 py-0.5 rounded italic">
                                Bulk Price
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-4">
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Shopping Basket
                  </button>
                  
                  <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-900 uppercase tracking-tighter">Safe & Secure</p>
                      <p className="text-emerald-700">All medicines are checked for quality before dispatch.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 lg:sticky lg:top-20 h-fit">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="p-8 pb-4">
                    <h3 className="text-2xl font-black text-dark italic uppercase tracking-tighter mb-6">
                      Order <span className="text-primary tracking-tighter italic">Summary</span>
                    </h3>

                    {/* Promo Code Section */}
                    <div className="mb-6">
                      <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <input
                          type="text"
                          placeholder="PROMO CODE"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-xs font-bold uppercase tracking-widest placeholder:text-slate-300"
                        />
                        <button
                          onClick={applyPromo}
                          className="px-6 py-2.5 bg-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors shadow-lg shadow-dark/10"
                        >
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="mt-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1 px-4">
                          <Tag className="w-3 h-3" />
                          Promo HEALTHY20 Applied (20% OFF)
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-bold uppercase tracking-widest">Subtotal</span>
                        <span className="font-black text-dark italic">Rs. {subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-bold uppercase tracking-widest">Delivery Fee</span>
                        </div>
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-500 font-black uppercase italic tracking-widest">FREE</span>
                        ) : (
                          <span className="font-black text-dark italic">Rs. {deliveryFee.toFixed(2)}</span>
                        )}
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between items-center text-sm text-emerald-600">
                          <span className="font-bold uppercase tracking-widest">Promo Discount</span>
                          <span className="font-black italic">- Rs. {discount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-bold uppercase tracking-widest">Estimated GST</span>
                        <span className="font-black text-dark italic">Rs. {tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-100 pt-6 mb-8">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Amount</span>
                          <div className="text-4xl font-black text-dark italic tracking-tighter mt-1">
                            Rs. <span className="text-primary">{total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded italic">
                            Guaranteed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link
                      to="/checkout"
                      className="group relative w-full h-16 bg-dark text-white rounded-2xl font-black text-lg shadow-2xl shadow-dark/20 hover:bg-primary transition-all flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="italic uppercase tracking-tighter">Secure Checkout</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-slate-50 p-6 flex flex-col gap-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="text-[10px]">
                        <p className="font-black text-dark uppercase tracking-widest">Safe Payments</p>
                        <p className="text-slate-500 font-bold">Encrypted SSL Transaction</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Truck className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="text-[10px]">
                        <p className="font-black text-dark uppercase tracking-widest">Carbon Neutral</p>
                        <p className="text-slate-500 font-bold">Eco-friendly packaging for all orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-16 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 relative border border-slate-100">
                <ShoppingBag className="w-10 h-10 text-slate-200" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                  <Package className="w-4 h-4 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-dark italic uppercase tracking-tighter mb-4">
                Your basket is <span className="text-slate-300 tracking-tighter italic">empty</span>
              </h2>
              <p className="text-slate-400 font-bold italic mb-10 max-w-sm mx-auto uppercase tracking-widest text-xs leading-relaxed">
                Looks like you haven't added any medicines yet. Let's start by browsing our pharmacies.
              </p>
              <Link
                to="/pharmacies"
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase italic tracking-tighter hover:bg-dark transition-all shadow-xl shadow-primary/20"
              >
                Start Browsing <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;