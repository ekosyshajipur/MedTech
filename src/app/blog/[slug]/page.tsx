import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, UserCheck, ShieldCheck, HelpCircle, ArrowRight, FileText } from "lucide-react";
import { getAllBuyerGuides, getBuyerGuideBySlug } from "@/data/guides";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBuyerGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide Not Found | EKOSYS Corporation",
    };
  }

  const canonicalUrl = `${siteConfig.url}/blog/${guide.slug}`;

  return {
    title: `${guide.title} | EKOSYS Corporation`,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [guide.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  const guides = getAllBuyerGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getBuyerGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    mainEntityOfPage: `${siteConfig.url}/blog/${guide.slug}`,
    author: {
      "@type": "Organization",
      name: guide.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources & Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${siteConfig.url}/blog/${guide.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Navigation Breadcrumb Banner */}
        <div className="bg-emerald-800 text-white py-10 border-b border-emerald-900">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center text-xs text-emerald-200 gap-2 pb-3 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/blog" className="hover:text-white transition-colors">Resources &amp; Guides</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-white font-medium truncate max-w-sm">{guide.category}</span>
            </div>

            <div className="inline-block bg-emerald-700/80 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {guide.category} • Clinical Buyer Guide
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Updated: {guide.dateModified}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{guide.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-300" />
                <span>Verified by {guide.reviewer.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-5xl mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content (8 cols) */}
            <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
              
              {/* Executive Summary */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-gray-800 text-sm leading-relaxed mb-8">
                <span className="font-bold text-emerald-900 block mb-1">Executive Summary</span>
                {guide.intro}
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {guide.sections.map((section, idx) => (
                  <section key={idx}>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                      {section.heading}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                      {section.content}
                    </p>

                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <ul className="space-y-2.5 bg-gray-50 p-5 rounded-2xl border border-gray-100 mt-4">
                        {section.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Guide Specific FAQs */}
              {guide.faqs && guide.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-emerald-700 mb-6">
                    <HelpCircle className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
                  </div>

                  <div className="space-y-4">
                    {guide.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                        <h4 className="font-bold text-gray-900 text-sm mb-1.5">{faq.question}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editorial Trust & Verification Footnote */}
              <div className="mt-10 pt-6 border-t border-gray-100 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authored by {guide.author.name} • {guide.author.department}</span>
                </div>
                <span>Published: {guide.datePublished}</span>
              </div>
            </article>

            {/* Sidebar (4 cols): Contextual Products & Inquiries */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Related Equipment Subcategories */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Related Product Lines</span>
                </h3>
                <div className="space-y-2.5">
                  {guide.relatedSubcategorySlugs.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/products/${sub.catSlug}/${sub.subSlug}`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all text-xs font-semibold text-gray-800 hover:text-emerald-800"
                    >
                      <span>Explore {sub.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Institutional Tender Quotation Card */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                  Institutional Procurement
                </span>
                <h4 className="text-lg font-bold mb-2">Request Engineering Specifications</h4>
                <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                  Our biomedical engineering department provides hospital BOQ pricing and compliance sheets within 24 hours.
                </p>
                <Link
                  href="/contact/enquiry"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Request Official RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Direct Help */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 text-xs text-gray-600 shadow-sm">
                <span className="font-bold text-gray-900 block mb-1">Need Technical Assistance?</span>
                <p className="mb-3">Speak directly with an equipment specialist at our Hajipur manufacturing headquarters.</p>
                <a href={siteConfig.callUrl} className="text-emerald-700 font-bold hover:underline">
                  Call {siteConfig.phone} &rarr;
                </a>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
