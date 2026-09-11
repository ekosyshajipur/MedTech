import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Award, HelpCircle, FileText, ArrowRight } from "lucide-react";
import SubCategoryCard from "@/components/ui/SubCategoryCard";
import { getAllCategories, getCategoryBySlug } from "@/data/products";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);
  
  if (!categoryData) {
    return {
      title: "Category Not Found | EKOSYS Corporation",
    };
  }

  const canonicalUrl = `${siteConfig.url}/products/${categoryData.slug}`;

  return {
    title: `${categoryData.name} Manufacturer & Supplier India | EKOSYS Corporation`,
    description: `Procure hospital-grade ${categoryData.name.toLowerCase()} from EKOSYS Corporation. Manufactured under ISO 13485:2016 & CE standards in Hajipur, Bihar, India. Explore ${categoryData.subcategories.length} subcategories and request wholesale quotations.`,
    keywords: [
      `${categoryData.name} manufacturer India`,
      `${categoryData.name} supplier`,
      `hospital ${categoryData.name.toLowerCase()}`,
      "medical equipment supplier Bihar",
      "EKOSYS Corporation Hajipur",
      ...categoryData.subcategories.slice(0, 5).map(s => s.name)
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryData.name} | EKOSYS Corporation`,
      description: categoryData.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${categoryData.image}`,
          width: 800,
          height: 600,
          alt: `${categoryData.name} manufactured by EKOSYS Corporation`,
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryData.name} | EKOSYS Corporation`,
      description: categoryData.description,
      images: [`${siteConfig.url}${categoryData.image}`],
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const allCategories = getAllCategories();
  const siblingCategories = allCategories
    .filter((c) => c.slug !== categoryData.slug)
    .slice(0, 4);

  // Category specific FAQs
  const categoryFaqs = [
    {
      question: `What quality certifications apply to ${categoryData.name}?`,
      answer: `All products within the ${categoryData.name} portfolio are manufactured in our Hajipur, Bihar facility following certified ISO 9001:2015 and ISO 13485:2016 Quality Management Systems, with eligible clinical lines carrying CE conformity certifications.`
    },
    {
      question: `Can I request custom dimensional or technical specifications in this category?`,
      answer: `Yes. EKOSYS Corporation provides custom engineering for hospital tenders, institutional procurement, and facility architectural requirements. Technical compliance sheets are provided within 24 to 48 hours.`
    },
    {
      question: `What is the standard delivery lead time for ${categoryData.name}?`,
      answer: `Active inventory items are dispatched within 7 to 14 business days across India. Bulk institutional consignments and export shipments typically dispatch in 4 to 6 weeks in heavy-duty export packaging.`
    }
  ];

  // Schema.org BreadcrumbList
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
        name: categoryData.name,
        item: `${siteConfig.url}/products/${categoryData.slug}`,
      },
    ],
  };

  // Schema.org ItemList (CollectionPage)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryData.name} - Product Subcategories`,
    description: categoryData.description,
    itemListElement: categoryData.subcategories.map((sub, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: sub.name,
      url: `${siteConfig.url}/products/${categoryData.slug}/${sub.slug}`,
    })),
  };

  // Schema.org FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categoryFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Navigation Breadcrumb Banner */}
        <div className="bg-emerald-800 text-white py-10 border-b border-emerald-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-xs text-emerald-200 gap-2 mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{categoryData.name}</span>
            </div>

            <div className="inline-block bg-emerald-700 text-emerald-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              {categoryData.subcategories.length} Specialized Subcategories
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
              {categoryData.name}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-3xl">
              Manufactured under ISO 13485:2016 quality systems at our central facility in Hajipur, Bihar, India.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 mt-12">
          
          {/* Category Clinical Overview & Standards */}
          <div className="mb-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Clinical Purpose &amp; Procurement Overview
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {categoryData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ISO 13485:2016 Medical Quality Standard</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CE Certified Conformity</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Printable Spec Sheets &amp; BOQ Quotations</span>
              </div>
            </div>
          </div>

          {/* Subcategories Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Equipment Subcategories</h2>
                <p className="text-xs text-gray-500 mt-0.5">Select a subcategory to inspect model tiers, technical parameters, and pricing</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
                {categoryData.subcategories.length} Subcategories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {categoryData.subcategories.map((subCategory) => (
                <SubCategoryCard 
                  key={subCategory.id} 
                  subCategory={subCategory} 
                  categorySlug={categoryData.slug} 
                />
              ))}
            </div>
          </div>

          {/* Category Procurement FAQ */}
          <div className="mb-16 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 mb-6">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-xl font-bold text-gray-900">Procurement &amp; Commercial FAQ</h3>
            </div>

            <div className="space-y-4">
              {categoryFaqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">{faq.question}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-linking: Related Categories */}
          <div className="pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Complementary Medical Categories</h3>
                <p className="text-xs text-gray-500 mt-0.5">Explore related healthcare departments and infrastructure</p>
              </div>
              <Link href="/products" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                All Categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {siblingCategories.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/products/${sibling.slug}`}
                  className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                  <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase block mb-1">
                    {sibling.subcategories.length} Subcategories
                  </span>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm mb-1">
                    {sibling.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{sibling.description}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
