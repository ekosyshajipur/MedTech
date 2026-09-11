'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Plus, Minus, ChevronLeft, ChevronRight, HelpCircle, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "EKOSYS Corporation has been our primary medical equipment supplier for hospital furniture and OT tables over the past five years. Their product build quality is rugged, reliable, and compliant with all clinical specifications required for our accreditation.",
    name: "Dr. Rajesh Sharma",
    title: "Chief Medical Director",
    institution: "Apollo Life Care",
    location: "India",
    rating: 5
  },
  {
    id: 2,
    quote: "The responsiveness of their engineering team during our diagnostic center expansion was exemplary. Technical spec sheets were provided within hours, and the equipment was delivered in heavy-duty export packaging without a scratch.",
    name: "Sarah Jenkins",
    title: "Procurement & Equipment Head",
    institution: "Global Health Partners",
    location: "United Kingdom",
    rating: 5
  },
  {
    id: 3,
    quote: "We procured a complete 40-bed ICU and ward setup from EKOSYS Corporation. Every motorized bed and patient monitor arrived CE and ISO certified, passing our hospital biomedical engineering checks on the first inspection.",
    name: "Dr. Ahmed Al-Fayed",
    title: "Biomedical Director",
    institution: "Oasis Medical Center",
    location: "United Arab Emirates",
    rating: 5
  }
];

const faqs = [
  {
    question: "Do you manufacture custom medical equipment and hospital furniture?",
    answer: "Yes. In addition to our 1,900+ standard product models across 31 categories, we provide custom dimensional and configuration manufacturing for hospital beds, stainless steel trolleys, and examination suites to meet specific facility architectural requirements."
  },
  {
    question: "What quality certifications and regulatory compliance do your products carry?",
    answer: "Our manufacturing facility operates under certified ISO 9001:2015 and ISO 13485:2016 Quality Management Systems. Our primary surgical, patient care, and diagnostic lines carry CE conformity certifications compliant with Medical Device Directives."
  },
  {
    question: "What is the typical production and delivery lead time for bulk orders?",
    answer: "Standard catalog items in active inventory are dispatched within 7 to 14 business days. Custom institutional orders or turnkey hospital shipments typically require 4 to 8 weeks depending on volume. Precise milestone schedules are included in every commercial quotation."
  },
  {
    question: "Does EKOSYS Corporation export internationally?",
    answer: "Yes, EKOSYS Corporation is a recognized Star Export House by the Government of India. We regularly dispatch medical consignments across more than 80 countries in Asia, Africa, Europe, the Middle East, and Latin America, managing full export customs documentation."
  },
  {
    question: "How do I request an official quotation or download technical spec sheets?",
    answer: "You can click 'Request Official Quotation' on any product page, fill out our dedicated RFQ form at /contact/enquiry, or download instant print-ready PDF specification sheets directly from each individual product detail view."
  },
  {
    question: "What warranty coverage and after-sales support do you provide?",
    answer: "All EKOSYS equipment includes a standard 12-month comprehensive manufacturer warranty against manufacturing defects. We also provide spare parts support, technical manuals, and optional Annual Maintenance Contracts (AMC) for institutional buyers."
  }
];

export default function ReviewsFaqSplit() {
  const [currentReview, setCurrentReview] = useState(0);
  // Default to null so NO FAQ is automatically opened
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            Trust, Validation &amp; Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Client Experiences &amp; Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Verified feedback from healthcare leaders alongside answers to commercial and procurement inquiries.
          </p>
        </div>

        {/* 50 / 50 Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
          
          {/* LEFT 50%: Client Reviews Testimonial Carousel (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-6 text-emerald-100/60 pointer-events-none">
              <Quote className="w-16 h-16 rotate-180" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-700">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Hospital Feedback &amp; Reviews</span>
              </div>

              <div className="relative min-h-[160px] sm:min-h-[170px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-1 mb-2.5">
                      {[...Array(testimonials[currentReview].rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed mb-4 font-normal">
                      &ldquo;{testimonials[currentReview].quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        {testimonials[currentReview].name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{testimonials[currentReview].name}</div>
                        <div className="text-[11px] text-gray-500">
                          {testimonials[currentReview].title} • {testimonials[currentReview].institution} ({testimonials[currentReview].location})
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Carousel Navigation Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReview(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentReview === idx ? 'bg-emerald-600 w-6' : 'bg-gray-200 w-2 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={prevReview}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT 50%: FAQ Accordion List (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-700">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Procurement &amp; Technical FAQ</span>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? 'border-emerald-600 bg-emerald-50/20 shadow-xs' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <button
                        className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none gap-2.5 cursor-pointer"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span className={`text-xs sm:text-sm font-bold leading-snug ${isOpen ? 'text-emerald-800' : 'text-gray-900'}`}>
                          {faq.question}
                        </span>
                        <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-4 pb-3 pt-0.5 text-xs text-gray-600 leading-relaxed border-t border-emerald-100/60">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4 text-xs text-gray-500 flex items-center justify-between">
              <span>Have a specific tender or hospital specification?</span>
              <a href="mailto:ekosys.corp@gmail.com" className="text-emerald-700 font-bold hover:underline">
                Ask Engineering &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
