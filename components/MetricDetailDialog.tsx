import React from 'react';
import { TrendingUp, Lightbulb } from 'lucide-react';
import { Dialog } from './Dialog';
import { RadarMetric } from '../data/reportData';

interface MetricDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  metric: RadarMetric;
}

export const MetricDetailDialog = ({ isOpen, onClose, metric }: MetricDetailDialogProps) => {
  // Calculate realistic percentile based on student vs average comparison
  // Formula: percentile = 50 - (student - average) * 0.5
  // This means: if student = average, percentile = 50%
  // If student > average by 10, percentile = 45% (better ranking)
  // If student < average by 10, percentile = 55% (worse ranking)
  const calculatePercentile = () => {
    const diff = metric.student - metric.average;
    let percentile = 50 - (diff * 0.5);
    // Clamp between 10% and 90% for realism
    percentile = Math.max(10, Math.min(90, percentile));
    return percentile.toFixed(0);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`${metric.subject} Analysis`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-royal/5 p-4 rounded-xl">
          <div>
            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Current Score</div>
            <div className="text-3xl font-bold text-royal">{metric.student}<span className="text-sm text-gray-400 font-normal">/100</span></div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">51Talk Ranking</div>
            <div className="inline-flex items-center gap-1 bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              Top {calculatePercentile()}%
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-dark flex items-center gap-2">
            <span className="w-1 h-4 bg-brand rounded-full"></span>
            Detailed Assessment
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
            {metric.analysis || "Excellent performance! Keep it up!"}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-dark flex items-center gap-2">
            <Lightbulb size={14} className="text-brand fill-brand" />
            Improvement Tips
          </h4>
          <p className="text-sm text-royal bg-brand/10 p-3 rounded-lg border border-brand/20">
            {metric.tip || "Increase reading practice to maintain language sense."}
          </p>
        </div>
      </div>
    </Dialog>
  );
};



