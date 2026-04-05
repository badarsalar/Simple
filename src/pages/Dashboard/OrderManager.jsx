import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  MoreVertical, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  FileText, 
  ArrowRight,
  TrendingUp,
  X,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OrderManager = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('new');
  const [showOrderDetails, setShowOrderDetails] = useState(null);

  const orders = [
    { 
      id: '#ORD-99201', 
      patient: 'Ahmed Hassan', 
      itemsCount: 3, 
      total: '1,450', 
      time: '12 mins ago', 
      status: 'Awaiting Review',
      prescription: { type: 'Digital', doctor: 'Dr. Adam Cooper' }
    },
    { 
      id: '#ORD-88192', 
      patient: 'Maria Khan', 
      itemsCount: 1, 
      total: '320', 
      time: '45 mins ago', 
      status: 'Processing',
      prescription: { type: 'Image', url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000' }
    },
    { 
      id: '#ORD-77112', 
      patient: 'Junaid Ahmed', 
      itemsCount: 5, 
      total: '8,900', 
      time: '2 hours ago', 
      status: 'Shipped',
      tracking: 'Standard Express'
    },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Order <span className="text-primary italic border-b-4 border-primary/20">Fulfillment</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Managing prescriptions, drug dispensing, and delivery logistics.</p>
         </div>
         <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
               <TrendingUp className="w-6 h-6 animate-pulse" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Completion Rate</p>
               <h4 className="text-xl font-black text-dark italic mt-1 uppercase">98.2%</h4>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12 items-start">
         {/* Order List Sidebar */}
         <div className="xl:col-span-1 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-dark italic uppercase leading-none border-l-4 border-primary pl-4">Queue</h3>
            </div>
            
            <div className="space-y-4">
               {['new', 'processing', 'shipped'].map(tab => (
                  <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] border transition-all text-xs font-black uppercase italic tracking-widest ${activeTab === tab ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02]' : 'bg-white text-slate-400 border-slate-100 hover:border-primary/20'}`}
                  >
                     <div className="flex items-center gap-4">
                        <Package className={`w-5 h-5 ${activeTab === tab ? 'text-white' : 'text-slate-300'}`} />
                        {tab} Orders
                     </div>
                     <span className={`px-3 py-1 rounded-lg text-[9px] ${activeTab === tab ? 'bg-white/20' : 'bg-slate-50'}`}>4</span>
                  </button>
               ))}
            </div>

            <div className="bg-dark rounded-[4rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="space-y-6 relative z-10">
                  <h4 className="text-sm font-black italic uppercase text-primary tracking-widest">Courier Hub</h4>
                  <p className="text-slate-400 font-bold italic text-sm leading-relaxed pr-8">Optimize your deliveries with integrated express shipping partners.</p>
                  <button className="flex items-center gap-3 text-[10px] font-black text-white hover:text-primary uppercase italic tracking-widest transition-colors"><Truck className="w-5 h-5" /> Dispatch Logistics <ChevronRight className="w-3 h-3" /></button>
               </div>
            </div>
         </div>

         {/* Order Management Table Area */}
         <div className="xl:col-span-3 space-y-8">
            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-8 bg-slate-50/20">
                  <div className="relative w-full max-w-sm group">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                     <input type="text" placeholder="Search orders by ID or Patient..." className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl text-[10px] font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300" />
                  </div>
                  <div className="flex items-center gap-4">
                     <button className="px-8 py-4 bg-white border border-slate-100 text-dark rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-sm hover:shadow-lg transition-all"><Layers className="w-4 h-4" /></button>
                  </div>
               </div>

               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-slate-50/50">
                           <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Reference</th>
                           <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Patient Details</th>
                           <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Prescription</th>
                           <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Amount</th>
                           <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {orders.map((order) => (
                           <tr key={order.id} className="group hover:bg-slate-50/50 transition-all">
                              <td className="px-10 py-10 font-black text-primary italic text-sm tracking-tight">{order.id}</td>
                              <td className="px-10 py-10">
                                 <div>
                                    <h5 className="text-sm font-black text-dark uppercase italic leading-none">{order.patient}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2"><Clock className="w-3 h-3" /> {order.time}</p>
                                 </div>
                              </td>
                              <td className="px-10 py-10 text-center">
                                 {order.prescription ? (
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${order.prescription.type === 'Digital' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-amber-50 text-amber-500 border-amber-100'}`}>
                                       <FileText className="w-3.5 h-3.5" />
                                       <span className="text-[8px] font-black uppercase italic tracking-widest">{order.prescription.type} Parchment</span>
                                    </div>
                                 ) : (
                                    <span className="text-[8px] font-black text-slate-300 uppercase italic italic">OTC Order</span>
                                 )}
                              </td>
                              <td className="px-10 py-10 text-center">
                                 <span className="text-sm font-black text-dark italic tracking-tight uppercase">Rs. {order.total}</span>
                              </td>
                              <td className="px-10 py-10 text-center">
                                 <button 
                                    onClick={() => setShowOrderDetails(order)}
                                    className="px-6 py-3 bg-slate-50 border border-slate-100 text-dark rounded-xl text-[9px] font-black uppercase italic tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                                 >
                                    Review
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>

      {/* Order Moderation Modal Overlay */}
      {showOrderDetails && (
         <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-dark/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
               <button 
                  onClick={() => setShowOrderDetails(null)}
                  className="absolute top-10 right-10 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all z-10"
               >
                  <X className="w-5 h-5" />
               </button>

               <div className="p-14 space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="space-y-2">
                        <h3 className="text-3xl font-black italic text-dark uppercase tracking-tight leading-none">Review <span className="text-primary italic border-b-4 border-primary/20">Order</span></h3>
                        <p className="text-slate-400 font-bold italic text-sm">ID: {showOrderDetails.id} • {showOrderDetails.patient}</p>
                     </div>
                     <span className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase italic tracking-widest">
                        Awaiting Review
                     </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-100 flex items-center justify-center min-h-[300px] relative group cursor-zoom-in overflow-hidden">
                        {showOrderDetails.prescription?.type === 'Image' ? (
                           <img src={showOrderDetails.prescription.url} className="w-full h-full object-cover rounded-[2rem] opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
                        ) : (
                           <div className="text-center space-y-4">
                              <FileText className="w-16 h-16 text-primary border-4 border-primary/20 p-3 rounded-[2rem] mx-auto animate-pulse" />
                              <p className="text-[10px] font-black text-dark uppercase italic tracking-widest">{showOrderDetails.prescription?.doctor || 'Clinical Provider'}</p>
                           </div>
                        )}
                        <span className="absolute bottom-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[8px] font-bold text-dark uppercase tracking-widest border border-slate-100">Click to View High-Res</span>
                     </div>
                     
                     <div className="space-y-8 flex flex-col justify-center">
                        <div className="space-y-4">
                           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-primary pl-4">Order Summary</h5>
                           <div className="space-y-3">
                              <div className="flex justify-between text-xs font-black italic uppercase">
                                 <span className="text-slate-400">Panadol Extra</span>
                                 <span className="text-dark">x1</span>
                              </div>
                              <div className="flex justify-between text-xs font-black italic uppercase">
                                 <span className="text-slate-400">Vitamin C 1000mg</span>
                                 <span className="text-dark">x2</span>
                              </div>
                           </div>
                        </div>

                        <div className="p-6 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center gap-4">
                           <CheckCircle className="w-8 h-8 text-emerald-500 p-1.5 bg-white rounded-xl shadow-sm" />
                           <p className="text-[9px] font-bold text-emerald-600 uppercase italic tracking-widest leading-relaxed">System scan confirms all prescription items are in local inventory cycle.</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                     <button className="flex-1 py-6 bg-primary text-white rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                        <CheckCircle className="w-5 h-5" /> Accept & Dispatch
                     </button>
                     <button className="flex-1 py-6 bg-rose-50 border border-rose-100 text-rose-500 rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest hover:bg-rose-500 hover:text-white transition-all text-center flex items-center justify-center gap-4">
                        <AlertCircle className="w-5 h-5" /> Query Items
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default OrderManager;
