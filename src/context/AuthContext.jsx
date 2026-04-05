import React, { createContext, useContext, useState, useEffect } from 'react';

import { SUBSCRIPTION_PLANS, getPlanByTier } from '../constants/subscriptions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [providers, setProviders] = useState([]);
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Panadol Extra', category: 'Painkillers', price: '150', rating: '4.8', image: '/images/placeholder.svg' },
    { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotics', price: '240', rating: '4.9', image: '/images/placeholder.svg' },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Vitamins', price: '320', rating: '4.7', image: '/images/placeholder.svg' },
    { id: 4, name: 'Cetirizine 10mg', category: 'Allergy Relief', price: '180', rating: '5.0', image: '/images/placeholder.svg' },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Appointment Confirmed', message: 'Your appointment with Dr. Adam Cooper is confirmed for tomorrow at 10:00 AM.', type: 'success', time: '2 mins ago', read: false },
    { id: 2, title: 'New Prescription', message: 'Dr. Sarah Johnson has sent you a new digital prescription.', type: 'info', time: '1 hour ago', read: false },
    { id: 3, title: 'Medicine Restocked', message: 'Panadol Extra is now back in stock at city pharmacy.', type: 'warning', time: '3 hours ago', read: true },
  ]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New State for Platform Integrity & Monetization
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [pendingMedia, setPendingMedia] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [platformStats, setPlatformStats] = useState({
    totalRevenue: 0,
    totalCommissions: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Load persisted user from localStorage
    const savedUser = localStorage.getItem('simple_healthcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load persisted providers from localStorage
    const savedProviders = localStorage.getItem('simple_healthcare_providers');
    if (savedProviders) {
      setProviders(JSON.parse(savedProviders));
    } else {
      const initialProviders = [
        { 
          id: 1, 
          name: 'Ahmed Khan', 
          role: 'doctor', 
          specialization: 'Oncology', 
          avatar: '/images/facilities/doctor-placeholder.svg', 
          subscription: { type: 'Diamond', active: true },
          hasActiveAds: true,
          rating: '5.0',
          address: 'Shalimar Hospital, Lahore, Pakistan',
          metrics: { totalVisits: 1200, consultationHistory: { completed: 450 } }
        },
        { 
          id: 2, 
          name: 'Fatima Bibi', 
          role: 'doctor', 
          specialization: 'Cardiology', 
          avatar: '/images/facilities/doctor-placeholder.svg', 
          subscription: { type: 'Gold', active: true },
          hasActiveAds: false,
          rating: '4.9',
          address: 'Pakistan Institute of Medical Sciences, Islamabad',
          metrics: { totalVisits: 800, consultationHistory: { completed: 200 } }
        },
        { 
          id: 3, 
          name: 'Muhammad Ali', 
          role: 'doctor', 
          specialization: 'Neurologist', 
          avatar: '/images/facilities/doctor-placeholder.svg', 
          subscription: { type: 'Free', active: true },
          hasActiveAds: true,
          rating: '4.7',
          address: 'Jinnah Hospital, Lahore, Pakistan',
          metrics: { totalVisits: 300, consultationHistory: { completed: 50 } }
        },
        {
          id: 101,
          name: 'Central City Clinic',
          facilityName: 'Central City Clinic',
          role: 'clinic',
          avatar: '/images/facilities/clinic-placeholder.svg',
          subscription: { type: 'Diamond', active: true },
          hasActiveAds: true,
          rating: '5.0',
          address: 'Blue Area, Islamabad, Pakistan'
        }
      ];
      setProviders(initialProviders);
      localStorage.setItem('simple_healthcare_providers', JSON.stringify(initialProviders));
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('simple_healthcare_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    // Ensure default subscription for providers if not present
    const finalUser = (['doctor', 'clinic', 'pharmacy'].includes(userData.role) && !userData.subscription) 
      ? { ...userData, subscription: { type: 'Free', active: true } }
      : userData;
    
    // Ensure addresses and payments exist
    if (!finalUser.addresses) finalUser.addresses = [];
    if (!finalUser.paymentMethods) finalUser.paymentMethods = [];
    
    setUser(finalUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(finalUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simple_healthcare_user');
  };

  const signup = (userData) => {
    // Add default subscription for providers
    const finalUser = ['doctor', 'clinic', 'pharmacy'].includes(userData.role)
      ? { ...userData, subscription: { type: 'Free', active: true } }
      : userData;
    
    login(finalUser);
    
    if (['doctor', 'clinic', 'pharmacy'].includes(finalUser.role)) {
      const newProviders = [...providers, { ...finalUser, id: Date.now() }];
      setProviders(newProviders);
      localStorage.setItem('simple_healthcare_providers', JSON.stringify(newProviders));
    }
  };

  const updateProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(newUser));

    if (['doctor', 'clinic', 'pharmacy'].includes(newUser.role)) {
      const newProviders = providers.map(p => 
        p.email === newUser.email ? { ...p, ...updatedData } : p
      );
      const exists = providers.some(p => p.email === newUser.email);
      const finalProviders = exists ? newProviders : [...providers, { ...newUser, id: Date.now() }];
      
      setProviders(finalProviders);
      localStorage.setItem('simple_healthcare_providers', JSON.stringify(finalProviders));
    }
  };

  const updateSubscription = (subType) => {
    if (!user) return;
    const plan = getPlanByTier(subType);
    const amount = parseFloat(plan.price) || 0;

    const updatedUser = { 
      ...user, 
      subscription: { 
        type: subType, 
        active: true, 
        date: new Date().toISOString() 
      } 
    };
    setUser(updatedUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(updatedUser));
    
    // Add transaction record
    if (amount > 0) {
      addTransaction({
        type: 'Subscription',
        amount: amount,
        providerId: user.id,
        description: `${subType} Tier Plan Renewal`,
        commission: amount * 0.1 // 10% commission on subscriptions too? Or just on bookings?
      });
    }

    // Also update in providers list
    const newProviders = providers.map(p => 
      p.email === user.email ? { ...p, subscription: updatedUser.subscription } : p
    );
    setProviders(newProviders);
    localStorage.setItem('simple_healthcare_providers', JSON.stringify(newProviders));
  };

  const addTransaction = (data) => {
    const newTx = {
      ...data,
      id: `TX-${Date.now()}`,
      timestamp: new Date().toISOString(),
      commission: data.amount * 0.1 // Standard 10%
    };
    setTransactions(prev => [newTx, ...prev]);
    setPlatformStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + data.amount,
      totalCommissions: prev.totalCommissions + (data.amount * 0.1)
    }));
  };

  const approveRegistration = (regId) => {
    const reg = pendingRegistrations.find(r => r.id === regId);
    if (!reg) return;
    
    setProviders(prev => [...prev, reg]);
    setPendingRegistrations(prev => prev.filter(r => r.id !== regId));
    addNotification({
      title: 'Registration Approved',
      message: `Welcome to the ecosystem! Your account as a ${reg.role} is now live.`,
      type: 'success'
    });
  };

  const approveMedia = (mediaId) => {
    setPendingMedia(prev => prev.filter(m => m.id !== mediaId));
    addNotification({
      title: 'Media Approved',
      message: 'Your profile media has been approved and is now visible to patients.',
      type: 'success'
    });
  };

  const getGlobalSearchItems = () => {
    const searchWeights = SUBSCRIPTION_PLANS.reduce((acc, plan, idx) => ({ ...acc, [plan.tier]: idx + 1 }), { 'Free': 0 });
    
    const searchItems = [
      ...providers.map(p => ({
        id: p.id,
        name: p.facilityName || p.name,
        type: p.role === 'doctor' ? 'Doctor' : p.role === 'clinic' ? 'Clinic' : 'Pharmacy',
        category: p.specialization || p.role,
        image: p.avatar,
        path: p.role === 'doctor' ? `/profile/${p.id}` : p.role === 'clinic' ? `/clinic/${p.id}` : `/pharmacy/${p.id}`,
        tier: p.subscription?.type || 'Free'
      })),
      ...medicines.map(m => ({
        id: m.id,
        name: m.name,
        type: 'Medicine',
        category: m.category,
        image: m.image,
        path: `/medicine/${m.id}`,
        tier: 'Free'
      }))
    ];

    return searchItems.sort((a, b) => (searchWeights[b.tier] || 0) - (searchWeights[a.tier] || 0));
  };

  const addNotification = (notif) => {
    const newNotif = { 
      ...notif, 
      id: Date.now(), 
      read: false, 
      time: 'Just now',
      actionUrl: notif.actionUrl || null
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Browser Notification
    if (Notification.permission === 'granted') {
      new Notification(notif.title, {
        body: notif.message,
        icon: '/logo.png' // Assuming a logo exists
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  const addAddress = (address) => {
    const updatedUser = { 
      ...user, 
      addresses: [...(user.addresses || []), { ...address, id: Date.now() }] 
    };
    setUser(updatedUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(updatedUser));
  };

  const removeAddress = (id) => {
    const updatedUser = { 
      ...user, 
      addresses: (user.addresses || []).filter(a => a.id !== id) 
    };
    setUser(updatedUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(updatedUser));
  };

  const addPaymentMethod = (payment) => {
    const updatedUser = { 
      ...user, 
      paymentMethods: [...(user.paymentMethods || []), { ...payment, id: Date.now() }] 
    };
    setUser(updatedUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(updatedUser));
  };

  const removePaymentMethod = (id) => {
    const updatedUser = { 
      ...user, 
      paymentMethods: (user.paymentMethods || []).filter(p => p.id !== id) 
    };
    setUser(updatedUser);
    localStorage.setItem('simple_healthcare_user', JSON.stringify(updatedUser));
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const deleteAccount = () => {
    // Clear all user data
    setUser(null);
    localStorage.removeItem('simple_healthcare_user');
    localStorage.removeItem('appointments');
    localStorage.removeItem('prescriptions');
    localStorage.removeItem('health_records');
    localStorage.removeItem('messages');
    localStorage.removeItem('simple_healthcare_favorites');
  };

  const toggleFavorite = (id, type) => {
    const favoriteId = `${type}_${id}`;
    let newFavorites;
    if (favorites.includes(favoriteId)) {
      newFavorites = favorites.filter(f => f !== favoriteId);
    } else {
      newFavorites = [...favorites, favoriteId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('simple_healthcare_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id, type) => favorites.includes(`${type}_${id}`);

  const isPartnerPremium = () => {
    const type = user?.subscription?.type;
    return ['Diamond', 'Platinum', 'Gold'].includes(type);
  };

  const isPartnerDiamond = () => {
    return user?.subscription?.type === 'Diamond';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      providers, 
      medicines, 
      favorites,
      notifications, 
      login, 
      logout, 
      signup, 
      updateProfile, 
      updateSubscription, 
      getGlobalSearchItems, 
      addNotification, 
      markNotificationRead, 
      clearNotifications,
      addAddress,
      removeAddress,
      addPaymentMethod,
      removePaymentMethod,
      deleteAccount, 
      toggleFavorite,
      isFavorite,
      isPartnerPremium,
      isPartnerDiamond,
      pendingRegistrations,
      pendingMedia,
      transactions,
      platformStats,
      addTransaction,
      approveRegistration,
      approveMedia,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
