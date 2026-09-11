import { MetadataRoute } from 'next';
import { getAllCategories, Category, SubCategory } from '@/data/products';
import { getAllBuyerGuides } from '@/data/guides';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  let categories: Category[] = [];
  try {
    categories = getAllCategories() || [];
  } catch {
    console.warn("Could not load categories for sitemap");
  }

  const categoryUrls = categories.map((cat: Category) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const subcategoryUrls = categories.flatMap((cat: Category) => 
    cat.subcategories ? cat.subcategories.map((sub: SubCategory) => ({
      url: `${baseUrl}/products/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })) : []
  );

  const productUrls = categories.flatMap((cat: Category) =>
    cat.subcategories ? cat.subcategories.flatMap((sub: SubCategory) =>
      sub.products ? sub.products.map((product) => ({
        url: `${baseUrl}/products/${cat.slug}/${sub.slug}/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })) : []
    ) : []
  );

  const buyerGuides = getAllBuyerGuides() || [];
  const guideUrls = buyerGuides.map((guide) => ({
    url: `${baseUrl}/blog/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...categoryUrls,
    ...subcategoryUrls,
    ...productUrls,
    ...guideUrls,
    {
      url: `${baseUrl}/quality`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/distributor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/enquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
