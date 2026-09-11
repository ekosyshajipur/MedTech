'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredProducts = [
  {
    id: 'feat-1',
    name: 'EK-01011A: Motorised ICU Bed with Battery Backup',
    categoryName: 'Hospital Medical Furniture',
    catSlug: 'hospital-medical-furniture',
    subSlug: 'icu-beds',
    image: '/images/products/hospital-medical-furniture/icu-beds/hero.webp',
    specs: 'Electric 4-Motor System • CPR Release • 250kg Capacity'
  },
  {
    id: 'feat-2',
    name: 'EK-26011A: High-Acuity ICU Vital Signs Patient Monitor',
    categoryName: 'ICU Equipment',
    catSlug: 'icu-equipment',
    subSlug: 'patient-monitors',
    image: '/images/products/icu-equipment/patient-monitors/hero.webp',
    specs: '15.6" Multi-Lead ECG • SpO2 • NIBP • Dual Temp'
  },
  {
    id: 'feat-3',
    name: 'EK-11011A: Twin Ceiling Shadowless LED OT Light',
    categoryName: 'OT & Examination Lights',
    catSlug: 'ot-examination-lights',
    subSlug: 'led-ot-lights',
    image: '/images/products/ot-examination-lights/led-ot-lights/hero.webp',
    specs: '160,000 Lux • Endoscopy Mode • Dual Dome 360°'
  },
  {
    id: 'feat-4',
    name: 'EK-02011A: Titanium Interlocking Femoral Nail System',
    categoryName: 'Orthopaedic Implants',
    catSlug: 'orthopaedic-implants',
    subSlug: 'interlocking-nails',
    image: '/images/products/orthopaedic-implants/interlocking-nails/hero.webp',
    specs: 'Ti-6Al-4V Grade 5 • Multi-Lock Angle • CE Certified'
  },
  {
    id: 'feat-5',
    name: 'EK-25011A: Mobile High-Frequency C-Arm Fluoroscopy',
    categoryName: 'Medical Imaging',
    catSlug: 'medical-imaging',
    subSlug: 'carm-systems',
    image: '/images/products/medical-imaging/carm-systems/hero.webp',
    specs: '1K x 1K High Res FPD • 40kHz Inverter • Pulse Mode'
  },
  {
    id: 'feat-6',
    name: 'EK-07011A: Heavy Duty Vertical High-Pressure Autoclave',
    categoryName: 'Autoclave & Sterilizers',
    catSlug: 'autoclave-sterilizers',
    subSlug: 'pressure-steam-sterilizers',
    image: '/images/products/autoclave-sterilizers/pressure-steam-sterilizers/hero.webp',
    specs: 'Microprocessor PID Control • 134°C Flash • Dual Safety'
  },
  {
    id: 'feat-7',
    name: 'EK-03011A: SuperCut Precision Micro-Dissecting Scissors',
    categoryName: 'General Surgical Instruments',
    catSlug: 'general-surgical-instruments',
    subSlug: 'surgical-scissors',
    image: '/images/products/general-surgical-instruments/surgical-scissors/hero.webp',
    specs: 'Tungsten Carbide Inlays • Matte Satin Finish • 316L SS'
  },
  {
    id: 'feat-8',
    name: 'EK-05011A: Hospital Grade Digital Sphygmomanometer',
    categoryName: 'Diagnostic Equipments',
    catSlug: 'diagnostic-equipments',
    subSlug: 'sphygmomanometers',
    image: '/images/products/diagnostic-equipments/sphygmomanometers/hero.webp',
    specs: 'Clinically Validated AAMI • Anti-Microbial Cuff'
  }
];

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header with Left & Right Arrows on ALL Devices */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                Enterprise Healthcare Solutions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Medical Innovations
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-xl">
              High-acuity clinical hardware engineered for hospital operations and specialized surgical suites.
            </p>
          </div>

          {/* Carousel Arrow Controls (Visible on Mobile & Desktop) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel (Max 1-2 visible on mobile, 3-4 on desktop) */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -4 }}
              className="shrink-0 w-[78vw] sm:w-[46vw] lg:w-[calc(25%-15px)] xl:w-[calc(25%-16px)] bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all snap-start flex flex-col overflow-hidden group"
            >
              <div className="relative w-full h-44 sm:h-48 bg-slate-50 border-b border-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 25vw"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-xs border border-gray-200">
                  ISO 13485
                </div>
                <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                  CE MARK
                </div>
              </div>
              
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mb-2 block">
                    {product.categoryName}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                    {product.specs}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <Link 
                    href={`/products/${product.catSlug}/${product.subSlug}`}
                    className="text-emerald-700 text-xs font-bold hover:text-emerald-800 flex items-center justify-between group/btn"
                  >
                    <span>View Specifications</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
