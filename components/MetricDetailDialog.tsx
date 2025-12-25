import React from 'react';
import { X, ClipboardList, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarMetric } from '../data/reportData';

interface MetricDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  metric: RadarMetric;
}

// Circular Progress Component - 使用宝贝黄 #FDE700
const CircularProgress = ({ percentage, size = 100 }: { percentage: number; size?: number }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle - 宝贝黄 #FDE700 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FDE700"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black text-royal">Top {percentage}%</span>
      </div>
    </div>
  );
};

export const MetricDetailDialog = ({ isOpen, onClose, metric }: MetricDetailDialogProps) => {
  // Calculate realistic percentile based on student vs average comparison
  const calculatePercentile = () => {
    const diff = metric.student - metric.average;
    let percentile = 50 - (diff * 0.5);
    percentile = Math.max(10, Math.min(90, percentile));
    return Math.round(percentile);
  };

  const percentile = calculatePercentile();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />

          {/* Modal - 左对齐布局 (LTR) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            dir="ltr"
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-[201]"
          >
            {/* Close Button - Top Right for LTR */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>

            {/* Content Container - 左对齐 */}
            <div className="p-5 space-y-4">

              {/* Header: Title - 左对齐 */}
              <div className="text-left pt-1">
                <h2 className="text-xl font-bold text-royal">
                  {metric.subject} Analysis
                </h2>
              </div>

              {/* Hero Section: Circular Progress - 左对齐 */}
              <div className="bg-royal/5 rounded-2xl p-4 flex flex-col items-start">
                <p className="text-xs text-gray-500 mb-2 font-medium">51Talk Ranking</p>
                <div className="w-full flex justify-center">
                  <CircularProgress percentage={percentile} size={100} />
                </div>
              </div>

              {/* Module A: Detailed Assessment - 左对齐 */}
              <div className="bg-white border border-royal/10 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-royal/10 rounded-lg">
                    <ClipboardList size={16} className="text-royal" />
                  </div>
                  <h3 className="text-sm font-bold text-dark">Detailed Assessment</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm text-left">
                  {metric.analysis || "Excellent performance! Keep up the great work and continue practicing regularly."}
                </p>
              </div>

              {/* Module B: Improvement Tips - 左对齐 */}
              <div className="bg-brand/10 border border-brand/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-brand/20 rounded-lg">
                    <Lightbulb size={16} className="text-brand fill-brand" />
                  </div>
                  <h3 className="text-sm font-bold text-dark">Improvement Tips</h3>
                </div>
                <p className="text-royal leading-relaxed text-sm text-left">
                  {metric.tip || "Continue practicing with native speakers and focus on daily conversation exercises."}
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MetricDetailDialog;
