import React from 'react';
import { Target, BookOpen, Sparkles } from 'lucide-react';
import { Dialog } from './Dialog';
import { PathMilestone } from '../data/reportData';

interface MilestoneDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: PathMilestone;
}

export const MilestoneDetailDialog = ({ isOpen, onClose, milestone }: MilestoneDetailDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={milestone.title}>
      <div className="space-y-5">
        
        {/* Why Sara can do it */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <h4 className="text-sm font-bold text-royal flex items-center gap-2 mb-2">
            <Target size={16} className="text-brand" />
            为什么 Sara 能做到？
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {milestone.potentialAnalysis}
          </p>
        </div>

        {/* Educational Value */}
        <div>
          <h4 className="text-sm font-bold text-dark flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-gray-400" />
            教育价值
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-brand/30 pl-3">
            {milestone.educationalValue}
          </p>
        </div>

        {/* Our Methodology */}
        <div>
          <h4 className="text-sm font-bold text-dark flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-yellow-500" />
            我们的课堂如何赋能
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {milestone.methodology}
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-2 bg-royal text-white font-bold py-3 rounded-xl shadow-lg hover:bg-royal/90 transition-colors"
        >
          了解了，期待 Sara 的进步
        </button>
      </div>
    </Dialog>
  );
};

