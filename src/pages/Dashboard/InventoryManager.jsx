import React, { useState } from 'react';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Package, 
  ChevronRight,
  X,
  FileBox,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const InventoryManager = () => {
  const { medicines } = useAuth();
  const [showAdd, setShowAdd] = useState(false);

  const inventory = [
    { id: 1, name: 'Panadol Extra 500mg', category: 'Pain Relief', stock: 120, price: '150', status: 'In Stock', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000' },
    { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 45, price: '240', status: 'Low Stock', image: 'https://images.unsplash.com/photo-1626963014148-0c8e0061b48a?q=80&w=1000' },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Supplements', stock: 0, price: '320', status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000' },
  ];

  return (
    <div className="p-6 lg:p-12 space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
         <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-black text-dark tracking-tight italic uppercase leading-none">Inventory <span className="text-primary italic border-b-4 border-primary/20">Manager</span></h1>
            <p className="text-slate-400 font-bold italic text-sm">Managing your store stock, medicine listings, and pricing.</p>
         </div>
         <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
         >
            <Plus className="w-4 h-4" /> Add New Listing
         </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 transition-transform group-hover:scale-110">
               <Package className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Items</p>
               <p className="text-2xl font-black text-dark italic mt-1 uppercase">124 Products</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 transition-transform group-hover:scale-110">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Low Stock</p>
               <p className="text-2xl font-black text-dark italic mt-1 uppercase">8 Items</p>
            </div>
         </div>
         <div className="bg-dark rounded-[2.5rem] p-6 text-white shadow-xl flex items-center gap-6 group relative overflow-hidden transition-all hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110 z-10">
               <TrendingUp className="w-6 h-6" />
            </div>
            <div className="relative z-10">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Top Selling</p>
               <p className="text-2xl font-black text-white italic mt-1 uppercase">Vitamin C</p>
            </div>
         </div>
      </div>

      {/* Search & Table Header */}
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
            <div className="relative w-full md:w-96 group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Search inventory by name, category or dosage..." 
                  className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
               />
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-white border border-slate-100 text-dark rounded-xl text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Category
               </button>
               <button className="px-6 py-3 bg-white border border-slate-100 text-dark rounded-xl text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
                  Stock Status
               </button>
            </div>
         </div>

         {/* Desktop Inventory Table */}
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-50">
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Medicine Name</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Dosage / Pack</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Unit Price</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Current Stock</th>
                     <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {inventory.map((item) => (
                     <tr key={item.id} className="group hover:bg-slate-50/50 transition-all">
                        <td className="px-8 py-8">
                           <div className="flex items-center gap-5">
                              <div className="w-16 h-16 rounded-[1.5rem] border-2 border-slate-100 p-0.5 shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                                 <img src={item.image} className="w-full h-full object-cover rounded-[1.2rem]" alt="" />
                              </div>
                              <div className="min-w-0">
                                 <h4 className="text-sm font-black text-dark italic uppercase leading-none">{item.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{item.category}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-8 text-center text-[10px] font-black text-dark italic border-r border-slate-50/0 group-hover:border-slate-50 transition-all">
                           500mg (10 Caps)
                        </td>
                        <td className="px-8 py-8 text-center">
                           <span className="text-sm font-black text-primary italic tracking-tight uppercase">Rs. {item.price}</span>
                        </td>
                        <td className="px-8 py-8 text-center">
                           <div className="flex flex-col items-center gap-2">
                              <span className={`text-[10px] font-black uppercase italic px-3 py-1 rounded-lg ${
                                 item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-500' : 
                                 item.status === 'Low Stock' ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'
                              }`}>
                                 {item.status} ({item.stock})
                              </span>
                              <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${
                                    item.status === 'In Stock' ? 'bg-emerald-500' : 
                                    item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-rose-500'
                                 }`} style={{ width: `${Math.min(item.stock, 100)}%` }}></div>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-8 text-center">
                           <div className="flex items-center justify-center gap-3">
                              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                                 <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add Medicine Modal Overlay */}
      {showAdd && (
         <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-dark/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
               <button 
                  onClick={() => setShowAdd(false)}
                  className="absolute top-10 right-10 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all z-10"
               >
                  <X className="w-5 h-5" />
               </button>

               <div className="p-14 space-y-12">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black italic text-dark uppercase tracking-tight leading-none">Clinical <span className="text-primary italic">Entry</span></h3>
                     <p className="text-slate-400 font-bold italic text-sm">Fill details to list a new medicine on the store.</p>
                  </div>

                  <form className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Generic Name</label>
                           <input type="text" placeholder="e.g. Paracetamol Extra" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Category</label>
                           <select className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all">
                              <option>Painkillers</option>
                              <option>Antibiotics</option>
                              <option>Nutritional</option>
                           </select>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Initial Stock</label>
                           <input type="number" placeholder="e.g. 50" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-4">Price (Rs.)</label>
                           <input type="text" placeholder="e.g. 240" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black italic text-dark focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300" />
                        </div>
                     </div>

                     <div className="border-4 border-dashed border-slate-50 rounded-[3rem] p-12 flex flex-col items-center gap-6 hover:border-primary/20 hover:bg-slate-50/50 transition-all cursor-pointer group">
                        <ImageIcon className="w-10 h-10 text-slate-200 group-hover:scale-110 transition-transform group-hover:text-primary" />
                        <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">Medical Imaging / Pack Photo</p>
                     </div>

                     <div className="flex gap-4 pt-4">
                        <button className="flex-1 py-5 bg-primary text-white rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all">Confirm Entry</button>
                        <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-5 bg-slate-50 border border-slate-100 text-dark rounded-[2.5rem] text-xs font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default InventoryManager;
