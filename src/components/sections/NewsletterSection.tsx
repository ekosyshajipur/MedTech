'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Loader2, Activity, ShieldCheck } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      toast.success(data.message || 'Successfully subscribed to EKOSYS updates!');
      setEmail('');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to subscribe. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-emerald-50 rounded-3xl p-8 md:p-12 text-center border border-emerald-100 shadow-sm relative overflow-hidden">
          {/* Decorative icons */}
          <Activity className="absolute top-8 left-8 w-12 h-12 text-emerald-600 opacity-20 transform -rotate-12 pointer-events-none" />
          <ShieldCheck className="absolute bottom-8 right-8 w-12 h-12 text-emerald-600 opacity-20 transform rotate-12 pointer-events-none" />

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter to receive the latest updates on new product launches, medical technology advancements, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative z-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white shadow-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Subscribe <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
