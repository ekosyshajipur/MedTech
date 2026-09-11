'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    id: 'icu',
    title: 'ICU & Critical Care Turnkey Setup',
    image: '/images/solutions/icu-setup.webp',
    tagline: 'Life Support & Continuous Telemetry',
    description: 'Motorized 4-motor ICU beds, ceiling articulated pendants, 15.6" patient monitors, syringe pumps, and defibrillators.',
    components: ['4-Motor ICU Beds', 'Telemetry Station', 'Gas Pipeline Pendants', 'Backup Suction'],
    link: '/products/icu-equipment'
  },
  {
    id: 'ot',
    title: 'Modular Surgical Operating Suite',
    image: '/images/solutions/ot-setup.webp',
    tagline: 'Laminar Air & Shadowless Lighting',
    description: 'Electro-hydraulic C-arm compatible surgical tables, twin-dome 160,000 Lux LED lights, and 400W electrosurgical units.',
    components: ['Radiolucent OT Table', '160k Lux LED Lights', 'Diathermy Unit', 'SS Scrub Stations'],
    link: '/products/ot-tables'
  },
  {
    id: 'ward',
    title: 'Hospital Ward & Patient Care',
    image: '/images/solutions/hospital-furniture.webp',
    tagline: 'Ergonomic Patient Accommodation',
    description: 'Fowler and Semi-Fowler beds, ABS bedside lockers, overbed dining tables, privacy screens, and dressing trolleys.',
    components: ['Fowler Hospital Beds', 'Bedside Lockers', 'Overbed Tables', 'Dressing Trolleys'],
    link: '/products/hospital-medical-furniture'
  },
  {
    id: 'diag',
    title: 'Diagnostic Center & Imaging Suite',
    image: '/images/solutions/diagnostic-setup.webp',
    tagline: 'Digital Radiography & ECG',
    description: 'High-frequency mobile C-arms, flat-panel digital detectors, 12-channel ECG machines, and diagnostic sets.',
    components: ['Digital C-Arm System', '12-Channel ECG', 'AAMI BP Monitors', 'LED Diagnostic Sets'],
    link: '/products/medical-imaging'
  },
  {
    id: 'emerg',
    title: 'Emergency Trauma & Resuscitation',
    image: '/images/solutions/emergency-care.webp',
    tagline: 'Pre-Hospital Triage & Life Support',
    description: 'Self-loading ambulance stretchers, rigid spine boards, portable aspirators, resuscitation bags, and crash carts.',
    components: ['Ambulance Stretchers', 'Trauma Spine Boards', 'Portable Suction', 'Emergency Crash Carts'],
    link: '/products/emergency-products'
  }
];

export default function HealthcareSolutions() {
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
    <section className="py-12 md:py-16 bg-slate-50 text-slate-900 border-b border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header with Navigation Arrows */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Turnkey Clinical Setups
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Comprehensive Healthcare Setups
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-xl">
              Turnkey equipment packages synchronized for immediate clinical commissioning across private hospitals and public tenders.
            </p>
          </div>

          {/* Carousel Arrow Controls (Visible on Mobile & Desktop) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 hover:border-emerald-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll setups left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 hover:border-emerald-600 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll setups right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider (Max 1-2 on mobile, 3 on desktop) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="shrink-0 w-[80vw] sm:w-[46vw] lg:w-[calc(33.333%-14px)] bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all snap-start flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative w-full h-40 sm:h-44 bg-slate-100 overflow-hidden">
                  <Image
                    src={sol.image}
                    alt={sol.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 33vw"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    Turnkey Package
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded text-white text-[11px] font-medium truncate">
                    {sol.tagline}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5 leading-snug">
                    {sol.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {sol.description}
                  </p>

                  {/* Component Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {sol.components.map((comp, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={sol.link}
                  className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Solution Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/contact/enquiry?setup=${encodeURIComponent(sol.title)}`}
                  className="text-[11px] font-semibold text-gray-500 hover:text-emerald-700 underline"
                >
                  Get Setup Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
