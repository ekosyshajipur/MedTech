'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer relative flex items-center w-full px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-gray-500 hover:text-gray-700"
      >
        <Search className="w-5 h-5 text-emerald-600 mr-3 shrink-0" />
        <span className="text-sm">Search 1,900+ medical products, categories...</span>
        <kbd className="hidden sm:inline-block ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200 font-mono">
          Search
        </kbd>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
