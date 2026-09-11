'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { getAllCategories } from '@/data/products';

interface CategoryCluster {
  clusterTitle: string;
  slugs: string[];
}

const CLUSTER_FILTERS: CategoryCluster[] = [
  {
    clusterTitle: 'All Categories (31)',
    slugs: [] // empty means all
  },
  {
    clusterTitle: 'Critical Care & Life Support',
    slugs: ['icu-equipment', 'suction-machines', 'anaesthesia-products']
  },
  {
    clusterTitle: 'Surgical & Operating Theatres',
    slugs: ['ot-tables', 'ot-examination-lights', 'ot-equipment', 'general-surgical-instruments', 'laryngoscope-sets', 'orthopaedic-implants']
  },
  {
    clusterTitle: 'Diagnostics & Imaging',
    slugs: ['diagnostic-equipments', 'medical-imaging', 'height-weight-scales']
  },
  {
    clusterTitle: 'Hospital Furniture',
    slugs: ['hospital-medical-furniture', 'hospital-holloware']
  },
  {
    clusterTitle: 'Sterilization & Lab',
    slugs: ['autoclave-sterilizers', 'laboratory-products']
  },
  {
    clusterTitle: 'Maternal & Neonatal',
    slugs: ['infant-care-equipments', 'ob-gyn-products']
  },
  {
    clusterTitle: 'Disposables & Hospital Supplies',
    slugs: ['medical-disposables', 'blood-collection-tubes', 'hospital-scrubs-linens', 'radiation-protection']
  }
];

export default function CategoryUniverse() {
  const [activeClusterIndex, setActiveClusterIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allCategories = getAllCategories();
  const activeCluster = CLUSTER_FILTERS[activeClusterIndex];

  const displayedCategories = activeCluster.slugs.length === 0
    ? allCategories
    : allCategories.filter(cat => activeCluster.slugs.includes(cat.slug));

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
        
        {/* Section Header with Title and Carousel Navigation Buttons */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Comprehensive Portfolio Universe
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              All 31 Medical Categories
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-xl">
              Showing 1,900+ certified healthcare devices across all 206 subcategories. Browse seamlessly with quick horizontal navigation.
            </p>
          </div>

          {/* Carousel Arrow Controls (Left & Right) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clinical Cluster Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CLUSTER_FILTERS.map((cluster, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveClusterIndex(idx);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeClusterIndex === idx
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {cluster.clusterTitle}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel (Max 1-2 visible on mobile, 3-4 on desktop) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayedCategories.map((cat) => (
            <div
              key={cat.slug}
              className="shrink-0 w-[78vw] sm:w-[46vw] lg:w-[calc(25%-15px)] xl:w-[calc(25%-16px)] snap-start"
            >
              <Link
                href={`/products/${cat.slug}`}
                className="group h-full bg-white rounded-2xl p-4 border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Image with Badges */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-gray-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-700/90 backdrop-blur-md text-[10px] text-white font-bold px-2 py-0.5 rounded shadow-xs">
                      ISO 13485
                    </div>
                    <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-md text-[10px] text-white font-mono font-bold px-2 py-0.5 rounded">
                      {cat.subcategories.length} Subcategories
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-1.5 flex items-center justify-between">
                    <span className="line-clamp-1">{cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>

                  {/* Sample Subcategories Snippet */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cat.subcategories.slice(0, 2).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded truncate max-w-[140px]"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 2 && (
                      <span className="text-[10px] text-emerald-700 font-semibold self-center">
                        +{cat.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Explore Products</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Directory Link */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Displaying {displayedCategories.length} categories in active view</span>
          <Link
            href="/products"
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Complete 31 Categories Catalog Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
