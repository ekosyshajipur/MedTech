import Link from 'next/link';
import { MapPin, Phone, Mail, Globe2, Truck, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const officeAddress = "Opposite to Municipal Office, Hajipur - 844101, Vaishali, Bihar, India";
const googleMapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`;

const majorRegions = [
  { city: 'Hajipur & Patna', role: 'Manufacturing & Distribution Hub (Bihar)', tag: 'Facility HQ' },
  { city: 'Delhi NCR', role: 'Northern Institutional & Tender Supply', tag: 'Direct Logistics' },
  { city: 'Kolkata & East', role: 'Eastern Healthcare & Hospital Networks', tag: 'Fast Transit' },
  { city: 'Mumbai & Pune', role: 'Western Medical Centers & Specialty Clinics', tag: 'Commercial Distribution' },
  { city: 'Bengaluru & Hyderabad', role: 'Southern Advanced Biotech & Hospital Groups', tag: 'Corporate Procurement' },
  { city: 'Guwahati & North-East', role: 'Regional Hospital Care & Primary Health Centers', tag: 'Institutional Supply' },
];

export default function NationwideTrust() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1.5">
            Pan-India Manufacturing &amp; Global Supply
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Headquartered in Bihar, Supplying Nationwide &amp; Worldwide
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Manufactured at our central production hub in Hajipur, Vaishali, Bihar. Delivering certified medical equipment across all Indian states and 80+ export destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
          
          {/* Facility Location Details & Interactive Office Map (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-7 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                <MapPin className="w-3 h-3" /> Production Facility &amp; Head Office
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                EKOSYS Corporation Facility
              </h3>

              <div className="space-y-3 text-xs text-gray-300 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{officeAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={siteConfig.callUrl} className="hover:text-emerald-300 transition-colors font-medium">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-emerald-300 transition-colors font-medium">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Star Export House (Exports to 80+ Countries)</span>
                </div>
              </div>
            </div>

            {/* Embedded Office Map with Direct Pin to Office Address */}
            <div>
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-700 shadow-inner mb-3 group">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(officeAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EKOSYS Corporation Office Address in Hajipur Bihar"
                />

                {/* Direct Clickable Overlay to Open Exact Office Location */}
                <a
                  href={googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Click to reach office address on Google Maps"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Reach Office on Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <a
                  href={googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link href="/contact" className="hover:text-white font-medium">
                  Contact Office &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Nationwide Healthcare Reach (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">
                Nationwide Healthcare Supply Network
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4">
                We fulfill institutional healthcare tenders, hospital expansion projects, and clinic requirements across India with standardized crating, verified dispatch milestones, and dedicated logistics coordinators.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {majorRegions.map((region, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{region.city}</h4>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {region.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-normal">{region.role}</p>
                  </div>
                ))}
              </div>

              {/* Logistics & Compliance Badges */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-emerald-700 mb-0.5" />
                  <span className="text-xs font-bold text-gray-900">Pan-India Freight</span>
                  <span className="text-[10px] text-gray-500">Surface &amp; Express Cargo</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 mb-0.5" />
                  <span className="text-xs font-bold text-gray-900">Transit Insurance</span>
                  <span className="text-[10px] text-gray-500">100% Damage Protection</span>
                </div>
                <div className="flex flex-col items-center">
                  <Globe2 className="w-4 h-4 text-emerald-700 mb-0.5" />
                  <span className="text-xs font-bold text-gray-900">Export Packaging</span>
                  <span className="text-[10px] text-gray-500">Seaworthy Wooden Crates</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-gray-500">Need regional supply chain timeline?</span>
              <Link
                href="/contact/enquiry"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Request Regional Logistics Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
