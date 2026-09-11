'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, FileText, PhoneCall, Sparkles } from 'lucide-react';

const backgroundSlides = [
  {
    image: '/images/backgrounds/hero-medical-theatre.webp',
    title: 'Advanced Operating Theatres',
    subtitle: 'Modular surgical suites with shadowless cold LED illumination and laminar air flow'
  },
  {
    image: '/images/backgrounds/icu-critical-care.webp',
    title: 'High-Acuity Intensive Care Units',
    subtitle: 'Synchronized multiparameter monitoring and continuous life-support integration'
  },
  {
    image: '/images/backgrounds/operating-theatre-cleanroom.webp',
    title: 'Sterile Surgical Cleanrooms',
    subtitle: 'ISO Class 5 contamination control and stainless steel surgical infrastructure'
  },
  {
    image: '/images/backgrounds/diagnostic-imaging-suite.webp',
    title: 'Digital Radiography & Imaging Suites',
    subtitle: 'High-frequency fluoroscopy and direct digital flat panel detectors'
  }
];

const taglines = [
  "An Ecosystem of Innovation",
  "Trusted manufacturer of 1,900+ medical products",
  "Global clinical exporter to 80+ countries",
  "Uncompromising ISO 13485:2016 & CE standards"
];

const realFeaturedDevices = [
  {
    id: 'icu-bed',
    name: 'Motorised ICU Bed with Battery Backup',
    model: 'Model: EK-01011A',
    category: 'Hospital Medical Furniture',
    image: '/images/products/hospital-medical-furniture/icu-beds/hero.webp',
    specs: 'Electric 4-Motor System • CPR Release • 250kg Safe Working Load',
    badge: 'Critical Care Essential',
    link: '/products/hospital-medical-furniture/icu-beds'
  },
  {
    id: 'ot-light',
    name: 'Twin Dome Shadowless LED Surgical Light',
    model: 'Model: EK-11011A',
    category: 'OT & Examination Lights',
    image: '/images/products/ot-examination-lights/led-ot-lights/hero.webp',
    specs: '160,000 Lux Intensity • Endoscopy Cold Field • 60,000h Diode Life',
    badge: 'Operating Theatre',
    link: '/products/ot-examination-lights/led-ot-lights'
  },
  {
    id: 'patient-monitor',
    name: 'High-Acuity Multi-Parameter Patient Monitor',
    model: 'Model: EK-26011A',
    category: 'ICU Equipment',
    image: '/images/products/icu-equipment/patient-monitors/hero.webp',
    specs: '15.6" Multi-Lead ECG • SpO2 • NIBP • Dual Temp • Arrhythmia Analysis',
    badge: 'Vital Signs Telemetry',
    link: '/products/icu-equipment/patient-monitors'
  },
  {
    id: 'c-arm',
    name: 'Mobile High-Frequency C-Arm Fluoroscopy',
    model: 'Model: EK-25011A',
    category: 'Medical Imaging',
    image: '/images/products/medical-imaging/carm-systems/hero.webp',
    specs: '1K x 1K High-Res FPD • 40kHz Microprocessor Inverter • Pulsed Mode',
    badge: 'Digital Radiography',
    link: '/products/medical-imaging/carm-systems'
  }
];

export default function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);

  // Auto-change background images every 6 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, []);

  // Auto-rotate taglines
  useEffect(() => {
    const tagTimer = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(tagTimer);
  }, []);

  const activeDevice = realFeaturedDevices[selectedDeviceIndex];

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-slate-50 text-slate-900 pt-6 pb-12 lg:pb-16 border-b border-gray-200">
      
      {/* 1. Dynamic Auto-Changing Real Background Images (Light Overlay) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundSlides[currentBgIndex].image}
              alt={backgroundSlides[currentBgIndex].title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Luminous Light Gradient Scrim (Light theme ensures background image remains clearly visible) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 lg:to-white/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/60" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Messaging (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Regulatory Accreditations Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 backdrop-blur-md border border-emerald-600/25 mb-4 text-emerald-800 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold tracking-wide uppercase">
                ISO 13485:2016 • ISO 9001:2015 • CE Certified
              </span>
            </motion.div>

            {/* Monumental Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-3 text-slate-900 leading-[1.15]"
            >
              Engineering Advanced <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                Medical Technology
              </span> <br />
              for Global Healthcare
            </motion.h1>

            {/* Dynamic Tagline Carousel */}
            <div className="h-7 mb-4 flex items-center overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTaglineIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm sm:text-lg text-emerald-800 font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  {taglines[currentTaglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mb-6 font-normal">
              EKOSYS Corporation manufactures and exports 1,900+ precision medical products across 31 verified clinical categories — from motorized ICU beds and modular OT tables to titanium orthopaedic implants and high-acuity diagnostic systems.
            </p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 w-full"
            >
              <Link
                href="/products"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-emerald-700/25 flex items-center gap-2 group"
              >
                <span>Explore Catalog (31 Categories)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact/enquiry"
                className="px-5 py-3 bg-white hover:bg-gray-50 border border-slate-300 text-slate-800 rounded-xl font-bold text-sm transition-all shadow-xs flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Request Wholesale RFQ</span>
              </Link>

              <a
                href="https://wa.me/917644868086"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </motion.div>

            {/* Background Image Carousel Indicator Chips */}
            <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center gap-3 w-full">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Live Environment:
              </span>
              <div className="flex items-center gap-1.5">
                {backgroundSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentBgIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentBgIndex === idx
                        ? 'w-6 bg-emerald-600'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Switch to background ${slide.title}`}
                    title={slide.title}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-medium truncate max-w-xs sm:max-w-md">
                {backgroundSlides[currentBgIndex].title}
              </span>
            </div>

          </div>

          {/* Right Column: Real Medical Equipment Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Elevated Main Device Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden group">
                
                {/* Image Container with Badges */}
                <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-100 to-slate-200/80 flex items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDevice.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={activeDevice.image}
                        alt={activeDevice.name}
                        fill
                        priority
                        className="object-contain p-2"
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-gray-200">
                      ISO 13485
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      CE MARK
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                    {activeDevice.model}
                  </div>
                </div>

                {/* Device Details */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {activeDevice.badge}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {activeDevice.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-1">
                    {activeDevice.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {activeDevice.specs}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <Link
                      href={activeDevice.link}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Technical Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact/enquiry?product=${encodeURIComponent(activeDevice.name)}`}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      Get Price Quote
                    </Link>
                  </div>
                </div>

                {/* Thumbnail Selector for 4 Real Devices */}
                <div className="bg-slate-50 p-2.5 border-t border-slate-200 grid grid-cols-4 gap-2">
                  {realFeaturedDevices.map((device, idx) => (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDeviceIndex(idx)}
                      className={`relative rounded-lg p-1 text-left transition-all border ${
                        selectedDeviceIndex === idx
                          ? 'bg-white border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                          : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                      aria-label={`View ${device.name}`}
                    >
                      <div className="relative w-full h-9 mb-1">
                        <Image
                          src={device.image}
                          alt={device.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                      <div className="text-[9px] font-bold text-slate-800 truncate leading-tight">
                        {device.name.replace(/^EK-\d+:\s*/, '').split(' ').slice(0, 2).join(' ')}
                      </div>
                    </button>
                  ))}
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
