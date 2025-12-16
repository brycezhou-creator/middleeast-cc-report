import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ============================================
// CONSTANTS
// ============================================

// 中东卡通女孩头像 placeholder
const ME_GIRL_AVATAR_URL = "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara&backgroundColor=b6e3f4&skinColor=ecad80&hair=long16&hairColor=0e0e0e&eyes=variant01&eyebrows=variant01&mouth=variant01";
// 课堂开心瞬间截图 placeholder
const CLASSROOM_MOMENT_URL = "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";

// ============================================
// COMPONENT
// ============================================

interface SharePosterCTAProps {
  studentName: string;
  onOpenPoster: () => void;
}

export const SharePosterCTA = ({ studentName, onOpenPoster }: SharePosterCTAProps) => {
  return (
    <section className="px-5 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 overflow-hidden"
      >
        {/* Dual Column Layout */}
        <div className="flex gap-4">
          {/* Left Column: Text + Button */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Header with Avatar */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand shadow-sm flex-shrink-0">
                <img
                  src={ME_GIRL_AVATAR_URL}
                  alt={studentName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm leading-tight">
                  记录 {studentName} 的成长
                </h3>
                <p className="text-gray-500 text-xs">
                  生成今日学习日记
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onOpenPoster}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand hover:bg-brand/90 text-dark font-bold py-2.5 px-4 rounded-xl shadow-md shadow-brand/20 flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Sparkles size={16} />
              <span>生成学习海报</span>
            </motion.button>
          </div>

          {/* Right Column: Polaroid-style Photo */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="relative"
              style={{ transform: 'rotate(3deg)' }}
            >
              {/* Photo Container - Polaroid Style */}
              <div className="w-28 h-24 rounded-xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <img
                  src={CLASSROOM_MOMENT_URL}
                  alt="Classroom moment"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative tape effect */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-brand/40 rounded-sm" />
              {/* Sparkle decoration */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand rounded-full flex items-center justify-center shadow-sm">
                <Sparkles size={12} className="text-dark" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SharePosterCTA;
