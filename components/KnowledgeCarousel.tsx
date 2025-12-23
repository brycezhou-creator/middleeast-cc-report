import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Pause, Info, Star } from 'lucide-react';
import { VocabularyItem } from '../data/reportData';
import { ScrollHint } from './ScrollHint';

interface KnowledgeCarouselProps {
  vocabularyItems: VocabularyItem[];
}

export const KnowledgeCarousel = ({ vocabularyItems }: KnowledgeCarouselProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePlayAudio = (item: VocabularyItem) => {
    if (playingId === item.id) {
      // Stop playing
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      // Start playing
      if (audioRef.current) {
        audioRef.current.src = item.studentAudioUrl;
        audioRef.current.play();
        setPlayingId(item.id);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-brand fill-brand' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <h3 className="text-dark font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-brand rounded-full"></span>
          Today's Vocabulary
        </h3>
        <div className="bg-brand/10 text-brand text-xs font-bold px-2 py-1 rounded-full">
          {vocabularyItems.length} new words
        </div>
      </div>

      <div className="p-5">

        {/* Horizontal Scrollable Container with Hint */}
        <div className="relative">
          <ScrollHint scrollRef={scrollRef} className="-right-2" />

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {vocabularyItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden snap-center"
              >
                {/* Image */}
                <div className="relative h-28 bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.word}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Word & Translation */}
                  <h4 className="text-royal font-bold text-base mb-0.5">{item.word}</h4>
                  <p className="text-gray-500 text-xs mb-3">{item.translation}</p>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {renderStars(item.rating)}
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => handlePlayAudio(item)}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${playingId === item.id
                      ? 'bg-brand text-royal shadow-inner'
                      : 'bg-royal text-white hover:bg-royal/90 shadow-sm'
                      }`}
                  >
                    {playingId === item.id ? (
                      <>
                        <Pause size={14} fill="currentColor" />
                        <span className="text-xs font-bold">Playing...</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        <span className="text-xs font-bold">Listen to Sara</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setPlayingId(null)}
          className="hidden"
        />

        {/* Bottom Tip */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
          <Info size={14} className="text-brand flex-shrink-0" />
          <span>Swipe to see more, tap to hear Sara's pronunciation</span>
        </div>
      </div>
    </div>
  );
};
