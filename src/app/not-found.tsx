"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Home, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="text-[150px] font-black text-emerald-100 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="w-24 h-24 text-emerald-600" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/"
              className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <Link 
              href="/products"
              className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-emerald-700 font-semibold border border-emerald-200 rounded-lg transition-colors shadow-sm"
            >
              <PackageSearch className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
