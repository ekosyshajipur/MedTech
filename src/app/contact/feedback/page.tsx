"use client";

import Link from "next/link";
import { ChevronRight, Star, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a star rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSubmittedRefId(data.referenceId || "EKO-FEE-PROCESSED");
      toast.success("Thank you for your valuable feedback!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-20 min-h-screen">
      <div className="bg-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Customer Feedback</h1>
          <div className="flex items-center text-emerald-100 text-sm overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span>Feedback</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Value Your Opinion</h2>
            <p className="text-gray-600 text-lg">Your feedback helps us continuously improve our products and services to better serve healthcare facilities worldwide.</p>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
            {submittedRefId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Feedback Received</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for helping us elevate healthcare standards. Your feedback has been registered with reference ID:
                </p>
                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-bold px-4 py-2 rounded-lg">
                  {submittedRefId}
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSubmittedRefId(null);
                      setRating(0);
                      setFormData({ name: "", email: "", category: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Submit Another Feedback
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="text-center mb-8">
                  <label className="block text-lg font-medium text-gray-900 mb-4">How would you rate your overall experience with EKOSYS?</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star 
                          className={`w-12 h-12 ${
                            star <= (hoverRating || rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          } transition-colors`} 
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 h-6">
                    {rating > 0 && (
                      <span className="text-emerald-600 font-medium">
                        {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Category</label>
                  <select 
                    required 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="product_quality">Product Quality</option>
                    <option value="customer_service">Customer Service</option>
                    <option value="delivery">Delivery & Logistics</option>
                    <option value="website">Website Experience</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                  <textarea 
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
                    placeholder="Please share your thoughts, suggestions, or issues..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-70 text-lg shadow-md"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
