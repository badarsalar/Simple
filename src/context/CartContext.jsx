import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('simple_healthcare_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { addNotification } = useAuth();

  useEffect(() => {
    localStorage.setItem('simple_healthcare_cart', JSON.stringify(cart));
  }, [cart]);
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return 0;
    const cleaned = price.replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      addNotification({
        title: 'Quantity Updated',
        message: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
        type: 'info'
      });
      setCart(prevCart => prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      addNotification({
        title: 'Added to Cart',
        message: `${product.name} has been added to your cart`,
        type: 'success'
      });
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      addNotification({
        title: 'Removed from Cart',
        message: `${item.name} has been removed from your cart`,
        type: 'warning'
      });
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    if (quantity > 99) {
      addNotification({
        title: 'Maximum Quantity Reached',
        message: 'You can only add up to 99 units of a single item',
        type: 'warning'
      });
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    const itemCount = cart.length;
    setCart([]);
    addNotification({
      title: 'Cart Cleared',
      message: `Removed ${itemCount} items from your cart`,
      type: 'info'
    });
  };

  const checkout = () => {
    if (cart.length === 0) return false;

    const subtotal = cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    addNotification({
      title: 'Order Placed Successfully! 🎉',
      message: `Your order for ${cartCount} items totaling Rs. ${total.toFixed(2)} has been confirmed. Estimated delivery: 2-3 hours.`,
      type: 'success'
    });

    setCart([]);
    return true;
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery over Rs. 500
  const tax = subtotal * 0.05; // 5% GST
  const cartTotal = subtotal + deliveryFee + tax;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkout,
      cartTotal,
      cartCount,
      subtotal,
      deliveryFee,
      tax,
      parsePrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
