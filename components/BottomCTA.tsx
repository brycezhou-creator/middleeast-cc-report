import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface BottomCTAProps {
  studentName: string;
  onOpenPlanSelection: () => void;
}

export const BottomCTA = ({ studentName, onOpenPlanSelection }: BottomCTAProps) => {
  return (
    <div className="fixed bottom-0 start-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 pb-safe z-50">
      <button
        onClick={onOpenPlanSelection}
        className="w-full bg-success hover:bg-[#43a865] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-success/30 flex items-center justify-center transition-transform active:scale-95 group"
      >
        <MessageCircle className="w-5 h-5 me-2 fill-white text-white" />
        <span>Get {studentName}'s Personalized Plan</span>
        <ChevronRight className="w-4 h-4 ms-1 opacity-70 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};



