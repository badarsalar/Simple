import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Calendar, 
  Search, 
  ArrowRight,
  MessageSquare,
  AlertCircle,
  X,
  Clock,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { Link, useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const { addNotification } = useAuth();
  const { startChatWithProvider } = useDashboard();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(null);

  const initialOrders = [
    { 
      id: '#ORD-9281', 
      date: 'May 24, 2026', 
      total: '124.50', 
      status: 'Shipped', 
      store: 'Clinicare Pharmacy - Main Blvd',
      items: ['Amoxicillin 500mg', 'Paracetamol'],
      itemsCount: 2
    },
    { 
      id: '#ORD-8812', 
      date: 'May 22, 2026', 
      total: '32.10', 
      status: 'Processing', 
      store: 'Servaid - Model Town',
      items: ['Panadol Extra'],
      itemsCount: 1
    },
    { 
      id: '#ORD-7719', 
      date: 'May 10, 2026', 
      total: '89.00', 
      status: 'Delivered', 
      store: 'Fazal Din & Sons',
      items: ['Vitamin D', 'Vitamin C'],
      itemsCount: 2
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    addNotification({
      title: 'Order Cancelled',
      message: `Order ${orderId} has been successfully cancelled. Refund processed.`,
      type: 'warning'
    });
    setShowCancelModal(null);
  };

  const handleChatWithPharmacy = (order) => {
     startChatWithProvider(order);
     navigate('/dashboard/messages');
  };

  const statusColors = {
    'Shipped': 'bg-primary/10 text-primary border-primary/20',
    'Processing': 'bg-amber-50 text-amber-600 border-amber-100',
    'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Cancelled': 'bg-rose-50 text-rose-500 border-rose-100'
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status.toLowerCase() === filter);

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Order <span className="text-primary italic">History</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Track your medical shipments and view receipts.</p>
         </div>
         <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-sm">
            {['all', 'processing', 'shipped', 'delivered'].map(f => (
               <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-dark'}`}
               >
                  {f}
               </button>
            ))}
         </div>
      </div>

      <div className="grid gap-6">
         {filteredOrders.length > 0 ? (
           filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-[3.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/5 transition-all"></div>
                 
                 <div className="flex items-center gap-8 relative z-10 w-full lg:w-auto">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-slate-100">
                       <Package className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">#{order.id}</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColors[order.status]}`}>{order.status}</span>
                       </div>
                       <h4 className="text-xl font-black text-dark italic uppercase leading-tight tracking-tight mb-2 truncate">{order.store}</h4>
                       <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                             <Calendar className="w-3.5 h-3.5" /> {order.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 italic">
                             <Package className="w-3.5 h-3.5" /> {order.itemsCount} Item(s)
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                    <div className="text-center lg:text-right px-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Amount</p>
                       <p className="text-2xl font-black text-primary tracking-tighter mt-1">${order.total}</p>
                    </div>
                    
                    <div className="flex gap-2 w-full lg:w-auto">
                        <button 
                           onClick={() => handleChatWithPharmacy(order)}
                           className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 text-dark rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                        >
                           <MessageSquare className="w-4 h-4 text-primary" /> Chat
                        </button>
                       {order.status === 'Processing' && (
                          <button 
                             onClick={() => setShowCancelModal(order.id)}
                             className="flex-1 px-6 py-4 bg-rose-50 text-rose-500 rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-rose-100"
                          >
                             Cancel Order
                          </button>
                       )}
                       {order.status !== 'Cancelled' && (
                          <button className="flex-1 px-6 py-4 bg-dark text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn">
                             Details <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                       )}
                    </div>
                 </div>
              </div>
           ))
         ) : (
           <div className="bg-white rounded-[3.5rem] p-24 text-center border-2 border-dashed border-slate-100 animate-in fade-in zoom-in-95 duration-500">
              <Truck className="w-20 h-20 text-slate-200 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-slate-400 italic uppercase">No {filter !== 'all' ? filter : ''} orders found</h3>
              <p className="text-slate-400 font-bold italic mt-2">Browse the directory and order medicines easily.</p>
           </div>
         )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 text-center shadow-2xl relative animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto mb-6">
                 <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-dark italic uppercase leading-none mb-3">Retract <span className="text-rose-500 italic">Order?</span></h3>
              <p className="text-slate-500 font-bold italic text-sm mb-10 leading-relaxed">Are you sure you want to cancel this order? Funds will be pre-authorized back to your source within 24-48h.</p>
              <div className="space-y-3">
                 <button 
                    onClick={() => handleCancelOrder(showCancelModal)}
                    className="w-full py-4 bg-rose-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 transition-all"
                 >
                    Abort Order
                 </button>
                 <button 
                    onClick={() => setShowCancelModal(null)}
                    className="w-full py-4 bg-slate-50 text-dark rounded-[1.5rem] text-[10px] font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all font-bold"
                 >
                    Keep Order
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
