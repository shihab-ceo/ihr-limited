import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    // Progress meter simulation that gracefully reaches 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDismissing(true);
            setTimeout(onComplete, 700);
          }, 400);
          return 100;
        }
        const increment = Math.random() * 12 + 8;
        return Math.min(100, Math.floor(prev + increment));
      });
    }, 120);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        dismissNow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const dismissNow = () => {
    setIsDismissing(true);
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {!isDismissing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0E0E10] text-[#F3EFE6] px-6 py-10 overflow-hidden select-none"
        >
          {/* Subtle architectural grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <div className="w-full h-full border border-white/20 m-6 max-w-[calc(100%-3rem)] max-h-[calc(100%-3rem)]" />
          </div>

          {/* Top subtle edition index */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl flex items-center justify-between text-xs tracking-[0.25em] text-[#A29D94] uppercase font-mono-code"
          >
            <span>Autumn / Winter · MMXXVI</span>
            <span className="hidden sm:inline">Atelier & Ready-To-Wear</span>
            <button
              onClick={dismissNow}
              className="text-[#E6DFD5] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 hover:underline"
            >
              Skip Intro <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Center Brand Revelation */}
          <div className="flex flex-col items-center text-center my-auto max-w-3xl">
            {/* Architectural subtle monogram mark */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="relative w-16 h-16 border border-[#C5BDB0]/40 flex items-center justify-center rotate-45 transition-transform">
                <span className="-rotate-45 text-sm tracking-widest text-[#E6DFD5] font-serif-brand font-semibold">
                  IHR
                </span>
              </div>
            </motion.div>

            {/* Kinetic Title Reveal: IHR LIMITED */}
            <div className="overflow-hidden py-2">
              <motion.h1
                initial={{ y: 70, opacity: 0, letterSpacing: '0.15em' }}
                animate={{ y: 0, opacity: 1, letterSpacing: '0.45em' }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-brand text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F7F4EE] whitespace-nowrap pl-4"
              >
                IHR LIMITED
              </motion.h1>
            </div>

            {/* Hairline expanding divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 sm:w-80 h-[1px] bg-gradient-to-r from-transparent via-[#C5BDB0]/70 to-transparent my-6"
            />

            {/* Sub-label and craftsmanship tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B8B1A5] font-medium"
            >
              Architectural Tailoring & Timeless Essentials
            </motion.p>
          </div>

          {/* Bottom interactive progress bar and quick enter button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full max-w-md flex flex-col items-center gap-4"
          >
            <div className="w-full bg-white/10 h-[2px] overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#E6DFD5]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="w-full flex items-center justify-between text-xs text-[#A29D94] font-mono-code">
              <span>INITIALIZING BOUTIQUE</span>
              <span>{progress}%</span>
            </div>

            <motion.button
              onClick={dismissNow}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 px-8 py-2.5 bg-[#F5F2EB] text-[#141416] text-xs font-semibold tracking-[0.2em] uppercase rounded-none hover:bg-white transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              Enter Storefront
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
