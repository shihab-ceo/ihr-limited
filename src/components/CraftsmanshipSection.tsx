import React from 'react';
import { Scissors, ShieldCheck, Sparkles, Feather } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F4F0] border-t border-b border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#8C6C4F] mb-3">
              <span>Philosophy & Sourcing</span>
              <span aria-hidden="true">·</span>
              <span>The IHR Discipline</span>
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#171717] font-light leading-tight mb-6 [text-wrap:balance]">
              Substance Over Fleeting Hype: Woven for Generations
            </h2>

            <p className="text-sm text-[#525252] leading-relaxed mb-6 font-light">
              At IHR Limited, luxury is not defined by excess branding or manufactured scarcity. We source virgin wools exclusively from historical heritage mills in Piedmont and Biella that run entirely on hydro-electric alpine water.
            </p>

            <p className="text-sm text-[#525252] leading-relaxed mb-8 font-light">
              Every garment undergoes a multi-point inspection: unpadded canvases are basted by hand to ensure the lapel maintains its structural roll for decades without delamination.
            </p>

            {/* Adjacent Proof Points */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#E2E2DC]">
              <div>
                <span className="font-mono-code text-2xl font-light text-[#171717] tabular-nums block mb-1">
                  100%
                </span>
                <span className="text-xs font-medium text-[#171717] block">Traceable Single-Origin Fibers</span>
                <span className="text-[11px] text-[#737373] font-light">Certified non-mulesed wool & OEKO-TEX dyes.</span>
              </div>

              <div>
                <span className="font-mono-code text-2xl font-light text-[#171717] tabular-nums block mb-1">
                  500+
                </span>
                <span className="text-xs font-medium text-[#171717] block">Hours per Pattern Iteration</span>
                <span className="text-[11px] text-[#737373] font-light">Engineered for human posture and effortless movement.</span>
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-[#E5E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <Scissors className="w-5 h-5 text-[#8C6C4F] mb-4" />
              <h3 className="text-sm font-semibold text-[#171717] mb-2">Architectural Cuts</h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Balanced proportions designed to frame the physique without restrictive stiffness.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <Feather className="w-5 h-5 text-[#8C6C4F] mb-4" />
              <h3 className="text-sm font-semibold text-[#171717] mb-2">Noble Natural Fibers</h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Heavyweight Mongolian cashmere, Australian merino, and Egyptian compact cotton. Zero petroleum synthetics.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <ShieldCheck className="w-5 h-5 text-[#8C6C4F] mb-4" />
              <h3 className="text-sm font-semibold text-[#171717] mb-2">Lifetime Care Support</h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Complimentary replacement horn buttons, thread matching, and care counsel for all patrons.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5E5DF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <Sparkles className="w-5 h-5 text-[#8C6C4F] mb-4" />
              <h3 className="text-sm font-semibold text-[#171717] mb-2">Limited Batch Integrity</h3>
              <p className="text-xs text-[#525252] leading-relaxed font-light">
                Produced in strictly capped editions to eliminate overproduction and maintain uncompromising quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
