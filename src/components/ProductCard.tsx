import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor, CurrencyConfig } from '../types';

interface ProductCardProps {
  product: Product;
  currency: CurrencyConfig;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#EBEBE8] hover:border-[#CCCCCC] transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      {/* Visual Canvas (65%-75% card height) */}
      <div
        className="relative aspect-[3/4] w-full bg-[#F4F4F1] overflow-hidden"
        onMouseEnter={() => {
          if (product.images.length > 1) setCurrentImageIndex(1);
        }}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Minimalist 1-Line Status Tag (Zero Pill Rule - unboxed or clean editorial tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isLimitedRun && (
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#171717] bg-[#FBFBFA]/90 backdrop-blur-sm px-2 py-0.5 border border-[#171717]/10">
              Numbered Batch
            </span>
          )}
          {product.isNewArrival && !product.isLimitedRun && (
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#171717] bg-[#FBFBFA]/90 backdrop-blur-sm px-2 py-0.5 border border-[#171717]/10">
              Collection IV
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm transition-all duration-200 cursor-pointer border border-[#EAEAE7] hover:scale-110 z-10 ${
            isWishlisted ? 'text-[#8C6C4F]' : 'text-[#737373] hover:text-[#171717]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#8C6C4F]' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white text-[#171717] text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#F3EFE6] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-[#171717] text-white text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#2B2B2B] transition-colors cursor-pointer shrink-0"
            title="Quick add to bag"
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>+ Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Unboxed category metadata with separator */}
          <div className="flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-wider text-[#737373] mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabricOrigin.split(',')[0]}</span>
          </div>

          {/* Product Name */}
          <h2 className="text-sm font-semibold text-[#171717] leading-snug line-clamp-1 group-hover:text-[#8C6C4F] transition-colors">
            {product.name}
          </h2>

          <p className="text-xs text-[#737373] line-clamp-1 mt-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches & Size picker */}
        <div className="mt-3 pt-3 border-t border-[#F2F2EE] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                  selectedColor.name === color.name ? 'scale-125 border-[#171717]' : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#737373] ml-1 hidden sm:inline">
              {selectedColor.name.split(' ')[0]}
            </span>
          </div>

          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2 font-mono-code">
            {formattedOriginalPrice && (
              <span className="text-xs text-[#999994] line-through tabular-nums">
                {formattedOriginalPrice}
              </span>
            )}
            <span className="text-sm font-medium text-[#171717] tabular-nums">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
