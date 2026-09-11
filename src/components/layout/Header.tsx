'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { categories, Category } from '@/data/products';
import SearchModal from '@/components/ui/SearchModal';
import { siteConfig } from '@/lib/config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="EKOSYS Corporation" width={180} height={50} className="h-[50px] w-auto object-contain" style={{ width: 'auto', height: 'auto' }} priority />
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-gray-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
            About
          </Link>
          
          {/* Mega Menu Activator */}
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <Link href="/products" className="flex items-center gap-1.5 text-gray-700 hover:text-emerald-700 font-semibold text-sm">
              <span>Products (31 Categories)</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Link>

            <AnimatePresence>
              {showMegaMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-[1020px] bg-white shadow-2xl rounded-3xl p-7 border border-gray-100 max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Medical Equipment Catalog
                      </span>
                      <h4 className="text-base font-extrabold text-gray-900">
                        All 31 Documented Product Disciplines
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setShowMegaMenu(false);
                          setIsSearchOpen(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:text-emerald-700 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <Search className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Search Catalog (Ctrl+K)</span>
                      </button>
                      <Link 
                        href="/products" 
                        onClick={() => setShowMegaMenu(false)} 
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        View Full Directory &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* 4-Column Grid Covering All 31 Categories */}
                  <div className="grid grid-cols-4 gap-2.5">
                    {categories.map((cat: Category) => (
                      <Link 
                        key={cat.slug} 
                        href={`/products/${cat.slug}`} 
                        onClick={() => setShowMegaMenu(false)}
                        className="flex items-center gap-2.5 hover:bg-emerald-50/70 p-2 rounded-xl transition-all border border-transparent hover:border-emerald-100 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          {cat.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-semibold text-gray-800 leading-tight truncate block group-hover:text-emerald-700 transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-gray-400 block truncate">
                            {cat.subcategories.length} subcategories
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Quality Certifications: ISO 9001:2015 • ISO 13485:2016 • CE Certified</span>
                    <Link href="/contact/enquiry" onClick={() => setShowMegaMenu(false)} className="text-emerald-700 font-bold hover:underline">
                      Request Wholesale Quotation &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/quality" className="text-gray-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
            Quality
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
            Resources
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-emerald-700 font-semibold text-sm transition-colors">
            Contact
          </Link>
        </nav>

        {/* Quick Action Triggers */}
        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-full border border-gray-200 transition-all text-xs font-semibold"
            title="Search products (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Search</span>
            <kbd className="bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono border border-gray-200">⌘K</kbd>
          </button>
          
          <a href={siteConfig.callUrl} className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Us</span>
          </a>

          <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-sm text-xs font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger & Search Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-emerald-600 rounded-full hover:bg-gray-100"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[88%] max-w-md bg-white z-50 p-6 overflow-y-auto lg:hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <Image src="/logo.png" alt="EKOSYS" width={140} height={40} className="h-[40px] w-auto object-contain" style={{ width: 'auto', height: 'auto' }} />
                  <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  <Link 
                    href="/" 
                    className="text-base font-semibold text-gray-800 py-2.5 border-b border-gray-100 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-base font-semibold text-gray-800 py-2.5 border-b border-gray-100 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>

                  {/* Mobile Collapsible Categories Accordion */}
                  <div className="py-2.5 border-b border-gray-100">
                    <button
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className="w-full flex items-center justify-between text-base font-semibold text-gray-800 hover:text-emerald-700 text-left"
                    >
                      <span>Products (31 Categories)</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoriesOpen ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`} />
                    </button>

                    <AnimatePresence>
                      {mobileCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3 space-y-1 pl-2 max-h-60 overflow-y-auto"
                        >
                          <Link
                            href="/products"
                            className="block py-1.5 text-xs font-bold text-emerald-700 hover:underline"
                            onClick={() => setIsOpen(false)}
                          >
                            &rarr; View All 31 Categories
                          </Link>
                          {categories.map((cat: Category) => (
                            <Link
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              className="block py-1 text-xs text-gray-600 hover:text-emerald-700 truncate"
                              onClick={() => setIsOpen(false)}
                            >
                              • {cat.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    href="/quality" 
                    className="text-base font-semibold text-gray-800 py-2.5 border-b border-gray-100 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Quality Standards
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-base font-semibold text-gray-800 py-2.5 border-b border-gray-100 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Clinical Blog
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-base font-semibold text-gray-800 py-2.5 border-b border-gray-100 hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact &amp; Support
                  </Link>
                </nav>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a href={siteConfig.callUrl} className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-semibold text-xs shadow-sm">
                  <Phone className="w-4 h-4 text-emerald-400" /> <span>Call: {siteConfig.phone}</span>
                </a>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-semibold text-xs shadow-sm">
                  <MessageCircle className="w-4 h-4" /> <span>WhatsApp Engineering Desk</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
