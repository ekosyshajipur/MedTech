import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function QualityManufacturing() {
  return (
    <section className="hidden md:block py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="/images/backgrounds/quality-manufacturing.webp"
                alt="EKOSYS Medical Precision Manufacturing & Quality Testing Facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> High-Precision Calibration Laboratory
                </div>
                <h4 className="text-xl font-bold">100% Pre-Dispatch Quality Control</h4>
                <p className="text-xs text-gray-300 mt-1">Every unit undergoes load testing, electrical safety checks, and dimensional verification.</p>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xl max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-gray-900 block">ISO 13485:2016</span>
                <span className="text-[11px] text-gray-500 leading-tight block">International Medical Device Manufacturing Standard</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Standards (6 cols) */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              Engineering &amp; Manufacturing Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Surgical Precision Engineering &amp; Certified Clinical Reliability
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              At EKOSYS Corporation, manufacturing medical technology is a matter of life-saving responsibility. Based out of our central facility in Hajipur, Bihar, India, our production workflows follow strict ISO 13485:2016 quality management systems with full material traceability from raw surgical alloy to finished hospital installation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Surgical Grade Materials
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Titanium Ti-6Al-4V Grade 5, AISI 316L/420 Stainless Steel, and medical-grade polymers resistant to continuous autoclave cycles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Electrical &amp; Patient Safety
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Compliance with IEC 60601-1 medical electrical safety standards, low leakage currents, and electromagnetic compatibility.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Cleanroom Packaging
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Class 10,000 cleanroom environments for sterile disposables and implants with microbial barrier integrity testing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Export Packaging Standards
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Heavy-duty moisture-proof barrier crating designed to withstand maritime and air transport across 8+ destination countries.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/quality"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs md:text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Read Quality Policy &amp; Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
