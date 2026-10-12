export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export type Category = 'All' | 'Outerwear' | 'Tailoring' | 'Knitwear' | 'Trousers' | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  subtitle: string;
  price: number; // in USD
  originalPrice?: number;
  description: string;
  composition: string;
  fabricOrigin: string;
  careInstructions: string;
  fitNotes: string;
  modelMeasurements: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNewArrival?: boolean;
  isLimitedRun?: boolean;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item composite key: `${product.id}-${size}-${color.name}`
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type ShippingTier = 'standard' | 'express' | 'white-glove';

export interface ShippingOption {
  id: ShippingTier;
  title: string;
  timeframe: string;
  price: number; // in USD, 0 if free
}

export type PaymentMethod = 'card' | 'apple-pay' | 'cod';

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingTier: ShippingTier;
  paymentMethod: PaymentMethod;
  status: 'Confirmed' | 'Tailoring & Packaging' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}
