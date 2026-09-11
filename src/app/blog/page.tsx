import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getAllBuyerGuides } from "@/data/guides";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Medical Equipment Buyer Guides & Healthcare Resources | EKOSYS Corporation",
  description: "Evidence-aware healthcare buyer guides, technical checklists, and hospital equipment planning resources published by the EKOSYS Corporation engineering desk.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Medical Equipment Buyer Guides & Resources | EKOSYS Corporation",
    description: "Evidence-aware healthcare buyer guides, technical checklists, and hospital equipment planning resources.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogPage() {
  const guides = getAllBuyerGuides();

  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-emerald-800 text-white py-10 border-b border-emerald-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center text-xs text-emerald-200 gap-2 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Resources &amp; Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            Healthcare Equipment Guides &amp; Insights
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl">
            Technical buyer checklists, institutional tender guidance, and hospital infrastructure planning manuals from our engineering desk.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 group flex flex-col justify-between"
            >
              <div className="p-7">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {guide.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                  <Link href={`/blog/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h2>

                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                  {guide.metaDescription}
                </p>
              </div>

              <div className="p-7 pt-0 border-t border-gray-100 mt-auto flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{guide.dateModified}</span>
                </div>

                <Link
                  href={`/blog/${guide.slug}`}
                  className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Institutional Consultation Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
              Technical Documentation &amp; BOQ
            </span>
            <h3 className="text-2xl font-bold mt-1">Need a Custom Hospital Specification or Tender Compliance Sheet?</h3>
            <p className="text-sm text-emerald-100 mt-1 max-w-xl">
              Our biomedical engineers prepare turnkey BOQ estimations and tender technical compliance documents for institutional buyers.
            </p>
          </div>
          <Link
            href="/contact/enquiry"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-md flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Request Documentation</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
