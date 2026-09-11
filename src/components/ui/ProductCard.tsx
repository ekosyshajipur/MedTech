'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Category } from '@/data/products';

interface ProductCardProps {
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  productCount?: number;
  category?: Category;
}

export default function ProductCard(props: ProductCardProps) {
  const name = props.category ? props.category.name : props.name || '';
  const slug = props.category ? props.category.slug : props.slug || '';
  const image = props.category ? props.category.image : props.image || `/images/categories/${slug}.webp`;
  const description = props.category ? props.category.description : props.description || '';
  const productCount = props.category 
    ? props.category.subcategories.reduce((acc, sub) => acc + sub.products.length, 0)
    : props.productCount;

  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <motion.div 
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group flex flex-col"
      >
        <div className="relative w-full h-48 bg-slate-50 overflow-hidden border-b border-gray-100">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-gray-800 border border-white/60 shadow-sm tracking-wide">
            EKOSYS SPEC
          </div>
          <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow-sm">
            CE / ISO
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">{name}</h3>
          <p className="text-gray-600 text-xs flex-grow line-clamp-2 mb-4 leading-relaxed">{description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            {productCount !== undefined && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                {productCount} Variants
              </span>
            )}
            <span className="text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Explore <span>&rarr;</span>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
