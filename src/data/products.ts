import { CurrencyCode, CurrencyConfig, Product } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.38 },
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ihr-coat-01',
    name: 'Atelier Double-Breasted Wool Cashmere Overcoat',
    category: 'Outerwear',
    subtitle: 'Structured architectural silhouette tailored from heavyweight 520 GSM melton wool-cashmere blend.',
    price: 680,
    originalPrice: 790,
    description: 'An anchor piece of the IHR Limited collection. Sculpted with structured roped shoulders, a sharp peak lapel, and an elongated double-breasted stance. Cut from an exclusive virgin wool and Mongolian cashmere melton woven in Biella, Italy.',
    composition: '85% Virgin Wool, 15% Mongolian Cashmere; Cupro lining',
    fabricOrigin: 'Lanificio di Biella, Italy',
    careInstructions: 'Specialist dry clean only. Store on wide contoured wooden hanger.',
    fitNotes: 'Structured tailored fit through shoulders with a fluid, straight drop through the torso.',
    modelMeasurements: 'Model is 186 cm / 6\'1" wearing size Medium (48 EU).',
    images: [
      '/src/assets/images/ihr_product_outerwear_1791814706754.jpg',
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg'
    ],
    colors: [
      { name: 'Graphite Charcoal', hex: '#262626' },
      { name: 'Onyx Noir', hex: '#111111' },
      { name: 'Warm Camel', hex: '#8C6C4F' }
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)'],
    inStock: true,
    isNewArrival: true,
    isLimitedRun: true,
    rating: 4.9,
    reviewsCount: 28,
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian Vane',
        location: 'London, UK',
        rating: 5,
        date: 'October 2026',
        comment: 'The drape and hand-feel of this overcoat rival bespoke Savile Row tailoring. The peak lapels sit immaculately without stiffening.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Marcello Moretti',
        location: 'Milan, Italy',
        rating: 5,
        date: 'September 2026',
        comment: 'Substantial weight and flawless horn buttons. IHR Limited has nailed modern luxury tailoring.',
        verified: true
      }
    ]
  },
  {
    id: 'ihr-knit-02',
    name: 'Heavyweight Ribbed Merino Mockneck Sweater',
    category: 'Knitwear',
    subtitle: 'Tactile 5-gauge architectural knit spun from extra-fine 19.5 micron Australian Merino fleece.',
    price: 340,
    description: 'Knitted with a pronounced English rib pattern that offers exceptional thermal insulation and gentle elasticity without losing shape. Features raglan shoulder structuring and a reinforced double-layer mock collar.',
    composition: '100% Extra-fine Merino Wool (5-gauge chunky rib)',
    fabricOrigin: 'Tollegno 1900, Piedmont, Italy',
    careInstructions: 'Hand wash in cold water with wool detergent. Dry flat away from direct heat.',
    fitNotes: 'Relaxed contemporary box cut with dropped armholes for effortless layering.',
    modelMeasurements: 'Model is 182 cm / 6\'0" wearing size Medium.',
    images: [
      '/src/assets/images/ihr_product_knitwear_1791814720697.jpg',
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg'
    ],
    colors: [
      { name: 'Stone Oatmeal', hex: '#C2B8A3' },
      { name: 'Chalk Bone', hex: '#EAE6DF' },
      { name: 'Deep Espresso', hex: '#322620' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 34,
    reviews: [
      {
        id: 'rev-3',
        author: 'David Chen',
        location: 'Vancouver, Canada',
        rating: 5,
        date: 'October 2026',
        comment: 'Unbelievably soft yet reassuringly heavy. It maintains its crisp silhouette even after all-day wear.',
        verified: true
      }
    ]
  },
  {
    id: 'ihr-tailor-03',
    name: 'Sculpted Relaxed Twill Blazer & Trouser Ensemble',
    category: 'Tailoring',
    subtitle: 'Modern relaxed-tailoring two-piece in high-density Italian worsted virgin wool twill.',
    price: 720,
    originalPrice: 850,
    description: 'Designed to dismantle rigid corporate suit constraints into contemporary ease. Features unpadded soft shoulders, low-stance horn fastening, patch pockets, and matching forward-pleat wide trousers with side tab adjusters.',
    composition: '100% Worsted Virgin Wool (380 GSM); Horn buttons',
    fabricOrigin: 'Vitale Barberis Canonico, Italy',
    careInstructions: 'Dry clean only. Steam lightly between wears.',
    fitNotes: 'Generous modern relaxed cut with soft drape and natural shoulder pitch.',
    modelMeasurements: 'Model is 178 cm / 5\'10" wearing size Small (38 EU).',
    images: [
      '/src/assets/images/ihr_product_tailoring_1791814731726.jpg',
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg'
    ],
    colors: [
      { name: 'Midnight Pitch Black', hex: '#141416' },
      { name: 'Slate Taupe', hex: '#5E5B56' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    inStock: true,
    isNewArrival: false,
    isLimitedRun: true,
    rating: 5.0,
    reviewsCount: 19,
    reviews: [
      {
        id: 'rev-4',
        author: 'Elena Rostova',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'September 2026',
        comment: 'Perfection in proportion. The waist drop and trousers drape effortlessly over both loafers and boots.',
        verified: true
      }
    ]
  },
  {
    id: 'ihr-trench-04',
    name: 'Architectural Cocoon Trench in Sand Gabardine',
    category: 'Outerwear',
    subtitle: 'Water-repellent bonded cotton gabardine with raglan storm flap and horn belt buckle.',
    price: 590,
    description: 'A structural reinterpretation of the heritage trench coat. Constructed from tightly woven water-repellent Egyptian cotton gabardine, featuring high throat latch closure, exaggerated storm shield, and magnetic interior storm closures.',
    composition: '100% Compact Egyptian Long-Staple Cotton with DWR coating',
    fabricOrigin: 'Lancashire Mill, United Kingdom',
    careInstructions: 'Specialist sponge clean or gentle dry clean.',
    fitNotes: 'Voluminous cocoon silhouette designed to layer comfortably over thick knitwear.',
    modelMeasurements: 'Model is 185 cm wearing size Medium.',
    images: [
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg',
      '/src/assets/images/ihr_product_outerwear_1791814706754.jpg'
    ],
    colors: [
      { name: 'Desert Sand', hex: '#D2C4A7' },
      { name: 'Olive Basalt', hex: '#4B4D3B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 16,
    reviews: []
  },
  {
    id: 'ihr-overshirt-05',
    name: 'Japanese Heavy Selvedge Twill Field Overshirt',
    category: 'Tailoring',
    subtitle: 'Shuttle-loomed 14oz raw selvedge cotton with antiqued gunmetal snap hardware.',
    price: 295,
    description: 'Woven on vintage Toyoda shuttle looms in Kurashiki, Okayama. Cut with twin chest envelope pockets, clean squared hem, and reinforced bar-tack stress points for decades of wear.',
    composition: '100% Selvedge Cotton (14oz unwashed natural indigo/charcoal)',
    fabricOrigin: 'Kojima, Okayama Prefecture, Japan',
    careInstructions: 'Cold wash inside out. Line dry in shade to preserve crisp indigo patina.',
    fitNotes: 'Straight overshirt cut with room across back yoke.',
    modelMeasurements: 'Model is 180 cm wearing size Medium.',
    images: [
      '/src/assets/images/ihr_product_tailoring_1791814731726.jpg',
      '/src/assets/images/ihr_product_outerwear_1791814706754.jpg'
    ],
    colors: [
      { name: 'Raw Black Indigo', hex: '#1E212D' },
      { name: 'Cast Steel', hex: '#4F535B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.9,
    reviewsCount: 41,
    reviews: []
  },
  {
    id: 'ihr-trouser-06',
    name: 'Pleated Wide-Leg Wool Flannel Trousers',
    category: 'Trousers',
    subtitle: 'Double forward pleats, extended tab waistband, and deep 5cm cuffs in heavy flannel.',
    price: 310,
    description: 'Engineered for drape and clean vertical lines. Features a high-rise waist, deep inward pleats, side buckle cinches, and a generous hem opening that breaks gracefully over formal footwear.',
    composition: '100% Wool Flannel (340 GSM); Horn side adjusters',
    fabricOrigin: 'Fox Brothers & Co, Somerset, England',
    careInstructions: 'Dry clean only. Press with damp cloth.',
    fitNotes: 'High-waisted, wide leg profile with natural break at the ankle.',
    modelMeasurements: 'Model is 184 cm wearing size 48 (Medium).',
    images: [
      '/src/assets/images/ihr_product_tailoring_1791814731726.jpg',
      '/src/assets/images/ihr_product_knitwear_1791814720697.jpg'
    ],
    colors: [
      { name: 'Flannel Heather Gray', hex: '#5A5B60' },
      { name: 'Charcoal Shadow', hex: '#232326' }
    ],
    sizes: ['46 (30W)', '48 (32W)', '50 (34W)', '52 (36W)'],
    inStock: true,
    rating: 4.9,
    reviewsCount: 22,
    reviews: []
  },
  {
    id: 'ihr-knit-07',
    name: 'Silk-Cashmere Fine Gauge Seamless Crewneck',
    category: 'Knitwear',
    subtitle: 'Ultralight 18-gauge 70/30 Mulberry silk & cashmere with seamless circular knitting.',
    price: 280,
    description: 'An ethereal second skin. Spun from long-staple mulberry silk and inner Mongolian grade-A cashmere, delivering a lustrous sheen, zero itch, and temperature regulation across seasons.',
    composition: '70% Grade-A Cashmere, 30% Mulberry Silk',
    fabricOrigin: 'Inner Mongolia & Como, Italy',
    careInstructions: 'Gentle hand wash in lukewarm water with gentle silk shampoo.',
    fitNotes: 'Tailored regular fit. Fits true to size.',
    modelMeasurements: 'Model is 181 cm wearing size Medium.',
    images: [
      '/src/assets/images/ihr_product_knitwear_1791814720697.jpg',
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg'
    ],
    colors: [
      { name: 'Pearl Cream', hex: '#F3EFE6' },
      { name: 'Obsidian Black', hex: '#0F0F10' },
      { name: 'Sage Celadon', hex: '#7E8779' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.8,
    reviewsCount: 15,
    reviews: []
  },
  {
    id: 'ihr-accessory-08',
    name: 'Vegetable-Tanned Calfskin Architectural Tote',
    category: 'Accessories',
    subtitle: 'Hand-burnished saddle-stitched tote with solid palladium hardware and suede interior.',
    price: 460,
    originalPrice: 520,
    description: 'Crafted in a family atelier in Tuscany from full-grain vegetable-tanned calfskin. Constructed with clean rectilinear geometry, magnetic top fastening, reinforced shoulder straps, and a removable padded laptop sleeve.',
    composition: '100% Full-Grain Vegetable-Tanned Italian Calfskin; Suede calf lining',
    fabricOrigin: 'Santa Croce sull\'Arno, Tuscany, Italy',
    careInstructions: 'Condition with natural beeswax leather cream twice yearly.',
    fitNotes: 'Dimensions: 42cm (W) x 36cm (H) x 14cm (D). Handle drop: 26cm.',
    modelMeasurements: 'Unisex structured tote.',
    images: [
      '/src/assets/images/ihr_hero_campaign_1791814754899.jpg',
      '/src/assets/images/ihr_product_outerwear_1791814706754.jpg'
    ],
    colors: [
      { name: 'Nero Black', hex: '#161617' },
      { name: 'Cuoio Cognac', hex: '#7B4A2D' }
    ],
    sizes: ['One Size'],
    inStock: true,
    isLimitedRun: true,
    rating: 5.0,
    reviewsCount: 30,
    reviews: []
  }
];
