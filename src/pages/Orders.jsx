import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Truck, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  ArrowLeft,
  X,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TrackingModal = ({ show, onClose, orderId, status }) => {
  if (!show) return null;

  const steps = [
    { title: 'Order Placed', time: '10:00 AM', completed: true, icon: CheckCircle2 },
    { title: 'Processing', time: '10:45 AM', completed: true, icon: Clock },
    { title: 'Shipped', time: '02:00 PM', completed: status !== 'Processing', icon: Package },
    { title: 'Out for Delivery', time: '04:30 PM', completed: status === 'Delivered', icon: Truck },
    { title: 'Delivered', time: 'Pending', completed: status === 'Delivered', icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-dark/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-2xl scale-in-center relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 space-y-10">
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-dark italic uppercase tracking-tighter">Track <span className="text-primary tracking-tighter italic">Order</span></h3>
            <p className="text-slate-400 font-bold italic text-sm">ID: {orderId} • Standard Express</p>
          </div>

          <div className="space-y-0 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-8 relative pb-8 last:pb-0">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all ${
                  step.completed ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-100 text-slate-300'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="pt-2">
                  <h4 className={`font-black italic text-sm ${step.completed ? 'text-dark' : 'text-slate-300'}`}>{step.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Driver</p>
              <h5 className="font-black text-dark italic mt-1">John Logistics</h5>
            </div>
            <button className="ml-auto p-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-dark transition-all">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ id, date, total, status, items, address, onTrack }) => {
  const statusColors = {
    'Processing': 'bg-blue-50 text-blue-500 border-blue-100',
    'Shipped': 'bg-amber-50 text-amber-500 border-amber-100',
    'Delivered': 'bg-emerald-50 text-emerald-500 border-emerald-100'
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">Order {id}</span>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColors[status]}`}>{status}</span>
          </div>
          
          <div className="flex items-center gap-4 py-2">
            <div className="flex -space-x-3 overflow-hidden">
              {items.map((item, i) => (
                <div key={i} className="w-12 h-12 rounded-xl border-2 border-white bg-slate-50 overflow-hidden shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="min-w-0">
               <p className="text-sm font-black text-dark truncate">{items[0].name} {items.length > 1 ? `& ${items.length - 1} more` : ''}</p>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
                  <Calendar className="w-3 h-3" /> {date}
               </div>
            </div>
          </div>
        </div>

        <div className="md:w-64 space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
              <span className="text-xl font-black text-primary tracking-tighter">${total}</span>
           </div>
           <div className="flex items-start gap-2 text-[10px] font-bold text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <p className="leading-relaxed truncate">{address}</p>
           </div>
           <button 
            onClick={onTrack}
            className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-dark hover:bg-primary hover:text-white transition-all uppercase tracking-widest italic"
           >
             Track Life Order
           </button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [trackingModal, setTrackingModal] = useState({ show: false, orderId: '', status: '' });
  const ongoingOrders = [
    { 
      id: '#ORD-99021', 
      date: 'May 20, 2026', 
      total: '45.20', 
      status: 'Shipped', 
      address: '456 Broadway, Manhattan, NY',
      items: [
        { name: 'Panadol Extra', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000' },
        { name: 'Vitamin C', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=1000' }
      ]
    },
    { 
      id: '#ORD-88102', 
      date: 'May 18, 2026', 
      total: '12.00', 
      status: 'Processing', 
      address: '71 Park Ave, Brooklyn, NY',
      items: [
        { name: 'Paracetamol', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000' }
      ]
    }
  ];

  const pastOrders = [
    { 
      id: '#ORD-77191', 
      date: 'May 10, 2026', 
      total: '32.00', 
      status: 'Delivered', 
      address: '456 Broadway, Manhattan, NY',
      items: [
        { name: 'Hydrating Cream', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      <TrackingModal 
        show={trackingModal.show} 
        orderId={trackingModal.orderId}
        status={trackingModal.status}
        onClose={() => setTrackingModal({ show: false, orderId: '', status: '' })}
      />

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <div className="space-y-12">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
             <div className="space-y-2">
               <div className="flex items-center gap-2 text-primary">
                 <Link to="/" className="text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                   <ArrowLeft className="w-3 h-3" /> Home
                 </Link>
               </div>
               <h1 className="text-4xl font-black text-dark tracking-tight italic uppercase">My <span className="text-primary italic">Orders</span></h1>
               <p className="text-slate-400 font-bold italic text-sm">Track and manage your medical deliveries.</p>
             </div>
             <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <Truck className="w-10 h-10 text-primary p-2 bg-primary/5 rounded-xl" />
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                   <p className="text-sm font-black text-dark italic">1 Shipment Live</p>
                </div>
             </div>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                 <h3 className="text-xl font-black text-dark italic leading-none uppercase">Ongoing Deliveries</h3>
              </div>
              <div className="grid gap-6">
                {ongoingOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    {...order} 
                    onTrack={() => setTrackingModal({ show: true, orderId: order.id, status: order.status })}
                  />
                ))}
              </div>
           </div>

           <div className="space-y-8 pt-6">
              <div className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 <h3 className="text-xl font-black text-slate-400 italic leading-none uppercase">Past Receipts</h3>
              </div>
              <div className="grid gap-6 opacity-70 hover:opacity-100 transition-opacity">
                {pastOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    {...order} 
                    onTrack={() => setTrackingModal({ show: true, orderId: order.id, status: order.status })}
                  />
                ))}
              </div>
           </div>

           {/* Help Section */}
           <div className="bg-dark rounded-[3.5rem] p-12 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 -skew-x-12 translate-x-1/2 -translate-y-1/2 rounded-full"></div>
              <h3 className="text-3xl font-black italic underline decoration-primary decoration-4 underline-offset-8 uppercase leading-none">Need Assistance?</h3>
              <p className="text-slate-400 font-bold italic max-w-lg mx-auto">Having trouble with an order? Contact our support team for immediate resolution of logistics or billing issues.</p>
              <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all uppercase tracking-tighter italic">Message Support</button>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
