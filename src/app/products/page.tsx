import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductFilters from "@/components/products/ProductFilters";
import SearchBar from "@/components/ui/SearchBar";
import { getAllCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Complete Product Range | EKOSYS Corporation",
  description: "Browse our comprehensive range of high-quality medical equipment, including hospital furniture, OT equipment, ICU beds, and more.",
};

export default function ProductsPage() {
  const categories = getAllCategories();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Complete Product Range</h1>
          <div className="flex items-center text-emerald-100 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Products</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <p className="text-gray-600 max-w-2xl text-lg">
            Discover our extensive catalog of premium medical equipment designed for reliability, durability, and patient comfort.
          </p>
          <div className="w-full md:w-96">
            <SearchBar />
          </div>
        </div>

        <ProductFilters categories={categories} />
      </div>
    </div>
  );
}
