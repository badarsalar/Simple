import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard, ShieldCheck, Heart, Package, Truck, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, checkout, cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    if (newQuantity > 99) return; // Max quantity limit
    updateQuantity(id, newQuantity);
  };

  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery over Rs. 500
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

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
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center relative">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-dark tracking-tight">Your Cart</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} • Rs. {total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all text-xs font-bold"
                    title="Clear cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="group relative">
                    <div className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-200 group-hover:shadow-md transition-all">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-dark text-sm leading-tight line-clamp-2">{item.name}</h4>
                            <p className="text-[10px] font-medium text-slate-500 mt-1">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-1 hover:bg-rose-50 rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors rounded"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-dark w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors rounded"
                              disabled={item.quantity >= 99}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                            <div className="text-[10px] text-slate-400">Rs. {parseFloat(item.price).toFixed(2)} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60 px-10">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center relative">
                    <ShoppingBag className="w-12 h-12 text-slate-300" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                      <Package className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-400">Your cart is empty</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2">Add some medicines to get started with your order.</p>
                  </div>
                  <Link
                    to="/medicines"
                    onClick={onClose}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
                  >
                    Browse Medicines
                  </Link>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="px-8 py-8 bg-slate-50/50 border-t border-slate-100 space-y-6 rounded-t-[3rem]">
                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="font-bold text-dark text-sm">Order Summary</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Subtotal ({cartCount} items)</span>
                      <span className="font-medium text-dark">Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Delivery Fee</span>
                      </div>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        <span className="font-medium text-dark">Rs. {deliveryFee.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Tax (5%)</span>
                      <span className="font-medium text-dark">Rs. {tax.toFixed(2)}</span>
                    </div>

                    {deliveryFee === 0 && (
                      <div className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-lg">
                        🎉 Free delivery on orders over Rs. 500!
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-dark">Total</span>
                      <span className="text-2xl font-black text-primary">Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-bold text-dark">Estimated Delivery</div>
                      <div className="text-slate-600 text-xs">2-3 hours • Free delivery available</div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="w-full py-4 bg-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-dark/20 hover:bg-primary hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Order <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">100% Secure Checkout</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
