import React from 'react';
import { X, ArrowRight } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onSelectCollection,
}) => {
  if (!isOpen) return null;

  const looks = [
    {
      number: 'LOOK 01',
      title: 'Monolithic Melton Silhouette',
      subtitle: 'The Atelier Overcoat in Graphite paired with high-twist wool pleated trousers.',
      image: '/src/assets/images/ihr_product_outerwear_1791814706754.jpg',
      details: 'Super 120s virgin wool, unpadded structured shoulder pitch, hand-set horn buttons.',
    },
    {
      number: 'LOOK 02',
      title: 'Architectural Heavy Rib & Tactile Volume',
      subtitle: '5-Gauge English rib merino mockneck in Stone Oatmeal over relaxed Japanese denim.',
      image: '/src/assets/images/ihr_product_knitwear_1791814720697.jpg',
      details: '19.5 micron Australian merino yarn, spun and knitted in Piedmont.',
    },
    {
      number: 'LOOK 03',
      title: 'Deconstructed Lounge Tailoring',
      subtitle: 'Low-stance two-button worsted blazer with relaxed fluid wide-leg trouser.',
      image: '/src/assets/images/ihr_product_tailoring_1791814731726.jpg',
      details: 'Italian high-density twill, cupro half-lining for natural shoulder drape.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#141416] text-[#F3EFE6] w-full max-w-4xl border border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close lookbook"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#C5BDB0]">
            <span>Autumn / Winter 2026</span>
            <span aria-hidden="true">·</span>
            <span>Digital Editorial</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-light text-[#FAF8F5] mt-2">
            IHR Limited Lookbook: The Architectural Form
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A296] mt-2 max-w-xl font-light leading-relaxed">
            Exploring the dialectic between brutalist architectural purity and tactile softness. Every silhouette in Collection 04 is cut to create sculptural presence while allowing uninhibited movement.
          </p>
        </div>

        {/* Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {looks.map((look) => (
            <div key={look.number} className="bg-[#1C1C1F] border border-white/5 flex flex-col">
              <div className="aspect-[3/4] w-full bg-[#27272B] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#C5BDB0]">
                    {look.number}
                  </span>
                  <h3 className="font-serif-brand text-lg text-white mt-1 leading-snug">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#9E988D] mt-2 font-light">
                    {look.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#A8A296] font-mono-code">
                  {look.details}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <span className="text-xs text-[#A8A296] font-mono-code">
            Photography & Art Direction — IHR Atelier Milan
          </span>
          <button
            onClick={() => {
              onClose();
              onSelectCollection();
            }}
            className="px-6 py-2.5 bg-white text-[#141416] text-xs font-semibold uppercase tracking-widest hover:bg-[#EBE7DF] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Shop The Editorial Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
