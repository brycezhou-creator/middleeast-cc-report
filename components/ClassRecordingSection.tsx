import React from 'react';
import { motion } from 'framer-motion';
import { Play, MessageCircle } from 'lucide-react';
import { Subtitle } from '../data/reportData';

interface ClassRecordingSectionProps {
  subtitles: Subtitle[];
}

export const ClassRecordingSection = ({ subtitles }: ClassRecordingSectionProps) => {
  return (
    <section className="px-5 -mt-20 relative z-20">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-surface rounded-2xl shadow-card overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-dark font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-brand rounded-full"></span>
            Class Recording
          </h3>
        </div>

        {/* Video Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop&q=80"
            alt="Class recording video"
            className="w-full h-full object-cover"
          />

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play size={36} className="text-royal ml-1" fill="currentColor" />
              </div>
              <div className="bg-black/60 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md">
                Class Recording Video
              </div>
            </div>
          </div>
        </div>

        {/* Smart Subtitles */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">AI Speech Analysis</div>
            <div className="flex items-center gap-1 bg-royal/10 text-royal px-2 py-0.5 rounded text-[10px] font-mono">
              <MessageCircle size={10} />
              Voice Recognition
            </div>
          </div>

          <p className="text-base leading-relaxed font-medium">
            {subtitles.map((sub) => (
              <span
                key={sub.id}
                className={`mx-0.5 ${sub.highlight
                  ? 'text-royal font-bold bg-[#FDE700]/20 px-1.5 py-0.5 rounded'
                  : 'text-gray-700'
                  }`}
              >
                {sub.text}
              </span>
            ))}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Classroom audio-to-text (AI Recognition)
          </div>
        </div>
      </motion.div>
    </section>
  );
};



