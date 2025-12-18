import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Zap, Clock, Share2, Sparkles, AlertCircle, Users } from 'lucide-react';
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

  const handleShareViaWhatsApp = () => {
    const message = "🎓 51Talk Special Offer - 45% OFF + 10 FREE AI Lessons!\n⏰ Limited time only!\n👉 Check out Sara's personalized learning plan now!";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00B4EE 0%, #5ECEF5 40%, #FDE700 100%)' }}>
      {/* Decorative Elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

      <div className="relative z-10 text-center">
        {/* Tag Line */}
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
          <Zap size={14} className="text-white" />
          <span className="text-white text-xs font-medium">Limited Offer</span>
        </div>

        {/* Main Title */}
        <div className="mb-4">
          <h3 className="text-white font-bold text-xl mb-2">
            Enroll Today <span className="text-white font-black">+ 10 FREE</span> AI Lessons
          </h3>
          <div className="inline-flex items-center gap-2 bg-white/95 rounded-full px-4 py-1.5">
            <Sparkles size={16} className="text-brand" />
            <span className="text-royal font-black text-lg">45% OFF</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock size={16} className="text-white/80" />
          <span className="text-white/80 text-xs">Offer ends in</span>
        </div>
        <CountdownTimer initialSeconds={initialTime} />

        {/* Share Button */}
        <button
          onClick={handleShareViaWhatsApp}
          className="mt-4 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 border border-white/30"
        >
          <Share2 size={16} />
          Share this offer via WhatsApp
        </button>
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

  const handleSharePackage = (pkg: any) => {
    const message = `🎓 51Talk ${pkg.title}\n✨ 45% OFF Special Offer\n📚 ${pkg.lessonCount} lessons | ${pkg.frequency}\n🎁 + 10 FREE AI Lessons\n⚠️ Limited seats available!\n👉 Contact us now!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Recommended Learning Plans for Sara">
      <div className="space-y-4">
        {/* Limited Offer Countdown Banner */}
        <LimitedOfferBanner />

        {/* AI Recommendation Note */}
        <p className="text-xs text-gray-400 text-center -mt-2 mb-2">
          Based on AI assessment of Sara's current level, we've created these personalized growth plans
        </p>

        {/* Package List */}
        <div className="space-y-3">
          {packagesList.map((pkg) => (
            <div key={pkg.id} className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* 45% OFF Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-brand to-yellow-400 text-royal text-xs font-black px-3 py-1 rounded-bl-xl rounded-tr-xl shadow-md">
                45% OFF
              </div>

              <div className="flex justify-between items-start mb-3 pr-16">
                <div>
                  <h4 className="font-bold text-royal text-lg">{pkg.title}</h4>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {pkg.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lessons & Schedule Info */}
              <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg mb-3">
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={14} className="text-brand" />
                  <span className="font-medium">{pkg.lessonCount} Lessons</span>
                </div>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-brand" />
                  <span className="font-medium">{pkg.frequency}</span>
                </div>
              </div>

              {/* AI Lessons Highlight */}
              <div className="flex items-center gap-2 bg-brand/10 border border-brand/30 rounded-lg p-2.5 mb-3">
                <Sparkles size={16} className="text-brand flex-shrink-0" />
                <span className="text-xs font-bold text-royal">Includes 10 FREE AI Speaking Lessons</span>
              </div>

              {/* Limited Seats Warning */}
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2.5 mb-3">
                <Users size={16} className="text-orange-600 flex-shrink-0" />
                <span className="text-xs font-bold text-orange-700">Limited seats - Only 100 spots available!</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="border-2 border-brand text-brand hover:bg-brand hover:text-royal font-bold py-2.5 rounded-lg text-sm transition-colors">
                  Select Plan
                </button>
                <button
                  onClick={() => handleSharePackage(pkg)}
                  className="bg-success hover:bg-success/90 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-gray-400 pt-2 flex items-center justify-center gap-1">
          <AlertCircle size={12} />
          Tap Select to confirm via WhatsApp consultant
        </p>
      </div>
    </Dialog>
  );
};

export default PlanSelectionDialog;


