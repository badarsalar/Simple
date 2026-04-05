import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  MoreVertical, 
  CheckCheck,
  Phone,
  Video,
  X,
  Circle,
  Stethoscope,
  Store,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const contacts = [
    { id: 1, name: 'Dr. Saira Jabeen', role: 'Oncologist', lastMessage: 'Please bring your previous reports.', time: '10:30 AM', online: true, type: 'doctor', unread: 2, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200' },
    { id: 2, name: 'Clinicare Pharmacy', role: 'Main Blvd Branch', lastMessage: 'Your order #ORD-9281 is ready.', time: 'Yesterday', online: false, type: 'pharmacy', unread: 0, avatar: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=200' },
    { id: 3, name: 'Dr. Ahmed Khan', role: 'Cardiologist', lastMessage: 'How is the medication working?', time: '2 days ago', online: true, type: 'doctor', unread: 0, avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200' },
  ];

  const [chatMessages, setChatMessages] = useState([
    { id: 1, senderId: 1, text: 'Hello Alex, I reviewed your recent blood test results.', time: '10:25 AM', status: 'read' },
    { id: 2, senderId: 'user', text: 'Thank you doctor. Is everything looking okay?', time: '10:26 AM', status: 'read' },
    { id: 3, senderId: 1, text: 'Most markers are stable. I just want to discuss the hemoglobin levels in our next session.', time: '10:28 AM', status: 'read' },
    { id: 4, senderId: 1, text: 'Please bring your previous reports during our video call tomorrow.', time: '10:30 AM', status: 'read' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setChatMessages([...chatMessages, newMsg]);
    setMessage('');
    
    // Simulate auto-reply from Specialist
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: Date.now() + 1,
        senderId: selectedChat.id,
        text: 'Received. I will look into it and get back to you.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setChatMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] p-6 lg:p-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white h-full rounded-[4rem] border border-slate-100 shadow-xl flex overflow-hidden">
        
        {/* Contacts Sidebar */}
        <div className={`w-full lg:w-96 border-r border-slate-100 flex-col bg-slate-50/30 ${selectedChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-8 border-b border-slate-100 bg-white">
            <h2 className="text-2xl font-black text-dark italic uppercase tracking-tighter mb-6">Messages <span className="text-primary italic shrink-0 px-2 py-0.5 bg-primary/10 rounded-lg text-xs leading-none">3</span></h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase italic tracking-widest text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
            {contacts.map((contact) => (
              <button 
                key={contact.id}
                onClick={() => setSelectedChat(contact)}
                className={`w-full p-6 p-x-8 rounded-3xl transition-all flex items-center gap-4 relative group
                ${selectedChat?.id === contact.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-white hover:shadow-lg hover:shadow-slate-100'}`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 ${selectedChat?.id === contact.id ? 'border-primary-light' : 'border-white'}`}>
                    <img src={contact.avatar} className="w-full h-full object-cover" alt="" />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                   <div className="flex justify-between items-center mb-1">
                      <h4 className={`text-xs font-black italic uppercase tracking-tighter truncate ${selectedChat?.id === contact.id ? 'text-white' : 'text-dark'}`}>{contact.name}</h4>
                      <span className={`text-[8px] font-bold ${selectedChat?.id === contact.id ? 'text-white/60' : 'text-slate-400'}`}>{contact.time}</span>
                   </div>
                   <p className={`text-[10px] font-bold truncate ${selectedChat?.id === contact.id ? 'text-white/80' : 'text-slate-400'}`}>{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && !selectedChat?.id === contact.id && (
                  <div className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[9px] font-black animate-bounce">
                    {contact.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${!selectedChat ? 'hidden lg:flex' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-8 lg:px-10 border-b border-slate-50 flex items-center justify-between shadow-sm relative z-10">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 text-slate-400 hover:text-dark">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100">
                      <img src={selectedChat.avatar} className="w-full h-full object-cover" alt="" />
                    </div>
                    {selectedChat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-dark italic uppercase tracking-tight leading-none">{selectedChat.name}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic flex items-center gap-2">
                       {selectedChat.type === 'doctor' ? <Stethoscope className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                       {selectedChat.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-slate-100 transition-all flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-slate-100 transition-all flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-dark hover:bg-slate-100 transition-all flex items-center justify-center">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Content */}
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8 no-scrollbar bg-slate-50/30">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] lg:max-w-[60%] space-y-2`}>
                      <div className={`p-6 rounded-[2.5rem] text-sm font-bold shadow-sm relative group
                        ${msg.senderId === 'user' 
                          ? 'bg-dark text-white rounded-tr-none' 
                          : 'bg-white text-dark border border-slate-100 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-2 px-2 ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <span className="text-[9px] font-bold text-slate-400 uppercase italic">{msg.time}</span>
                         {msg.senderId === 'user' && (
                           <CheckCheck className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-primary' : 'text-slate-300'}`} />
                         )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-8 lg:p-10 border-t border-slate-50 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 group-focus-within:border-primary/20 group-focus-within:ring-4 group-focus-within:ring-primary/5 transition-all">
                  <button type="button" className="p-4 text-slate-400 hover:text-primary transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your medical query here..." 
                    className="flex-1 bg-transparent py-4 text-xs font-black italic text-dark focus:outline-none placeholder:text-slate-300 uppercase tracking-widest h-full"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="p-5 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center shrink-0"
                  >
                    <Send className="w-5 h-5 rotate-12 group-hover:rotate-0 transition-transform" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-700">
               <div className="w-32 h-32 bg-slate-50 rounded-[3.5rem] flex items-center justify-center text-slate-200 mb-8 border-2 border-dashed border-slate-100">
                  <MessageSquare className="w-12 h-12" />
               </div>
               <h3 className="text-2xl font-black text-dark italic uppercase leading-none mb-3">Direct <span className="text-primary italic">Counsel</span></h3>
               <p className="text-slate-400 font-bold italic text-sm max-w-sm leading-relaxed mb-10">Select a specialist or pharmacy from the sidebar to begin direct communication about your healthcare needs.</p>
               <div className="flex gap-4">
                  <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-[9px] font-black uppercase italic tracking-widest border border-emerald-100 flex items-center gap-2">
                     <Circle className="w-2 h-2 fill-emerald-500" /> 2 Online Now
                  </div>
                  <div className="px-6 py-3 bg-primary/5 text-primary rounded-2xl text-[9px] font-black uppercase italic tracking-widest border border-primary/20 flex items-center gap-2">
                     <Clock className="w-3.5 h-3.5" /> Fast Response
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
