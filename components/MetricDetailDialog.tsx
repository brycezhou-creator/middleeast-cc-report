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
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`${metric.subject} 分析`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-royal/5 p-4 rounded-xl">
          <div>
            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">当前得分</div>
            <div className="text-3xl font-bold text-royal">{metric.student}<span className="text-sm text-gray-400 font-normal">/100</span></div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">全球对比</div>
            <div className="inline-flex items-center gap-1 bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              Top {(100 - (metric.student > 95 ? 95 : metric.student - 10)).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-dark flex items-center gap-2">
            <span className="w-1 h-4 bg-brand rounded-full"></span>
            详细评估
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
            {metric.analysis || "表现优异，继续保持！"}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-bold text-dark flex items-center gap-2">
            <Lightbulb size={14} className="text-brand fill-brand" />
            提升建议
          </h4>
          <p className="text-sm text-royal bg-brand/10 p-3 rounded-lg border border-brand/20">
            {metric.tip || "建议增加阅读量，保持语感。"}
          </p>
        </div>
      </div>
    </Dialog>
  );
};

