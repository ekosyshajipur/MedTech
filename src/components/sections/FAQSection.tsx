'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do you manufacture custom medical equipment?",
    answer: "Yes, we offer custom manufacturing services for specific hospital furniture and stainless steel medical equipment to match the unique requirements of your medical facility."
  },
  {
    question: "Are your products ISO and CE certified?",
    answer: "Absolutely. All our manufacturing processes are ISO 9001:2015 and ISO 13485:2016 certified. Our major product lines also carry CE certifications, ensuring compliance with global standards."
  },
  {
    question: "What is your typical delivery time for bulk orders?",
    answer: "Delivery timelines depend on the volume and specific products. Standard inventory is typically dispatched within 7-14 days. Custom or large bulk orders may take 4-8 weeks. We provide exact timelines with every quotation."
  },
  {
    question: "Do you export globally?",
    answer: "Yes, EKOSYS Corporation is a Star Export House. We currently export our high-quality medical equipment to over 80 countries worldwide, handling all necessary export documentation and logistics."
  },
  {
    question: "What warranty do you provide on your equipment?",
    answer: "Most of our equipment comes with a standard 1-year comprehensive warranty covering manufacturing defects. Extended warranty options and AMC (Annual Maintenance Contracts) are also available."
  },
  {
    question: "How can I become an authorized distributor?",
    answer: "We are always looking to expand our global network. You can apply for distributorship by filling out the form on our Contact page or emailing our sales team directly at ekosys.corp@gmail.com."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-xs md:text-sm">Find answers to common questions about our products and services.</p>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white rounded-xl overflow-hidden transition-all duration-200 border ${isOpen ? 'border-emerald-500 shadow-sm' : 'border-gray-200'}`}
              >
                <button
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => toggleOpen(index)}
                >
                  <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-emerald-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-3.5 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2.5">
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
    </section>
  );
}
