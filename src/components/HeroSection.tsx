import React from 'react';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenLookbook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenLookbook,
}) => {
  return (
    <section className="relative w-full bg-[#141416] text-[#F5F2EB] overflow-hidden border-b border-[#2C2C30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Architectural Editorial Text */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Quiet Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#B5AFA4] font-medium mb-4">
              <span>Collection 04</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter 2026</span>
            </div>

            <h1 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-[#FAF8F5] mb-6 [text-wrap:balance]">
              Architectural Form, Precision & Timeless Fluidity
            </h1>

            <p className="text-sm sm:text-base text-[#BFB9AD] leading-relaxed mb-8 max-w-lg font-light">
              Crafted from noble fibers woven in Biella and Kurashiki. Sculptural tailoring engineered for contemporary movement, enduring weight, and quiet distinction.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3 bg-[#FAF8F5] text-[#141416] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-white transition-all cursor-pointer flex items-center gap-2 group shadow-sm"
              >
                <span>Explore The Pieces</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenLookbook}
                className="px-5 py-3 border border-white/25 text-[#E6DFD5] text-xs font-medium tracking-[0.18em] uppercase hover:border-white hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Atelier Lookbook</span>
              </button>
            </div>

            {/* Editorial trust markers */}
            <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-mono-code text-xs text-white/50 tracking-wider uppercase">Fibers</span>
                <span className="text-xs sm:text-sm font-medium text-[#FAF8F5]">Super 120s & Cashmere</span>
              </div>
              <div>
                <span className="block font-mono-code text-xs text-white/50 tracking-wider uppercase">Origins</span>
                <span className="text-xs sm:text-sm font-medium text-[#FAF8F5]">Biella & Okayama</span>
              </div>
              <div>
                <span className="block font-mono-code text-xs text-white/50 tracking-wider uppercase">Edition</span>
                <span className="text-xs sm:text-sm font-medium text-[#FAF8F5]">Numbered Batches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High Fashion Campaign Imagery */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-[#242428] shadow-2xl">
              <img
                src="/src/assets/images/ihr_hero_campaign_1791814754899.jpg"
                alt="IHR Limited Autumn/Winter Campaign Models in Architectural Tailored Overcoats"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Quiet caption badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] tracking-widest uppercase font-mono-code text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
                <span>Campaign Shot 01 — Gallery Space</span>
                <span>Milan / London</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
