import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip, 
  Smile,
  CheckCheck,
  User,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const contacts = [
    { 
      id: 1, 
      name: 'Dr. Adam Cooper', 
      role: 'Oncologist', 
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200',
      lastMsg: 'Your lab results look promising. Let\'s discuss in our next visit.',
      time: '10:45 AM',
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'City Central Pharmacy', 
      role: 'Pharmacy', 
      avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=200',
      lastMsg: 'The Panadol Extra you ordered is ready for pickup.',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'Dr. Sarah Johnson', 
      role: 'Cardiologist', 
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200',
      lastMsg: 'Please continue the current medication.',
      time: 'Mon',
      unread: 0,
      online: true
    }
  ];

  const currentMessages = [
    { id: 1, text: 'Hello Doctor, I wanted to follow up on my last report.', sent: true, time: '10:30 AM' },
    { id: 2, text: 'Hello! I have reviewed them.', sent: false, time: '10:35 AM' },
    { id: 3, text: 'Your lab results look promising. Let\'s discuss in our next visit.', sent: false, time: '10:45 AM' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Sidebar: Chat List */}
      <div className={`w-full lg:w-96 border-r border-slate-50 flex flex-col bg-white ${selectedChat ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-dark italic uppercase tracking-tight leading-none">Messages</h2>
            <button className="p-3 bg-primary/5 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase italic tracking-widest text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-none pb-8">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedChat(contact)}
              className={`w-full flex items-center gap-4 p-5 rounded-[2.5rem] transition-all relative group
                ${selectedChat?.id === contact.id ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02] z-10' : 'hover:bg-slate-50'}`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" alt="" />
                {contact.online && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm font-black italic uppercase leading-none truncate ${selectedChat?.id === contact.id ? 'text-white' : 'text-dark'}`}>{contact.name}</h4>
                  <span className={`text-[9px] font-bold uppercase ${selectedChat?.id === contact.id ? 'text-white/60' : 'text-slate-400'}`}>{contact.time}</span>
                </div>
                <p className={`text-[11px] font-bold italic truncate ${selectedChat?.id === contact.id ? 'text-white/80' : 'text-slate-500'}`}>{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && selectedChat?.id !== contact.id && (
                <span className="shrink-0 w-5 h-5 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col bg-slate-50/50 ${!selectedChat ? 'hidden lg:flex' : 'flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="px-8 py-6 bg-white border-b border-slate-50 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-dark">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="relative">
                   <img src={selectedChat.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                   {selectedChat.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>}
                </div>
                <div>
                   <h3 className="text-base font-black text-dark italic uppercase leading-none">{selectedChat.name}</h3>
                   <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{selectedChat.role} • Active Now</p>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all">
                    <Phone className="w-5 h-5" />
                 </button>
                 <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all">
                    <Video className="w-5 h-5" />
                 </button>
                 <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-dark transition-all">
                    <MoreVertical className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-90">
               {currentMessages.map((msg) => (
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0, y: 10 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   key={msg.id} 
                   className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`max-w-[70%] lg:max-w-md ${msg.sent ? 'order-1' : 'order-2'}`}>
                       <div className={`p-6 rounded-3xl relative shadow-xl ${msg.sent ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-dark rounded-tl-none border border-slate-100'}`}>
                          <p className="text-sm font-bold italic leading-relaxed">{msg.text}</p>
                       </div>
                       <div className={`flex items-center gap-2 mt-2 ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">{msg.time}</span>
                          {msg.sent && <CheckCheck className="w-3 h-3 text-primary" />}
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Chat Input */}
            <div className="p-8 bg-white border-t border-slate-50 z-10">
               <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-2 pl-6 focus-within:ring-4 focus-within:ring-primary/10 hover:bg-white transition-all shadow-inner">
                  <button className="text-slate-400 hover:text-primary transition-all p-2">
                     <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="text-slate-400 hover:text-primary transition-all p-2">
                     <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message securely..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold italic text-dark py-4 placeholder:text-slate-300"
                  />
                  <button className="text-slate-300 hover:text-amber-500 transition-all p-2">
                     <Smile className="w-5 h-5" />
                  </button>
                  <button className="bg-dark text-white p-4 rounded-[2rem] hover:bg-primary transition-all shadow-xl hover:scale-105 active:scale-95 group">
                     <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8 opacity-40">
             <div className="w-40 h-40 bg-slate-100 rounded-[3rem] flex items-center justify-center text-slate-200 shadow-inner">
                <Send className="w-16 h-16 -rotate-12" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-dark italic uppercase leading-none mb-3">Secure <span className="text-primary italic text-dark">Messenger</span></h3>
                <p className="text-slate-400 font-bold italic text-sm max-w-xs mx-auto">Select a provider or pharmacy to start a secure HIPAA-compliant end-to-end encrypted conversation.</p>
             </div>
             <button className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20">New Secure Thread</button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Messages;
