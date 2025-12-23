import React from 'react';
import { motion } from 'framer-motion';

export const PosterGenerationAnimation = () => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-none sm:rounded-2xl bg-royal/5 backdrop-blur-sm">
            {/* Base "Ghost" Outline */}
            <div className="w-full h-full bg-white/10 absolute inset-0" />

            {/* Scanning Beam Container */}
            <motion.div
                initial={{ top: "-20%" }}
                animate={{ top: ["-20%", "120%"] }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 1]
                }}
                className="absolute left-0 right-0 h-2 bg-brand shadow-[0_0_20px_4px_rgba(253,231,0,0.6)] z-20"
            >
                {/* Beam Glow */}
                <div className="absolute inset-0 bg-white blur-sm opacity-80" />
            </motion.div>

            {/* Revealed Content Mask (Simulated) */}
            <motion.div
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{
                    duration: 2,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/90 to-transparent z-10 backdrop-blur-none"
            />

            {/* High-Tech Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 500 - 250
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: 1,
                        delay: Math.random() * 1,
                        repeat: Infinity
                    }}
                    className="absolute w-1 h-1 bg-brand rounded-full shadow-glow"
                />
            ))}

            {/* Text Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-royal font-bold text-sm tracking-widest uppercase bg-white/80 px-4 py-1 rounded-full backdrop-blur-md"
                >
                    Generating Report...
                </motion.div>
            </div>
        </div>
    );
};
