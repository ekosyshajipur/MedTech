import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { getAllCategories, getProductBySlug } from "@/data/products";
import ProductDetailCard from "@/components/products/ProductDetailCard";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ category: string; subcategory: string; product: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const result = getProductBySlug(category, subcategory, product);
  
  if (!result) {
    return {
      title: "Product Not Found | EKOSYS Corporation",
    };
  }

  const { product: prod, category: cat, subcategory: sub } = result;

  return {
    title: `${prod.name} (${prod.modelNo}) | ${cat.name} | EKOSYS Corporation`,
    description: `${prod.description} Manufactured by EKOSYS Corporation in Hajipur, Bihar, India. Compliant with ISO 13485:2016 & CE standards. Request wholesale commercial quotation.`,
    keywords: [
      prod.name,
      prod.modelNo,
      sub.name,
      cat.name,
      "medical equipment supplier India",
      "hospital equipment manufacturer",
      "EKOSYS Corporation Hajipur",
      "Bihar medical equipment",
      ...prod.applications
    ],
    alternates: {
      canonical: `${siteConfig.url}/products/${cat.slug}/${sub.slug}/${prod.slug}`,
    },
    openGraph: {
      title: `${prod.name} | EKOSYS Corporation`,
      description: prod.description,
      url: `${siteConfig.url}/products/${cat.slug}/${sub.slug}/${prod.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${prod.image}`,
          width: 800,
          height: 600,
          alt: prod.media.alt || prod.name,
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${prod.name} | EKOSYS Corporation`,
      description: prod.description,
      images: [`${siteConfig.url}${prod.image}`],
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: { category: string; subcategory: string; product: string }[] = [];
  
  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((prod) => {
        params.push({
          category: cat.slug,
          subcategory: sub.slug,
          product: prod.slug,
        });
      });
    });
  });
  
  return params;
}

export default async function ProductPage({ params }: Props) {
  const { category, subcategory, product } = await params;
  const result = getProductBySlug(category, subcategory, product);

  if (!result) {
    notFound();
  }

  const { product: prod, category: cat, subcategory: sub } = result;

  // Schema.org Product & BreadcrumbList structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: prod.name,
    image: `${siteConfig.url}${prod.image}`,
    description: prod.description,
    sku: prod.modelNo,
    mpn: prod.modelNo,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Opposite to Municipal Office",
        addressLocality: "Hajipur",
        addressRegion: "Bihar",
        postalCode: "844101",
        addressCountry: "IN",
      }
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      price: "Contact for Quotation",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${cat.slug}/${sub.slug}/${prod.slug}`,
      itemCondition: "https://schema.org/NewCondition",
    },
    category: `${cat.name} > ${sub.name}`,
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
        name: "Products",
        item: `${siteConfig.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.name,
        item: `${siteConfig.url}/products/${cat.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: sub.name,
        item: `${siteConfig.url}/products/${cat.slug}/${sub.slug}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: prod.name,
        item: `${siteConfig.url}/products/${cat.slug}/${sub.slug}/${prod.slug}`,
      },
    ],
  };

  const siblingProducts = sub.products.filter(p => p.slug !== prod.slug);

  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Navigation Breadcrumb Banner */}
        <div className="bg-emerald-800 text-white py-8 border-b border-emerald-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-xs md:text-sm text-emerald-200 overflow-x-auto whitespace-nowrap gap-2 pb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href={`/products/${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href={`/products/${cat.slug}/${sub.slug}`} className="hover:text-white transition-colors">{sub.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-white font-semibold truncate max-w-xs">{prod.name}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mt-2 text-white">
              {prod.name}
            </h1>
            <p className="text-emerald-200 text-xs md:text-sm mt-1">
              Model Reference: <span className="font-mono font-bold text-white">{prod.modelNo}</span> • Category: {cat.name}
            </p>
          </div>
        </div>

        {/* Main Product Presentation */}
        <div className="container mx-auto px-4 mt-8">
          <ProductDetailCard
            product={prod}
            categoryName={cat.name}
            categorySlug={cat.slug}
          />

          {/* Quality Assurance & Engineering Standards */}
          <div className="mt-12 bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Quality Assurance &amp; Manufacturing Compliance</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Every unit of <span className="font-semibold text-gray-800">{prod.name}</span> is manufactured under stringent ISO 13485:2016 quality management protocols. Materials undergo non-destructive ultrasonic testing, tensile stress validation, and automated optical inspection before clinical dispatch from our state-of-the-art facility in Hajipur, Bihar, India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> ISO 13485:2016
                </div>
                <p className="text-gray-500">Certified medical device manufacturing quality standard ensuring absolute trace-ability.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> CE Directive 93/42/EEC
                </div>
                <p className="text-gray-500">Conformity mark demonstrating compliance with European medical health &amp; safety standards.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> Star Export House
                </div>
                <p className="text-gray-500">Government of India recognized export status delivering to hospitals across 8+ countries.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> 12 Months Warranty
                </div>
                <p className="text-gray-500">Comprehensive manufacturer warranty with available Annual Maintenance Contracts (AMC).</p>
              </div>
            </div>
          </div>

          {/* Sibling Product Variants in this Subcategory */}
          {siblingProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Alternative Configurations in {sub.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Explore other verified model tiers in this equipment category</p>
                </div>
                <Link
                  href={`/products/${cat.slug}/${sub.slug}`}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  View All in {sub.name} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siblingProducts.map((sibling) => (
                  <div key={sibling.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
                    <div className="relative w-28 h-28 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <Image
                        src={sibling.image}
                        alt={sibling.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {sibling.modelNo}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 mt-1.5 mb-1">{sibling.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{sibling.description}</p>
                      <Link
                        href={`/products/${cat.slug}/${sub.slug}/${sibling.slug}`}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                      >
                        Explore Configuration &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick RFQ Assistance Banner */}
          <div className="mt-14 bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">Institutional Healthcare Procurement</span>
              <h3 className="text-2xl font-bold mt-1">Need a Commercial Quotation or Hospital Tender Proposal?</h3>
              <p className="text-sm text-emerald-100 mt-1 max-w-xl">
                Our medical equipment engineers provide turnkey BOQ estimations, technical compliance data sheets, and custom hospital setup quotations within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={`/contact/enquiry?product=${encodeURIComponent(prod.name)}&category=${encodeURIComponent(cat.name)}&categorySlug=${encodeURIComponent(cat.slug)}`}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-md"
              >
                Request Quotation
              </Link>
              <a
                href={`https://wa.me/917644868086?text=${encodeURIComponent(`Hello EKOSYS Team, I require procurement information and pricing for ${prod.name} (${prod.modelNo}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm shadow-md"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
