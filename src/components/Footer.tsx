import React, { useState } from 'react';
import { Play, Check, ArrowRight, ShieldCheck, Mail, Download } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenOrderTracker: () => void;
  onOpenSizeGuide: () => void;
  onOpenLookbook: () => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenOrderTracker,
  onOpenSizeGuide,
  onOpenLookbook,
  onReplayIntro,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#141416] text-[#F3EFE6] border-t border-[#262629]">
      {/* Newsletter & Atelier Dispatch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono-code uppercase tracking-[0.25em] text-[#C5BDB0] block mb-2">
              Atelier Gazette & Private Salons
            </span>
            <h3 className="font-serif-brand text-2xl sm:text-3xl font-light text-[#FAF8F5]">
              Subscribe for Private Capsule Previews
            </h3>
            <p className="text-xs text-[#A8A296] mt-2 font-light max-w-md">
              Receive early access to numbered batches, seasonal lookbooks, and private fitting salon invitations.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-white/40" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-[#202024] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-[#141416] text-xs font-semibold uppercase tracking-widest hover:bg-[#EBE7DF] transition-colors cursor-pointer shrink-0"
              >
                Join Salon
              </button>
            </form>

            {newsletterSubscribed && (
              <p className="text-xs text-emerald-400 mt-2 font-mono-code flex items-center gap-1.5 justify-end">
                <Check className="w-3.5 h-3.5" />
                <span>You have been enrolled in the private capsule register.</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2">
            <button
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-serif-brand tracking-[0.25em] text-[#FAF8F5] uppercase block mb-3 text-left cursor-pointer"
            >
              IHR LIMITED
            </button>
            <p className="text-xs text-[#9E988D] max-w-sm leading-relaxed font-light mb-6">
              Contemporary luxury ready-to-wear and tailored essentials. Engineered with architectural precision from noble Italian and Japanese fibers.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 text-[11px] font-mono-code uppercase tracking-wider text-[#D6C7B2] hover:border-white hover:text-white transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Replay Intro</span>
              </button>

              <a
                href="/ihr-limited-source.zip"
                download="ihr-limited-source.zip"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono-code uppercase tracking-wider transition-colors cursor-pointer border border-white/20"
              >
                <Download className="w-3 h-3" />
                <span>Download Code (.zip)</span>
              </a>
            </div>
          </div>

          {/* Collection Col */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider font-mono-code text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2 text-[#A8A296]">
              <li>
                <button onClick={() => onSelectCategory('Outerwear')} className="hover:text-white cursor-pointer">
                  Outerwear & Coats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Tailoring')} className="hover:text-white cursor-pointer">
                  Tailored Blazers & Twill
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Knitwear')} className="hover:text-white cursor-pointer">
                  Ribbed Merino & Cashmere
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Trousers')} className="hover:text-white cursor-pointer">
                  Pleated Flannel Trousers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Accessories')} className="hover:text-white cursor-pointer">
                  Leather Goods & Totes
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider font-mono-code text-[11px]">
              Client Services
            </h4>
            <ul className="space-y-2 text-[#A8A296]">
              <li>
                <button onClick={onOpenOrderTracker} className="hover:text-white cursor-pointer text-[#D6C7B2]">
                  Track Order & Dispatch
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white cursor-pointer">
                  Garment Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenLookbook} className="hover:text-white cursor-pointer">
                  Atelier Digital Lookbook
                </button>
              </li>
              <li>
                <span className="text-[#A8A296]">Complimentary White-Glove Care</span>
              </li>
              <li>
                <span className="text-[#A8A296]">14-Day Global Returns</span>
              </li>
            </ul>
          </div>

          {/* Provenance */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider font-mono-code text-[11px]">
              Atelier Provenance
            </h4>
            <div className="text-[#A8A296] space-y-2 text-[11px] font-light">
              <p>Lanificio di Biella, Piedmont</p>
              <p>Toyoda Shuttle Looms, Okayama</p>
              <p>Santa Croce Sull&apos;Arno, Tuscany</p>
              <p className="pt-2 text-white/50 font-mono-code">Registered Brand No. IHR-82910</p>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737373] font-mono-code gap-4">
          <p>© {new Date().getFullYear()} IHR Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#8C8C88]">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Registry</span>
            <span>·</span>
            <span>Archival Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
