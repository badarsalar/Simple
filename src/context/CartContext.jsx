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

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    
    addNotification({
      title: 'Order Placed!',
      message: `Your order for ${cart.length} items totaling $${cartTotal.toFixed(2)} has been placed successfully.`,
      type: 'success'
    });
    
    setCart([]);
    return true;
  };

  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
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
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
