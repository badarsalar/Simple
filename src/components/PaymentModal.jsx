import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Loader2,
  Lock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onConfirm, amount, description }) => {
  const [method, setMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm({ method, amount, timestamp: new Date().toISOString() });
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden relative shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-dark italic tracking-tight underline decoration-primary/20 decoration-4 underline-offset-4">Checkout</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Transaction ID: TX-{Date.now().toString().slice(-6)}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Due</span>
              <span className="text-3xl font-black text-primary italic">${amount}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
               <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure 256-bit SSL encrypted connection
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</p>
            
            {/* Stripe */}
            <button 
              onClick={() => setMethod('stripe')}
              className={`w-full p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${method === 'stripe' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === 'stripe' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                   <CreditCard className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                   <h4 className="text-sm font-black text-dark tracking-tight">Credit/Debit Card</h4>
                   <p className="text-[9px] font-bold text-slate-400 italic">Global - Powered by Stripe</p>
                 </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${method === 'stripe' ? 'text-primary translate-x-1' : 'text-slate-200'}`} />
            </button>

            {/* JazzCash */}
            <button 
              onClick={() => setMethod('jazzcash')}
              className={`w-full p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${method === 'jazzcash' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === 'jazzcash' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                   <Smartphone className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                   <h4 className="text-sm font-black text-dark tracking-tight">JazzCash</h4>
                   <p className="text-[9px] font-bold text-slate-400 italic">Local - Pakistan Only</p>
                 </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${method === 'jazzcash' ? 'text-amber-500 translate-x-1' : 'text-slate-200'}`} />
            </button>

             {/* EasyPaisa */}
             <button 
              onClick={() => setMethod('easypaisa')}
              className={`w-full p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${method === 'easypaisa' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === 'easypaisa' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                   <Smartphone className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                   <h4 className="text-sm font-black text-dark tracking-tight">EasyPaisa</h4>
                   <p className="text-[9px] font-bold text-slate-400 italic">Local - Pakistan Only</p>
                 </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${method === 'easypaisa' ? 'text-emerald-500 translate-x-1' : 'text-slate-200'}`} />
            </button>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing || isSuccess}
            className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 relative overflow-hidden ${isSuccess ? 'bg-emerald-500 text-white' : 'bg-dark text-white hover:scale-105 shadow-xl shadow-dark/20'}`}
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            ) : (
              <>Pay with {method.toUpperCase()} <ArrowIcon /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default PaymentModal;
