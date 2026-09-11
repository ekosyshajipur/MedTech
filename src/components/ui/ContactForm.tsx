'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry.');
      }

      toast.success('Your message has been sent successfully!');
      setSubmittedRef(result.referenceId || 'CONFIRMED');
      setFormData({
        name: '', email: '', phone: '', company: '', subject: '', message: ''
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Network error. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Dispatched Successfully</h3>
        <p className="text-gray-600 mb-6">
          Your inquiry has been logged in our institutional procurement system. An EKOSYS representative will review your requirements.
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 inline-block w-full">
          <span className="text-xs text-emerald-700 uppercase tracking-wider block font-semibold mb-1">Official Reference ID</span>
          <span className="text-xl font-bold text-emerald-800 font-mono select-all">{submittedRef}</span>
        </div>
        <button
          onClick={() => setSubmittedRef(null)}
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-medium transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Send Us a Direct Message</h3>
        <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> ISO 13485 Verified
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white"
              placeholder="Dr. Rajesh Sharma"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white"
              placeholder="procurement@hospital.org"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone / WhatsApp</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Hospital / Facility Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white"
              placeholder="City General Hospital"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Category *</label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white"
          >
            <option value="">Select an inquiry type...</option>
            <option value="Institutional Quotation">Institutional Equipment Quotation</option>
            <option value="Tender / Bulk Procurement">Tender / Bulk Procurement</option>
            <option value="Distributor Partnership">Authorized Distributorship</option>
            <option value="Technical Specification Request">Technical Specification Sheet Request</option>
            <option value="Customer Support">Installation & Support</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message & Requirements *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow bg-gray-50 focus:bg-white resize-y"
            placeholder="Please specify required medical equipment, model requirements, quantities, and delivery timeline..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Transmitting Inquiry...
            </>
          ) : (
            <>
              Send Official Inquiry <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
