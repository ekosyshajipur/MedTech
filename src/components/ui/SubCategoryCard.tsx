'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SubCategory } from '@/data/products';

interface SubCategoryCardProps {
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  categorySlug: string;
  subCategory?: SubCategory;
}

export default function SubCategoryCard(props: SubCategoryCardProps) {
  const name = props.subCategory ? props.subCategory.name : props.name || '';
  const slug = props.subCategory ? props.subCategory.slug : props.slug || '';
  const categorySlug = props.categorySlug;
  const image = props.subCategory?.image || props.image || `/images/categories/${categorySlug}.webp`;
  const description = props.subCategory ? props.subCategory.description : props.description || '';

  return (
    <Link href={`/products/${categorySlug}/${slug}`} className="block h-full">
      <motion.div 
        whileHover={{ scale: 1.02, y: -2 }}
        className="h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col overflow-hidden"
      >
        <div className="relative w-full h-36 bg-slate-50 border-b border-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
            CERTIFIED
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
            {name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
          <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-emerald-600 font-medium">
            <span>View 3 Models</span>
            <span>&rarr;</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
