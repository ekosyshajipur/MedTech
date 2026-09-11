'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Download, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  PackageCheck, 
  Maximize2,
  FileText
} from 'lucide-react';
import { Product } from '@/data/products';

interface ProductDetailCardProps {
  product: Product;
  categoryName: string;
  categorySlug: string;
}

export default function ProductDetailCard({ product, categoryName, categorySlug }: ProductDetailCardProps) {
  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const angleNames = ['Front View', 'Side Profile', 'Technical ISO'];

  const handleDownloadSpec = () => {
    // Generate clean printable specification window with EKOSYS branding
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const specsHtml = product.specifications.map(s => `<li>${s}</li>`).join('');
    const featuresHtml = product.features.map(f => `<li>${f}</li>`).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${product.name} - Technical Specification Sheet | EKOSYS Corporation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 3px solid #059669; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
            .logo { font-size: 26px; font-weight: 800; color: #059669; letter-spacing: -0.5px; }
            .sub { color: #64748b; font-size: 13px; margin-top: 4px; }
            .badge { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; }
            .title { font-size: 22px; font-weight: 700; margin-top: 25px; margin-bottom: 6px; color: #0f172a; }
            .model { font-family: monospace; font-size: 14px; font-weight: bold; color: #059669; margin-bottom: 20px; }
            .desc { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 25px; }
            h3 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 25px; }
            ul { padding-left: 20px; font-size: 13px; line-height: 1.8; color: #334155; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            .table th, .table td { border: 1px solid #e2e8f0; padding: 10px 14px; text-align: left; }
            .table th { background: #f8fafc; font-weight: 600; width: 35%; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">EKOSYS CORPORATION</div>
              <div class="sub">Medical Equipment &amp; Hospital Technology Manufacturer • Hajipur, Bihar, India</div>
            </div>
            <div class="badge">ISO 13485:2016 • CE CERTIFIED</div>
          </div>
          <div class="title">${product.name}</div>
          <div class="model">MODEL REF: ${product.modelNo || product.id} | CATEGORY: ${categoryName}</div>
          <p class="desc">${product.description}</p>
          
          <h3>Technical Specifications</h3>
          <ul>${specsHtml}</ul>

          <h3>Key Clinical &amp; Functional Features</h3>
          <ul>${featuresHtml}</ul>

          <h3>Regulatory &amp; Commercial Compliance</h3>
          <table class="table">
            <tr><th>Manufacturing Standards</th><td>ISO 13485:2016, ISO 9001:2015, CE Directive 93/42/EEC</td></tr>
            <tr><th>Warranty Coverage</th><td>${product.warranty || '12 Months Comprehensive EKOSYS Warranty'}</td></tr>
            <tr><th>Delivery Dispatch</th><td>${product.leadTime || '7-14 Business Days Globally'}</td></tr>
            <tr><th>Packaging Standard</th><td>Heavy-Duty Export Wooden Crating / Moisture-Proof Barrier</td></tr>
          </table>

          <div class="footer">
            <div>Support: ekosys.corp@gmail.com | Tel: +91 76 44 86 80 86</div>
            <div>Generated: ${new Date().toLocaleDateString('en-GB')} | Verified Engineering Data</div>
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Gallery Visual Showcase (5 Cols) */}
        <div className="lg:col-span-5 p-6 lg:p-8 bg-gray-50/60 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
          <div>
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200/80 mb-4 group cursor-pointer" onClick={() => setIsZoomOpen(true)}>
              <Image
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-gray-800 shadow-sm border border-gray-200">
                {product.modelNo || 'EKOSYS MED'}
              </div>
              <button 
                className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-md transition-transform active:scale-95"
                title="Click to expand full resolution view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Angle Selectors */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-emerald-600 shadow-sm ring-2 ring-emerald-200' 
                      : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gray-900/70 text-[9px] text-white font-medium py-0.5 text-center truncate px-1">
                    {angleNames[idx] || `Angle ${idx + 1}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Verification Badges */}
          <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ISO 13485:2016 Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>CE Mark Approved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{product.leadTime || '7-14 Days Dispatch'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Export Crating Standard</span>
            </div>
          </div>
        </div>

        {/* Product Details & Specifications (7 Cols) */}
        <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                {product.modelNo || product.id.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Category: {categoryName}
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Technical Specs List */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Technical Specifications
              </h3>
              <ul className="space-y-2 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                {product.specifications?.map((spec, i) => (
                  <li key={i} className="text-gray-700 text-xs flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Clinical Features */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Key Clinical Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features?.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <Link 
              href={`/contact/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(categoryName)}&categorySlug=${encodeURIComponent(categorySlug)}`}
              className="flex-1 min-w-[160px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center px-6 py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Request Official Quotation
            </Link>

            <button
              onClick={handleDownloadSpec}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
              title="Download print-ready PDF specification sheet"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              Spec Sheet (PDF)
            </button>

            <a
              href={`https://wa.me/917644868086?text=${encodeURIComponent(`Hello EKOSYS Corporation, I am interested in procuring: ${product.name} (${product.modelNo || product.id}). Please provide commercial pricing and delivery lead time.`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold px-4 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              title="Inquire via WhatsApp"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-4xl w-full aspect-4/3 rounded-2xl overflow-hidden bg-white">
            <Image
              src={images[selectedImageIndex] || product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
            <button 
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 bg-gray-900/80 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
