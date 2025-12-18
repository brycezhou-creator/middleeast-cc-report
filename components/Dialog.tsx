import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, title, children }: DialogProps) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-sm p-6 relative text-dark shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand via-yellow-400 to-brand"></div>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 end-4 text-gray-400 hover:text-gray-600 bg-gray-50 p-1 rounded-full z-10"
          >
            <X size={20} />
          </button>
          
          <h3 className="text-xl font-bold mb-4 text-royal pe-6">{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};



