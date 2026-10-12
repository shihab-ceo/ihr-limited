import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, Ruler, Truck, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { Product, ProductColor, CurrencyConfig } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  const formattedPrice = (product.price * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const formattedOriginalPrice = product.originalPrice
    ? (product.originalPrice * currency.rate).toLocaleString(undefined, {
        style: 'currency',
        currency: currency.code,
        maximumFractionDigits: 0,
      })
    : null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FFFFFF] w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[#E5E5E0] shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#737373] hover:text-[#171717] bg-white/80 backdrop-blur-sm border border-[#E5E5E0] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#F6F6F3] flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8] border border-[#E2E2DC]">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.isLimitedRun && (
              <span className="absolute top-3 left-3 text-[10px] font-mono-code uppercase tracking-widest text-[#171717] bg-white/90 px-2 py-0.5 border border-black/10">
                Numbered Edition
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 shrink-0 border overflow-hidden cursor-pointer transition-all ${
                    selectedImage === img ? 'border-[#171717] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category and Rating */}
            <div className="flex items-center justify-between text-xs font-mono-code uppercase text-[#737373] tracking-widest mb-2">
              <span>{product.category}</span>
              <div className="flex items-center gap-1 text-[#171717]">
                <Star className="w-3.5 h-3.5 fill-[#171717]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#8C8C88]">({product.reviewsCount})</span>
              </div>
            </div>

            <h2 className="font-serif-brand text-2xl sm:text-3xl font-light text-[#171717] leading-tight mb-2">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4 font-mono-code">
              {formattedOriginalPrice && (
                <span className="text-sm text-[#999994] line-through tabular-nums">
                  {formattedOriginalPrice}
                </span>
              )}
              <span className="text-xl font-medium text-[#171717] tabular-nums">
                {formattedPrice}
              </span>
              <span className="text-[11px] text-[#737373] tracking-wide uppercase font-sans">
                Taxes included
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium uppercase tracking-wider text-[#171717]">Color</span>
                <span className="text-[#737373] font-mono-code">{selectedColor.name}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`h-7 px-3 flex items-center gap-2 border text-xs cursor-pointer transition-all ${
                      selectedColor.name === c.name
                        ? 'border-[#171717] bg-[#F8F7F4] font-medium'
                        : 'border-[#E0E0DC] hover:border-[#171717]/40 text-[#525252]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium uppercase tracking-wider text-[#171717]">Select Size</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[#8C6C4F] hover:underline cursor-pointer"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-mono-code transition-all cursor-pointer border ${
                      selectedSize === s
                        ? 'border-[#171717] bg-[#171717] text-white font-medium'
                        : 'border-[#DCDCD8] text-[#171717] hover:border-[#171717]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#737373] mt-2 font-mono-code">
                {product.modelMeasurements}
              </p>
            </div>

            {/* Purchase CTA Controls */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-[#DCDCD8] h-11 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 text-sm text-[#737373] hover:text-[#171717] cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 font-mono-code text-xs font-medium text-[#171717]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 text-sm text-[#737373] hover:text-[#171717] cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 h-11 bg-[#171717] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#2F2F2F] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`h-11 px-3 border border-[#DCDCD8] transition-colors cursor-pointer flex items-center justify-center ${
                  isWishlisted ? 'text-[#8C6C4F] border-[#8C6C4F]' : 'text-[#737373] hover:text-[#171717]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8C6C4F]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Technical Tab Breakdown */}
          <div className="pt-4 border-t border-[#EDEDEA]">
            <div className="flex items-center gap-4 text-xs font-mono-code uppercase tracking-wider text-[#737373] mb-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 cursor-pointer transition-colors ${
                  activeTab === 'details' ? 'text-[#171717] border-b border-[#171717]' : 'hover:text-[#171717]'
                }`}
              >
                Fabric & Origin
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-1 cursor-pointer transition-colors ${
                  activeTab === 'care' ? 'text-[#171717] border-b border-[#171717]' : 'hover:text-[#171717]'
                }`}
              >
                Care Guide
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-1 cursor-pointer transition-colors ${
                  activeTab === 'reviews' ? 'text-[#171717] border-b border-[#171717]' : 'hover:text-[#171717]'
                }`}
              >
                Client Reviews ({product.reviews.length})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="text-xs text-[#525252] space-y-1">
                <p><strong className="text-[#171717]">Composition:</strong> {product.composition}</p>
                <p><strong className="text-[#171717]">Mill Origin:</strong> {product.fabricOrigin}</p>
                <p><strong className="text-[#171717]">Silhouette:</strong> {product.fitNotes}</p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="text-xs text-[#525252] space-y-1">
                <p><strong className="text-[#171717]">Garment Care:</strong> {product.careInstructions}</p>
                <p className="text-[11px] text-[#737373]">Complimentary lifetime repair consultation available at all IHR Limited partner ateliers.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-xs space-y-2 max-h-32 overflow-y-auto pr-1">
                {product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="p-2 bg-[#F8F7F4] border border-[#EBEBE8]">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-mono-code">
                        <span className="font-medium text-[#171717]">{r.author} — {r.location}</span>
                        <span className="text-[#8C6C4F]">★ {r.rating}.0</span>
                      </div>
                      <p className="text-[#525252]">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#737373] italic">No reviews yet for this limited batch.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
