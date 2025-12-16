import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Zap, Clock } from 'lucide-react';
import { Dialog } from './Dialog';
import { StudentData } from '../data/reportData';

// ============================================
// COUNTDOWN TIMER COMPONENT
// ============================================

interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Hours */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className="text-brand font-mono font-bold text-2xl">
          {formatNumber(hours)}
        </span>
      </div>
      <span className="text-white/60 text-xl font-bold">:</span>
      {/* Minutes */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className="text-brand font-mono font-bold text-2xl">
          {formatNumber(minutes)}
        </span>
      </div>
      <span className="text-white/60 text-xl font-bold">:</span>
      {/* Seconds */}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className="text-brand font-mono font-bold text-2xl">
          {formatNumber(secs)}
        </span>
      </div>
    </div>
  );
};

// ============================================
// LIMITED OFFER BANNER
// ============================================

const LimitedOfferBanner: React.FC = () => {
  // Start with ~8 hours (28800 seconds)
  const initialTime = 28800;

  return (
    <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00B4EE 0%, #5ECEF5 40%, #FDE700 100%)' }}>
      {/* Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

      <div className="relative z-10 text-center">
        {/* Tag Line */}
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
          <Zap size={14} className="text-white" />
          <span className="text-white text-xs font-medium">新学员限时礼遇 Limited Offer</span>
        </div>

        {/* Main Title */}
        <h3 className="text-white font-bold text-lg mb-4">
          今日报名 <span className="text-white font-black">+10 节</span> AI 口语课
        </h3>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock size={16} className="text-white/80" />
          <span className="text-white/80 text-xs">优惠倒计时</span>
        </div>
        <CountdownTimer initialSeconds={initialTime} />
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

interface PlanSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packages: StudentData['packages'];
}

export const PlanSelectionDialog = ({ isOpen, onClose, packages }: PlanSelectionDialogProps) => {
  const packagesList = Object.values(packages);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="为 Sara 推荐的进阶方案">
      <div className="space-y-4">
        {/* Limited Offer Countdown Banner */}
        <LimitedOfferBanner />

        {/* AI Recommendation Note */}
        <p className="text-xs text-gray-400 text-center -mt-2 mb-2">
          基于 AI 对 Sara 当前水平的精准评估，我们为您定制了以下专属成长计划
        </p>

        {/* Package List */}
        <div className="space-y-3">
          {packagesList.map((pkg) => (
            <div key={pkg.id} className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {pkg.tags.includes("最受欢迎") && (
                <div className="absolute top-0 right-0 bg-brand text-royal text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                  推荐
                </div>
              )}

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-royal">{pkg.title}</h4>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {pkg.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-brand-600">{pkg.price}</div>
                  <div className="text-[10px] text-gray-400 line-through">原价 ${parseInt(pkg.price.replace('$', '')) * 1.2}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={14} className="text-brand" />
                  <span>{pkg.lessonCount} 课时</span>
                </div>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-brand" />
                  <span>{pkg.frequency}</span>
                </div>
              </div>

              <button className="w-full mt-3 border border-brand text-brand hover:bg-brand hover:text-royal font-bold py-2 rounded-lg text-sm transition-colors">
                选择此方案
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-gray-400 pt-2">
          点击选择后将跳转至 WhatsApp 顾问确认排课
        </p>
      </div>
    </Dialog>
  );
};

export default PlanSelectionDialog;
