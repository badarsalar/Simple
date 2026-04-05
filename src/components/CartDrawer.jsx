import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, checkout } = useCart();

  const handleCheckout = () => {
    if (checkout()) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-500 ease-in-out">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-[3.5rem] overflow-hidden">
            
            {/* Header */}
            <div className="px-8 py-8 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-dark tracking-tight">Your Cart</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cart.length} unique items</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 group-hover:shadow-lg transition-all">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-start">
                         <h4 className="font-black text-dark text-sm leading-tight leading-7">{item.name}</h4>
                         <button 
                           onClick={() => removeFromCart(item.id)}
                           className="text-slate-300 hover:text-rose-500 transition-colors"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 italic font-medium">{item.category}</p>
                       <div className="flex justify-between items-center pt-2">
                         <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black text-dark w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                         </div>
                         <span className="font-black text-primary">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 px-10">
                   <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                     <ShoppingBag className="w-12 h-12" />
                   </div>
                   <div>
                     <h3 className="text-xl font-black italic">Cart is Empty</h3>
                     <p className="text-sm font-medium mt-2">Looks like you haven't added anything to your cart yet.</p>
                   </div>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            <div className="px-8 py-10 bg-slate-50/50 border-t border-slate-100 space-y-8 rounded-t-[3rem]">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-slate-400 italic">
                  <span>Subtotal</span>
                  <span className="text-dark">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-400 italic border-b border-slate-100 pb-4">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-500 font-black tracking-tight">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <h3 className="text-2xl font-black text-dark tracking-tight">Total</h3>
                   <span className="text-3xl font-black text-primary tracking-tighter">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Payment: <span className="text-dark">Credit Card</span></span>
                  </div>
                  <button className="text-primary hover:underline uppercase tracking-widest text-[9px] font-black">Change</button>
                </div>

                <button 
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-5 bg-dark text-white rounded-[2rem] font-black text-lg shadow-xl shadow-dark/20 hover:bg-primary hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                >
                  Confirm Order <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">100% Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
