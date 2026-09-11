import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, Layers, HelpCircle } from "lucide-react";
import { getAllCategories, getCategoryBySlug, getSubCategoryBySlug } from "@/data/products";
import ProductDetailCard from "@/components/products/ProductDetailCard";
import SubCategoryCard from "@/components/ui/SubCategoryCard";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const categoryData = getCategoryBySlug(category);
  const subCategoryData = getSubCategoryBySlug(category, subcategory);
  
  if (!categoryData || !subCategoryData) {
    return {
      title: "Subcategory Not Found | EKOSYS Corporation",
    };
  }

  const canonicalUrl = `${siteConfig.url}/products/${categoryData.slug}/${subCategoryData.slug}`;

  return {
    title: `${subCategoryData.name} Supplier India | ${categoryData.name} | EKOSYS`,
    description: `Explore medical-grade ${subCategoryData.name.toLowerCase()} manufactured by EKOSYS Corporation. Features 3 verified model configurations with ISO 13485 & CE certification. Request wholesale quotation.`,
    keywords: [
      `${subCategoryData.name} manufacturer India`,
      `${subCategoryData.name} supplier`,
      `hospital ${subCategoryData.name.toLowerCase()}`,
      categoryData.name,
      "medical equipment Bihar",
      "EKOSYS Corporation"
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${subCategoryData.name} | EKOSYS Corporation`,
      description: subCategoryData.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${subCategoryData.image}`,
          width: 800,
          height: 600,
          alt: `${subCategoryData.name} - EKOSYS Corporation`,
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${subCategoryData.name} | EKOSYS Corporation`,
      description: subCategoryData.description,
      images: [`${siteConfig.url}${subCategoryData.image}`],
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: { category: string; subcategory: string }[] = [];
  
  categories.forEach((category) => {
    category.subcategories.forEach((subCategory) => {
      params.push({
        category: category.slug,
        subcategory: subCategory.slug,
      });
    });
  });
  
  return params;
}

export default async function SubCategoryPage({ params }: Props) {
  const { category, subcategory } = await params;
  const categoryData = getCategoryBySlug(category);
  const subCategoryData = getSubCategoryBySlug(category, subcategory);

  if (!categoryData || !subCategoryData) {
    notFound();
  }

  // Subcategory specific FAQs
  const subcategoryFaqs = [
    {
      question: `What configurations are available in ${subCategoryData.name}?`,
      answer: `We provide three verified models: Premium, Standard, and Advanced tiers to match varying clinical acuity levels, ICU requirements, and hospital budget allocations.`
    },
    {
      question: `Can I download printable PDF specification sheets for ${subCategoryData.name}?`,
      answer: `Yes, every model configuration has an instant PDF spec sheet generator built-in with official EKOSYS technical data, model reference numbers, and ISO 13485:2016 compliance tables.`
    },
    {
      question: `What is the warranty coverage for this equipment?`,
      answer: `All models include a 12-month comprehensive manufacturer warranty against manufacturing defects, with extended Annual Maintenance Contracts (AMC) available for hospital chains and government institutions.`
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
      {
        "@type": "ListItem",
        position: 4,
        name: subCategoryData.name,
        item: `${siteConfig.url}/products/${categoryData.slug}/${subCategoryData.slug}`,
      },
    ],
  };

  // Schema.org ItemList (CollectionPage of products)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${subCategoryData.name} Models`,
    description: subCategoryData.description,
    itemListElement: subCategoryData.products.map((prod, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: prod.name,
      url: `${siteConfig.url}/products/${categoryData.slug}/${subCategoryData.slug}/${prod.slug}`,
    })),
  };

  // Schema.org FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: subcategoryFaqs.map((f) => ({
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
            <div className="flex items-center text-xs text-emerald-200 gap-2 mb-3 overflow-x-auto whitespace-nowrap pb-1">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href={`/products/${categoryData.slug}`} className="hover:text-white transition-colors">{categoryData.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-white font-medium truncate">{subCategoryData.name}</span>
            </div>

            <div className="inline-block bg-emerald-700 text-emerald-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Category: {categoryData.name} • 3 Verified Model Tiers
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
              {subCategoryData.name}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-3xl">
              Manufactured under ISO 13485:2016 quality systems at our central facility in Hajipur, Bihar, India.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-10">
          
          {/* Subcategory Description & Fast Anchor Links */}
          <div className="mb-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
              {subCategoryData.description}
            </p>

            {/* Direct Contextual Links to All 3 Product Variants */}
            <div className="pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Available Product Configurations (Click for Dedicated Technical Sheet):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {subCategoryData.products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${categoryData.slug}/${subCategoryData.slug}/${p.slug}`}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 transition-all text-xs font-semibold text-gray-800 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="block font-bold text-gray-900">{p.name}</span>
                      <span className="text-[10px] text-emerald-700 font-mono font-normal">Model: {p.modelNo}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Product Detail Cards Showcase */}
          <div className="space-y-12">
            {subCategoryData.products?.map((product) => (
              <ProductDetailCard
                key={product.id}
                product={product}
                categoryName={categoryData.name}
                categorySlug={categoryData.slug}
              />
            ))}
          </div>

          {/* Subcategory Specific FAQ */}
          <div className="mt-16 mb-16 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 mb-6">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-xl font-bold text-gray-900">Equipment Procurement FAQ</h3>
            </div>

            <div className="space-y-4">
              {subcategoryFaqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">{faq.question}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Subcategories */}
          <div className="pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Other Equipment Lines in {categoryData.name}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Explore complementary hospital products and infrastructure</p>
              </div>
              <Link
                href={`/products/${categoryData.slug}`}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                All in {categoryData.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryData.subcategories
                .filter(sub => sub.slug !== subcategory)
                .slice(0, 4)
                .map(subCategory => (
                <SubCategoryCard 
                  key={subCategory.id} 
                  subCategory={subCategory}
                  categorySlug={categoryData.slug}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
