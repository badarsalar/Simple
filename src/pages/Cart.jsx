import React from 'react';
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
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, cartCount } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    if (newQuantity > 99) return; // Max quantity limit
    updateQuantity(id, newQuantity);
  };

  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 150; // Free delivery over Rs. 500
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-semibold">Back to Shopping</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-black text-dark italic uppercase tracking-tighter">
                  Your <span className="text-primary tracking-tighter italic">Cart</span>
                </h1>
                <p className="text-slate-400 font-bold italic text-sm mt-1">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} • Rs. {total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-3 space-y-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-20 lg:w-24 h-32 sm:h-20 lg:h-24 bg-slate-50 rounded-xl lg:rounded-2xl overflow-hidden shrink-0 border border-slate-200 group-hover:shadow-md transition-all">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-dark text-base lg:text-lg leading-tight line-clamp-2">{item.name}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-xl self-start sm:self-auto"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 w-fit">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors rounded-lg"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-bold text-dark w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors rounded-lg"
                              disabled={item.quantity >= 99}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-lg lg:text-2xl font-bold text-primary">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                            <div className="text-xs lg:text-sm text-slate-400">Rs. {parseFloat(item.price).toFixed(2)} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <div className="flex justify-start lg:justify-end">
                  <button
                    onClick={clearCart}
                    className="px-6 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                  >
                    Clear All Items
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm sticky top-24">
                  <h3 className="text-xl font-black text-dark italic uppercase tracking-tighter mb-6">
                    Order <span className="text-primary tracking-tighter italic">Summary</span>
                  </h3>

                  <div className="space-y-4 mb-6">
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

                    {deliveryFee === 0 && (
                      <div className="text-sm text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                        🎉 Free delivery on orders over Rs. 500!
                      </div>
                    )}
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
                        <div className="text-slate-600 text-xs">2-3 hours • Free delivery available</div>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    className="w-full py-4 bg-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-dark/20 hover:bg-primary hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 mb-4"
                  >
                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">100% Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <ShoppingBag className="w-16 h-16 text-slate-300" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-400 italic uppercase tracking-tighter mb-4">
                Your cart is <span className="text-slate-300 tracking-tighter italic">empty</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg mb-8 max-w-md mx-auto">
                Add some medicines to get started with your order.
              </p>
              <Link
                to="/pharmacies"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Package className="w-5 h-5" />
                Browse Medicines
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