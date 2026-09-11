"use client";

import Link from "next/link";
import { ChevronRight, ShoppingCart, CheckCircle2, Loader2, FileText, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllCategories } from "@/data/products";

export default function EnquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productName, setProductName] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const categories = getAllCategories();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const product = urlParams.get('product');
      if (product) {
        setTimeout(() => {
          setProductName(product);
        }, 0);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      category: formData.get("category"),
      product: formData.get("product") || productName,
      quantity: formData.get("quantity"),
      deliveryRequirements: formData.get("deliveryRequirements"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quotation request.');
      }
      toast.success("Quotation inquiry dispatched successfully!");
      setSubmittedRef(data.referenceId || "EKO-RFQ-RECEIVED");
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Official Purchase & Tender Enquiry</h1>
          <div className="flex items-center text-emerald-100 text-sm overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span>Purchase Enquiry</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          {submittedRef ? (
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-emerald-100 text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quotation Request Logged</h2>
              <p className="text-gray-600 max-w-lg mx-auto mb-6">
                Your request has been routed to the relevant technical equipment division. You will receive an official CIF/FOB estimate and specification data package.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 max-w-md mx-auto mb-8">
                <span className="text-xs text-emerald-700 uppercase tracking-wider block font-semibold mb-1">Inquiry Tracking Reference</span>
                <span className="text-2xl font-bold text-emerald-800 font-mono select-all">{submittedRef}</span>
              </div>
              <button
                onClick={() => setSubmittedRef(null)}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-md"
              >
                Submit Inquiries for Additional Equipment
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Commercial Quotation & Specifications</h2>
                <p className="text-gray-600 text-lg">Please supply your required quantities and institutional specifications to receive direct factory pricing.</p>
              </div>

              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-gray-900 font-semibold text-lg">
                    <FileText className="w-5 h-5 text-emerald-600" /> Procurement Contact Information
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input name="name" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Dr. A. K. Verma" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Official Email Address *</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="procurement@medcenter.org" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp Number *</label>
                      <input name="phone" type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="+91 76448 68086" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hospital / Enterprise Organization *</label>
                      <input name="company" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Apollo / Max / AIIMS Partner Facility" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-gray-900 font-semibold text-lg pt-4">
                    <Clock className="w-5 h-5 text-emerald-600" /> Equipment Specifications
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Category *</label>
                      <select name="category" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                        <option value="">Select Primary Equipment Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specific Product / Model Number *</label>
                      <input 
                        name="product"
                        type="text" 
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                        placeholder="e.g. EK-01011A Motorised ICU Bed"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Unit Quantity *</label>
                      <input name="quantity" type="number" min="1" defaultValue="1" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Delivery Schedule</label>
                      <select name="deliveryRequirements" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                        <option value="Immediate Ex-Stock">Immediate Ex-Stock Deployment</option>
                        <option value="15-30 Days Manufacturing">15-30 Days Manufacturing</option>
                        <option value="Turnkey Hospital Project (30-90 Days)">Turnkey Hospital Project (30-90 Days)</option>
                        <option value="Tender Submission Phase">Tender Submission Phase</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technical Specifications & Packaging Requirements</label>
                    <textarea name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Provide destination seaport/airport, custom electrical requirements (220V/110V), medical gas outlet standards, or special certifications..."></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 disabled:opacity-70 text-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Generating Formal Quotation...
                        </>
                      ) : (
                        "Request Official Price & Specification Sheet"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
