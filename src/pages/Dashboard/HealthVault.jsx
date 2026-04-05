import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Share2, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  MoreVertical,
  X,
  Send,
  Trash2,
  AlertCircle,
  FileCheck,
  ArrowRight,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import StoreSelectionModal from '../../components/StoreSelectionModal';
import { motion, AnimatePresence } from 'framer-motion';

const HealthVault = () => {
  const { user, addNotification } = useAuth();
  const { vaultRecords, addVaultRecord, deleteVaultRecord } = useDashboard();
  const [activeTab, setActiveTab] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  
  const handleForwardSelect = (record) => {
    setSelectedRecord(record);
    setShowStoreSelector(true);
  };

  const handleForwardComplete = (store) => {
    // 1. Send the prescription as a message with rich doctor metadata for pharmacy verification
    const metadata = {
       recordId: selectedRecord?.id,
       doctorName: selectedRecord?.doctor,
       registration: `REG-${Math.floor(Math.random() * 89999 + 10000)}`,
       status: 'Verified Professional'
    };
    
    sendMessage(2, `[SECURE DIGITAL RECORD]: ${selectedRecord?.name}. Physician: ${metadata.doctorName} (${metadata.registration}). Status: ${metadata.status}`, metadata); 
    
    addNotification({
      title: 'Transmission Success',
      message: `${selectedRecord?.name} successfully forwarded to ${store.name} with verifiable physician metadata.`,
      type: 'success',
      time: 'Just now'
    });
  };

  const handleDeleteRecord = (id) => {
    deleteVaultRecord(id);
    addNotification({
      title: 'Record Removed',
      message: 'The medical record has been permanently deleted from your vault.',
      type: 'warning'
    });
    setShowDeleteConfirm(null);
  };

  const handleView = (record) => {
    setViewingRecord(record);
    setShowViewer(true);
  };

  const handleDownload = (record) => {
    addNotification({
      title: 'Generating PDF...',
      message: `Preparing ${record.name} for secure download.`,
      type: 'info'
    });
    
    // Simulate complex background task
    setTimeout(() => {
      addNotification({
        title: 'Download Ready',
        message: 'Your health record has been downloaded successfully.',
        type: 'success'
      });
      
      // Actual functional download logic simulation using Blob
      const docContent = `
        PRO-TECH CLINICAL RECORD: ${record.name}
        ------------------------------------------
        Recipient: ${user?.name || 'Authorized User'}
        Provider: ${record.doctor}
        Date: ${record.date}
        Status: ${record.status}
        ------------------------------------------
        AUTHENTICITY VERIFIED VIA BLOCKCHAIN ID: ${record.id}
      `;
      const blob = new Blob([docContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${record.name.replace(/\s+/g, '_')}_Secure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate File Upload
    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        type: 'Image',
        name: 'Physical Prescription - ' + new Date().toLocaleDateString(),
        doctor: 'Self Uploaded',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending Approval'
      };
      addVaultRecord(newRecord);
      setIsUploading(false);
      setShowUpload(false);
      addNotification({
        title: 'Upload Successful',
        message: 'Your record has been uploaded and is waiting for provider verification.',
        type: 'success'
      });
    }, 1500);
  };

  const filteredRecords = vaultRecords.filter(record => {
    if (activeTab === 'all') return true;
    if (activeTab === 'digital') return record.type === 'Digital';
    if (activeTab === 'images') return record.type === 'Image';
    return true;
  });

  return (
    <div className="p-6 lg:p-12 space-y-12">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
         <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-black text-dark tracking-tight italic uppercase leading-none">Health <span className="text-primary italic">Vault</span></h1>
            <p className="text-slate-400 font-bold italic text-[11px] uppercase tracking-wider">Secured Clinical Record Storage.</p>
         </div>
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-3 px-10 py-3.5 bg-dark text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest shadow-xl shadow-dark/20 hover:bg-primary transition-all outline-none whitespace-nowrap"
         >
            <Plus className="w-4 h-4" /> Upload New Record
         </motion.button>
      </motion.div>

      {/* Tabs & Search */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm"
      >
         <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl">
            {['all', 'digital', 'images'].map(tab => (
               <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${activeTab === tab ? 'bg-white text-primary shadow-xl shadow-primary/10' : 'text-slate-400 hover:text-dark'}`}
               >
                  {tab}
               </button>
            ))}
         </div>
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
               type="text" 
               placeholder="Search records..." 
               className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase italic tracking-widest text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            />
         </div>
      </motion.div>

      {/* Record Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
         <AnimatePresence mode='popLayout'>
           {filteredRecords.map((record) => (
              <motion.div 
                key={record.id}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col justify-between"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/5 transition-all"></div>
                 
                 <div>
                    <div className="flex justify-between items-start mb-8">
                       <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${record.type === 'Digital' ? 'bg-primary/10 text-primary' : 'bg-amber-50 text-amber-500'}`}>
                          {record.type === 'Digital' ? <FileText className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                       </div>
                       <div className="flex gap-1">
                          <button 
                             onClick={() => setShowDeleteConfirm(record.id)}
                             className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                             <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="p-3 text-slate-300 hover:text-dark hover:bg-slate-50 rounded-xl transition-all">
                             <MoreVertical className="w-5 h-5" />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-1">
                          <h4 className="text-lg font-black text-dark italic uppercase leading-tight truncate pr-4">{record.name}</h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1.5 leading-none italic">
                             <Stethoscope className="w-3 h-3" /> {record.doctor}
                          </p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 italic">
                             <Calendar className="w-3.5 h-3.5" /> {record.date}
                          </div>
                          <span className={`text-[9px] font-black uppercase italic px-3 py-1.5 rounded-full border ${record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                             {record.status}
                          </span>
                       </div>
                    </div>
                 </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleView(record)}
                        className="flex-1 px-4 py-3.5 bg-dark text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 overflow-hidden group/btn shadow-xl shadow-dark/10 hover:shadow-primary/20"
                      >
                         <Eye className="w-4 h-4" /> View
                      </button>
                      <button 
                        onClick={() => handleDownload(record)}
                        className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[9px] font-black uppercase italic tracking-widest text-dark hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                      >
                         <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                    <button 
                      onClick={() => handleForwardSelect(record)}
                      className="w-full px-6 py-4 bg-primary text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                       <Send className="w-4 h-4" /> Forward to Pharmacy/Provider
                    </button>
                  </div>
              </motion.div>
           ))}
         </AnimatePresence>

         {/* Add New Record Trigger */}
         <motion.button 
            layout
            onClick={() => setShowUpload(true)}
            className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center gap-6 hover:border-primary/40 hover:bg-white transition-all group min-h-[350px]"
         >
            <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-xl group-hover:rotate-12">
               <Plus className="w-10 h-10" />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-dark">Quick Vault Upload</p>
               <p className="text-[9px] font-bold text-slate-300 uppercase italic">PDF, JPG or PNG</p>
            </div>
         </motion.button>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-dark/80 backdrop-blur-md"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-white w-full max-w-xl rounded-[4rem] overflow-hidden shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowUpload(false)}
                  className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full text-slate-400 hover:text-dark transition-all z-[10]"
                >
                   <X className="w-6 h-6" />
                </button>
                
                <form onSubmit={handleUploadSubmit} className="p-12 lg:p-16 space-y-10 text-center">
                   <div className="space-y-2">
                      <h3 className="text-3xl font-black italic text-dark uppercase tracking-tight leading-none">Vault <span className="text-primary italic">Transmit</span></h3>
                      <p className="text-slate-400 font-bold italic text-sm">Upload physical prescriptions or reports for verification.</p>
                   </div>

                   <div className="border-4 border-dashed border-slate-100 rounded-[3.5rem] p-20 flex flex-col items-center gap-8 hover:border-primary/20 hover:bg-slate-50/50 transition-all cursor-pointer group relative">
                      <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all shadow-xl
                         ${isUploading ? 'bg-primary text-white animate-pulse' : 'bg-primary/5 text-primary group-hover:scale-110'}`}>
                         {isUploading ? <RefreshCw className="w-10 h-10 animate-spin" /> : <ImageIcon className="w-10 h-10" />}
                      </div>
                      <div>
                         <p className="text-xl font-black text-dark italic uppercase">{isUploading ? 'Transmitting...' : 'Tap to Upload'}</p>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Up to 15MB Secured Link</p>
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
                   </div>

                   <div className="flex gap-4 pt-10">
                      <button 
                         type="submit"
                         disabled={isUploading}
                         className="flex-1 py-6 bg-dark text-white rounded-[2rem] text-xs font-black uppercase italic tracking-widest shadow-2xl shadow-dark/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                      >
                         Confirm Upload
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowUpload(false)}
                        className="flex-1 py-6 bg-slate-50 border border-slate-100 text-dark rounded-[2rem] text-xs font-black uppercase italic tracking-widest hover:bg-slate-100 transition-all"
                      >
                         Cancel
                      </button>
                    </div>
                 </form>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      {/* Record Viewer Modal */}
      <AnimatePresence>
        {showViewer && viewingRecord && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-dark/95 backdrop-blur-xl"
          >
             <motion.div 
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 40 }}
                className="bg-white w-full max-w-4xl h-[90vh] rounded-[4rem] overflow-hidden flex flex-col relative shadow-2xl"
              >
                {/* Viewer Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                         <FileText className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-xl font-black text-dark italic uppercase leading-none">{viewingRecord.name}</h3>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Authorized Copy • ID: {viewingRecord.id}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                         onClick={() => handleDownload(viewingRecord)}
                         className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all"
                      >
                         <Download className="w-5 h-5" />
                      </button>
                      <button 
                         onClick={() => setShowViewer(false)}
                         className="p-3 bg-dark text-white rounded-2xl hover:bg-rose-500 transition-all"
                      >
                         <X className="w-5 h-5" />
                      </button>
                   </div>
                </div>

                {/* Viewer Content */}
                <div className="flex-1 overflow-y-auto p-12 bg-slate-100/50">
                    <div className="max-w-2xl mx-auto space-y-12 bg-white p-12 lg:p-20 rounded-[3rem] shadow-xl border border-slate-200 min-h-screen relative overflow-hidden">
                        {/* Realistic document simulation */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                            <div className="space-y-6">
                               <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/20">S</div>
                                  <div className="flex flex-col">
                                     <span className="text-xl font-black text-dark tracking-tighter uppercase italic leading-none">SimpleCare</span>
                                     <span className="text-[10px] font-black text-primary italic uppercase tracking-widest mt-1">Verified Medical Network</span>
                                  </div>
                               </div>
                               
                               {/* Verified Provider Section */}
                               <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center gap-4 relative overflow-hidden group/provider">
                                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                                     <Stethoscope className="w-7 h-7" />
                                  </div>
                                  <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Attending Physician</p>
                                     <h5 className="font-black text-dark uppercase italic leading-tight">{viewingRecord.doctor}</h5>
                                     <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Registered & Active</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                            <div className="text-left sm:text-right space-y-4">
                               <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Clinical ID</p>
                                  <p className="text-sm font-bold text-dark italic">REG-{Math.floor(Math.random() * 89999 + 10000)}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Issuance Date</p>
                                  <p className="text-sm font-bold text-dark italic">{viewingRecord.date}</p>
                               </div>
                            </div>
                         </div>

                        <div className="h-px bg-slate-100 w-full"></div>

                        <div className="space-y-8">
                           <div className="flex items-center gap-3 text-primary">
                              <ShieldCheck className="w-8 h-8" />
                              <h4 className="text-2xl font-black italic uppercase tracking-tight">Prescription <span className="text-dark">Order</span></h4>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-6">
                                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Patient Record</p>
                                    <p className="text-lg font-bold text-dark italic">{user?.name || 'Authorized User'}</p>
                                 </div>
                                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Diagnosis</p>
                                    <p className="text-lg font-bold text-dark italic">Verified Clinical Follow-up</p>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="p-8 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center gap-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                       <RefreshCw className="w-8 h-8" />
                                    </div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Secured Digital Link<br/>Requires Provider Key</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="pt-20 text-center space-y-4">
                           <div className="inline-block px-8 py-3 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase italic tracking-widest border border-emerald-100">
                              Authenticity Verified by Blockchain
                           </div>
                           <p className="text-[9px] font-bold text-slate-300 uppercase italic max-w-sm mx-auto leading-relaxed">
                              This is a digitally signed medical document. Any modification voids the verification token.
                           </p>
                        </div>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StoreSelectionModal 
        isOpen={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
        onForward={handleForwardComplete}
        recordName={selectedRecord?.name}
      />
    </div>
  );
};

const Stethoscope = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

export default HealthVault;
