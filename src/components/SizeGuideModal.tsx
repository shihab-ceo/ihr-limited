import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const measurements = [
    { size: '46 (S)', chestCm: 104, chestIn: 41.0, shoulderCm: 46.5, shoulderIn: 18.3, lengthCm: 114, lengthIn: 44.8, sleeveCm: 64, sleeveIn: 25.2 },
    { size: '48 (M)', chestCm: 110, chestIn: 43.3, shoulderCm: 48.0, shoulderIn: 18.9, lengthCm: 116, lengthIn: 45.6, sleeveCm: 65, sleeveIn: 25.6 },
    { size: '50 (L)', chestCm: 116, chestIn: 45.7, shoulderCm: 49.5, shoulderIn: 19.5, lengthCm: 118, lengthIn: 46.4, sleeveCm: 66, sleeveIn: 26.0 },
    { size: '52 (XL)', chestCm: 122, chestIn: 48.0, shoulderCm: 51.0, shoulderIn: 20.1, lengthCm: 120, lengthIn: 47.2, sleeveCm: 67, sleeveIn: 26.4 },
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
          aria-label="Close size guide"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1 text-xs font-mono-code uppercase tracking-widest text-[#8C6C4F]">
          <Ruler className="w-3.5 h-3.5" />
          <span>Tailoring Specifications</span>
        </div>

        <h2 className="font-serif-brand text-2xl font-light text-[#171717] mb-2">
          Garment Sizing & Dimensions
        </h2>

        <p className="text-xs text-[#737373] mb-6 font-light">
          IHR Limited patterns are cut for contemporary architectural drape. If you prefer a more fitted profile, we advise ordering one size down.
        </p>

        {/* Unit Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex border border-[#DCDCD8] p-0.5 bg-[#F6F6F2] text-xs font-mono-code">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                unit === 'cm' ? 'bg-[#171717] text-white font-medium' : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                unit === 'in' ? 'bg-[#171717] text-white font-medium' : 'text-[#737373] hover:text-[#171717]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto border border-[#EAEAE6] mb-6">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#F8F7F4] border-b border-[#EAEAE6] text-[#737373] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Size (EU/US)</th>
                <th className="p-3">Chest Circumference</th>
                <th className="p-3">Shoulder Width</th>
                <th className="p-3">Back Length</th>
                <th className="p-3">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAE6]">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-3 font-semibold text-[#171717]">{row.size}</td>
                  <td className="p-3 tabular-nums text-[#525252]">
                    {unit === 'cm' ? `${row.chestCm} cm` : `${row.chestIn} in`}
                  </td>
                  <td className="p-3 tabular-nums text-[#525252]">
                    {unit === 'cm' ? `${row.shoulderCm} cm` : `${row.shoulderIn} in`}
                  </td>
                  <td className="p-3 tabular-nums text-[#525252]">
                    {unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}
                  </td>
                  <td className="p-3 tabular-nums text-[#525252]">
                    {unit === 'cm' ? `${row.sleeveCm} cm` : `${row.sleeveIn} in`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#F8F7F4] border border-[#EAEAE6] text-xs text-[#525252] space-y-1">
          <p className="font-medium text-[#171717]">Atelier Measuring Tip:</p>
          <p className="font-light">
            Measure an existing coat or tailored jacket laid flat on a clean table across the armpits (chest) and shoulder seams to find your nearest ideal proportion.
          </p>
        </div>
      </div>
    </div>
  );
};
