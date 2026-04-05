import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4 border-t border-slate-100">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl text-slate-400 hover:text-dark hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-1">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              currentPage === p 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-dark'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl text-slate-400 hover:text-dark hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
