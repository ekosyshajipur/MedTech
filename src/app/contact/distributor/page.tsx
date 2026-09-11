"use client";

import Link from "next/link";
import { ChevronRight, Globe, TrendingUp, Handshake, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function DistributorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    const productInterests: string[] = [];
    form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked').forEach(cb => {
      productInterests.push(cb.value);
    });

    const payload = {
      companyName: formData.get("companyName"),
      contactPerson: formData.get("contactPerson"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
      yearsInBusiness: formData.get("yearsInBusiness"),
      currentBusiness: formData.get("currentBusiness"),
      annualRevenue: formData.get("annualRevenue"),
      productInterests,
      message: formData.get("message"),
    };

    try {
      const res = await fetch('/api/distributor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed.');
      }
      toast.success("Application registered successfully!");
      setSubmittedRef(data.referenceId || "EKO-DST-RECEIVED");
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-20">
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Become an Authorized Distributor</h1>
          <div className="flex items-center text-emerald-100 text-sm overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span>Become a Distributor</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Benefits Section */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Global Network</h2>
              <p className="text-gray-600 leading-relaxed">
                EKOSYS Corporation is actively expanding its international healthcare footprint. We partner with established medical equipment distributors, dealers, and importers to deliver certified clinical technology to hospitals and healthcare providers worldwide.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Partnership Advantages</h3>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start">
                <TrendingUp className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Direct Factory Pricing</h4>
                  <p className="text-sm text-gray-600">Competitive tier margins ensuring substantial commercial viability for regional distribution partners.</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start">
                <Globe className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Export Documentation & Logistics</h4>
                  <p className="text-sm text-gray-600">Full export documentation under Star Export House protocols (FOB, CIF, CFR, Ex-Works).</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Protected Territories</h4>
                  <p className="text-sm text-gray-600">Clear geographical exclusivity agreements to protect partner investments and regional tender rights.</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start">
                <Handshake className="w-8 h-8 text-emerald-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Technical Training & Warranty</h4>
                  <p className="text-sm text-gray-600">Priority technical training, replacement component backing, and dedicated account engineering support.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
              {submittedRef ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Successfully Submitted</h2>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Your dealership application has been submitted to the EKOSYS Global Distribution Board.
                  </p>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-sm mx-auto mb-8">
                    <span className="text-xs text-emerald-700 uppercase tracking-wider block font-semibold mb-1">Application Reference ID</span>
                    <span className="text-xl font-bold text-emerald-800 font-mono select-all">{submittedRef}</span>
                  </div>
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Distributor Application Form</h2>
                  <p className="text-gray-600 text-sm mb-8">Please provide complete organizational details to evaluate territorial distribution rights.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization Name *</label>
                        <input name="companyName" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Apex Medical Supplies Ltd." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Authorized Contact Person *</label>
                        <input name="contactPerson" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Mr. Vikram Singh" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email Address *</label>
                        <input name="email" type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="sales@apexmed.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp Number *</label>
                        <input name="phone" type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Country / Region *</label>
                        <input name="country" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="India / Kenya / UAE" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Operating City *</label>
                        <input name="city" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Patna / Nairobi / Dubai" />
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Commercial Operations Background</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business *</label>
                          <select name="yearsInBusiness" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                            <option value="">Select duration</option>
                            <option value="0-2 Years">0-2 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="6-10 Years">6-10 Years</option>
                            <option value="10+ Years">10+ Years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Structure *</label>
                          <select name="currentBusiness" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                            <option value="">Select type</option>
                            <option value="Medical Equipment Distributor">Equipment Distributor</option>
                            <option value="Hospital Supplies Wholesaler">Supplies Wholesaler</option>
                            <option value="Direct Importer">Direct Importer</option>
                            <option value="Government Tender Supplier">Government Tender Contractor</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover (USD)</label>
                          <select name="annualRevenue" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                            <option value="Below $500,000">Under $500,000</option>
                            <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                            <option value="$1,000,000 - $5,000,000">$1,000,000 - $5,000,000</option>
                            <option value="Above $5,000,000">Over $5,000,000</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories of Interest</h3>
                      <p className="text-gray-500 text-xs mb-4">Select all clinical product groups relevant to your market:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "Hospital Medical Furniture",
                          "ICU & Critical Care Units",
                          "Operation Theater Tables & Lights",
                          "Orthopaedic Implants & Sets",
                          "Diagnostic & Monitoring",
                          "Medical Disposables & Infusion",
                          "Sterilization & Autoclaves",
                          "Clinical Laboratory Equipment",
                          "Medical Imaging Systems"
                        ].map((cat) => (
                          <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" value={cat} className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" />
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Commercial Proposal / Existing Distribution Channels</label>
                      <textarea name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Provide information regarding your current hospital network, sub-dealer coverage, and sales infrastructure..."></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 disabled:opacity-70 text-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Transmitting Dealership Proposal...
                        </>
                      ) : (
                        "Submit Dealership Application"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
