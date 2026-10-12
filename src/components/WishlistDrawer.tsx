import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  currency: CurrencyConfig;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-[#FBFBFA] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E5E0] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#EAEAE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase font-mono-code text-[#171717]">
              Saved Wishlist
            </h2>
            <span className="text-xs text-[#737373] font-mono-code">
              ({wishlist.length} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#737373]">
              <div className="w-12 h-12 border border-[#DCDCD8] flex items-center justify-center mb-4 text-[#8C8C88]">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#171717] uppercase tracking-wider mb-1">
                No Saved Items Yet
              </p>
              <p className="text-xs text-[#737373] max-w-xs font-light">
                Click the heart on any garment to save pieces to your private wardrobe curation.
              </p>
            </div>
          ) : (
            wishlist.map((item) => {
              const formattedPrice = (item.price * currency.rate).toLocaleString(undefined, {
                style: 'currency',
                currency: currency.code,
                maximumFractionDigits: 0,
              });

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#EAEAE6] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-20 h-24 bg-[#F2F2EE] overflow-hidden shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-semibold text-[#171717] line-clamp-1">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemoveFromWishlist(item.id)}
                          className="text-[#999994] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-mono-code text-[#737373] mt-1">
                        {item.category} · {item.fabricOrigin.split(',')[0]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F4F0]">
                      <span className="text-xs font-semibold font-mono-code text-[#171717] tabular-nums">
                        {formattedPrice}
                      </span>

                      <button
                        onClick={() => onMoveToCart(item)}
                        className="px-3 py-1.5 bg-[#171717] text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 bg-white border-t border-[#EAEAE6]">
          <button
            onClick={onClose}
            className="w-full py-3 border border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-widest hover:bg-[#171717] hover:text-white transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
