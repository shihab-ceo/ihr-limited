import React, { useState } from 'react';
import { X, Search, CheckCircle, Package, Truck, Home, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
}) => {
  const [searchCode, setSearchCode] = useState<string>('IHR-89241');
  const [activeOrder, setActiveOrder] = useState<{
    id: string;
    customer: string;
    city: string;
    status: number; // 0 to 4
    tracking: string;
    items: string;
    estimatedArrival: string;
    events: { time: string; title: string; location: string }[];
  }>({
    id: 'IHR-89241',
    customer: 'Alexander Wright',
    city: 'London, UK',
    status: 2, // Dispatched
    tracking: 'DHL-IHR-741920',
    items: 'Atelier Double-Breasted Cashmere Overcoat (48 EU)',
    estimatedArrival: 'Tomorrow by 18:00',
    events: [
      { time: 'Today 09:30', title: 'Departed sorting facility', location: 'Heathrow International Hub' },
      { time: 'Yesterday 18:15', title: 'Export customs cleared', location: 'Milan Malpensa Cargo' },
      { time: 'Yesterday 11:00', title: 'Archival garment inspection passed', location: 'IHR Biella Atelier' },
      { time: '2 Days Ago', title: 'Order verified & payment authorized', location: 'IHR Concierge System' },
    ],
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();

    // Check if it matches any created order
    const found = recentOrders.find(
      (o) => o.orderId.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );

    if (found) {
      setActiveOrder({
        id: found.orderId,
        customer: found.shippingAddress.fullName,
        city: `${found.shippingAddress.city}, ${found.shippingAddress.country}`,
        status: 1, // Freshly tailoring
        tracking: found.trackingNumber,
        items: found.items.map((i) => `${i.product.name} (${i.selectedSize})`).join(', '),
        estimatedArrival: '3 to 5 business days',
        events: [
          { time: 'Just Now', title: 'Archival packing in progress', location: 'Milan Atelier' },
          { time: 'Just Now', title: 'Order confirmed & reserved in batch', location: 'IHR Central Concierge' },
        ],
      });
    } else {
      // Keep demo tracker but update ID
      setActiveOrder({
        id: query.startsWith('IHR-') ? query : `IHR-${query}`,
        customer: 'Private Client',
        city: 'Verified Delivery Address',
        status: 2,
        tracking: `DHL-${query}`,
        items: 'Archival Garment Batch',
        estimatedArrival: 'In transit — on schedule',
        events: [
          { time: 'Today', title: 'In transit with DHL Express Priority', location: 'Regional Distribution Center' },
          { time: 'Yesterday', title: 'Hand-packed in breathable garment bag', location: 'IHR Atelier' },
        ],
      });
    }
  };

  const steps = [
    { title: 'Confirmed', icon: CheckCircle },
    { title: 'Tailoring / Packed', icon: Package },
    { title: 'Dispatched', icon: Truck },
    { title: 'Delivered', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FFFFFF] w-full max-w-2xl border border-[#E5E5E0] shadow-2xl p-6 sm:p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
          aria-label="Close tracking"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#8C6C4F] block mb-1">
            Logistics & White-Glove Dispatch
          </span>
          <h2 className="font-serif-brand text-2xl font-light text-[#171717]">
            Track Order & Shipment
          </h2>
          <p className="text-xs text-[#737373] mt-1 font-light">
            Enter your IHR Limited order number or DHL consignment code to monitor transit.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#8C8C88]" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="e.g. IHR-89241"
              className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F5] border border-[#DCDCD8] text-xs font-mono-code uppercase text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#2B2B2B] transition-colors cursor-pointer shrink-0"
          >
            Locate Parcel
          </button>
        </form>

        {/* Current Order Summary */}
        <div className="p-4 bg-[#F8F7F4] border border-[#EAEAE6] mb-6 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAEAE6] pb-2 font-mono-code">
            <div>
              <span className="text-[#737373]">Consignment: </span>
              <strong className="text-[#171717]">{activeOrder.id}</strong>
            </div>
            <div>
              <span className="text-[#737373]">Carrier: </span>
              <span className="text-[#171717]">{activeOrder.tracking}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[#737373] block text-[11px]">Recipient:</span>
              <span className="text-[#171717] font-medium">{activeOrder.customer} ({activeOrder.city})</span>
            </div>
            <div>
              <span className="text-[#737373] block text-[11px]">Estimated Window:</span>
              <span className="text-[#171717] font-medium">{activeOrder.estimatedArrival}</span>
            </div>
          </div>
        </div>

        {/* Progress Pipeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#EAEAE6] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-[#171717] -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(activeOrder.status / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isPastOrCurrent = idx <= activeOrder.status;
              const isCurrent = idx === activeOrder.status;

              return (
                <div key={st.title} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isPastOrCurrent
                        ? 'bg-[#171717] text-white'
                        : 'bg-white border border-[#DCDCD8] text-[#8C8C88]'
                    } ${isCurrent ? 'ring-4 ring-[#171717]/10' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-mono-code mt-2 ${
                      isPastOrCurrent ? 'font-semibold text-[#171717]' : 'text-[#8C8C88]'
                    }`}
                  >
                    {st.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Logs */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
            Dispatch Milestone Log
          </h4>
          <div className="border border-[#EAEAE6] divide-y divide-[#EAEAE6] text-xs">
            {activeOrder.events.map((ev, i) => (
              <div key={i} className="p-3 flex items-start justify-between gap-4 bg-white">
                <div>
                  <p className="font-medium text-[#171717]">{ev.title}</p>
                  <p className="text-[11px] text-[#737373]">{ev.location}</p>
                </div>
                <span className="text-[11px] font-mono-code text-[#8C8C88] shrink-0">
                  {ev.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
