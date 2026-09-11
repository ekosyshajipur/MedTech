'use client';
import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Category } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'popular'>('popular');

  const filteredCategories = useMemo(() => {
    let list = [...categories];

    // Filter by category slug
    if (selectedCategory !== 'all') {
      list = list.filter(c => c.slug === selectedCategory);
    }

    // Filter by search query across name, description, and subcategories
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.subcategories.some(s => s.name.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [categories, selectedCategory, searchTerm, sortBy]);

  const totalProducts = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => 
      acc + cat.subcategories.reduce((subAcc, s) => subAcc + s.products.length, 0), 0
    );
  }, [filteredCategories]);

  return (
    <div>
      {/* Control Bar */}
      <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter categories & devices..."
            className="w-full pl-11 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-gray-900"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Facet Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4 text-emerald-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All 31 Medical Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name-asc' | 'name-desc' | 'popular')}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">Default Catalog Order</option>
              <option value="name-asc">Alphabetical: A to Z</option>
              <option value="name-desc">Alphabetical: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-sm text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900">{filteredCategories.length}</span> categories 
          (<span className="font-bold text-emerald-700">{totalProducts}</span> total equipment variants)
        </div>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Matching Equipment Found</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any categories matching &quot;{searchTerm}&quot;. Try searching for another hospital department or device type.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <ProductCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
