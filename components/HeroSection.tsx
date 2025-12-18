import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  name: string;
  avatar: string;
  badge: {
    icon: string;
    label: string;
  };
}

export const HeroSection = ({ name, avatar, badge }: HeroSectionProps) => {
  return (
    <header className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal/50 via-royal/80 to-royal z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501349800519-48093d60bde0?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 z-[-1]" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Avatar with Ripple Effect */}
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-brand rounded-full blur-xl opacity-50"
          />
          <div className="w-28 h-28 rounded-full border-4 border-brand p-1 bg-white/10 backdrop-blur relative shadow-glow">
            <img src={avatar} alt="Student" className="w-full h-full rounded-full object-cover bg-white" />

            {/* Floating Badge */}
            <motion.div
              initial={{ rotate: -10, y: 10 }}
              animate={{ rotate: 0, y: 0 }}
              className="absolute -top-2 -end-4 bg-brand text-royal text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1"
            >
              {badge.icon} {badge.label}
            </motion.div>
          </div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-2 leading-tight"
        >
          {name}'s<br /><span className="text-brand">First Step to Global Success!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-100 text-sm opacity-80 mt-2"
        >
          Trial Class Report
        </motion.p>
      </div>
    </header>
  );
};



