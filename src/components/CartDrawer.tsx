import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  currency: CurrencyConfig;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onProceedToCheckout,
  onStartShopping,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; discountValue: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThresholdUSD = 300;
  const progressToFreeShipping = Math.min(100, Math.round((rawSubtotalUSD / freeShippingThresholdUSD) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - rawSubtotalUSD);

  // Discount calculation
  let discountUSD = 0;
  if (appliedPromo) {
    if (appliedPromo.percent > 0) {
      discountUSD = (rawSubtotalUSD * appliedPromo.percent) / 100;
    } else {
      discountUSD = appliedPromo.discountValue;
    }
  }

  const finalTotalUSD = Math.max(0, rawSubtotalUSD - discountUSD);

  const formattedSubtotal = (rawSubtotalUSD * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const formattedDiscount = (discountUSD * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const formattedTotal = (finalTotalUSD * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const formattedRemaining = (remainingForFreeShipping * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'IHR15') {
      setAppliedPromo({ code: 'IHR15', percent: 15, discountValue: 0 });
      setPromoCodeInput('');
    } else if (code === 'VIP50') {
      setAppliedPromo({ code: 'VIP50', percent: 0, discountValue: 50 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promo code. Try "IHR15" for 15% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-[#FBFBFA] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E5E0] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAEAE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase font-mono-code text-[#171717]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#737373] font-mono-code">
              ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#F5F4F0] border-b border-[#EAEAE6] text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#525252] mb-2 font-light">
              Add <span className="font-semibold text-[#171717] font-mono-code">{formattedRemaining}</span> more for{' '}
              <strong className="text-[#171717] font-medium">Complimentary Worldwide Courier</strong>.
            </p>
          ) : (
            <p className="text-emerald-800 font-medium mb-2 flex items-center gap-1.5">
              <span>✓ You have qualified for Complimentary Express Courier</span>
            </p>
          )}
          <div className="w-full bg-[#E5E5DF] h-1.5 overflow-hidden">
            <div
              className="bg-[#171717] h-full transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Itemized Bag List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#737373]">
              <div className="w-12 h-12 border border-[#DCDCD8] flex items-center justify-center mb-4 text-[#8C8C88]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#171717] uppercase tracking-wider mb-1">
                Your Bag Is Empty
              </p>
              <p className="text-xs text-[#737373] mb-6 font-light max-w-xs">
                Explore our Autumn / Winter collection tailored from fine Italian wool and cashmere.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onStartShopping();
                }}
                className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2B2B2B] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemFormattedPrice = (item.product.price * currency.rate * item.quantity).toLocaleString(
                undefined,
                {
                  style: 'currency',
                  currency: currency.code,
                  maximumFractionDigits: 0,
                }
              );

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#EAEAE6] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-20 h-24 bg-[#F2F2EE] overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-semibold text-[#171717] line-clamp-1">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#999994] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#737373] mt-1 font-mono-code">
                        <span>Size: {item.selectedSize}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F4F0]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DCDCD8] text-xs h-7">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 text-[#737373] hover:text-[#171717] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono-code text-[11px] font-medium text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 text-[#737373] hover:text-[#171717] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold font-mono-code text-[#171717] tabular-nums">
                        {itemFormattedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAEAE6] space-y-4">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8C8C88]" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. IHR15)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F7F4] border border-[#DCDCD8] focus:outline-none focus:border-[#171717] font-mono-code uppercase text-[#171717]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#171717] text-white text-xs uppercase tracking-wider hover:bg-[#2B2B2B] transition-colors cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 border border-emerald-200">
                <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent > 0 ? `${appliedPromo.percent}% off` : `$${appliedPromo.discountValue} off`})</span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-xs text-emerald-900 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <p className="text-[11px] text-red-600 font-mono-code">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-[#F2F2EE]">
              <div className="flex items-center justify-between text-[#737373]">
                <span>Bag Subtotal</span>
                <span className="font-mono-code tabular-nums">{formattedSubtotal}</span>
              </div>

              {discountUSD > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Privilege Discount</span>
                  <span className="font-mono-code tabular-nums">-{formattedDiscount}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#737373]">
                <span>Estimated Shipping</span>
                <span className="font-mono-code">
                  {remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#F2F2EE]">
                <span>Total</span>
                <span className="font-mono-code tabular-nums">{formattedTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onProceedToCheckout(discountUSD, appliedPromo ? appliedPromo.code : '');
              }}
              className="w-full py-3.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#2B2B2B] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#8C8C88] uppercase tracking-wider font-mono-code pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure 256-Bit SSL
              </span>
              <span>·</span>
              <span>14-Day Atelier Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
