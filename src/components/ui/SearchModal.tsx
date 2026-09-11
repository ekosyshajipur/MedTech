'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { searchProducts, Category, SubCategory, Product } from '@/data/products';

interface SearchResultItem {
  category: Category;
  subcategory: SubCategory;
  product: Product;
  name?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    setResults([]);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      const timer = setTimeout(() => {
        setResults([]);
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      try {
        const res = searchProducts(trimmed);
        setResults(res as SearchResultItem[]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
              <Search className="w-6 h-6 text-emerald-600" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medical equipment, categories..."
                className="flex-1 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-400"
              />
              {isLoading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 flex-1 bg-gray-50/50">
              {query && !isLoading && results.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No products found for &quot;{query}&quot;</p>
                </div>
              )}
              
              {!query && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Start typing to search across 1,900+ medical products
                </div>
              )}

              {results.length > 0 && (
                <div className="grid gap-2">
                  {results.map((item, idx) => {
                    const catSlug = item.category?.slug || '';
                    const subSlug = item.subcategory?.slug || '';
                    const prodName = item.product?.name || item.name || '';
                    const catName = item.category?.name || '';
                    const subName = item.subcategory?.name || '';
                    const href = catSlug && subSlug ? `/products/${catSlug}/${subSlug}` : '/products';

                    return (
                      <Link
                        key={idx}
                        href={href}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors uppercase">
                          {catSlug ? catSlug.substring(0, 3) : 'MED'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 font-medium group-hover:text-emerald-700 transition-colors truncate">
                            {prodName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {catName}
                            </span>
                            {subName && (
                              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                                {subName}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
