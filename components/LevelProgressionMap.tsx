import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollHint } from './ScrollHint';

interface LevelProgressionMapProps {
    currentLevel: string; // e.g., "L2"
    targetLevel: string;  // e.g., "L3"
}

const LEVELS = [
    { id: 'LS', label: 'LS', height: 40 },
    { id: 'L0', label: 'L0', height: 48 },
    { id: 'L1', label: 'L1', height: 56 },
    { id: 'L2', label: 'L2', height: 64 },
    { id: 'L3', label: 'L3', height: 72 },
    { id: 'L4', label: 'L4', height: 80 },
    { id: 'L5', label: 'L5', height: 88 },
    { id: 'L6', label: 'L6', height: 96 },
    { id: 'L7', label: 'L7', height: 104 },
    { id: 'L8', label: 'L8', height: 112 },
    { id: 'L9', label: 'L9', height: 120 },
];

export const LevelProgressionMap: React.FC<LevelProgressionMapProps> = ({ currentLevel, targetLevel }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(scrollRef, { once: true, amount: 0.1 });

    const currentIndex = LEVELS.findIndex(l => l.id === currentLevel);

    return (
        <section className="px-5 mt-8 w-full">
            <div className="bg-surface backdrop-blur-sm border border-white/20 rounded-2xl shadow-card overflow-hidden">
                {/* Header */}
                <div className="p-4 flex items-center border-b border-gray-100 relative z-10">
                    <h3 className="text-dark font-bold flex items-center gap-2">
                        <span className="w-2 h-6 bg-brand rounded-full"></span>
                        Level Progression
                    </h3>
                </div>

                <div className="p-6 relative">
                    <div className="mb-2 relative z-10">
                        {/* Info Card / Legend to fill whitespace */}
                        <div className="bg-royal/5 rounded-xl p-3 border border-royal/10">
                            <p className="text-slate-500 text-xs leading-relaxed">
                                Based on international <span className="font-semibold text-royal">CEFR & Cambridge</span> standards, visualizing Sara's English growth journey.
                            </p>
                        </div>
                    </div>

                    {/* Scroll Container Wrapper for Hint */}
                    <div className="relative">
                        <ScrollHint scrollRef={scrollRef} className="-right-2" />

                        {/* Scroll Container */}
                        <div ref={scrollRef} className="overflow-x-auto pt-10 pb-4 -mx-2 px-2 no-scrollbar">
                            <div className="min-w-[650px] relative">

                                {/* Main Grid: 12 Columns (1 Header + 11 Data) */}
                                <div className="grid grid-cols-[80px_repeat(11,1fr)] gap-x-1 gap-y-1">

                                    {/* Row 1: Bars Spacer */}
                                    <div className="h-[140px]"></div>

                                    {/* Bar Cells */}
                                    {LEVELS.map((level, index) => {
                                        const isCurrent = level.id === currentLevel;
                                        const isTarget = level.id === targetLevel;
                                        const isPast = index < currentIndex;

                                        const isActive = isPast || isCurrent;
                                        const barColor = isActive ? 'bg-brand' : 'bg-royal';
                                        const textColor = isActive ? 'text-royal' : 'text-white';

                                        return (
                                            <div key={level.id} className="h-[140px] flex flex-col justify-end relative">

                                                {/* Sara's Level - Positioned on top of the bar */}
                                                {isCurrent && (
                                                    <div
                                                        className="absolute left-1/2 -translate-x-1/2 z-30 w-[140px]"
                                                        style={{ bottom: `${level.height}px` }}
                                                    >
                                                        <div className="flex flex-col items-center animate-bounce">
                                                            <div className="bg-brand text-royal text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap mb-1 text-center leading-tight border-2 border-white">
                                                                Sara's Level
                                                            </div>
                                                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand filter drop-shadow-sm"></div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Recommended Level - Positioned on top of the bar */}
                                                {isTarget && (
                                                    <div
                                                        className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-[140px]"
                                                        style={{ bottom: `${level.height}px` }}
                                                    >
                                                        <div className="bg-royal text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md whitespace-nowrap mb-1 text-center leading-tight">
                                                            Recommended<br />Level
                                                        </div>
                                                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-royal"></div>
                                                    </div>
                                                )}

                                                {/* The Bar */}
                                                <motion.div
                                                    className={`w-full rounded-t-lg flex items-start justify-center pt-2 text-xs font-bold ${barColor} ${textColor}`}
                                                    style={{ height: `${level.height}px` }}
                                                    initial={{ height: 0 }}
                                                    animate={isInView ? { height: `${level.height}px` } : {}}
                                                    transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                                                >
                                                    {level.label}
                                                </motion.div>
                                            </div>
                                        );
                                    })}

                                    {/* Row 2: CEFR */}
                                    <div className="bg-gray-100 rounded-l-md flex items-center justify-center text-[10px] font-bold text-gray-500 h-8">
                                        CEFR
                                    </div>
                                    <div className="col-span-2 bg-brand/30 flex items-center justify-center text-[10px] font-medium text-dark h-8 border-r border-white">Pre A1</div>
                                    <div className="col-span-2 bg-brand/50 flex items-center justify-center text-[10px] font-medium text-dark h-8 border-r border-white">A1</div>
                                    <div className="col-span-2 bg-royal/40 flex items-center justify-center text-[10px] font-medium text-white h-8 border-r border-white">A1-A2</div>
                                    <div className="col-span-2 bg-royal/60 flex items-center justify-center text-[10px] font-medium text-white h-8 border-r border-white">A2</div>
                                    <div className="col-span-3 bg-royal/80 rounded-r-md flex items-center justify-center text-[10px] font-medium text-white h-8">B1</div>

                                    {/* Row 3: Cambridge */}
                                    <div className="bg-gray-100 rounded-l-md flex items-center justify-center text-[10px] font-bold text-gray-500 h-8 mt-1">
                                        Cambridge
                                    </div>
                                    <div className="col-span-2 bg-brand/20 flex items-center justify-center text-[10px] font-medium text-dark h-8 mt-1 border-r border-white">-</div>
                                    <div className="col-span-2 bg-brand/40 flex items-center justify-center text-[10px] font-medium text-dark h-8 mt-1 border-r border-white leading-tight px-1 text-center">Starters/ Movers</div>
                                    <div className="col-span-2 bg-royal/30 flex items-center justify-center text-[10px] font-medium text-royal h-8 mt-1 border-r border-white leading-tight px-1 text-center">Movers/ Flyers</div>
                                    <div className="col-span-2 bg-royal/50 flex items-center justify-center text-[10px] font-medium text-white h-8 mt-1 border-r border-white leading-tight px-1 text-center">Flyers/ KET</div>
                                    <div className="col-span-3 bg-royal flex items-center justify-center text-[10px] font-medium text-white h-8 mt-1 rounded-r-md">PET</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
