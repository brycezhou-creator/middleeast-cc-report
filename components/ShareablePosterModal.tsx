import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, MessageCircle, BookOpen, Loader2, Camera, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

// ============================================
// CONSTANTS
// ============================================

// Using more stable JPG avatar to prevent SVG screenshot failures
const ME_GIRL_AVATAR_URL = "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara&backgroundColor=b6e3f4&skinColor=ecad80&hair=long16&hairColor=0e0e0e&eyes=variant01&eyebrows=variant01&mouth=variant01";
const CLASSROOM_MOMENT_URL = "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";

const POSTER_DATA = {
  words: ["Orbit", "Gravity", "Space", "Launch"],
  score: 78,
  comment: "Excellent pronunciation today! Sara did a great job describing the planets.",
  date: new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
};

// ============================================
// WHATSAPP ICON
// ============================================
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ============================================
// POSTER CONTENT (The visible part)
// ============================================
interface PosterContentProps {
  studentName: string;
  posterRef: React.RefObject<HTMLDivElement>;
  qrCodeUrl: string;
}

const PosterContent: React.FC<PosterContentProps> = ({ studentName, posterRef, qrCodeUrl }) => {
  return (
    <div
      ref={posterRef}
      className="w-full bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-2xl"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Header */}
      <div className="bg-royal px-6 py-8 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
            <img
              src={ME_GIRL_AVATAR_URL}
              alt={studentName}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <h2 className="text-white font-bold text-2xl mt-4">{studentName}</h2>
          <p className="text-blue-200 text-sm font-medium mt-1">{POSTER_DATA.date}</p>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-white">
        {/* Moment */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-brand/20 rounded-lg">
              <Camera size={16} className="text-royal" />
            </div>
            <h3 className="text-royal font-bold text-sm">Happy Moment</h3>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border-4 border-white rotate-1 bg-gray-100">
            <img
              src={CLASSROOM_MOMENT_URL}
              alt="Classroom"
              className="w-full h-40 object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Words */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-brand/20 rounded-lg">
              <BookOpen size={16} className="text-royal" />
            </div>
            <h3 className="text-royal font-bold text-sm">Today's Words</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {POSTER_DATA.words.map((word, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-50 text-royal font-bold rounded-xl border border-gray-100 text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand/10 rounded-bl-full" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Class Score</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-5xl font-black text-royal">{POSTER_DATA.score}</span>
            <span className="text-lg text-gray-400 font-medium self-end mb-1">/100</span>
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(POSTER_DATA.score >= 80 ? 5 : POSTER_DATA.score >= 60 ? 4 : 3)].map((_, i) => (
              <Star key={i} size={18} className="text-brand fill-brand" />
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-royal/5 rounded-2xl p-5 border border-royal/10">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle size={14} className="text-royal" />
            <span className="text-royal text-xs font-bold">Teacher Feedback</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed italic font-medium">
            "{POSTER_DATA.comment}"
          </p>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-dashed border-gray-100 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-royal rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">51</span>
            </div>
            <div>
              <p className="text-royal text-base font-black leading-tight">51Talk</p>
              <p className="text-gray-400 text-[10px] font-medium">Global English Education</p>
            </div>
          </div>
          <div className="w-14 h-14 bg-white border border-gray-200 p-1 rounded-lg">
            <img src={qrCodeUrl} alt="QR" className="w-full h-full object-cover rounded" crossOrigin="anonymous" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN MODAL
// ============================================

interface ShareablePosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterData: {
    studentName: string;
    studentAvatar: string; // Not used now, using hardcoded high-res image
    qrCodeUrl: string;
  };
}

export const ShareablePosterModal = ({ isOpen, onClose, posterData }: ShareablePosterModalProps) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Generate Image Logic
  const generateImageBlob = async () => {
    if (!posterRef.current) return null;
    try {
      // Small delay to ensure images render
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(posterRef.current, {
        scale: 3, // High resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: posterRef.current.offsetWidth,
        height: posterRef.current.offsetHeight,
      });
      return await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    const blob = await generateImageBlob();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${posterData.studentName}_Report.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
    setIsGenerating(false);
  };

  const handleShare = async () => {
    setIsGenerating(true);
    const blob = await generateImageBlob();

    if (blob) {
      // 1. Try Native Share (Mobile)
      if (navigator.share) {
        try {
          const file = new File([blob], 'report.png', { type: 'image/png' });
          await navigator.share({
            title: `Sara's Learning Report`,
            text: 'Check out Sara\'s progress on 51Talk!',
            files: [file]
          });
        } catch (e) {
          console.log('Share canceled or failed', e);
        }
      } else {
        // 2. Fallback for Desktop: Open WhatsApp Web with text
        const text = "Check out Sara's progress on 51Talk!";
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        alert("Image generated! Please save manually and send to WhatsApp.");
        // Also trigger download so they have the image
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Sara_Report.png`;
        link.href = url;
        link.click();
      }
    }
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <div dir="rtl">
      {/* Fixed Bottom Action Bar - OUTSIDE of AnimatePresence/motion.div to fix 'fixed' positioning */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-[999] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={handleShare}
            disabled={isGenerating}
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-70 shadow-lg shadow-green-200"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <WhatsAppIcon size={20} />}
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1 bg-brand hover:bg-brand/90 text-dark font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-brand/20 animate-pulse relative overflow-hidden group"
          >
            {/* 流光效果 */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />

            {isGenerating ? <Loader2 className="animate-spin" /> : <Download size={20} />}
            <span>Save Image</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-[100] overflow-y-auto"
        >
          {/* Close Button - Fixed Top Left (RTL) */}
          <button
            onClick={onClose}
            className="fixed top-4 left-4 z-[150] bg-white/10 p-2 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Decorative Sunburst (Top Right) */}
          <div className="fixed top-0 right-0 pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-brand/10 w-[300px] h-[300px] -mr-20 -mt-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M50 0L54 40L94 40L58 60L70 98L50 70L30 98L42 60L6 40L46 40Z" />
              </svg>
            </motion.div>
          </div>

          {/* Scrollable Container */}
          <div className="min-h-full flex flex-col items-center py-10 px-4 pb-32 relative z-10">

            {/* Success Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 relative"
            >
              <div className="inline-block relative">
                <h2 className="text-2xl font-bold text-white relative z-10">Generation Success!</h2>
                {/* Underline/Highlight decoration */}
                <div className="absolute -bottom-2 right-0 w-full h-3 bg-brand/30 -skew-x-6"></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">Your honor poster is ready to share</p>
            </motion.div>

            {/* POSTER AREA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-[340px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <PosterContent
                studentName={posterData.studentName}
                posterRef={posterRef}
                qrCodeUrl={posterData.qrCodeUrl}
              />
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShareablePosterModal;

