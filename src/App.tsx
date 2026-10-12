import React, { useState, useEffect, useMemo } from 'react';
import {
  Category,
  CurrencyCode,
  Product,
  CartItem,
  ProductColor,
  Order,
} from './types';
import { INITIAL_PRODUCTS, CURRENCIES } from './data/products';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { LookbookModal } from './components/LookbookModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { SlidersHorizontal, Grid3X3, LayoutGrid, Check, Sparkles } from 'lucide-react';

export default function App() {
  // Opening Brand Reveal Animation
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Categories & Filtering
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);

  // Cart & Wishlist state with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ihr_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ihr_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ihr_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal controls
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Toast banner for actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Discount & promo code state passed from Cart to Checkout
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState<string>('');

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ihr_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ihr_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ihr_orders', JSON.stringify(recentOrders));
    } catch (e) {
      console.error(e);
    }
  }, [recentOrders]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to Bag handler
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: ProductColor,
    quantity = 1
  ) => {
    const compositeId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });

    showNotification(`Added ${product.name} to shopping bag.`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item)));
  };

  // Remove from Cart
  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showNotification(`Removed from saved pieces.`);
        return prev.filter((p) => p.id !== product.id);
      }
      showNotification(`Saved ${product.name} to wishlist.`);
      return [...prev, product];
    });
  };

  // Move from wishlist to cart
  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[0], product.colors[0], 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Proceed from Cart to Checkout
  const handleProceedToCheckout = (discountUSD: number, promoCode: string) => {
    setCheckoutDiscount(discountUSD);
    setCheckoutPromoCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Completed Order handler
  const handleOrderComplete = (order: Order) => {
    setRecentOrders((prev) => [order, ...prev]);
    setCart([]); // Clear cart upon successful order
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#171717] flex flex-col font-sans selection:bg-[#171717] selection:text-white">
      {/* 1. Beginning Brand Animation for "IHR Limited" */}
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-[#FAF8F5] px-4 py-3 border border-white/10 shadow-2xl flex items-center gap-2.5 text-xs font-mono-code uppercase tracking-wider animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalCartItemsCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
        onReplayIntro={() => setShowIntro(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Campaign Section */}
        <HeroSection
          onExploreCollection={() => {
            const el = document.getElementById('collection-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenLookbook={() => setIsLookbookOpen(true)}
        />

        {/* 4. Collection Showcase / Product Catalog */}
        <section id="collection-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header & Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EAEAE6]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#8C6C4F] mb-1">
                <span>The Wardrobe Roster</span>
                <span aria-hidden="true">·</span>
                <span>{filteredProducts.length} Silhouettes</span>
              </div>
              <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#171717] font-light">
                {activeCategory === 'All' ? 'Curated Collection' : activeCategory}
              </h2>
            </div>

            {/* Filter and View Controls (Functional Buttons conforming to Frontend Design skill) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Segmented Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#F1F1ED] border border-[#E4E4DE]">
                {(['All', 'Outerwear', 'Tailoring', 'Knitwear', 'Trousers', 'Accessories'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-white text-[#171717] shadow-sm font-semibold'
                        : 'text-[#737373] hover:text-[#171717]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort by dropdown */}
              <div className="flex items-center gap-1 bg-[#F1F1ED] px-3 py-1.5 border border-[#E4E4DE] text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#737373]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-xs font-mono-code uppercase focus:outline-none cursor-pointer text-[#171717]"
                  aria-label="Sort collection"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Grid Column density toggle */}
              <div className="hidden lg:flex items-center bg-[#F1F1ED] p-1 border border-[#E4E4DE]">
                <button
                  onClick={() => setGridColumns(3)}
                  className={`p-1.5 cursor-pointer transition-colors ${
                    gridColumns === 3 ? 'bg-white text-[#171717] shadow-sm' : 'text-[#737373] hover:text-[#171717]'
                  }`}
                  title="3-Column Editorial Layout"
                  aria-label="3-column view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-1.5 cursor-pointer transition-colors ${
                    gridColumns === 4 ? 'bg-white text-[#171717] shadow-sm' : 'text-[#737373] hover:text-[#171717]'
                  }`}
                  title="4-Column Density Layout"
                  aria-label="4-column view"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Search Indicator */}
          {searchQuery && (
            <div className="py-4 text-xs font-mono-code text-[#737373] flex items-center justify-between border-b border-[#F0F0EC]">
              <span>Filtering for term: &quot;{searchQuery}&quot;</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#171717] underline uppercase cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === 3 ? 'lg:grid-cols-3 gap-8' : 'lg:grid-cols-4 gap-6'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={CURRENCIES[currency]}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, size, col) => handleAddToCart(p, size, col, 1)}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white border border-[#EAEAE6] my-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#171717] mb-2 font-mono-code">
                No Pieces Matched Your Search
              </p>
              <p className="text-xs text-[#737373] max-w-sm mx-auto mb-6 font-light">
                Try selecting a different category or clearing the search terms to view available ready-to-wear items.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium cursor-pointer hover:bg-[#2B2B2B]"
              >
                Reset Catalog Filters
              </button>
            </div>
          )}
        </section>

        {/* 5. Craftsmanship & Atelier Heritage Section */}
        <CraftsmanshipSection />
      </main>

      {/* 6. Footer with Replay Intro & Atelier Services */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductQuickViewModal
        product={quickViewProduct}
        currency={CURRENCIES[currency]}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, s, c, q) => handleAddToCart(p, s, c, q)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={CURRENCIES[currency]}
        onProceedToCheckout={handleProceedToCheckout}
        onStartShopping={() => {
          setIsCartOpen(false);
          const el = document.getElementById('collection-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
        currency={CURRENCIES[currency]}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={CURRENCIES[currency]}
        discountUSD={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderComplete={handleOrderComplete}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        recentOrders={recentOrders}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onSelectCollection={() => {
          setIsLookbookOpen(false);
          const el = document.getElementById('collection-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
