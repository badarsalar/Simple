import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  // Appointments State
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      doctor: 'Dr. Saira Jabeen', 
      specialty: 'Oncologist', 
      date: 'Dec 25, 2026', 
      time: '10:30 AM', 
      type: 'Video', 
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200'
    },
    { 
      id: 2, 
      doctor: 'Dr. Ahmed Khan', 
      specialty: 'Cardiologist', 
      date: 'Dec 28, 2026', 
      time: '02:15 PM', 
      type: 'In-Clinic', 
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200'
    },
    { 
      id: 3, 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Neurologist', 
      date: 'Dec 15, 2026', 
      time: '09:00 AM', 
      type: 'Video', 
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200'
    }
  ]);

  // Health Vault Records State
  const [vaultRecords, setVaultRecords] = useState([
    { id: 1, type: 'Digital', name: 'Digital Prescription - Amoxicillin', doctor: 'Dr. Adam Cooper', date: 'Dec 20, 2026', status: 'Verified' },
    { id: 2, type: 'Image', name: 'Lab Report - Blood Test', doctor: 'City Lab Diagnostics', date: 'Dec 15, 2026', status: 'Pending Approval' },
    { id: 3, type: 'Digital', name: 'Post-Op Care Instructions', doctor: 'Dr. Sarah Lee', date: 'Dec 10, 2026', status: 'Verified' },
  ]);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'ORD-99021',
      status: 'Shipped',
      total: '45.20',
      date: 'Dec 20, 2026',
      items: ['Panadol Extra', 'Vitamin C 1000mg']
    }
  ]);

  // Messaging State
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('dashboard_chats');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Dr. Adam Cooper', 
        role: 'Oncologist', 
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200',
        lastMsg: 'Your lab results look promising. Let\'s discuss in our next visit.',
        time: '10:45 AM',
        unread: 1,
        online: true,
        messages: [
          { id: 1, text: 'Hello Doctor, I wanted to follow up on my last report.', sent: true, time: '10:30 AM' },
          { id: 2, text: 'Hello! I have reviewed them.', sent: false, time: '10:35 AM' },
          { id: 3, text: 'Your lab results look promising. Let\'s discuss in our next visit.', sent: false, time: '10:45 AM' },
        ]
      },
      { 
        id: 2, 
        name: 'City Central Pharmacy', 
        role: 'Pharmacy', 
        avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=200',
        lastMsg: 'The Panadol Extra you ordered is ready for pickup.',
        time: 'Yesterday',
        unread: 0,
        online: false,
        messages: [
          { id: 1, text: 'The Panadol Extra you ordered is ready for pickup.', sent: false, time: '3:00 PM' },
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dashboard_chats', JSON.stringify(chats));
  }, [chats]);

  // Actions
  const cancelAppointment = (id) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    ));
  };

  const addVaultRecord = (record) => {
    setVaultRecords(prev => [record, ...prev]);
  };

  const deleteVaultRecord = (id) => {
    setVaultRecords(prev => prev.filter(r => r.id !== id));
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, date: newDate, time: newTime, status: 'confirmed' } : app
    ));
  };

  const updateProfile = (newData) => {
    // In a real app, this would be an API call
    console.log('Updating profile with:', newData);
  };

  const updateOrder = (id, status) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const cancelOrder = (id) => {
    updateOrder(id, 'cancelled');
  };

  const sendMessage = (chatId, text, attachment = null) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newMessage = { 
          id: Date.now(), 
          text, 
          sent: true, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          attachment // Support images/docs
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMsg: text || (attachment ? 'Shared a file' : ''),
          time: 'Just now',
          unread: 0
        };
      }
      return chat;
    }));
  };

  const startChatWithProvider = (provider) => {
    const existingChat = chats.find(c => c.name === (provider.name || provider.doctor || provider.store));
    if (!existingChat) {
      const newChat = {
        id: Date.now(),
        name: provider.name || provider.doctor || provider.store,
        role: provider.specialty || provider.role || 'Pharmacy',
        avatar: provider.image || provider.avatar || 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=200',
        lastMsg: 'Chat started',
        time: 'Just now',
        unread: 0,
        online: true,
        messages: []
      };
      setChats(prev => [newChat, ...prev]);
      return newChat.id;
    }
    return existingChat.id;
  };

  const deleteMessage = (chatId, messageId) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: chat.messages.filter(m => m.id !== messageId)
        };
      }
      return chat;
    }));
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
  };

  const value = {
    appointments,
    vaultRecords,
    orders,
    chats,
    cancelAppointment,
    rescheduleAppointment,
    addVaultRecord,
    deleteVaultRecord,
    updateOrder,
    cancelOrder,
    updateProfile,
    sendMessage,
    startChatWithProvider,
    deleteMessage,
    deleteChat
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
