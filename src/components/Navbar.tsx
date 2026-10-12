import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, SlidersHorizontal, Globe } from 'lucide-react';
import { Category, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/products';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLookbook: () => void;
  onOpenOrderTracker: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenLookbook,
  onOpenOrderTracker,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  onReplayIntro
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#EAEAE7]">
      {/* Optional Slim Promotional Bar (<= 40px) */}
      {showBanner && (
        <div className="h-8 bg-[#171717] text-[#EDE8E0] px-4 flex items-center justify-between text-[11px] tracking-wider uppercase font-medium">
          <div className="mx-auto flex items-center gap-2">
            <span>Complimentary Worldwide Courier Over $300</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-[#D6C7B2]">Code: IHR15 for 15% Off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-serif-brand tracking-[0.25em] text-[#171717] uppercase whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity text-left cursor-pointer"
          >
            IHR LIMITED
          </button>
        </div>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-[#525252]">
          <button
            onClick={() => onSelectCategory('All')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer hover:text-[#171717] ${
              activeCategory === 'All' ? 'text-[#171717] border-b border-[#171717] pb-0.5' : ''
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => onSelectCategory('Outerwear')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer hover:text-[#171717] ${
              activeCategory === 'Outerwear' ? 'text-[#171717] border-b border-[#171717] pb-0.5' : ''
            }`}
          >
            Outerwear
          </button>
          <button
            onClick={() => onSelectCategory('Tailoring')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer hover:text-[#171717] ${
              activeCategory === 'Tailoring' ? 'text-[#171717] border-b border-[#171717] pb-0.5' : ''
            }`}
          >
            Tailoring
          </button>
          <button
            onClick={() => onSelectCategory('Knitwear')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer hover:text-[#171717] ${
              activeCategory === 'Knitwear' ? 'text-[#171717] border-b border-[#171717] pb-0.5' : ''
            }`}
          >
            Knitwear
          </button>
          <button
            onClick={onOpenLookbook}
            className="whitespace-nowrap shrink-0 transition-colors cursor-pointer hover:text-[#171717]"
          >
            Lookbook
          </button>
        </nav>

        {/* Zone 3: Primary Action Cluster */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Currency Selector */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#525252]">
            <Globe className="w-3.5 h-3.5 text-[#737373]" />
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent border-none text-xs font-mono-code uppercase focus:outline-none cursor-pointer text-[#171717]"
              aria-label="Currency"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Search Toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 bg-[#F3F3F0] rounded-none px-3 py-1.5 border border-[#DCDCD8]">
                <Search className="w-3.5 h-3.5 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-[#171717] placeholder:text-[#8C8C88] focus:outline-none w-32 sm:w-44"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-[#737373] hover:text-[#171717] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-[#525252] hover:text-[#171717] transition-colors cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1.5 text-[#525252] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Saved items"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#171717] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono-code">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Shopping Bag CTA Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#171717] text-white text-xs font-medium tracking-wider uppercase hover:bg-[#2B2B2B] transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="text-[#D6C7B2] font-mono-code">({cartCount})</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#525252] hover:text-[#171717] cursor-pointer"
            aria-label="Toggle menu"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFBFA] border-t border-[#EAEAE7] px-6 py-4 flex flex-col gap-4 text-xs font-medium uppercase tracking-widest text-[#525252]">
          <button
            onClick={() => {
              onSelectCategory('All');
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717]"
          >
            All Collections
          </button>
          <button
            onClick={() => {
              onSelectCategory('Outerwear');
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717]"
          >
            Outerwear
          </button>
          <button
            onClick={() => {
              onSelectCategory('Tailoring');
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717]"
          >
            Tailoring
          </button>
          <button
            onClick={() => {
              onSelectCategory('Knitwear');
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717]"
          >
            Knitwear
          </button>
          <button
            onClick={() => {
              onOpenLookbook();
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717]"
          >
            View Lookbook
          </button>
          <button
            onClick={() => {
              onOpenOrderTracker();
              setMobileMenuOpen(false);
            }}
            className="text-left py-1 hover:text-[#171717] text-[#8C6C4F]"
          >
            Track Order Status
          </button>
          <div className="pt-2 border-t border-[#EAEAE7] flex items-center justify-between text-[11px] text-[#737373]">
            <span>Replay Brand Reveal:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="text-[#171717] underline uppercase"
            >
              Play Intro
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
