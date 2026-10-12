import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, Lock, ArrowRight, Printer } from 'lucide-react';
import { CartItem, CurrencyConfig, Order, ShippingAddress, ShippingTier, PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  discountUSD: number;
  promoCode: string;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  discountUSD,
  promoCode,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Julian Sterling',
    email: 'julian.sterling@atelier.com',
    phone: '+1 (555) 382-9011',
    addressLine1: '742 Evergreen Promenade, Suite 4B',
    addressLine2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States',
  });

  const [shippingTier, setShippingTier] = useState<ShippingTier>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('482');
  const [cardName, setCardName] = useState('Julian Sterling');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = rawSubtotalUSD >= 300;
  const shippingCostUSD = shippingTier === 'white-glove' ? 35 : isFreeShipping ? 0 : 15;
  const finalTotalUSD = Math.max(0, rawSubtotalUSD - discountUSD + shippingCostUSD);

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

  const formattedShipping = (shippingCostUSD * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const formattedTotal = (finalTotalUSD * currency.rate).toLocaleString(undefined, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  });

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const randomTracking = `DHL-IHR-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        orderId: `IHR-${randomOrderNum}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...items],
        subtotal: rawSubtotalUSD,
        discount: discountUSD,
        shippingCost: shippingCostUSD,
        total: finalTotalUSD,
        shippingAddress: address,
        shippingTier,
        paymentMethod,
        status: 'Confirmed',
        trackingNumber: randomTracking,
        carrier: 'DHL Express International',
        estimatedDelivery: '3 to 5 business days',
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FFFFFF] w-full max-w-3xl overflow-hidden border border-[#E5E5E0] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAEAE6] flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-3">
            <span className="font-serif-brand font-medium tracking-widest text-[#171717] uppercase text-lg">
              IHR LIMITED
            </span>
            <span className="text-xs text-[#8C8C88] font-mono-code">/ ATELIER CHECKOUT</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step !== 'confirmation' && (
          <div className="px-6 py-2.5 bg-[#F6F6F2] border-b border-[#EAEAE6] flex items-center justify-center gap-8 text-xs font-mono-code uppercase">
            <span className={`flex items-center gap-1.5 ${step === 'shipping' ? 'font-semibold text-[#171717]' : 'text-[#8C8C88]'}`}>
              <span>1.</span> Delivery Address
            </span>
            <span className="text-[#DCDCD8]">——</span>
            <span className={`flex items-center gap-1.5 ${step === 'payment' ? 'font-semibold text-[#171717]' : 'text-[#8C8C88]'}`}>
              <span>2.</span> Settlement & Payment
            </span>
          </div>
        )}

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* STEP 1: Shipping Address & Carrier Method */}
          {step === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Client & Shipping Details
                </h3>
                <p className="text-xs text-[#737373] font-light">
                  All IHR Limited orders are packed in archival dustbags with signed certificate cards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    Street Address & Apartment / Suite *
                  </label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                    City *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                      State / Prov
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      required
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Tier Options */}
              <div className="pt-4 border-t border-[#EAEAE6]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                  Select Delivery Courier Tier
                </h4>
                <div className="space-y-3">
                  <label
                    onClick={() => setShippingTier('standard')}
                    className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                      shippingTier === 'standard' ? 'border-[#171717] bg-[#F7F6F2]' : 'border-[#E2E2DE] hover:border-[#CCCCCC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingTier === 'standard'}
                        onChange={() => setShippingTier('standard')}
                        className="accent-[#171717]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#171717]">DHL Express International</p>
                        <p className="text-[11px] text-[#737373]">Carbon-neutral air courier (3-5 business days)</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-code font-medium text-[#171717]">
                      {isFreeShipping ? 'COMPLIMENTARY' : formattedShipping}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingTier('white-glove')}
                    className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                      shippingTier === 'white-glove' ? 'border-[#171717] bg-[#F7F6F2]' : 'border-[#E2E2DE] hover:border-[#CCCCCC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingTier === 'white-glove'}
                        onChange={() => setShippingTier('white-glove')}
                        className="accent-[#171717]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#171717]">VIP White-Glove Atelier Courier</p>
                        <p className="text-[11px] text-[#737373]">Hand-delivered with wooden garment hanger & garment bag (1-2 days)</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-code font-medium text-[#171717]">
                      {(35 * currency.rate).toLocaleString(undefined, { style: 'currency', currency: currency.code, maximumFractionDigits: 0 })}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-8 py-3 bg-[#171717] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#2B2B2B] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment & Final Review */}
          {step === 'payment' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Payment Method
                </h3>
                <p className="text-xs text-[#737373] font-light">
                  Transactions are encrypted and processed through our private banking gateway.
                </p>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-xs text-center cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#171717] bg-[#171717] text-white font-medium'
                      : 'border-[#DCDCD8] text-[#525252] hover:border-[#171717]'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-3 border text-xs text-center cursor-pointer transition-all ${
                    paymentMethod === 'apple-pay'
                      ? 'border-[#171717] bg-[#171717] text-white font-medium'
                      : 'border-[#DCDCD8] text-[#525252] hover:border-[#171717]'
                  }`}
                >
                  Apple Pay / G-Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-xs text-center cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#171717] bg-[#171717] text-white font-medium'
                      : 'border-[#DCDCD8] text-[#525252] hover:border-[#171717]'
                  }`}
                >
                  Concierge on Delivery
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#F8F7F4] border border-[#E5E5DF] space-y-4">
                  {/* Card mockup visual */}
                  <div className="bg-[#141416] text-[#F3EFE6] p-4 border border-white/10 shadow-lg text-xs font-mono-code max-w-sm mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <span className="tracking-widest font-serif-brand text-sm">IHR ATELIER CARD</span>
                      <CreditCard className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-sm tracking-[0.25em] mb-4 text-[#FAF8F5]">
                      {cardNumber}
                    </div>
                    <div className="flex justify-between text-[11px] text-[#A29D94]">
                      <div>
                        <span className="block text-[9px] uppercase">CARDHOLDER</span>
                        <span className="text-[#EDE8E0]">{cardName}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase">EXPIRES</span>
                        <span className="text-[#EDE8E0]">{cardExpiry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="col-span-2">
                      <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 bg-white border border-[#DCDCD8] font-mono-code text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2 bg-white border border-[#DCDCD8] font-mono-code text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#525252] mb-1 font-mono-code uppercase text-[11px]">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2 bg-white border border-[#DCDCD8] font-mono-code text-[#171717]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-6 bg-[#F8F7F4] border border-[#E5E5DF] text-center text-xs space-y-2">
                  <p className="font-medium text-[#171717]">Express Biometric Authorization Active</p>
                  <p className="text-[#737373]">
                    Clicking &quot;Authorize & Place Order&quot; simulates TouchID / FaceID payment verification.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#F8F7F4] border border-[#E5E5DF] text-xs space-y-2">
                  <p className="font-semibold text-[#171717]">Concierge Payment Upon Arrival</p>
                  <p className="text-[#525252]">
                    Our private white-glove driver will present your garments for inspection. Payment can be settled via mobile terminal (all cards accepted) or local cash.
                  </p>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="pt-4 border-t border-[#EAEAE6] space-y-2 text-xs">
                <div className="flex justify-between text-[#737373]">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-mono-code">{formattedSubtotal}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono-code">-{formattedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#737373]">
                  <span>Shipping ({shippingTier === 'white-glove' ? 'White Glove' : 'Standard DHL'})</span>
                  <span className="font-mono-code">
                    {shippingCostUSD === 0 ? 'COMPLIMENTARY' : formattedShipping}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#EAEAE6]">
                  <span>Total Due</span>
                  <span className="font-mono-code tabular-nums">{formattedTotal}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#737373] hover:text-[#171717] underline cursor-pointer"
                >
                  ← Back to Delivery Address
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#2B2B2B] transition-colors cursor-pointer flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Authorizing Payment...' : `Authorize & Place Order (${formattedTotal})`}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 'confirmation' && completedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-mono-code uppercase tracking-widest text-[#8C6C4F] block mb-1">
                  Confirmation Issued
                </span>
                <h3 className="font-serif-brand text-2xl sm:text-3xl font-light text-[#171717]">
                  Thank You, {completedOrder.shippingAddress.fullName}
                </h3>
                <p className="text-xs text-[#737373] mt-2">
                  Order <strong className="text-[#171717] font-mono-code">#{completedOrder.orderId}</strong> has been received by our Milan atelier.
                </p>
              </div>

              {/* Order Snapshot Box */}
              <div className="p-4 bg-[#F8F7F4] border border-[#EAEAE6] text-left text-xs max-w-lg mx-auto space-y-3">
                <div className="flex justify-between border-b border-[#EAEAE6] pb-2 font-mono-code">
                  <span>Tracking Number:</span>
                  <strong className="text-[#171717]">{completedOrder.trackingNumber}</strong>
                </div>
                <div className="flex justify-between border-b border-[#EAEAE6] pb-2">
                  <span className="text-[#737373]">Estimated Courier Window:</span>
                  <span className="font-medium text-[#171717]">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAEAE6] pb-2">
                  <span className="text-[#737373]">Delivery Destination:</span>
                  <span className="text-[#171717] text-right truncate max-w-xs">
                    {completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.city}
                  </span>
                </div>
                <div className="flex justify-between font-mono-code pt-1">
                  <span>Total Settled:</span>
                  <strong className="text-sm text-[#171717]">{formattedTotal}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 border border-[#DCDCD8] text-xs uppercase tracking-wider text-[#525252] hover:text-[#171717] hover:border-[#171717] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Atelier Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-8 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
