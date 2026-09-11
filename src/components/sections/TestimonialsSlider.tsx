'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "EKOSYS has been our primary supplier for hospital furniture for the past 5 years. Their quality is unmatched, and the durability of their beds and trolleys is excellent. Highly recommended for any new hospital setup.",
    name: "Dr. Rajesh Sharma",
    title: "Chief Medical Director",
    company: "Apollo Life Care",
    rating: 5
  },
  {
    id: 2,
    quote: "The precision of their diagnostic equipment and rapid delivery timeline saved us during our clinic expansion. The customer support team is highly responsive and technically sound.",
    name: "Sarah Jenkins",
    title: "Procurement Head",
    company: "Global Health Partners UK",
    rating: 5
  },
  {
    id: 3,
    quote: "We imported an entire ICU setup from EKOSYS Corporation. The cost-to-quality ratio is the best in the market. Every piece of equipment was CE certified and perfectly compliant with our local regulations.",
    name: "Dr. Ahmed Al-Fayed",
    title: "Director",
    company: "Oasis Medical Center UAE",
    rating: 5
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-2">Client Success Stories</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Trusted by Medical Professionals</h3>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute top-0 left-0 text-emerald-100 -translate-x-4 -translate-y-4 z-0">
            <Quote className="w-16 h-16 rotate-180 opacity-60" />
          </div>

          <div className="relative z-10 min-h-[190px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 w-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-base md:text-lg text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-base">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{testimonials[currentIndex].name}</h4>
                    <p className="text-xs text-gray-500">{testimonials[currentIndex].title}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-emerald-600 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
