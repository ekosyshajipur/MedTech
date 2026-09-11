'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const discoveryCategories = [
  {
    id: 'furniture',
    title: 'Hospital Furniture',
    slug: 'hospital-medical-furniture',
    badge: '31 Subcategories',
    image: '/images/categories/hospital-medical-furniture.webp',
    headline: 'Motorized ICU & Ward Patient Care Infrastructure',
    description: 'Advanced 4-section electric ICU beds, Fowler beds, bedside lockers, hydraulic delivery tables, and stainless steel surgical trolleys manufactured to ISO 13485:2016 specifications.',
    keySpecs: [
      '250kg Safe Working Load with Trendelenburg positioning',
      'Antimicrobial epoxy powder coating & SS 304 construction',
      'Central locking caster systems with directional tracking'
    ]
  },
  {
    id: 'icu',
    title: 'ICU & Critical Care',
    slug: 'icu-equipment',
    badge: 'High Acuity',
    image: '/images/categories/icu-equipment.webp',
    headline: 'Continuous Multiparameter Patient Monitoring & Life Support',
    description: 'High-precision vital signs monitors, high-frequency ICU ventilators, syringe infusion pumps, and biphasic defibrillators designed for intensive critical care wards.',
    keySpecs: [
      '15.6" Multi-lead ECG, SpO2, NIBP, Dual Temp, Resp monitoring',
      'Intelligent audio-visual alarm thresholds with trend telemetry',
      'Hot-swappable dual battery backup for uninterrupted power'
    ]
  },
  {
    id: 'surgical',
    title: 'Surgical & OT Suites',
    slug: 'ot-tables',
    badge: 'Precision Engineering',
    image: '/images/categories/ot-tables.webp',
    headline: 'Electro-Hydraulic Operating Tables & Shadowless LED Lighting',
    description: 'Articulated operating tables with 360° radiolucent C-arm fluoroscopy compatibility, twin-dome shadowless LED surgical lights, and electrosurgical generators.',
    keySpecs: [
      '160,000 Lux cold LED illumination with Ra ≥ 96 color rendering',
      'Electro-hydraulic multi-axis tilting with longitudinal slide',
      'Seamless fluid-resistant antistatic memory foam mattresses'
    ]
  },
  {
    id: 'ortho',
    title: 'Orthopaedic Implants',
    slug: 'orthopaedic-implants',
    badge: 'Titanium Grade 5',
    image: '/images/categories/orthopaedic-implants.webp',
    headline: 'Titanium & SS 316L Bone Fixation & Joint Systems',
    description: 'Interlocking intramedullary nails, small and large fragment locking compression plates (LCP), DHS/DCS systems, and precision orthopaedic surgical power tools.',
    keySpecs: [
      'Manufactured from Ti-6Al-4V ELI and implant-grade SS 316L',
      'Anatomically pre-contoured low profile plate designs',
      '100% Dimensional laser verification & cleanroom packaging'
    ]
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic & Imaging',
    slug: 'medical-imaging',
    badge: 'Digital Radiography',
    image: '/images/categories/medical-imaging.webp',
    headline: 'High-Frequency Digital X-Ray & C-Arm Fluoroscopy',
    description: 'High-frequency mobile C-arms, digital radiography flat-panel detectors, 12-channel ECG machines, and precision ultrasound systems.',
    keySpecs: [
      'High-frequency inverter generators for minimized radiation dose',
      'Direct-deposit Cesium Iodide (CsI) digital flat panel detectors',
      'Full DICOM 3.0 PACS connectivity and reporting software'
    ]
  },
  {
    id: 'autoclave',
    title: 'Autoclave & Sterilizers',
    slug: 'autoclave-sterilizers',
    badge: 'Class B Vacuum',
    image: '/images/categories/autoclave-sterilizers.webp',
    headline: 'High-Pressure Steam Autoclaves & Instrument Reprocessing',
    description: 'Vertical and horizontal heavy-duty steam sterilizers, flash sterilizers, and dressing drums engineered for CSSD microbial eradication.',
    keySpecs: [
      'Microprocessor PID temperature & fractionated vacuum cycle',
      'Heavy-gauge SS 316L pressure vessel with dual safety relief valves',
      'Automated thermal printout validation for regulatory auditing'
    ]
  }
];

export default function ProductDiscovery() {
  const [activeTab, setActiveTab] = useState(discoveryCategories[0].id);
  const current = discoveryCategories.find(c => c.id === activeTab) || discoveryCategories[0];

  return (
    <section className="py-10 md:py-14 bg-slate-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            Intelligent Product Discovery
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            What Medical Solutions Does Your Facility Need?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Select a key medical discipline below to explore verified clinical equipment and certified engineering standards.
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6">
          {discoveryCategories.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-emerald-700 text-white shadow-xs scale-102'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{item.title}</span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Preview Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Left Column: Rich Information */}
              <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                      {current.badge}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">EKOSYS Certified Catalog</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {current.headline}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {current.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Key Engineering Standards:</h4>
                    {current.keySpecs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/products/${current.slug}`}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs md:text-sm transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Browse {current.title} Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/contact/enquiry?category=${encodeURIComponent(current.title)}`}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-xs md:text-sm transition-colors"
                  >
                    Request Category Price List
                  </Link>
                </div>
              </div>

              {/* Right Column: Original Category Imagery */}
              <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[340px] bg-slate-900 overflow-hidden">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono text-emerald-300 font-bold block uppercase tracking-wider mb-0.5">
                    Verified Healthcare Visual
                  </span>
                  <div className="text-base font-bold">{current.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
