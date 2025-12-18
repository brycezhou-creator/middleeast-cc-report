import React, { useState } from 'react';
import { Play, Pause, Languages } from 'lucide-react';
import { TeacherInfo } from '../data/reportData';

interface TeacherMessageSectionProps {
  teacher: TeacherInfo;
}

export const TeacherMessageSection = ({ teacher }: TeacherMessageSectionProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);

  return (
    <section className="px-5 mt-10 mb-8">
      <h3 className="text-white font-bold text-lg mb-4">Message from Teacher</h3>
      <div className="bg-surface rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-4 mb-4">
          <img src={teacher.avatar} alt="Teacher" className="w-14 h-14 rounded-full border-2 border-gray-100" />
          <div>
            <h4 className="text-dark font-bold text-lg">{teacher.name}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-brand">★</span> 5.0 Certified
            </div>
          </div>
        </div>

        {/* Audio Player Sim */}
        <button
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          className={`w-full p-3 rounded-xl mb-4 flex items-center justify-center gap-2 transition-all ${isAudioPlaying ? 'bg-brand text-royal shadow-inner' : 'bg-royal text-white shadow-md'
            }`}
        >
          {isAudioPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          <span className="font-bold text-sm">
            {isAudioPlaying ? "Playing message..." : "Listen to voice message"}
          </span>
        </button>

        {/* Message Text with Translation */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-4xl text-brand/20 font-serif leading-none absolute top-2 start-2">"</span>
            <div className="w-full ps-6 pe-2 relative z-10">
              <p className="text-dark/80 italic text-sm leading-relaxed font-serif">
                {isTranslated ? teacher.commentTranslated : teacher.comment}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTranslated(!isTranslated)}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-royal hover:underline ms-auto w-fit"
          >
            <Languages size={14} />
            {isTranslated ? "Show Original" : "Show Arabic"}
          </button>
        </div>
      </div>
    </section>
  );
};



